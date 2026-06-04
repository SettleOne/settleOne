import React from 'react';
import { 
  DealHeader, 
  StatusBanner, 
  NegotiationWorkspace,
  CounterpartyCard,
  DealAlerts
} from '@settleone/design-system';
import { DealState } from '@settleone/types';
import { ShieldCheck, Info, FileText } from 'lucide-react';

export const NegotiationRoom = () => {
  const mockDeal = {
    id: 'DEL-8F92A',
    contractId: '0x123...abc',
    title: 'Website Redesign & Frontend Development',
    description: 'Complete overhaul of the marketing website using React and Tailwind CSS.',
    buyerAddress: '0x1234567890abcdef1234567890abcdef12345678',
    sellerAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
    amount: '5,000',
    tokenSymbol: 'USDC',
    state: DealState.Negotiation,
    createdAt: Date.now() - 3600000,
    deliveryDeadline: Date.now() + 86400000 * 10,
    acceptanceWindow: 86400000 * 2,
    disputeWindow: 86400000 * 3,
    yieldGenerated: '0'
  };

  return (
    <div className="flex flex-col gap-6">
      <DealHeader deal={mockDeal} />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:items-start px-4 md:px-8 pb-12">
        {/* Left Column: Negotiation context & Counterparty (4 cols) */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          <CounterpartyCard 
            name="AlphaDev Solutions"
            role="SELLER"
            verified={true}
            completedDeals={42}
            successRate="98%"
            avgSettlementTime="4.2 Days"
            memberSince="Jan 2024"
          />

          <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
            <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Info className="h-4 w-4 text-[#6B7280]" />
              Negotiation Terms
            </h3>
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">Target Deadline</span>
                <span className="text-sm font-bold text-[#111827]">Oct 30, 2026</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">Escrow Strategy</span>
                <span className="text-sm font-bold text-[#111827]">High-Yield (Aave V3)</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">Deliverable Type</span>
                <span className="text-sm font-bold text-[#111827]">Digital (GitHub Repo)</span>
              </div>
            </div>
          </div>

          <DealAlerts alerts={[
            { id: '1', type: 'info', message: 'The seller is currently reviewing the proposal.', timestamp: 'JUST NOW' }
          ]} />
        </div>

        {/* Center/Main Column: Negotiation Chat (8 cols) */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          <div className="bg-[#3B82F6]/5 border border-[#3B82F6]/20 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[#3B82F6]/10 flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-[#3B82F6]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#111827]">Negotiation Room Active</p>
                <p className="text-xs text-[#6B7280]">Discuss requirements before final commitment.</p>
              </div>
            </div>
            <button className="rounded-lg bg-[#111827] px-6 py-2 text-sm font-bold text-white hover:bg-[#111827]/90 transition-all">
              Finalize & Accept
            </button>
          </div>

          <NegotiationWorkspace />

          <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
            <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4 text-[#6B7280]" />
              Shared Drafts
            </h3>
            <div className="border-2 border-dashed border-[#E5E7EB] rounded-xl p-8 text-center">
              <p className="text-sm text-[#6B7280]">No shared documents yet. Upload a draft specification to begin.</p>
              <button className="mt-4 text-sm font-bold text-[#3B82F6] hover:underline">Upload Specification</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
