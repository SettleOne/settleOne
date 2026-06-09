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

  const tabsData = [
    {
      id: "details",
      label: "Deal Details",
      content: (
        <div className="p-6 bg-white border border-[var(--border)] rounded-lg shadow-sm">
          <h3 className="text-lg font-bold mb-4">Deal Specifications</h3>
          <p className="text-gray-600 mb-4">
            {deal?.metadataHash || "No description provided."}
          </p>
          <div className="prose max-w-none text-sm text-gray-600">
            <p>
              <strong>Deal Type:</strong>{" "}
              {deal?.dealType === 0 ? "Soft Delivery" : "Hard Delivery"}
            </p>
            <p>
              <strong>Partial Settlement:</strong>{" "}
              {deal?.partialSettlementAllowed ? "Allowed" : "Not Allowed"}
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "delivery",
      label: "Deliverables & Evidence",
      content: (
        <div className="space-y-4">
          <SubmittedDeliveriesLog dealId={dealId} />
        </div>
      ),
    },
    {
      id: "chat",
      label: "Deal Chat",
      content: <DealChatRoom dealId={dealId} />,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
        <p className="mt-4 text-gray-500 font-medium">Loading Deal Room...</p>
      </div>
    );
  }

  if (error || !deal) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
          <AlertCircle size={32} />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Deal Not Found</h2>
        <p className="text-gray-500 max-w-md mx-auto mb-6">
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
      <DealLifecycleTimeline currentState={currentState} />

      <div className="max-w-[1200px] w-full mx-auto px-4 md:px-6 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column: Intelligence Panels */}
          <IntelligencePanels deal={deal} />

          {/* Center Column: Main Workspace */}
          <div className="flex-1 flex flex-col min-w-0">
            <ActionCenter
              currentState={currentState}
              userRole={userRole}
              deal={deal}
            />

            {/* Conditional Panels based on state */}
            {currentState === DealState.DeliverySubmitted &&
              userRole === "buyer" && (
                <>
                  <DeliveryVerificationPanel deal={deal} />
                  <BuyerAcceptancePanel deal={deal} />
                </>
              )}

            {[
              DealState.Released,
              DealState.Refunded,
              DealState.Settled,
            ].includes(currentState) && <SettlementSummaryCard deal={deal} />}

            <div className="mt-2">
              <Tabs tabs={tabsData} />
            </div>
          </div>

          {/* Right Column: Activity Feed */}
          <div className="w-full md:w-[280px] shrink-0">
            <ActivityFeed dealId={dealId} />
          </div>
        </div>
      </div>
    </div>
  );
}
