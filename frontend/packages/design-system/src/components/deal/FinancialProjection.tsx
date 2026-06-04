import React from 'react';
import { TrendingUp, Calculator, Info } from 'lucide-react';

interface FinancialProjectionProps {
  amount: number;
  yieldToday: number;
  projectedYield7d: number;
  platformFeeRate: number;
  tokenSymbol: string;
}

export const FinancialProjection = ({
  amount,
  yieldToday,
  projectedYield7d,
  platformFeeRate,
  tokenSymbol
}: FinancialProjectionProps) => {
  const platformFee = amount * platformFeeRate;
  const sellerNetToday = amount + yieldToday * 0.8;
  const sellerNet7d = amount + projectedYield7d * 0.8;

  return (
    <div className="flex flex-col gap-4 rounded-[12px] border border-[#E5E7EB] bg-white p-6 shadow-sm">
      <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider flex items-center gap-2">
        <Calculator className="h-4 w-4 text-[#6B7280]" />
        Financial Projection Engine
      </h3>

      <div className="space-y-4">
        <div className="rounded-lg bg-[#FAFAFA] border border-[#E5E7EB] p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">If Released Today</span>
            <TrendingUp className="h-4 w-4 text-[#10B981]" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#6B7280]">Principal</span>
              <span className="font-bold text-[#111827]">{amount.toLocaleString()} {tokenSymbol}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#6B7280]">Accumulated Yield (Seller Share)</span>
              <span className="font-bold text-[#10B981]">+{ (yieldToday * 0.8).toFixed(2) } {tokenSymbol}</span>
            </div>
            <div className="flex justify-between border-t border-[#E5E7EB] pt-2 text-base">
              <span className="font-bold text-[#111827]">Total Seller Payout</span>
              <span className="font-black text-[#111827]">{ sellerNetToday.toLocaleString(undefined, { minimumFractionDigits: 2 }) } {tokenSymbol}</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-[#111827] p-4 text-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-white/70 uppercase tracking-wider">Projected in 7 Days</span>
            <Calculator className="h-4 w-4 text-white/50" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Projected Yield</span>
              <span className="font-bold text-[#10B981]">+{ (projectedYield7d * 0.8).toFixed(2) } {tokenSymbol}</span>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-2 text-base">
              <span className="font-bold">Total Est. Payout</span>
              <span className="font-black">{ sellerNet7d.toLocaleString(undefined, { minimumFractionDigits: 2 }) } {tokenSymbol}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-[#6B7280]">
          <Info className="h-3 w-3 shrink-0" />
          <p>Platform fee ({platformFee} {tokenSymbol}) is already accounted for in the principal lock logic.</p>
        </div>
      </div>
    </div>
  );
};
