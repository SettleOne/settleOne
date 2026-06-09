import React from "react";
import {
  DollarSign,
  CheckCircle,
  TrendingUp,
  AlertCircle,
  Ban,
} from "lucide-react";
import { AddressDisplay } from "@settleone/design-system";
import { formatAmount } from "@settleone/utils";
import { DealState } from "@settleone/types";

interface SettlementSummaryCardProps {
  deal: any;
}

export function SettlementSummaryCard({ deal }: SettlementSummaryCardProps) {
  const currentState = deal.state;

  // Simplified calculation logic for the UI
  // In production, we'd fetch actual payout data from the Settlement contract or sub-graph
  const totalPrincipal = BigInt(deal.amount);
  const yieldEarned = 12.4; // Mock yield

  let title = "Deal Successfully Settled";
  let subtitle =
    "Funds have been distributed according to the settlement rules.";
  let icon = <DollarSign size={32} />;
  let iconBg = "bg-green-100 text-green-600";

  let sellerPayout = 0n;
  let buyerRefund = 0n;

  if (currentState === DealState.Released) {
    sellerPayout = totalPrincipal;
    buyerRefund = 0n;
  } else if (currentState === DealState.Refunded) {
    sellerPayout = 0n;
    buyerRefund = totalPrincipal;
  } else if (currentState === DealState.Settled) {
    // Assuming a split, for example
    sellerPayout = (totalPrincipal * 85n) / 100n;
    buyerRefund = totalPrincipal - sellerPayout;
  } else if (currentState === DealState.Cancelled) {
    title = "Deal Cancelled";
    subtitle =
      "This deal was cancelled and funds have been returned to the buyer.";
    icon = <Ban size={32} />;
    iconBg = "bg-gray-100 text-gray-600";
    buyerRefund = BigInt(deal.depositedFunds);
  }

  return (
    <div className="bg-white border border-[var(--border)] rounded-lg shadow-sm overflow-hidden mb-6">
      <div className="px-4 py-3 border-b border-[var(--border)] bg-gray-50 flex items-center gap-2">
        <CheckCircle
          size={16}
          className={
            currentState === DealState.Cancelled
              ? "text-gray-500"
              : "text-green-600"
          }
        />
        <h3 className="font-semibold text-sm">Settlement Summary</h3>
      </div>
      <div className="p-6">
        <div className="text-center mb-8">
          <div
            className={`inline-flex items-center justify-center w-16 h-16 ${iconBg} rounded-full mb-4`}
          >
            {icon}
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-500 mt-1">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Seller Payout
            </h4>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-end mb-2">
                <AddressDisplay
                  address={deal.seller}
                  showCopy={false}
                  showExternalLink={false}
                />
                <span className="text-lg font-bold text-gray-900">
                  {formatAmount(sellerPayout, 6)} USDC
                </span>
              </div>
              <p className="text-xs text-gray-500">Total received by seller</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Buyer Refund & Yield
            </h4>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-end mb-2">
                <AddressDisplay
                  address={deal.buyer}
                  showCopy={false}
                  showExternalLink={false}
                />
                <span className="text-lg font-bold text-green-600 flex items-center gap-1">
                  {formatAmount(buyerRefund, 6)} USDC
                </span>
              </div>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                Refund + <TrendingUp size={12} className="text-purple-500" />{" "}
                {yieldEarned} USDC yield
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
