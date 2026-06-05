import React from 'react';
import { History, ExternalLink } from 'lucide-react';
import { cn } from '../../index';

export const ActivityFeed = () => {
  const [view, setView] = React.useState<'all' | 'system'>('all');

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider flex items-center gap-2">
          <History className="h-4 w-4 text-[#6B7280]" />
          Activity Feed
        </h3>
        <div className="flex rounded-md border border-[#E5E7EB] p-0.5 bg-[#FAFAFA]">
          <button 
            onClick={() => setView('all')}
            className={cn(
              "px-2 py-1 text-[10px] font-bold rounded transition-all",
              view === 'all' ? "bg-white text-[#111827] shadow-sm" : "text-[#6B7280]"
            )}
          >
            ALL
          </button>
          <button 
            onClick={() => setView('system')}
            className={cn(
              "px-2 py-1 text-[10px] font-bold rounded transition-all",
              view === 'system' ? "bg-white text-[#111827] shadow-sm" : "text-[#6B7280]"
            )}
          >
            SYSTEM
          </button>
        </div>
      </div>
      
      <div className="relative pl-4 border-l border-[#E5E7EB] ml-2 space-y-6">
        {view === 'all' && (
          <div className="relative">
            <div className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#10B981]" />
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-[#111827]">Delivery Submitted</span>
              <span className="text-xs text-[#6B7280]">By Seller (0xABCD...EF01) • 2 hours ago</span>
              <div className="mt-1 rounded-[8px] bg-[#FAFAFA] border border-[#E5E7EB] p-3 text-sm text-[#111827]">
                Uploaded 2 files to deliverables workspace.
              </div>
            </div>
          </div>
        )}

        <div className="relative">
          <div className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#3B82F6]" />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[#111827]">Deal Accepted</span>
              {view === 'system' && <span className="text-[10px] font-mono text-[#6B7280] bg-[#FAFAFA] px-1.5 py-0.5 rounded border border-[#E5E7EB]">Tx: 0x82f...912</span>}
            </div>
            <span className="text-xs text-[#6B7280]">By Seller (0xABCD...EF01) • 1 day ago</span>
            <a href="#" className="mt-1 flex items-center gap-1 text-xs font-medium text-[#3B82F6] hover:underline">
              View Contract Transaction <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {view === 'system' && (
          <div className="relative">
            <div className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#111827]" />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#111827]">EscrowVault.deposit()</span>
                <span className="text-[10px] font-mono text-[#6B7280] bg-[#FAFAFA] px-1.5 py-0.5 rounded border border-[#E5E7EB]">Block: 128491</span>
              </div>
              <span className="text-xs text-[#6B7280]">System • 1 day ago</span>
            </div>
          </div>
        )}

        <div className="relative">
          <div className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#F59E0B]" />
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-[#111827]">Deal Funded</span>
            <span className="text-xs text-[#6B7280]">By Buyer (0x1234...5678) • 1 day ago</span>
            <span className="text-xs text-[#111827]">Deposited 5,000 USDC into escrow.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
