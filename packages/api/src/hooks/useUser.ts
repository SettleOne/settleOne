import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../client";
import type { UserProfile } from "@settleone/types";

export function useUser() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => apiClient<any>("/users/me").then((res) => res.data.user),
    retry: false,
    retryOnMount: false, // ← KEY: don't refetch when a new component mounts while in error state
    staleTime: 5 * 60 * 1000, // 5 min: don't refetch if data is fresh
    refetchOnWindowFocus: false, // don't refetch when DevTools/window is focused
    refetchOnReconnect: false, // don't refetch on HMR WebSocket reconnect
  });
}

export function useUserByAddress(address: string | undefined) {
  return useQuery({
    queryKey: ["user", address],
    queryFn: () => apiClient<UserProfile>(`/users/${address}`),
    enabled: !!address,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<UserProfile>) =>
      apiClient<any>("/users/me", {
        method: "PATCH",
        body: JSON.stringify(data),
      }).then((res) => res.data.user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useUploadAvatar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file); // Must match what Fastify expects

      return apiClient("/users/me/avatar", {
        method: "POST",
        body: formData, // the client will automatically set multipart/form-data
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
}

export const useUploadBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      return apiClient("/users/me/banner", {
        method: "POST",
        body: formData,
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
};

export function useRequestEmailChange() {
  return useMutation({
    mutationFn: (data: { currentPassword: string; newEmail: string }) =>
      apiClient("/users/me/change-email", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  });
}

export function useVerifyEmailChange() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { newEmail: string; code: string }) =>
      apiClient("/users/me/change-email/verify", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      // Invalidate the "users" query so the UI updates with the new email immediately
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: (data: any) =>
      apiClient("/users/me/change-password", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  });
}

export function useSessions() {
  return useQuery({
    queryKey: ["sessions"],
    queryFn: () =>
      apiClient<any>("/users/me/sessions", { method: "GET" }).then(
        (res) => res.data.sessions,
      ),
  });
}

export function useRevokeSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiClient(`/users/me/sessions/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });
}

export function useDeleteAccount() {
  return useMutation({
    mutationFn: () => apiClient("/users/me", { method: "DELETE" }),
  });
}

export function exportUserData(token: string) {
  const baseUrl =
    (typeof import.meta !== "undefined"
      ? (import.meta as any).env?.VITE_API_URL
      : undefined) || "http://localhost:4000/api/v1";

  return fetch(`${baseUrl}/users/me/export`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "my_settleone_data.json";
      a.click();
      window.URL.revokeObjectURL(url);
    });
}

export function useRemoveWallet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (address: string) =>
      apiClient(`/users/me/wallets/${address}`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
}

export function useMakePrimaryWallet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (address: string) =>
      apiClient(`/users/me/wallets/${address}/primary`, { method: "POST" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
}
