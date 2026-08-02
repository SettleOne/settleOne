import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAccount, useChainId } from "wagmi";
import { DealState } from "@settleone/types";
import { useGetDeal } from "@settleone/sdk";
import { DealRoomHeader } from "./DealRoom/components/DealRoomHeader";
import { DealLifecycleTimeline } from "./DealRoom/components/DealLifecycleTimeline";
import { IntelligencePanels } from "./DealRoom/components/IntelligencePanels";
import { ActionCenter } from "./DealRoom/components/ActionCenter";
import { DealChatRoom } from "./DealRoom/components/DealChatRoom";
import { SubmittedDeliveriesLog } from "./DealRoom/components/SubmittedDeliveriesLog";
import { ActivityFeed } from "./DealRoom/components/ActivityFeed";
import { DeliveryVerificationPanel } from "./DealRoom/components/DeliveryVerificationPanel";
import { BuyerAcceptancePanel } from "./DealRoom/components/BuyerAcceptancePanel";
import { SettlementSummaryCard } from "./DealRoom/components/SettlementSummaryCard";
import { Tabs, Spinner } from "@settleone/design-system";
import { AlertCircle } from "lucide-react";

// Assuming these components exist or we'll create them if needed.
// For Deal Information Panel, we'll inline it or use tabs.
// DeliverySubmissionSection is part of ActionCenter (or separate).
// DisputeEvidenceLog and VerdictRecord are conditional below.

export function DealRoomPage() {
  const { id } = useParams();
  const chainId = useChainId();
  const { address } = useAccount();

  const dealId = id ? BigInt(id) : undefined;

  const { data: deal, isLoading, error, refetch } = useGetDeal(chainId, dealId);

  const currentState = deal?.state ?? DealState.None;

  const userRole = useMemo(() => {
    if (!deal || !address) return "none";
    if (deal.buyer.toLowerCase() === address.toLowerCase()) return "buyer";
    if (deal.seller.toLowerCase() === address.toLowerCase()) return "seller";
    return "none";
  }, [deal, address]);

  const dealInfoTabs = [
    {
      id: "details",
      label: "Details",
      content: (
        <div className="p-6 bg-[var(--bg-card)] border border-[var(--border)] rounded-lg shadow-sm">
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Deal Details</h3>
          <p className="text-[var(--text-secondary)] mb-4">
            {deal?.metadataHash || "No description provided."}
          </p>
          <div className="prose max-w-none text-sm text-[var(--text-secondary)]">
            <p>
              <strong className="text-[var(--text-primary)]">Deal Type:</strong>{" "}
              {deal?.dealType === 0 ? "Soft Delivery" : "Hard Delivery"}
            </p>
            <p>
              <strong className="text-[var(--text-primary)]">Partial Settlement:</strong>{" "}
              {deal?.partialSettlementAllowed ? "Allowed" : "Not Allowed"}
            </p>
            <p>
              <strong className="text-[var(--text-primary)]">Created At:</strong>{" "}
              {deal?.createdAt ? new Date(Number(deal.createdAt) * 1000).toLocaleString() : "-"}
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "requirements",
      label: "Requirements",
      content: (
        <div className="p-6 bg-[var(--bg-card)] border border-[var(--border)] rounded-lg shadow-sm">
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Evidence Requirements</h3>
          <p className="text-[var(--text-secondary)]">Hash: {deal?.evidenceRequirementsHash || "None"}</p>
          <h3 className="text-lg font-bold text-[var(--text-primary)] mt-6 mb-4">Settlement Rules</h3>
          <p className="text-[var(--text-secondary)]">Hash: {deal?.settlementRulesHash || "None"}</p>
        </div>
      ),
    },
    {
      id: "terms",
      label: "Terms",
      content: (
        <div className="p-6 bg-[var(--bg-card)] border border-[var(--border)] rounded-lg shadow-sm">
          {deal?.termsHash ? (
            <>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Terms document committed on-chain</h3>
              <p className="font-mono text-sm text-[var(--text-muted)] mb-4">{deal.termsHash}</p>
              <button className="px-4 py-2 bg-[var(--bg-subtle)] text-[var(--text-primary)] rounded hover:bg-[var(--bg-hover)] transition-colors">
                Download Terms
              </button>
            </>
          ) : (
            <p className="text-[var(--text-secondary)]">No terms document attached.</p>
          )}
        </div>
      ),
    }
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
        <p className="mt-4 text-[var(--text-muted)] font-medium">Loading Deal Room...</p>
      </div>
    );
  }

  if (error || !deal) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6">
        <div className="w-16 h-16 bg-red-900/20 text-[var(--accent-red)] rounded-full flex items-center justify-center mb-4">
          <AlertCircle size={32} />
        </div>
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">Deal Not Found</h2>
        <p className="text-[var(--text-secondary)] max-w-md mx-auto mb-6">
          We couldn't find the deal you're looking for. It might not exist or
          there was an error fetching it from the blockchain.
        </p>
        <button
          onClick={() => refetch()}
          className="text-[var(--accent-blue)] font-semibold hover:underline"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col -mx-4 md:-mx-6 -mt-4 md:-mt-6">
      <DealRoomHeader deal={deal} />
      
      <div className="overflow-x-auto w-full border-b border-[var(--border)] bg-[var(--bg-card)] pb-4">
        <DealLifecycleTimeline currentState={currentState} />
      </div>

      <div className="max-w-[1400px] w-full mx-auto px-4 md:px-6 py-6">
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Left Column: Intelligence Panels */}
          <div className="w-full xl:w-[280px] shrink-0 space-y-6">
            <IntelligencePanels deal={deal} />
          </div>

          {/* Center Column: Main Workspace */}
          <div className="flex-1 flex flex-col min-w-0 space-y-6">
            <ActionCenter
              currentState={currentState}
              userRole={userRole}
              deal={deal}
            />

            <div className="bg-[var(--bg-card)] rounded-lg shadow-sm border border-[var(--border)] overflow-hidden">
              <Tabs tabs={dealInfoTabs} />
            </div>

            {/* Conditional Panels based on state */}
            {currentState === DealState.DeliverySubmitted && userRole === "buyer" && (
              <>
                <DeliveryVerificationPanel deal={deal} />
                <BuyerAcceptancePanel deal={deal} />
              </>
            )}

            {[DealState.Active, DealState.DeliverySubmitted, DealState.AwaitingAcceptance, DealState.Accepted, DealState.Disputed, DealState.Released, DealState.Settled].includes(currentState) && (
              <SubmittedDeliveriesLog dealId={dealId} />
            )}

            {[DealState.Disputed, DealState.Settled].includes(currentState) && (
              <div className="p-6 bg-[var(--bg-card)] border border-[var(--border)] rounded-lg shadow-sm">
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Dispute Evidence Log</h3>
                <p className="text-[var(--text-muted)]">No dispute evidence submitted yet.</p>
              </div>
            )}

            {[
              DealState.Released,
              DealState.Refunded,
              DealState.Settled,
            ].includes(currentState) && (
              <>
                <SettlementSummaryCard deal={deal} />
                {currentState === DealState.Settled && (
                  <div className="p-6 bg-[var(--bg-card)] border border-[var(--border)] rounded-lg shadow-sm mt-6">
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Verdict Record</h3>
                    <p className="text-[var(--text-muted)]">Verdict details will appear here.</p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Right Column: Activity Feed */}
          <div className="w-full xl:w-[280px] shrink-0">
            <ActivityFeed dealId={dealId} />
          </div>
        </div>

        {/* Bottom: Deal Chat Room */}
        <div className="mt-8">
          <DealChatRoom dealId={dealId} />
        </div>
      </div>
    </div>
  );
}
