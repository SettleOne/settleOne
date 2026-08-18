import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../client";
import type { Deal } from "@settleone/types";

interface DealDetail extends Deal {
  chainId: number;
  onChainDealId: string;
  onChainId: number | string | null;
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
  fundingType?: string;
  sellerSpecifications?: string;
  termsHash?: string;
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

export function useLinkDealMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      dealId,
      onChainId,
    }: {
      dealId: string;
      onChainId: string;
    }) =>
      apiClient<{ deal: any }>(`/deals/${dealId}/link`, {
        method: "PATCH",
        body: JSON.stringify({ onChainId }),
      }),
    onSuccess: (_, variables) => {
      // Invalidate the cache so the UI updates to show the linked deal
      queryClient.invalidateQueries({ queryKey: ["deals"] });
      queryClient.invalidateQueries({ queryKey: ["deal", variables.dealId] });
      queryClient.invalidateQueries({ queryKey: ["myCreatedDeals"] });
      queryClient.invalidateQueries({ queryKey: ["activeDeals"] });
    },
  });
}
