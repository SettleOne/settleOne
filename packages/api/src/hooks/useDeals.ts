import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../client";

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
  });
}

export function useMyCreatedDeals(params: DealsParams = {}) {
  return useQuery({
    queryKey: ["myCreatedDeals", params],
    queryFn: () => apiClient<DealsResponse>("/deals/my/created", { params }),
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
