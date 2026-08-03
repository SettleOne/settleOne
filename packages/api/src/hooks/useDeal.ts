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
  name: string;
  description: string;
  category: string;
  dealType: "SoftDelivery" | "HardDelivery";
  chainId: number;
  tokenAddress: string;
  amount: string;
  sellerAddress?: string;
  verifierAddress?: string;
  resolverAddress?: string;
  partialSettlementAllowed: boolean;
  sellerAcceptanceWindowSeconds: number;
  acceptanceWindowSeconds: number;
  disputeWindowSeconds: number;
  deliveryDeadlineTimestamp: number;
  termsText?: string;
  evidenceRequirements?: string;
  settlementRules?: string;
}

export function useCreateDealMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateDealPayload) =>
      apiClient<{ deal: any; hashes: any }>("/deals", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deals"] });
      queryClient.invalidateQueries({ queryKey: ["myCreatedDeals"] });
    },
  });
}

export function useDealActivity(dealId: string | undefined) {
  return useQuery({
    queryKey: ["dealActivity", dealId],
    queryFn: () =>
      apiClient<{ logs: any[]; nextCursor: string | null }>(
        `/deals/${dealId}/activity`,
      ),
    enabled: !!dealId,
    refetchInterval: 30000,
  });
}

export function useDealPayout(dealId: string | undefined) {
  return useQuery({
    queryKey: ["dealPayout", dealId],
    queryFn: () => apiClient<any>(`/deals/${dealId}/payout`),
    enabled: !!dealId,
  });
}
