import React from "react";
import { AlertCircle, Scale } from "lucide-react";

export function DisputeTab({ deal }: { deal: any }) {
  if (deal?.state !== "Disputed") {
    return (
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
        <AlertCircle size={32} className="text-[var(--text-muted)] mb-4" />
        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">No Active Dispute</h2>
        <p className="text-sm text-[var(--text-secondary)] max-w-md">
          This deal currently has no open dispute.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--accent-red)]/30 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-[var(--accent-red)]/10 text-[var(--accent-red)] rounded-full flex items-center justify-center">
          <Scale size={20} />
        </div>
        <h2 className="text-lg font-bold text-[var(--text-primary)]">Dispute Open</h2>
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-[var(--text-muted)]">Status</h3>
          <p className="text-[var(--accent-red)] mt-1 font-semibold">Awaiting Arbitrator Review</p>
        </div>
      </div>
    </div>
  );
}
