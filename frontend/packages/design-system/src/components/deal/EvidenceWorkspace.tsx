import React from 'react';
import { ShieldCheck, Search, Filter } from 'lucide-react';

export const EvidenceWorkspace = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-[#6B7280]" />
          Evidence Locker
        </h3>
        <div className="flex items-center gap-2">
          <button className="rounded-md p-1.5 text-[#6B7280] hover:bg-[#FAFAFA] hover:text-[#111827]">
            <Search className="h-4 w-4" />
          </button>
          <button className="rounded-md p-1.5 text-[#6B7280] hover:bg-[#FAFAFA] hover:text-[#111827]">
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Evidence Card 1 */}
        <div className="flex flex-col gap-3 rounded-[12px] border border-[#E5E7EB] bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-[#10B981]/10 flex items-center justify-center">
                <ShieldCheck className="h-4 w-4 text-[#10B981]" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#111827]">Signed Contract</span>
                <span className="text-xs text-[#6B7280]">By System</span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-[#6B7280] bg-[#FAFAFA] px-2 py-1 rounded">0x1a...f9c2</span>
          </div>
          <div className="text-xs text-[#6B7280]">Verified • Nov 12, 10:00 AM</div>
        </div>

        {/* Evidence Card 2 */}
        <div className="flex flex-col gap-3 rounded-[12px] border border-[#E5E7EB] bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-[#FAFAFA] border border-[#E5E7EB] flex items-center justify-center">
                <span className="text-xs font-bold text-[#6B7280]">PDF</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#111827]">Invoice_001.pdf</span>
                <span className="text-xs text-[#6B7280]">By Seller</span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-[#6B7280] bg-[#FAFAFA] px-2 py-1 rounded">0x8b...2d1e</span>
          </div>
          <div className="text-xs text-[#6B7280]">Uploaded • Nov 14, 2:30 PM</div>
        </div>
      </div>
    </div>
  );
};
