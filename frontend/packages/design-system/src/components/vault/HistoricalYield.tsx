import React from 'react';
import { BarChart3 } from 'lucide-react';

export const HistoricalYield = () => {
  return (
    <div className="flex flex-col gap-4 rounded-[12px] border border-[#E5E7EB] bg-white p-6 shadow-sm min-h-[300px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-[#6B7280]" />
          Historical Yield Performance
        </h3>
        <select className="text-xs font-bold text-[#6B7280] bg-[#FAFAFA] border border-[#E5E7EB] rounded px-2 py-1 outline-none">
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
          <option>Year to Date</option>
        </select>
      </div>

      <div className="flex-1 flex items-end justify-between gap-2 pt-8">
        {/* Placeholder chart bars */}
        {[30, 45, 25, 60, 80, 55, 90, 70, 40, 85, 100, 65].map((height, i) => (
          <div key={i} className="w-full flex flex-col justify-end gap-2 group cursor-pointer">
            <div 
              className="w-full bg-[#10B981]/20 rounded-t group-hover:bg-[#10B981] transition-colors relative"
              style={{ height: `${height}%` }}
            >
              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-[#111827] text-white text-[10px] font-bold px-2 py-1 rounded transition-opacity">
                ${(height * 1.5).toFixed(0)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
