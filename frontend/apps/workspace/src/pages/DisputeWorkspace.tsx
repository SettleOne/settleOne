import React from 'react';
import { 
  CaseHeader, 
  NegotiationWorkspace, 
  SettlementProposals,
  VerdictWorkspace,
  EvidenceExplorer
} from '@settleone/design-system';

export const DisputeWorkspace = () => {
  return (
    <div className="flex flex-col gap-6 p-2 md:p-6 max-w-7xl mx-auto">
      <CaseHeader 
        caseId="CASE-9A21"
        dealId="DEL-8F92A"
        title="Delivery quality does not match specification"
        status="Negotiation"
        filedDate="Oct 16, 2026"
        disputedAmount="5,000"
        tokenSymbol="USDC"
      />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:items-start">
        {/* Left/Center Column - 7 cols */}
        <div className="xl:col-span-7 flex flex-col gap-6">
          <NegotiationWorkspace />
          
          <div className="rounded-[12px] border border-[#E5E7EB] bg-white p-6 shadow-sm">
            <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider mb-4">Evidence Matrix</h3>
            <EvidenceExplorer />
          </div>
        </div>

        {/* Right Column - 5 cols */}
        <div className="xl:col-span-5 flex flex-col gap-6">
          <SettlementProposals />
          {/* <VerdictWorkspace /> */}
          <div className="rounded-[12px] border border-[#E5E7EB] bg-[#FAFAFA] p-6 text-center text-sm text-[#6B7280]">
            Arbitration will become available if negotiation fails.
          </div>
        </div>
      </div>
    </div>
  );
};
