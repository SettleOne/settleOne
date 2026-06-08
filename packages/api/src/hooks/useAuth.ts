import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, setAuthToken, clearAuthToken } from '../client';

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    walletAddress?: string;
  };
}

interface LoginPayload {
  walletAddress: string;
  signature: string;
  message: string;
}

interface RegisterPayload {
  walletAddress: string;
  signature: string;
  message: string;
  email: string;
  name: string;
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginPayload) =>
      apiClient<AuthResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    onSuccess: (data) => {
      setAuthToken(data.token);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RegisterPayload) =>
      apiClient<AuthResponse>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    onSuccess: (data) => {
      setAuthToken(data.token);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      apiClient<void>('/auth/logout', {
        method: 'POST',
      }),
    onSuccess: () => {
      clearAuthToken();
      queryClient.clear();
    },
  });
}

export function useNonce() {
  return useMutation({
    mutationFn: (walletAddress: string) =>
      apiClient<{ nonce: string; message: string }>('/auth/nonce', {
        method: 'POST',
        body: JSON.stringify({ walletAddress }),
      }),
  });
}
