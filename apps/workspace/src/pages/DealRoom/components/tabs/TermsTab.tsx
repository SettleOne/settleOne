import React from "react";
import { CheckCircle } from "lucide-react";

function HashRow({ label, hash }: { label: string, hash?: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-[var(--border)] last:border-0 gap-2">
      <span className="text-sm font-semibold text-[var(--text-muted)]">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono text-[var(--text-primary)] bg-[var(--bg-subtle)] px-2 py-1 rounded break-all max-w-[200px] sm:max-w-none">
          {hash || "Pending on-chain commit"}
        </span>
        {hash && <CheckCircle size={14} className="text-[var(--accent-green)] shrink-0" />}
      </div>
    </div>
  );
}

export function TermsTab({ deal }: { deal: any }) {
  return (
    <div className="space-y-6">
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">Terms & Specifications</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-muted)] mb-2">Terms</h3>
            <div className="bg-[var(--bg-subtle)] p-4 rounded-lg text-sm text-[var(--text-primary)] whitespace-pre-wrap">
              {deal?.metadata?.termsContent || deal?.termsText || "No additional terms specified."}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-muted)] mb-2">Seller Specifications</h3>
            <div className="bg-[var(--bg-subtle)] p-4 rounded-lg text-sm text-[var(--text-primary)] whitespace-pre-wrap">
              {deal?.metadata?.sellerSpecifications || deal?.sellerSpecifications || "No specifications provided."}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-muted)] mb-2">Evidence Requirements</h3>
            <div className="bg-[var(--bg-subtle)] p-4 rounded-lg text-sm text-[var(--text-primary)] whitespace-pre-wrap">
              {deal?.metadata?.evidenceRequirements || deal?.evidenceRequirements || "Standard requirements."}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-muted)] mb-2">Settlement Rules</h3>
            <div className="bg-[var(--bg-subtle)] p-4 rounded-lg text-sm text-[var(--text-primary)] whitespace-pre-wrap">
              {deal?.metadata?.settlementRules || deal?.settlementRules || "Standard arbitration rules apply."}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">Cryptographic Integrity</h2>
        <p className="text-sm text-[var(--text-secondary)] mb-4">
          These hashes represent the immutable state of the deal terms committed to the blockchain.
        </p>
        <div className="bg-[var(--bg-base)] border border-[var(--border)] rounded-lg px-4">
          <HashRow label="Deal Metadata Hash" hash={deal?.metadataHash} />
          <HashRow label="Terms Hash" hash={deal?.termsHash} />
          <HashRow label="Evidence Requirements Hash" hash={deal?.evidenceRequirementsHash} />
          <HashRow label="Settlement Rules Hash" hash={deal?.settlementRulesHash} />
          <HashRow label="Proof Hash" hash={deal?.proofHash} />
        </div>
      </div>
    </div>
  );
}
