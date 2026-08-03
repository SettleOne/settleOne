import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../client";

interface PortfolioSummary {
  totalDeals: number;
  activeDeals: number;
  completedDeals: number;
  disputedDeals: number;
  totalVolume: string;
  totalEarnings: string;
  successRate: number;
  averageDealTime: number;
  tokenBreakdown: Array<{
    token: string;
    symbol: string;
    volume: string;
    deals: number;
  }>;
}

interface PortfolioActivity {
  date: string;
  deals: number;
  volume: string;
}

export function usePortfolio() {
  return useQuery({
    queryKey: ["portfolio"],
    queryFn: () => apiClient<any>("/portfolio/summary"),
  });
}

export function usePortfolioTransactions(
  params: {
    limit?: number;
    cursor?: string;
  } = {},
) {
  return useQuery({
    queryKey: ["portfolioTransactions", params],
    queryFn: () => apiClient<any>("/portfolio/transactions", { params }),
  });
}

export function useYieldChart(params: { days?: number } = {}) {
  return useQuery({
    queryKey: ["yieldChart", params],
    queryFn: () => apiClient<any>("/portfolio/yield-chart", { params }),
  });
}

export function usePortfolioActivity(
  address: string | undefined,
  days: number = 30,
) {
  return useQuery({
    queryKey: ["portfolioActivity", address, days],
    queryFn: () =>
      apiClient<{ activity: PortfolioActivity[] }>(
        `/portfolio/${address}/activity`,
        {
          params: { days },
        },
      ),
    enabled: !!address,
  });
}
