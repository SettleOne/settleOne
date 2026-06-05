import React from 'react';
import { 
  EvidenceExplorer, 
  EvidenceHashVerifier, 
  EvidenceAuditTrail 
} from '@settleone/design-system';

export const EvidenceCenter = () => {
  return (
    <div className="flex flex-col gap-6 p-2 md:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-[#111827]">Evidence Center</h1>
        <p className="text-sm text-[#6B7280]">
          Manage, verify, and trace cryptographic evidence across all deals and disputes.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <EvidenceExplorer />
        </div>
        <div className="flex flex-col gap-6">
          <EvidenceHashVerifier 
            hash="e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
            txHash="0x8f...21a"
            timestamp="Oct 15, 2026 10:45 AM UTC"
            verifier="SettleOne Oracle"
          />
          <EvidenceAuditTrail />
        </div>
      </div>
    </div>
  );
};
