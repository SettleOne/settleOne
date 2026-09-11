import React from "react";

export function TermsTab({ deal }: { deal: any }) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">Terms & Verification</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-[var(--text-muted)]">Terms</h3>
          <p className="text-[var(--text-primary)] mt-1">{deal?.termsText || "No additional terms specified."}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[var(--text-muted)]">Seller Specifications</h3>
          <p className="text-[var(--text-primary)] mt-1">{deal?.sellerSpecifications || "No specifications provided."}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[var(--text-muted)]">Evidence Requirements</h3>
          <p className="text-[var(--text-primary)] mt-1">{deal?.evidenceRequirements || "Standard requirements."}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[var(--text-muted)]">Settlement Rules</h3>
          <p className="text-[var(--text-primary)] mt-1">{deal?.settlementRules || "Standard arbitration rules apply."}</p>
        </div>
      </div>
    </div>
  );
}
