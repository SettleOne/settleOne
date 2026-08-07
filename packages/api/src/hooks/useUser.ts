import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../client";
import type { UserProfile } from "@settleone/types";

export function useUser() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => apiClient<UserProfile>("/users/me"),
    retry: false,
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
      apiClient<UserProfile>("/users/me", {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
  });
};

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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
  });
};