import React from "react";

export function EvidenceTab({ deal }: { deal: any }) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">Evidence Room</h2>
      <p className="text-sm text-[var(--text-secondary)] mb-4">
        All encrypted files and evidence associated with this deal are stored here.
      </p>
      {(!deal?.files || deal.files.length === 0) ? (
        <div className="bg-[var(--bg-subtle)] border border-[var(--border)] rounded-lg p-6 text-center text-[var(--text-muted)]">
          No evidence files have been uploaded yet.
        </div>
      ) : (
        <div className="space-y-2">
          {deal.files.map((file: any, i: number) => (
            <div key={i} className="flex justify-between items-center p-3 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-lg">
              <span className="text-sm font-mono text-[var(--text-primary)]">{file.originalName || "evidence_file"}</span>
              <span className="text-xs px-2 py-1 bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] rounded">Verified</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
