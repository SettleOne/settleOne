import React from 'react';
import { PieChart, ArrowUpRight } from 'lucide-react';
import { cn } from '../../index';

const yieldData = [
  { deal: 'Deal #125', counterparty: 'AlphaDev Solutions', yield: 142.20, tvl: 15000 },
  { deal: 'Deal #124', counterparty: 'DesignStudio LLC', yield: 84.50, tvl: 8500 },
  { deal: 'Deal #122', counterparty: 'MarketingPro Inc', yield: 24.90, tvl: 2500 },
  { deal: 'Deal #119', counterparty: 'Acme Corp', yield: 18.12, tvl: 1800 },
];

export const YieldAttribution = () => {
  return (
    <div className="flex flex-col gap-4 rounded-[12px] border border-[#E5E7EB] bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider flex items-center gap-2">
          <PieChart className="h-4 w-4 text-[#6B7280]" />
          Yield Attribution
        </h3>
        <button className="text-xs font-bold text-[#3B82F6] hover:underline uppercase tracking-wider">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {yieldData.map((item, i) => (
          <div key={i} className="flex items-center justify-between group cursor-pointer p-2 -mx-2 rounded hover:bg-[#FAFAFA] transition-colors">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-bold text-[#111827] group-hover:text-[#3B82F6] transition-colors">{item.deal}</span>
              <span className="text-xs text-[#6B7280]">{item.counterparty}</span>
            </div>
            <div className="flex flex-col items-end gap-0.5">
              <span className="text-sm font-bold text-[#10B981] flex items-center gap-1">
                +${item.yield.toFixed(2)} <ArrowUpRight className="h-3 w-3" />
              </span>
              <span className="text-[10px] text-[#6B7280] uppercase tracking-wider">from ${item.tvl.toLocaleString()} locked</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
