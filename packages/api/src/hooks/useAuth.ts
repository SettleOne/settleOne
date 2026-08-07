import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient, setAuthToken, clearAuthToken } from "../client";

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    walletAddress?: string;
  };
}

interface LoginPayload {
  walletAddress: string;
  signature: string;
  message: string;
}

interface RegisterPayload {
  walletAddress: string;
  signature: string;
  message: string;
  email: string;
  name: string;
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginPayload) =>
      apiClient<AuthResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: (data) => {
      setAuthToken(data.token);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RegisterPayload) =>
      apiClient<AuthResponse>("/auth/register", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: (data) => {
      setAuthToken(data.token);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      apiClient<void>("/auth/logout", {
        method: "POST",
      }),
    onSuccess: () => {
      clearAuthToken();
      queryClient.clear();
    },
  });
}

export function useNonce() {
  return useMutation({
    mutationFn: (walletAddress: string) =>
      apiClient<{ nonce: string; message: string }>("/auth/nonce", {
        method: "POST",
        body: JSON.stringify({ walletAddress }),
      }),
  });
}

export const useRequestEmailChange = () => {
  return useMutation({
    mutationFn: (data: { currentPassword: string; newEmail: string }) =>
      apiClient("/auth/change-email", { method: "POST", body: data }),
  });
};

export const useVerifyEmailChange = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { newEmail: string; code: string }) =>
      apiClient("/auth/change-email/verify", { method: "POST", body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: any) =>
      apiClient("/auth/change-password", { method: "POST", body: data }),
  });
};

export const useSessions = () => {
  return useQuery({
    queryKey: ["sessions"],
    queryFn: () =>
      apiClient("/auth/sessions", { method: "GET" }).then(
        (res) => res.sessions,
      ),
  });
};

export const useRevokeSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiClient(`/auth/sessions/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });
};
