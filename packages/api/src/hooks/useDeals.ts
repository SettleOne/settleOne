import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../client";
import type { Deal } from "@settleone/types";

interface DealsResponse {
  deals: Deal[];
  total: number;
  page: number;
  pageSize: number;
}

interface DealsParams {
  page?: number;
  pageSize?: number;
  state?: number;
  role?: "buyer" | "seller";
  address?: string;
}

export function useDeals(params: DealsParams = {}) {
  return useQuery({
    queryKey: ["deals", params],
    queryFn: () =>
      apiClient<DealsResponse>("/deals", {
        params: {
          page: params.page,
          pageSize: params.pageSize,
          state: params.state,
          role: params.role,
          address: params.address,
        },
      }),
  });
}

export function useMyDeals(
  address: string | undefined,
  params: Omit<DealsParams, "address"> = {},
) {
  return useQuery({
    queryKey: ["myDeals", address, params],
    queryFn: () =>
      apiClient<DealsResponse>("/deals", {
        params: {
          address,
          page: params.page,
          pageSize: params.pageSize,
          state: params.state,
          role: params.role,
        },
      }),
    enabled: !!address,
  });
}
