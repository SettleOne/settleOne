import React from 'react';
import { Handshake, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '../../index';

export const SettlementProposals = () => {
  return (
    <div className="flex flex-col gap-4 rounded-[12px] border border-[#E5E7EB] bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider flex items-center gap-2">
          <Handshake className="h-4 w-4 text-[#6B7280]" />
          Active Settlement Proposals
        </h3>
      </div>

      <div className="flex flex-col gap-4 mt-2">
        <div className="rounded-lg border border-[#3B82F6]/30 bg-[#3B82F6]/5 p-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#3B82F6]" />
          <div className="flex justify-between items-start mb-4">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-[#3B82F6] uppercase tracking-widest">Proposed by Seller</span>
              <span className="text-lg font-black text-[#111827]">80% Seller / 20% Buyer</span>
            </div>
            <span className="text-[10px] font-bold text-[#6B7280] uppercase">1 Hour Ago</span>
          </div>
          
          <div className="flex items-center gap-4 text-sm font-medium border-t border-[#3B82F6]/20 pt-3">
            <div className="flex flex-col">
              <span className="text-[#6B7280] text-xs">Seller Receives</span>
              <span className="text-[#111827]">4,000 USDC</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#6B7280] text-xs">Buyer Receives</span>
              <span className="text-[#111827]">1,000 USDC</span>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button className="flex-1 rounded-lg bg-[#111827] py-2 text-xs font-bold text-white hover:bg-[#111827]/90">
              Accept Proposal
            </button>
            <button className="flex-1 rounded-lg border border-[#E5E7EB] bg-white py-2 text-xs font-bold text-[#111827] hover:bg-[#FAFAFA]">
              Reject
            </button>
          </div>
        </div>

        <div className="flex items-start gap-2 text-xs text-[#6B7280] bg-[#FAFAFA] p-3 rounded-lg border border-[#E5E7EB]">
          <AlertCircle className="h-4 w-4 text-[#F59E0B] shrink-0" />
          <p>Accepting a proposal resolves the dispute immediately, avoiding arbitration fees and wait times. Escrowed funds will be automatically distributed according to the accepted terms.</p>
        </div>
      </div>
    </div>
  );
};
