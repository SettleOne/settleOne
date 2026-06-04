import React from 'react';
import { DealState } from '@settleone/types';
import { Lock, TrendingUp, Wallet } from 'lucide-react';

interface EscrowYieldPanelProps {
  amount: string;
  tokenSymbol: string;
  yieldGenerated: string;
}

export const EscrowYieldPanel = ({ amount, tokenSymbol, yieldGenerated }: EscrowYieldPanelProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-[12px] border border-[#E5E7EB] bg-white p-6 shadow-sm">
      <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider flex items-center gap-2">
        <Lock className="h-4 w-4 text-[#6B7280]" />
        Escrow Status
      </h3>
      
      <div className="flex flex-col gap-6">
        <div>
          <span className="text-xs text-[#6B7280]">Principal Locked</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold text-[#111827]">{amount}</span>
            <span className="text-sm font-medium text-[#6B7280]">{tokenSymbol}</span>
          </div>
        </div>

        <div className="rounded-[8px] bg-[#10B981]/5 p-4 border border-[#10B981]/20">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-[#10B981]" />
            <span className="text-xs font-bold text-[#10B981] uppercase tracking-wider">Current Yield</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-[#10B981]">+{yieldGenerated}</span>
            <span className="text-sm font-medium text-[#10B981]/70">{tokenSymbol}</span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-4 border-t border-[#10B981]/20 pt-3">
            <div>
              <span className="text-[10px] text-[#10B981]/70 block">Buyer Share (80%)</span>
              <span className="text-sm font-bold text-[#10B981]">0.08 {tokenSymbol}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#10B981]/70 block">Platform Share (20%)</span>
              <span className="text-sm font-bold text-[#10B981]">0.02 {tokenSymbol}</span>
            </div>
          </div>
        </div>

        <div>
          <span className="text-xs text-[#6B7280] flex items-center gap-1">
            <Wallet className="h-3 w-3" /> Projected Settlement
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl font-bold text-[#111827]">5,000.08</span>
            <span className="text-sm font-medium text-[#6B7280]">{tokenSymbol}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
