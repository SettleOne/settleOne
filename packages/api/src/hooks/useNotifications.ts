import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../client";
import type { Notification } from "@settleone/types";

interface NotificationsResponse {
  notifications: Notification[];
  total: number;
  unreadCount: number;
}

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: () => apiClient<NotificationsResponse>("/notifications"),
    refetchInterval: 30000, // Poll every 30s
  });
}

export function useUnreadCount() {
  return useQuery({
    queryKey: ["notifications", "unreadCount"],
    queryFn: () => apiClient<{ count: number }>("/notifications/unread-count"),
    refetchInterval: 15000, // Poll every 15s
  });
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (notificationId: string) =>
      apiClient<{ updated: number }>("/notifications/read", {
        method: "POST",
        body: JSON.stringify({ notificationIds: [notificationId] }),
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      }),
  });
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      apiClient<{ updated: number }>("/notifications/read", {
        method: "POST",
        body: JSON.stringify({ notificationIds: [] }),
        // empty = mark all
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      }),
  });
}

export function useDeleteNotification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiClient<void>(`/notifications/${id}`, { method: "DELETE" }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      }),
  });
}
