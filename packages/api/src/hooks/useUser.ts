import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../client';
import type { UserProfile } from '@settleone/types';

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => apiClient<UserProfile>('/user/me'),
    retry: false,
  });
}

export function useUserByAddress(address: string | undefined) {
  return useQuery({
    queryKey: ['user', address],
    queryFn: () => apiClient<UserProfile>(`/user/${address}`),
    enabled: !!address,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<UserProfile>) =>
      apiClient<UserProfile>('/user/me', {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}
