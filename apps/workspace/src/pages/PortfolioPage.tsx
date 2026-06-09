import React, { useMemo } from "react";
import { useAccount } from "wagmi";
import {
  Wallet,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  History,
  AlertCircle,
} from "lucide-react";
import { formatAmount } from "@settleone/utils";
import {
  NetworkBadge,
  AddressDisplay,
  Spinner,
} from "@settleone/design-system";
import { useMyDeals } from "@settleone/api";

export function PortfolioPage() {
  const { address } = useAccount();
  const { data, isLoading, error } = useMyDeals(address);

  const deals = data?.deals || [];

  const stats = useMemo(() => {
    const activeDeals = deals.filter((d) =>
      [1, 2, 3, 4, 5, 7].includes(d.state),
    );
    const tvl = activeDeals.reduce(
      (sum, d) => sum + BigInt(d.depositedFunds || 0),
      0n,
    );
    const totalYield = 12.4; // Mock until API provides real yield stats

    return {
      tvl,
      activeCount: activeDeals.length,
      totalYield,
    };
  }, [deals]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Spinner size="lg" />
        <p className="mt-4 text-gray-500 font-medium">
          Calculating Portfolio...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Portfolio</h1>
          <p className="text-gray-500 text-sm mt-1">
            Assets currently locked in Escrow Vaults across {stats.activeCount}{" "}
            active deals.
          </p>
        </div>
      </div>

      {/* Aggregate Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Wallet size={16} /> Total Value Locked
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {formatAmount(stats.tvl, 6)}{" "}
            <span className="text-sm font-medium text-gray-400">USDC</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-purple-100 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 text-purple-600 text-sm mb-2 font-medium">
            <PieChart size={16} /> Total Yield Generated
          </div>
          <div className="text-3xl font-bold text-purple-700">
            +${stats.totalYield.toFixed(2)}
          </div>
          <p className="text-xs text-purple-500 mt-2">
            Yield is generated from Aave V3 integration while funds are in
            escrow.
          </p>
        </div>
      </div>

      {/* Deals List */}
      <h3 className="text-lg font-bold text-gray-900 mt-8 mb-4">
        Active Positions
      </h3>
      <div className="bg-white border border-[var(--border)] rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {deals.length === 0 ? (
            <div className="p-12 text-center text-gray-400 italic">
              No active positions found.
            </div>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 border-b border-[var(--border)] text-xs text-gray-500 uppercase">
                <tr>
                  <th className="px-6 py-4 font-semibold">Deal</th>
                  <th className="px-6 py-4 font-semibold">Principal</th>
                  <th className="px-6 py-4 font-semibold">My Role</th>
                  <th className="px-6 py-4 font-semibold">Yield (Est)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {deals.map((deal, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      <div className="flex flex-col">
                        <span className="font-bold">
                          #DL-{String(deal.id).padStart(5, "0")}
                        </span>
                        <span className="text-xs text-gray-500 truncate max-w-[200px]">
                          {deal.title || "Smart Contract Audit"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-gray-900">
                      {formatAmount(deal.amount, 6)} USDC
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${deal.buyer.toLowerCase() === address?.toLowerCase() ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}
                      >
                        {deal.buyer.toLowerCase() === address?.toLowerCase()
                          ? "Buyer"
                          : "Seller"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-green-600 font-medium">
                      +$0.45
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <h3 className="text-lg font-bold text-gray-900 mt-8 mb-4 flex items-center gap-2">
        <History size={18} /> Recent Activity
      </h3>
      <div className="p-8 bg-gray-50 rounded-xl border border-dashed border-gray-300 text-center text-gray-400 text-sm">
        Activity history is synced every 24 hours. Check back soon for your
        transaction log.
      </div>
    </div>
  );
}
