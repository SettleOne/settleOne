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
      proofHash,
      cid,
      notes,
    }: {
      dealId: string;
      proofHash: string;
      cid: string;
      notes?: string;
    }) =>
      apiClient<{ delivery: any; proofHash: string }>("/deliveries", {
        method: "POST",
        body: JSON.stringify({ dealId, proofHash, cid, notes }),
      }),
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({ queryKey: ["deliveries", vars.dealId] });
      queryClient.invalidateQueries({ queryKey: ["deal", vars.dealId] });
    },
  });
}
