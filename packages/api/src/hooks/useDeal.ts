import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../client";
import type { Deal } from "@settleone/types";

interface DealDetail extends Deal {
  chainId: number;
  onChainDealId: string;
}

export function useDeal(dealId: string | undefined) {
  return useQuery({
    queryKey: ["deal", dealId],
    queryFn: () => apiClient<DealDetail>(`/deals/${dealId}`),
    enabled: !!dealId,
  });
}

interface CreateDealPayload {
  buyer: string;
  seller: string;
  token: string;
  amount: string;
  deliveryDeadline: number;
  disputeWindow: number;
  acceptanceWindow: number;
  sellerAcceptanceWindowSecs: number;
  dealType: number;
  partialSettlementAllowed: boolean;
  termsHash: string;
  metadataHash: string;
  chainId: number;
}

export function useCreateDealMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateDealPayload) =>
      apiClient<{ id: string; dealId: string }>("/deals", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deals"] });
      queryClient.invalidateQueries({ queryKey: ["myDeals"] });
    },
  });
}

export function useUpdateDealStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ dealId, status }: { dealId: string; status: string }) =>
      apiClient<void>(`/deals/${dealId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["deal", variables.dealId] });
      queryClient.invalidateQueries({ queryKey: ["deals"] });
    },
  });
}
