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
  return useInfiniteQuery({
    queryKey: ["chat", dealId],
    queryFn: ({ pageParam }) =>
      apiClient<ChatMessagesResponse>(`/deals/${dealId}/chat`, {
        params: { cursor: pageParam as string | undefined },
      }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.cursor : undefined,
    enabled: !!dealId,
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      dealId,
      content,
      attachmentUrl,
      attachmentName,
    }: {
      dealId: string;
      content: string;
      attachmentUrl?: string;
      attachmentName?: string;
    }) =>
      apiClient<ChatMessage>(`/deals/${dealId}/chat`, {
        method: "POST",
        body: JSON.stringify({ content, attachmentUrl, attachmentName }),
      }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["chat", variables.dealId] });
    },
  });
}

export function useMarkMessagesRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ dealId }: { dealId: string }) =>
      apiClient<void>(`/deals/${dealId}/chat/read`, {
        method: "POST",
      }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["chat", variables.dealId] });
    },
  });
}
