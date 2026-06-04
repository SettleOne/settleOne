import React from 'react';
import { CalendarDays, ArrowRight } from 'lucide-react';

const forecasts = [
  { deal: 'Deal #125', date: 'Oct 20, 2026', principal: 15000, estYield: 145.50 },
  { deal: 'Deal #124', date: 'Oct 22, 2026', principal: 8500, estYield: 88.20 },
  { deal: 'Deal #122', date: 'Oct 25, 2026', principal: 2500, estYield: 26.10 },
];

export const SettlementForecasting = () => {
  return (
    <div className="flex flex-col gap-4 rounded-[12px] border border-[#E5E7EB] bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-[#6B7280]" />
          Settlement Forecasting
        </h3>
      </div>

      <div className="space-y-4">
        {forecasts.map((item, i) => (
          <div key={i} className="flex flex-col gap-2 rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-[#111827]">{item.deal}</span>
              <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider bg-white px-2 py-0.5 rounded border border-[#E5E7EB]">
                {item.date}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-sm mt-2">
              <div className="flex flex-col">
                <span className="text-xs text-[#6B7280]">Principal</span>
                <span className="font-medium text-[#111827]">${item.principal.toLocaleString()}</span>
              </div>
              <ArrowRight className="h-4 w-4 text-[#E5E7EB]" />
              <div className="flex flex-col text-right">
                <span className="text-xs text-[#10B981] font-bold">Est. Total Payout</span>
                <span className="font-black text-[#10B981]">${(item.principal + item.estYield).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
