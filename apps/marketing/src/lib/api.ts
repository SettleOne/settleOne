// ─────────────────────────────────────────────────────────────────────────────
// SettleOne API Client
// Base URL reads from VITE_API_URL env var (defaults to localhost:4000 for dev)
// All requests include `credentials: 'include'` so the HttpOnly refresh-token
// cookie is automatically sent / set by the browser.
// ─────────────────────────────────────────────────────────────────────────────

const API_BASE =
  (import.meta.env.VITE_API_URL as string | undefined) ??
  "http://localhost:4000/api/v1";

// ─── Staff roles that should be redirected to the Operations app ──────────────
export const STAFF_ROLES = [
  "admin",
  "arbitrator",
  "vault_manager",
  "upgrader",
  "verifier",
] as const;

export type StaffRole = (typeof STAFF_ROLES)[number];
export type UserRole = StaffRole | "user";

export function isStaffRole(role: string): role is StaffRole {
  return STAFF_ROLES.includes(role as StaffRole);
}

// ─── Redirect helpers ─────────────────────────────────────────────────────────
const WORKSPACE_URL =
  (import.meta.env.VITE_WORKSPACE_URL as string | undefined) ??
  "http://localhost:3000";

const OPERATIONS_URL =
  (import.meta.env.VITE_OPERATIONS_URL as string | undefined) ??
  "http://localhost:3002";

/**
 * Redirects the user to the correct app based on their role.
 * - Normal users  → Workspace app
 * - Staff / Admin → Operations app
 */
export function redirectAfterAuth(role: string): void {
  if (isStaffRole(role)) {
    window.location.href = OPERATIONS_URL;
  } else {
    window.location.href = WORKSPACE_URL;
  }
}

// ─── Token helpers ────────────────────────────────────────────────────────────
/** Store tokens/user info received after successful auth */
export function storeAuthResult(accessToken: string, role: string): void {
  localStorage.setItem("so_access_token", accessToken);
  localStorage.setItem("so_user_role", role);
}

/** Clear stored auth state (e.g. on logout) */
export function clearAuthState(): void {
  localStorage.removeItem("so_access_token");
  localStorage.removeItem("so_user_role");
}

// ─── Core fetch wrapper ───────────────────────────────────────────────────────

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: { code: string; message: string };
}

/**
 * Make an authenticated POST request to the SettleOne backend.
 * Throws an error with the backend message on failure.
 */
export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // sends the HttpOnly refresh-token cookie
    body: JSON.stringify(body),
  });

  const json: ApiResponse<T> = await res.json();

  if (!json.success) {
    throw new Error(
      json.error?.message ?? `Request failed with status ${res.status}`,
    );
  }

  return json.data;
}

/**
 * Make an authenticated GET request to the SettleOne backend.
 */
export async function apiGet<T>(path: string): Promise<T> {
  const token = localStorage.getItem("so_access_token");
  const res = await fetch(`${API_BASE}${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: "include",
  });

  const json: ApiResponse<T> = await res.json();

  if (!json.success) {
    throw new Error(
      json.error?.message ?? `Request failed with status ${res.status}`,
    );
  }

  return json.data;
}

// ─── Google OAuth ─────────────────────────────────────────────────────────────

/**
 * Initiates the Google OAuth flow by redirecting the browser to the backend.
 * The backend then redirects to Google, which redirects back to
 * /auth/callback?token=...&role=... in the marketing app.
 */
export function initiateGoogleAuth(): void {
  window.location.href = `${API_BASE}/auth/google`;
}

// ─── Auth API calls ───────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

export interface TokenResult {
  accessToken: string;
  user: AuthUser;
}

/** Step 1 of signup: register email+password, backend sends OTP email */
export async function registerUser(
  name: string,
  email: string,
  password: string,
): Promise<{ message: string }> {
  return apiPost("/auth/register", { name, email, password });
}

/** Step 2 of signup: verify the OTP code, get JWT back */
export async function verifyEmail(
  email: string,
  code: string,
): Promise<TokenResult> {
  return apiPost("/auth/verify-email", { email, code });
}

/** Resend OTP code for signup or password reset */
export async function resendOtp(
  email: string,
  type: "signup" | "reset_password",
): Promise<{ message: string }> {
  return apiPost("/auth/resend-otp", { email, type });
}

/** Normal user login */
export async function loginUser(
  email: string,
  password: string,
): Promise<TokenResult & { requiresStaffAuth?: boolean }> {
  return apiPost("/auth/login", { email, password });
}

/** Staff login (requires TOTP code in addition to email+password) */
export async function staffLogin(
  email: string,
  password: string,
  totpCode: string,
): Promise<TokenResult> {
  return apiPost("/auth/staff-login", { email, password, totpCode });
}

/** Forgot password — backend sends reset code to email */
export async function forgotPassword(
  email: string,
): Promise<{ message: string }> {
  return apiPost("/auth/forgot-password", { email });
}

/** Reset password — verify code and set new password */
export async function resetPassword(
  email: string,
  code: string,
  newPassword: string,
): Promise<{ message: string }> {
  return apiPost("/auth/reset-password", { email, code, newPassword });
}
