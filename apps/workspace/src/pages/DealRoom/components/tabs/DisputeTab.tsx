import React from "react";
import { Handshake, Scale, CheckCircle, Clock, ShieldCheck } from "lucide-react";

export function DisputeTab({ deal }: { deal: any }) {
  const activeDispute = deal?.disputes?.find((d: any) => d.status !== "Cancelled") || deal?.disputes?.[0];
  const verdict = deal?.verdicts?.[0];

  if (!activeDispute) {
    return (
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-8 shadow-sm flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-[var(--bg-subtle)] rounded-full flex items-center justify-center mb-4">
          <Handshake size={28} className="text-[var(--accent-green)]" />
        </div>
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">No Active Dispute</h2>
        <p className="text-sm text-[var(--text-secondary)] max-w-md">
          This deal is proceeding smoothly. No disputes have been filed by either party.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-[var(--bg-card)] border border-[var(--accent-red)]/30 rounded-xl p-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-[var(--accent-red)]" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[var(--accent-red)]/10 text-[var(--accent-red)] rounded-full flex items-center justify-center shrink-0">
              <Scale size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[var(--text-primary)]">Dispute Case</h2>
              <p className="text-xs text-[var(--text-muted)] font-mono">{activeDispute.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
              <Clock size={12} />
              Opened: {new Date(activeDispute.openedAt || activeDispute.createdAt).toLocaleDateString()}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              activeDispute.status === "Open" ? "bg-[var(--accent-red)]/20 text-[var(--accent-red)]" : "bg-[var(--accent-green)]/20 text-[var(--accent-green)]"
            }`}>
              {activeDispute.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-[var(--text-muted)] mb-1">Title & Category</h3>
            <p className="text-[var(--text-primary)] font-medium text-base">
              {activeDispute.title || "No Title"} 
              <span className="ml-2 text-xs bg-[var(--bg-subtle)] px-2 py-1 rounded font-normal text-[var(--text-muted)]">
                {activeDispute.category || "General"}
              </span>
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-muted)] mb-1">Opened By</h3>
            <p className="text-[var(--text-primary)] font-mono text-sm break-all">{activeDispute.openerAddress || "Unknown"}</p>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-[var(--text-muted)] mb-2">Description</h3>
            <div className="bg-[var(--bg-subtle)] p-4 rounded-lg text-sm text-[var(--text-primary)] whitespace-pre-wrap">
              {activeDispute.description || "No description provided."}
            </div>
          </div>
        </div>

        {/* Cryptographic Proofs section */}
        <div className="border-t border-[var(--border)] pt-4 mt-2">
          <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
            <ShieldCheck size={16} className="text-[var(--accent-blue)]" />
            Cryptographic Integrity
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[var(--bg-base)] border border-[var(--border)] p-3 rounded-lg">
              <span className="text-xs text-[var(--text-muted)] block mb-1">Reason Hash (On-Chain)</span>
              <span className="font-mono text-xs text-[var(--text-primary)] break-all">
                {activeDispute.reasonHash || "Not committed"}
              </span>
            </div>
            <div className="bg-[var(--bg-base)] border border-[var(--border)] p-3 rounded-lg">
              <span className="text-xs text-[var(--text-muted)] block mb-1">Evidence Hash (On-Chain)</span>
              <span className="font-mono text-xs text-[var(--text-primary)] break-all">
                {activeDispute.evidenceHash || "Not committed"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {verdict && (
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <CheckCircle size={20} className="text-[var(--accent-green)]" />
              <h2 className="text-lg font-bold text-[var(--text-primary)]">Arbitrator Verdict</h2>
            </div>
            <span className="text-xs text-[var(--text-muted)] font-mono">
              Resolver: {verdict.resolverAddress?.slice(0, 8)}...
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-[var(--bg-subtle)] p-3 rounded-lg border border-[var(--border)]">
              <span className="text-xs text-[var(--text-muted)] block mb-1">Outcome</span>
              <span className="font-semibold text-[var(--text-primary)]">{verdict.outcome || "Unknown"}</span>
            </div>
            <div className="bg-[var(--bg-subtle)] p-3 rounded-lg border border-[var(--border)]">
              <span className="text-xs text-[var(--text-muted)] block mb-1">Seller Award</span>
              <span className="font-semibold text-[var(--text-primary)]">{verdict.sellerAward?.toString() || "0"}</span>
            </div>
            <div className="bg-[var(--bg-subtle)] p-3 rounded-lg border border-[var(--border)]">
              <span className="text-xs text-[var(--text-muted)] block mb-1">Buyer Award</span>
              <span className="font-semibold text-[var(--text-primary)]">{verdict.buyerAward?.toString() || "0"}</span>
            </div>
            <div className="bg-[var(--bg-subtle)] p-3 rounded-lg border border-[var(--border)]">
              <span className="text-xs text-[var(--text-muted)] block mb-1">Resolution Hash</span>
              <span className="font-semibold text-[var(--text-primary)] font-mono truncate block" title={verdict.resolutionHash}>
                {verdict.resolutionHash ? verdict.resolutionHash.slice(0, 10) + '...' : "None"}
              </span>
            </div>
          </div>
          {verdict.notes && (
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-muted)] mb-2">Resolver Notes</h3>
              <p className="text-sm text-[var(--text-secondary)] bg-[var(--bg-base)] border border-[var(--border)] p-4 rounded-lg whitespace-pre-wrap">
                {verdict.notes}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
