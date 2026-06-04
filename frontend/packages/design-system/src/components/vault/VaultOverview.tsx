import React from 'react';
import { Wallet, TrendingUp, Lock, ArrowUpRight } from 'lucide-react';
import { cn } from '../../index';

export const VaultOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* TVL */}
      <div className="flex flex-col gap-2 rounded-[12px] border border-[#E5E7EB] bg-white p-6 shadow-sm">
        <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider flex items-center gap-1">
          <Lock className="h-3 w-3" /> Total Escrow TVL
        </span>
        <div className="flex items-baseline gap-1 mt-2">
          <span className="text-3xl font-black text-[#111827]">$142,500</span>
          <span className="text-sm font-medium text-[#6B7280]">USDC</span>
        </div>
        <span className="text-xs text-[#10B981] font-medium flex items-center gap-1 mt-2">
          <ArrowUpRight className="h-3 w-3" /> +$12,000 this month
        </span>
      </div>

      {/* Total Yield Generated */}
      <div className="flex flex-col gap-2 rounded-[12px] border border-[#10B981]/20 bg-[#10B981]/5 p-6 shadow-sm">
        <span className="text-[10px] font-bold text-[#10B981] uppercase tracking-wider flex items-center gap-1">
          <TrendingUp className="h-3 w-3" /> Total Yield Generated
        </span>
        <div className="flex items-baseline gap-1 mt-2">
          <span className="text-3xl font-black text-[#10B981]">$3,420.50</span>
          <span className="text-sm font-medium text-[#10B981]/70">USDC</span>
        </div>
        <span className="text-xs text-[#10B981] font-medium flex items-center gap-1 mt-2">
          <ArrowUpRight className="h-3 w-3" /> +$450.20 this month
        </span>
      </div>

      {/* Buyer Earnings */}
      <div className="flex flex-col gap-2 rounded-[12px] border border-[#E5E7EB] bg-white p-6 shadow-sm">
        <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider flex items-center gap-1">
          <Wallet className="h-3 w-3" /> Buyer Earnings (80%)
        </span>
        <div className="flex items-baseline gap-1 mt-2">
          <span className="text-3xl font-black text-[#111827]">$2,736.40</span>
          <span className="text-sm font-medium text-[#6B7280]">USDC</span>
        </div>
      </div>

      {/* Platform Earnings */}
      <div className="flex flex-col gap-2 rounded-[12px] border border-[#E5E7EB] bg-[#111827] text-white p-6 shadow-sm">
        <span className="text-[10px] font-bold text-white/70 uppercase tracking-wider flex items-center gap-1">
          <Wallet className="h-3 w-3" /> Platform Earnings (20%)
        </span>
        <div className="flex items-baseline gap-1 mt-2">
          <span className="text-3xl font-black text-white">$684.10</span>
          <span className="text-sm font-medium text-white/70">USDC</span>
        </div>
      </div>
    </div>
  );
};
