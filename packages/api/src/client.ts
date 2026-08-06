const BASE_URL =
  (typeof process !== "undefined" && process.env
    ? process.env.NEXT_PUBLIC_API_URL
    : typeof import.meta !== "undefined"
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

export async function apiClient<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { params, ...fetchOptions } = options;
  const url = buildUrl(path, params);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };

  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "Unknown error");
    throw new ApiError(response.status, response.statusText, errorBody);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public body: string,
  ) {
    super(`API Error ${status}: ${statusText}`);
    this.name = "ApiError";
  }
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
