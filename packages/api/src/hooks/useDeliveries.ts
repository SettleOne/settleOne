import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../client";
import type { Delivery } from "@settleone/types";

interface DeliveriesResponse {
  deliveries: Delivery[];
  total: number;
}

export function useDeliveries(dealId: string | undefined) {
  return useQuery({
    queryKey: ["deliveries", dealId],
    queryFn: () => apiClient<DeliveriesResponse>(`/deals/${dealId}/deliveries`),
    enabled: !!dealId,
  });
}

export function useSubmitDelivery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      dealId,
      sellerNotes,
      fileIds,
      externalLinks,
    }: {
      dealId: string;
      sellerNotes?: string;
      fileIds?: string[];
      externalLinks?: string[];
    }) =>
      apiClient<{ data: { delivery: any; proofHash: string } }>("/deliveries", {
        method: "POST",
        body: JSON.stringify({ dealId, sellerNotes, fileIds, externalLinks }),
      }),
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({ queryKey: ["deliveries", vars.dealId] });
      queryClient.invalidateQueries({ queryKey: ["deal", vars.dealId] });
    },
  });
}
