import React, { useState } from "react";
import { useChainId } from "wagmi";
import { CheckCircle, AlertTriangle, RefreshCw } from "lucide-react";
import { Button, Spinner } from "@settleone/design-system";
import { useAcceptDelivery, useRequestRevision } from "@settleone/sdk";
import { useRequireWallet } from "../../../hooks/useRequireWallet";
import { formatAmount } from "@settleone/utils";

interface BuyerAcceptancePanelProps {
  deal: any;
}

export function BuyerAcceptancePanel({ deal }: BuyerAcceptancePanelProps) {
  const chainId = useChainId();
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const { acceptDelivery } = useAcceptDelivery(chainId);
  const { requestRevision } = useRequestRevision(chainId);
  const { requireWallet, WalletPromptModal } = useRequireWallet();

  const isFullyFunded = BigInt(deal.depositedFunds) >= BigInt(deal.amount);

  const handleAccept = async () => {
    if (!isFullyFunded) return;
    requireWallet(async () => {
      try {
        setStatus("submitting");
        await acceptDelivery(BigInt(deal.id));
        setStatus("success");
      } catch (err) {
        console.error("Acceptance failed", err);
        setStatus("error");
      }
    });
  };

  const handleRevision = async () => {
    requireWallet(async () => {
      try {
        setStatus("submitting");
        // Mocking reason hash for now
        const reasonHash =
          "0x1234567890123456789012345678901234567890123456789012345678901234";
        await requestRevision(BigInt(deal.id), reasonHash);
        setStatus("success");
      } catch (err) {
        console.error("Revision request failed", err);
        setStatus("error");
      }
    });
  };

  return (
    <>
      <WalletPromptModal />
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="px-4 py-3 border-b border-[var(--border)] bg-[var(--bg-subtle)] flex items-center gap-2">
          <CheckCircle size={16} className="text-[var(--text-muted)]" />
          <h3 className="font-semibold text-sm text-[var(--text-primary)]">
            Review & Accept
          </h3>
        </div>
        <div className="p-4 space-y-6">
          {!isFullyFunded ? (
            <div className="flex items-start gap-3 p-4 bg-[var(--state-awaiting-funding)]/10 border border-[var(--state-awaiting-funding)]/30 rounded-md text-[var(--text-primary)] text-sm shadow-sm">
              <AlertTriangle
                size={20}
                className="shrink-0 mt-0.5 text-[var(--state-awaiting-funding)]"
              />
              <div>
                <p className="font-semibold mb-1">Funding Required</p>
                <p className="text-[var(--text-secondary)]">
                  The deal is not yet fully funded. You must deposit the
                  remaining{" "}
                  {formatAmount(
                    BigInt(deal.amount) - BigInt(deal.depositedFunds),
                    6,
                  )}{" "}
                  USDC before you can accept the delivery.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3 p-4 bg-[var(--state-active)]/10 border border-[var(--state-active)]/30 rounded-md text-[var(--text-primary)] text-sm shadow-sm">
              <CheckCircle
                size={20}
                className="shrink-0 mt-0.5 text-[var(--state-active)]"
              />
              <div>
                <p className="font-semibold mb-1">Escrow Vault Fully Funded</p>
                <p className="text-[var(--text-secondary)]">
                  Accepting the delivery will immediately release the funds to
                  the seller and return any accrued yield to you according to
                  the settlement rules.
                </p>
              </div>
            </div>
          )}

          {status === "success" ? (
            <div className="bg-[var(--state-active)]/10 p-4 rounded-md border border-[var(--state-active)]/30 text-[var(--state-active)] text-sm font-medium text-center shadow-sm">
              Action submitted successfully! The deal state will update shortly.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={handleAccept}
                disabled={!isFullyFunded || status === "submitting"}
                className={`border rounded-lg p-4 text-center transition-colors bg-[var(--bg-card)] ${
                  !isFullyFunded
                    ? "border-[var(--border)] opacity-50 cursor-not-allowed"
                    : "border-[var(--border)] hover:border-[var(--state-active)] hover:bg-[var(--state-active)]/10"
                }`}
              >
                {status === "submitting" ? (
                  <Spinner size="sm" className="mx-auto mb-2" />
                ) : (
                  <CheckCircle
                    size={24}
                    className={`${!isFullyFunded ? "text-[var(--text-muted)]" : "text-[var(--state-active)]"} mx-auto mb-2`}
                  />
                )}
                <h4 className="font-semibold text-[var(--text-primary)]">
                  Accept Delivery
                </h4>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Release funds to seller and finalize the deal.
                </p>
              </button>

              <button
                onClick={handleRevision}
                disabled={status === "submitting"}
                className="border border-[var(--border)] bg-[var(--bg-card)] rounded-lg p-4 text-center hover:border-[var(--state-awaiting-funding)] hover:bg-[var(--state-awaiting-funding)]/10 transition-colors"
              >
                {status === "submitting" ? (
                  <Spinner size="sm" className="mx-auto mb-2" />
                ) : (
                  <RefreshCw
                    size={24}
                    className="text-[var(--state-awaiting-funding)] mx-auto mb-2"
                  />
                )}
                <h4 className="font-semibold text-[var(--text-primary)]">
                  Request Revision
                </h4>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Send the delivery back to the seller for changes.
                </p>
              </button>

              <div className="border border-[var(--border)] bg-[var(--bg-card)] rounded-lg p-4 text-center hover:border-[var(--accent-red)] hover:bg-[var(--accent-red)]/10 transition-colors cursor-pointer">
                <AlertTriangle
                  size={24}
                  className="text-[var(--accent-red)] mx-auto mb-2"
                />
                <h4 className="font-semibold text-[var(--text-primary)]">
                  Open Dispute
                </h4>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Escalate to the Dispute Resolver if terms were violated.
                </p>
              </div>
            </div>
          )}

          {status === "error" && (
            <p className="text-xs text-[var(--accent-red)] font-medium text-center">
              Transaction failed. Please check your wallet and try again.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
