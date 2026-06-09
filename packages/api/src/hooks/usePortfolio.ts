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

export function usePortfolio(address: string | undefined) {
  return useQuery({
    queryKey: ["portfolio", address],
    queryFn: () => apiClient<PortfolioSummary>(`/portfolio/${address}`),
    enabled: !!address,
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
