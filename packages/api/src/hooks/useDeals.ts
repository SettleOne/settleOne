import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../client";
import { useInfiniteQuery } from "@tanstack/react-query";

interface DealsResponse {
  deals: any[];
  nextCursor: string | null;
}

interface DealsParams {
  limit?: number;
  cursor?: string;
  state?: string;
  dealType?: string;
  category?: string;
  search?: string;
  chainId?: number;
  sortBy?: string;
  sortDir?: "asc" | "desc";
  [key: string]: string | number | boolean | undefined;
}

export function useDeals(params: DealsParams = {}) {
  return useQuery({
    queryKey: ["deals", params],
    queryFn: () => apiClient<DealsResponse>("/deals", { params }),
    refetchInterval: 10_000, // Poll every 10s so indexer-linked deals appear automatically
  });
}

export function useMyCreatedDeals(params: DealsParams = {}) {
  return useQuery({
    queryKey: ["myCreatedDeals", params],
    queryFn: () => apiClient<DealsResponse>("/deals/my/created", { params }),
    refetchInterval: 10_000,
  });
}

export function useMyAcceptedDeals(params: DealsParams = {}) {
  return useQuery({
    queryKey: ["myAcceptedDeals", params],
    queryFn: () => apiClient<DealsResponse>("/deals/my/accepted", { params }),
  });
}

export function useActiveDeals(params: DealsParams = {}) {
  return useQuery({
    queryKey: ["activeDeals", params],
    queryFn: () => apiClient<DealsResponse>("/deals/active", { params }),
  });
}

export function useMyDeals(params: DealsParams = {}) {
  return useQuery({
    queryKey: ["myDeals", params],
    queryFn: () => apiClient<DealsResponse>("/deals/my/created", { params }),
  });
}

export function useMarketplaceStats() {
  return useQuery({
    queryKey: ["marketplaceStats"],
    queryFn: () => apiClient<any>("/deals/stats"),
    refetchInterval: 30_000, // Refresh every 30s
    staleTime: 20_000,
  });
}

export function useInfiniteDeals(
  endpoint: string = "/deals",
  params: DealsParams = {},
) {
  return useInfiniteQuery({
    queryKey: ["deals", "infinite", endpoint, params],
    queryFn: async ({ pageParam }) => {
      // This automatically unwraps the { success, data } response
      const res = await apiClient<any>(endpoint, {
        params: { ...params, cursor: pageParam || undefined },
      });
      return res.data as DealsResponse;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
    initialPageParam: null as string | null,
  });
}
