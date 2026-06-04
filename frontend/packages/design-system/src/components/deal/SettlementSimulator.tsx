import React, { useState } from 'react';
import { Gavel, Info, ChevronRight } from 'lucide-react';
import { cn } from '../../index';

interface SettlementSimulatorProps {
  amount: number;
  yieldGenerated: number;
  tokenSymbol: string;
}

export const SettlementSimulator = ({
  amount,
  yieldGenerated,
  tokenSymbol
}: SettlementSimulatorProps) => {
  const [scenario, setScenario] = useState<'seller-wins' | 'buyer-wins' | 'split-50' | 'split-75'>('seller-wins');

  const scenarios = {
    'seller-wins': { seller: 1, buyer: 0, label: 'Seller Wins (100%)' },
    'buyer-wins': { seller: 0, buyer: 1, label: 'Buyer Wins (100%)' },
    'split-50': { seller: 0.5, buyer: 0.5, label: '50/50 Split' },
    'split-75': { seller: 0.75, buyer: 0.25, label: '75/25 Split' },
  };

  const current = scenarios[scenario];
  const sellerShare = amount * current.seller + yieldGenerated * 0.8 * current.seller;
  const buyerShare = amount * current.buyer + yieldGenerated * 0.8 * current.buyer;
  const platformFee = amount * 0.02; // Mock fee

  return (
    <div className="flex flex-col gap-4 rounded-[12px] border border-[#E5E7EB] bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider flex items-center gap-2">
          <Gavel className="h-4 w-4 text-[#6B7280]" />
          Settlement Simulator
        </h3>
        <span className="rounded-full bg-[#FAFAFA] border border-[#E5E7EB] px-2 py-0.5 text-[10px] font-bold text-[#6B7280]">
          DISPUTE TOOL
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Select Scenario</span>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(scenarios).map(([id, config]) => (
              <button
                key={id}
                onClick={() => setScenario(id as any)}
                className={cn(
                  "rounded-lg border px-3 py-2 text-left text-xs font-bold transition-all",
                  scenario === id 
                    ? "bg-[#111827] border-[#111827] text-white shadow-md" 
                    : "bg-white border-[#E5E7EB] text-[#6B7280] hover:border-[#111827] hover:text-[#111827]"
                )}
              >
                {config.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-[#FAFAFA] border border-[#E5E7EB] p-4 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
            <span className="text-xs font-bold text-[#111827] uppercase tracking-wider">Estimated Distribution</span>
            <span className="text-[10px] text-[#6B7280]">Incl. Yield Share</span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#111827]">Seller Receives</span>
                <span className="text-[10px] text-[#6B7280]">{(current.seller * 100)}% of principal + yield</span>
              </div>
              <span className="text-base font-black text-[#111827]">{sellerShare.toLocaleString()} {tokenSymbol}</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#111827]">Buyer Receives</span>
                <span className="text-[10px] text-[#6B7280]">{(current.buyer * 100)}% of principal + yield</span>
              </div>
              <span className="text-base font-black text-[#111827]">{buyerShare.toLocaleString()} {tokenSymbol}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-[#6B7280] bg-[#FAFAFA] p-2 rounded">
          <Info className="h-3.5 w-3.5 shrink-0" />
          <p>Simulator includes 80% yield share for the winning party as per protocol defaults.</p>
        </div>
      </div>
    </div>
  );
};
