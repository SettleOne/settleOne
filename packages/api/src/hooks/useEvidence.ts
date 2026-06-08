import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../client';
import type { Evidence } from '@settleone/types';

interface EvidenceResponse {
  evidence: Evidence[];
  total: number;
}

export function useEvidence(dealId: string | undefined) {
  return useQuery({
    queryKey: ['evidence', dealId],
    queryFn: () => apiClient<EvidenceResponse>(`/deals/${dealId}/evidence`),
    enabled: !!dealId,
  });
}

export function useSubmitEvidence() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      dealId,
      role,
      evidenceType,
      contentHash,
      cid,
    }: {
      dealId: string;
      role: number;
      evidenceType: number;
      contentHash: string;
      cid: string;
    }) =>
      apiClient<{ id: string }>(`/deals/${dealId}/evidence`, {
        method: 'POST',
        body: JSON.stringify({ role, evidenceType, contentHash, cid }),
      }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['evidence', variables.dealId] });
    },
  });
}
