import React from 'react';
import { Gavel, CheckCircle2 } from 'lucide-react';
import { cn } from '../../index';

export const VerdictWorkspace = () => {
  return (
    <div className="flex flex-col gap-4 rounded-[12px] border border-[#10B981]/20 bg-[#10B981]/5 p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider flex items-center gap-2">
          <Gavel className="h-4 w-4 text-[#10B981]" />
          Arbitrator Verdict
        </h3>
        <span className="rounded-full bg-[#10B981] px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-widest">
          Final
        </span>
      </div>

      <div className="mt-2 flex flex-col gap-4">
        <div className="rounded-lg bg-white border border-[#E5E7EB] p-4">
          <p className="text-sm text-[#374151] leading-relaxed">
            After reviewing the evidence submitted by both parties, it is clear that the seller fulfilled the core requirements of Annex A. However, the delivery was late by 3 days, causing minor delays for the buyer. 
            <br /><br />
            Therefore, I am ruling a 90/10 split in favor of the seller to account for the delay penalty stipulated in the contract.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Final Distribution</span>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-white border border-[#E5E7EB] p-3 flex flex-col items-center justify-center">
              <span className="text-xs text-[#6B7280]">Seller (90%)</span>
              <span className="text-lg font-black text-[#111827]">4,500 USDC</span>
            </div>
            <div className="rounded-lg bg-white border border-[#E5E7EB] p-3 flex flex-col items-center justify-center">
              <span className="text-xs text-[#6B7280]">Buyer (10%)</span>
              <span className="text-lg font-black text-[#111827]">500 USDC</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-[#10B981] mt-2">
          <CheckCircle2 className="h-4 w-4" />
          Funds have been automatically released according to this verdict.
        </div>
      </div>
    </div>
  );
};
