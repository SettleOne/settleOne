const BASE_URL =
  (typeof import.meta !== "undefined"
    ? (import.meta as any).env?.VITE_API_URL
    : undefined) || "http://localhost:4000/api/v1";

// Memory-based token storage for XSS protection
let authToken: string | null = null;

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

function buildUrl(
  path: string,
  params?: Record<string, string | number | boolean | undefined>,
): string {
  const url = new URL(`${BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    });
  }
  return url.toString();
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public body: string,
  ) {
    super(body ? `API Error: ${body}` : `API Error ${status}: ${statusText}`);
    this.name = "ApiError";
  }
}

export async function apiClient<T>(
  path: string,
  options: RequestOptions = {},
  isRetry = false,
): Promise<T> {
  const { params, ...fetchOptions } = options;
  const url = buildUrl(path, params);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };

  // If body is FormData, browser MUST set the Content-Type automatically to include the boundary
  if (options.body instanceof FormData) {
    delete headers["Content-Type"];
  }

  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  // We must include credentials so the HttpOnly Refresh Cookie is sent to the backend
  const fetchConfig = {
    ...fetchOptions,
    headers,
    credentials: "include" as RequestCredentials,
  };

  let response = await fetch(url, fetchConfig);

  // --- SILENT TOKEN REFRESH INTERCEPTOR ---
  if (response.status === 401 && !isRetry && path !== "/auth/login") {
    try {
      // 1. Ask the backend for a new Access Token using our Refresh Cookie
      const refreshRes = await fetch(buildUrl("/auth/refresh"), {
        method: "POST",
        credentials: "include", // Sends the cookie
      });

      if (!refreshRes.ok) throw new Error("Refresh token expired");

      const refreshData = await refreshRes.json();
      const newAccessToken = refreshData.data?.accessToken;

      if (newAccessToken) {
        // 2. Save the new token in memory and localStorage
        persistAuthToken(newAccessToken);

        // 3. Update the headers with the new token
        headers["Authorization"] = `Bearer ${newAccessToken}`;

        // 4. Retry the exact same request that just failed!
        response = await fetch(url, { ...fetchConfig, headers });
      }
    } catch (refreshError) {
      console.error(" KICKED BY CLIENT.TS! Refresh failed:", refreshError);
      // If the refresh token is ALSO expired, we must force a hard logout
      clearAuthToken();
      if (typeof window !== "undefined") {
        localStorage.removeItem("so_access_token");
        // Redirect them to marketing app's login page
        const mktUrl =
          (typeof import.meta !== "undefined"
            ? (import.meta as any).env?.VITE_MARKETING_URL
            : undefined) || "http://localhost:3001";
        window.location.href = `${mktUrl}/login`;
        throw new ApiError(401, "Unauthorized", "Session fully expired");
      }
    }
  }
  // --------------------------------------------------

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "Unknown error");
    throw new ApiError(response.status, response.statusText, errorBody);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export function setAuthToken(token: string): void {
  authToken = token;
}

export function clearAuthToken(): void {
  authToken = null;
}

export function persistAuthToken(token: string): void {
  authToken = token;
  if (typeof window !== "undefined") {
    localStorage.setItem("so_access_token", token);
  }
}

export function hydrateAuthToken(): void {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("so_access_token");
    if (stored) authToken = stored;
  }
}
