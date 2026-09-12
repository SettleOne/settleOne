import React from "react";
import { CheckCircle2, Clock } from "lucide-react";

export function OverviewTab({ deal }: { deal: any }) {
  const formatSecsToDays = (secs: number) =>
    secs ? `${secs / 86400} Days` : "N/A";

  const renderTimestampRow = (label: string, dateStr?: string) => {
    if (!dateStr) return null;
    return (
      <div className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-[var(--accent-green)]" />
          <span className="text-sm font-medium text-[var(--text-primary)]">
            {label}
          </span>
        </div>
        <span className="text-sm font-mono text-[var(--text-muted)]">
          {new Date(dateStr).toLocaleString()}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">
          Deal Overview
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-muted)]">
              Description
            </h3>
            <p className="text-[var(--text-primary)] mt-1">
              {deal?.description || "No description provided."}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-muted)]">
                Deal Type
              </h3>
              <p className="text-[var(--text-primary)] mt-1">
                {deal?.dealType === "SoftDelivery" ? "Software" : "Hardware"}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-muted)]">
                Category
              </h3>
              <p className="text-[var(--text-primary)] mt-1">
                {deal?.category || "Uncategorized"}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-muted)]">
                Partial Settlement
              </h3>
              <p className="text-[var(--text-primary)] mt-1">
                {deal?.partialSettlementAllowed ? "Allowed" : "Not Allowed"}
              </p>
            </div>
            {deal?.fundingType === "staged" && (
              <div>
                <h3 className="text-sm font-semibold text-[var(--text-muted)]">
                  Funding Stage
                </h3>
                <p className="text-[var(--text-primary)] mt-1">
                  Stage {deal?.fundingStage || 0}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Clock size={18} className="text-[var(--accent-blue)]" />
            Milestone Windows
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-[var(--border)]">
              <span className="text-sm font-medium text-[var(--text-muted)]">
                Seller Acceptance Window
              </span>
              <span className="text-sm text-[var(--text-primary)]">
                {formatSecsToDays(deal?.sellerAcceptanceWindowSecs)}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-[var(--border)]">
              <span className="text-sm font-medium text-[var(--text-muted)]">
                Buyer Review Window
              </span>
              <span className="text-sm text-[var(--text-primary)]">
                {formatSecsToDays(deal?.acceptanceWindowSecs)}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-[var(--border)] last:border-0">
              <span className="text-sm font-medium text-[var(--text-muted)]">
                Dispute Window
              </span>
              <span className="text-sm text-[var(--text-primary)]">
                {formatSecsToDays(deal?.disputeWindowSecs)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">
            Lifecycle Audit Trail
          </h2>
          <div className="bg-[var(--bg-subtle)] border border-[var(--border)] rounded-lg px-4 py-2">
            {renderTimestampRow("Deal Created", deal?.createdAt)}
            {renderTimestampRow("Deal Funded", deal?.fundedAt)}
            {renderTimestampRow("Seller Accepted", deal?.sellerAcceptedAt)}
            {renderTimestampRow(
              "Delivery Submitted",
              deal?.deliverySubmittedAt,
            )}
            {renderTimestampRow("Delivery Verified", deal?.deliveryVerifiedAt)}
            {renderTimestampRow("Buyer Accepted", deal?.acceptedAt)}
            {renderTimestampRow("Deal Finalized", deal?.finalizedAt)}

            {!deal?.fundedAt &&
              !deal?.sellerAcceptedAt &&
              !deal?.deliverySubmittedAt && (
                <div className="py-4 text-center text-sm text-[var(--text-muted)] italic">
                  Waiting for next lifecycle event...
                </div>
              )}
          </div>
          {deal?.createdAtBlock && (
            <div className="mt-4 flex justify-between items-center text-xs text-[var(--text-muted)] px-1">
              <span>On-Chain Creation Block:</span>
              <span className="font-mono bg-[var(--bg-subtle)] px-2 py-1 rounded border border-[var(--border)]">
                {deal.createdAtBlock.toString()}
              </span>
            </div>
          )}
        </div>
      </div>

      {deal?.settlementPayout && (
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">
            Settlement Payout
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-muted)]">
                Seller Principal
              </h3>
              <p className="text-[var(--text-primary)] mt-1">
                {deal.settlementPayout.sellerPrincipal?.toString()}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-muted)]">
                Buyer Principal (Refund)
              </h3>
              <p className="text-[var(--text-primary)] mt-1">
                {deal.settlementPayout.buyerPrincipal?.toString()}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-muted)]">
                Platform Yield
              </h3>
              <p className="text-[var(--text-primary)] mt-1">
                {deal.settlementPayout.platformYield?.toString()}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-muted)]">
                Transaction Hash
              </h3>
              <p className="text-[var(--accent-blue)] mt-1 font-mono text-xs break-all">
                {deal.settlementPayout.txHash}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
