import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { apiClient } from "../client";
import type { ChatMessage } from "@settleone/types";

interface ChatMessagesResponse {
  messages: ChatMessage[];
  hasMore: boolean;
  cursor?: string;
}

export function useChatMessages(dealId: string | undefined) {
  return useQuery({
    queryKey: ["chat", dealId],
    queryFn: () =>
      apiClient<{ messages: any[]; nextCursor: string | null }>(
        `/chat/${dealId}/messages`,
      ),
    enabled: !!dealId,
    refetchInterval: 10000, // Poll until Socket.io is wired
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ dealId, content }: { dealId: string; content: string }) =>
      apiClient<any>(`/chat/${dealId}/messages`, {
        method: "POST",
        body: JSON.stringify({ content }),
      }),
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({ queryKey: ["chat", vars.dealId] });
    },
  });
}

export function useMarkMessagesRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      dealId,
      messageIds,
    }: {
      dealId: string;
      messageIds?: string[];
    }) =>
      apiClient<{ updated: number }>(`/chat/${dealId}/messages/read`, {
        method: "POST",
        body: JSON.stringify({ messageIds }),
      }),
  });
}
