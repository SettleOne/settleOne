import React from 'react';
import { Layers } from 'lucide-react';

export const StrategyAllocation = () => {
  return (
    <div className="flex flex-col gap-4 rounded-[12px] border border-[#E5E7EB] bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider flex items-center gap-2">
          <Layers className="h-4 w-4 text-[#6B7280]" />
          Strategy Allocation
        </h3>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-bold text-[#111827]">Aave V3 (USDC)</span>
            <span className="font-medium text-[#6B7280]">65%</span>
          </div>
          <div className="h-2 w-full bg-[#FAFAFA] rounded-full overflow-hidden">
            <div className="h-full bg-[#111827] w-[65%]" />
          </div>
          <span className="text-[10px] text-[#6B7280] uppercase tracking-wider">Current APY: 4.2%</span>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-bold text-[#111827]">Compound V3 (USDC)</span>
            <span className="font-medium text-[#6B7280]">35%</span>
          </div>
          <div className="h-2 w-full bg-[#FAFAFA] rounded-full overflow-hidden">
            <div className="h-full bg-[#3B82F6] w-[35%]" />
          </div>
          <span className="text-[10px] text-[#6B7280] uppercase tracking-wider">Current APY: 3.8%</span>
        </div>
      </div>
    </div>
  );
};
