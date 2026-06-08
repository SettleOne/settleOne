import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../client';
import type { Delivery } from '@settleone/types';

interface DeliveriesResponse {
  deliveries: Delivery[];
  total: number;
}

export function useDeliveries(dealId: string | undefined) {
  return useQuery({
    queryKey: ['deliveries', dealId],
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
    }: {
      dealId: string;
      proofHash: string;
      cid: string;
    }) =>
      apiClient<{ id: string }>(`/deals/${dealId}/deliveries`, {
        method: 'POST',
        body: JSON.stringify({ proofHash, cid }),
      }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['deliveries', variables.dealId] });
      queryClient.invalidateQueries({ queryKey: ['deal', variables.dealId] });
    },
  });
}
