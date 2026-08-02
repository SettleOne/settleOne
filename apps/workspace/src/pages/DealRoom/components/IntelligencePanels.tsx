import React from "react";
import {
  Avatar,
  AddressDisplay,
  CountdownTimer,
} from "@settleone/design-system";
import { DollarSign, ShieldAlert, Users, TrendingUp } from "lucide-react";
import {
  formatAmount,
  formatTimestamp,
  formatRelativeTime,
} from "@settleone/utils";

interface IntelligencePanelsProps {
  deal: any;
}

export function IntelligencePanels({ deal }: IntelligencePanelsProps) {
  // Mock yield for now - in production this would come from vault.balanceOf
  const estimatedYield = 12.4;

  return (
    <div className="space-y-6 w-full shrink-0">
      {/* Financial Overview */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--border)] bg-[var(--bg-subtle)] flex items-center gap-2">
          <DollarSign size={16} className="text-[var(--text-muted)]" />
          <h3 className="font-semibold text-sm text-[var(--text-primary)]">Deal Economics</h3>
        </div>
        <div className="p-4 space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-[var(--text-secondary)]">Total Amount:</span>
            <span className="font-bold text-[var(--text-primary)]">
              {formatAmount(deal.amount, 6)} USDC
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[var(--text-secondary)]">Deposited:</span>
            <span className="font-medium text-[var(--accent-green)]">
              {formatAmount(deal.depositedFunds, 6)} USDC
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[var(--text-secondary)]">Remaining:</span>
            <span className="font-medium text-[var(--text-primary)]">
              {formatAmount(
                BigInt(deal.amount) - BigInt(deal.depositedFunds),
                6,
              )}{" "}
              USDC
            </span>
          </div>
          <div className="pt-3 mt-3 border-t border-[var(--border)] border-dashed">
            <div className="flex justify-between items-center">
              <span className="text-[var(--text-secondary)] flex items-center gap-1">
                <TrendingUp size={14} className="text-[var(--accent-purple)]" />{" "}
                Est. Yield:
              </span>
              <span className="font-medium text-[var(--accent-purple)]">
                +{estimatedYield} USDC
              </span>
            </div>
            <div className="flex justify-between items-center mt-1 text-xs">
              <span className="text-[var(--text-muted)]">Buyer Share:</span>
              <span className="text-[var(--text-muted)]">85%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Tracker */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--border)] bg-[var(--bg-subtle)] flex items-center gap-2">
          <ShieldAlert size={16} className="text-[var(--text-muted)]" />
          <h3 className="font-semibold text-sm text-[var(--text-primary)]">Key Deadlines</h3>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[var(--text-secondary)]">Delivery Due</span>
            </div>
            <div className="text-sm font-medium text-[var(--text-primary)]">
              {deal.deliveryDeadline > 0
                ? formatTimestamp(deal.deliveryDeadline)
                : "No deadline set"}
            </div>
          </div>
          {deal.deliveryDeadline > 0 && (
            <div className="pt-2">
              <CountdownTimer deadline={Number(deal.deliveryDeadline)} />
            </div>
          )}
        </div>
      </div>

      {/* Parties Involved */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--border)] bg-[var(--bg-subtle)] flex items-center gap-2">
          <Users size={16} className="text-[var(--text-muted)]" />
          <h3 className="font-semibold text-sm text-[var(--text-primary)]">Participants</h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-start gap-3">
            <Avatar initials="B" size="sm" />
            <div>
              <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-0.5">
                Buyer
              </p>
              <AddressDisplay address={deal.buyer} copyable showExternalLink />
            </div>
          </div>

          <div className="flex items-start gap-3 pt-3 border-t border-[var(--border)]">
            <Avatar initials="S" size="sm" />
            <div>
              <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-0.5">
                Seller
              </p>
              {deal.seller === "0x0000000000000000000000000000000000000000" ? (
                <>
                  <p className="text-sm font-medium italic text-[var(--text-muted)] mb-1">
                    Open Marketplace
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">Any seller can accept</p>
                </>
              ) : (
                <AddressDisplay
                  address={deal.seller}
                  copyable
                  showExternalLink
                />
              )}
            </div>
          </div>

          <div className="flex items-start gap-3 pt-3 border-t border-[var(--border)]">
            <div className="w-8 flex justify-center text-[var(--text-muted)]">
              <ShieldAlert size={18} />
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-0.5">
                Verifier
              </p>
              <AddressDisplay address={deal.verifier} copyable size="sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
