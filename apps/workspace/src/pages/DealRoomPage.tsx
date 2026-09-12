import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useAccount } from "wagmi";
import { useDeal } from "@settleone/api";
import { DealState } from "@settleone/types";
import { Spinner, Button } from "@settleone/design-system";
import { AlertCircle, Lock } from "lucide-react";
import { formatUnits } from "viem";
import { CHAIN_CONFIG } from "../lib/config";

// Components
import { DealInfoSidebar } from "./DealRoom/components/DealInfoSidebar";
import { DealLifecycleTimeline } from "./DealRoom/components/DealLifecycleTimeline";
import { NextActionBanner } from "./DealRoom/components/NextActionBanner";

// Tabs
import { OverviewTab } from "./DealRoom/components/tabs/OverviewTab";
import { TermsTab } from "./DealRoom/components/tabs/TermsTab";
import { EvidenceTab } from "./DealRoom/components/tabs/EvidenceTab";
import { DisputeTab } from "./DealRoom/components/tabs/DisputeTab";
import { ActivityFeed } from "./DealRoom/components/ActivityFeed";
import { DealChatRoom } from "./DealRoom/components/DealChatRoom";
import { SubmittedDeliveriesLog } from "./DealRoom/components/SubmittedDeliveriesLog";
import { BuyerAcceptancePanel } from "./DealRoom/components/BuyerAcceptancePanel";

// Helpers
function getChainName(chainId: number) {
  const chain = Object.values(CHAIN_CONFIG).find(
    (c: any) => c.chainId === chainId,
  );
  return chain ? chain.name : "Unknown Chain";
}

function getDealStateStyle(state: string) {
  switch (state) {
    case "AwaitingFunding":
      return "bg-[var(--state-awaiting-funding)]/10 text-[var(--state-awaiting-funding)] border border-[var(--state-awaiting-funding)]/30";
    case "PendingSellerAcceptance":
      return "bg-[var(--state-pending-seller-acceptance)]/10 text-[var(--state-pending-seller-acceptance)] border border-[var(--state-pending-seller-acceptance)]/30";
    case "Active":
      return "bg-[var(--state-active)]/10 text-[var(--state-active)] border border-[var(--state-active)]/30 shadow-[0_0_10px_rgba(34,197,94,0.3)]";
    case "DeliverySubmitted":
      return "bg-[var(--state-delivery-submitted)]/10 text-[var(--state-delivery-submitted)] border border-[var(--state-delivery-submitted)]/30";
    case "AwaitingAcceptance":
      return "bg-[var(--state-awaiting-acceptance)]/10 text-[var(--state-awaiting-acceptance)] border border-[var(--state-awaiting-acceptance)]/30";
    case "Disputed":
      return "bg-[var(--state-disputed)]/10 text-[var(--state-disputed)] border border-[var(--state-disputed)]/30 animate-pulse";
    case "Released":
      return "bg-[var(--state-released)]/10 text-[var(--state-released)] border border-[var(--state-released)]/30";
    case "Refunded":
      return "bg-[var(--state-refunded)]/10 text-[var(--state-refunded)] border border-[var(--state-refunded)]/30";
    case "Settled":
      return "bg-[var(--state-settled)]/10 text-[var(--state-settled)] border border-[var(--state-settled)]/30";
    case "Cancelled":
      return "bg-[var(--state-cancelled)]/10 text-[var(--state-cancelled)] border border-[var(--border-light)]";
    default:
      return "bg-gray-500/10 text-gray-400 border border-gray-500/30";
  }
}

function getDealStateLabel(state: string) {
  return state.replace(/([A-Z])/g, " $1").trim();
}

function DealHeroHeader({ deal }: { deal: any }) {
  const style = getDealStateStyle(deal.state || "AwaitingFunding");
  const chainName = getChainName(deal.chainId);

  let tokenSymbol = "USDC";
  let tokenDecimals = 6;
  const chainConfig = Object.values(CHAIN_CONFIG).find(
    (c: any) => c.chainId === deal.chainId,
  );

  if (chainConfig && deal.tokenAddress) {
    const entry = Object.entries(chainConfig.tokens).find(
      ([, addr]) =>
        (addr as string).toLowerCase() === deal.tokenAddress?.toLowerCase(),
    );
    if (entry) {
      tokenSymbol = entry[0];
      tokenDecimals =
        chainConfig.decimals[
          tokenSymbol as keyof typeof chainConfig.decimals
        ] || 6;
    }
  }

  const formattedAmount = deal.amount
    ? Number(formatUnits(BigInt(deal.amount.toString()), tokenDecimals))
    : 0;

  return (
    <div className="bg-[var(--bg-card)] border-b border-[var(--border)] pt-8 pb-6">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          {/* Left: Info */}
          <div className="flex gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] flex items-center justify-center text-white text-2xl font-bold shadow-lg shrink-0">
              {deal.name ? deal.name.charAt(0).toUpperCase() : "D"}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${style}`}
                >
                  {deal.state === "Active" && (
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                  )}
                  {getDealStateLabel(deal.state || "Unknown")}
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] leading-tight mb-2 truncate">
                {deal.name || deal.title || "Untitled Deal"}
              </h1>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-mono text-[var(--text-muted)] bg-[var(--bg-subtle)] px-2 py-0.5 rounded border border-[var(--border)]">
                  #
                  {deal.onChainId
                    ? String(deal.onChainId).padStart(5, "0")
                    : deal.id?.slice(0, 8)}
                </span>
                <span className="bg-[var(--accent-blue)]/20 text-[var(--accent-blue)] px-2 py-0.5 rounded font-semibold">
                  {deal.dealType === "SoftDelivery" ? "Software" : "Hardware"}
                </span>
                {deal.category && (
                  <span className="bg-[var(--bg-subtle)] text-[var(--text-secondary)] px-2 py-0.5 rounded border border-[var(--border)]">
                    {deal.category}
                  </span>
                )}
                <span className="text-[var(--text-muted)]">on {chainName}</span>
              </div>
            </div>
          </div>
          {/* Right: Amount */}
          <div className="md:text-right bg-[var(--bg-subtle)] md:bg-transparent p-4 md:p-0 rounded-xl md:rounded-none border border-[var(--border)] md:border-none">
            <p className="text-sm text-[var(--text-muted)] font-medium mb-1">
              Total Deal Amount
            </p>
            <div className="flex items-end md:justify-end gap-1.5">
              <span className="text-3xl font-bold text-[var(--text-primary)] leading-none">
                {formattedAmount.toLocaleString()}
              </span>
              <span className="text-lg font-semibold text-[var(--text-muted)] mb-0.5">
                {tokenSymbol}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DealRoomPage() {
  const { id } = useParams<{ id: string }>();
  const { data: deal, isLoading, isError, refetch } = useDeal(id);
  const { address } = useAccount();

  // Unwrap backend envelope
  const actualDeal = (deal as any)?.data?.deal || deal;

  const [activeTab, setActiveTab] = useState("overview");

  const dealId = useMemo(() => {
    if (!actualDeal?.onChainId && !id) return undefined;
    try {
      return BigInt(actualDeal?.onChainId || id || 0);
    } catch {
      return undefined;
    }
  }, [actualDeal, id]);

  const userRole = useMemo(() => {
    if (!actualDeal || !address) return "none";
    const addr = address.toLowerCase();
    const d = actualDeal as any;

    if (d.buyerAddress?.toLowerCase() === addr) return "buyer";
    if (d.sellerAddress?.toLowerCase() === addr) return "seller";
    if (d.verifierAddress?.toLowerCase() === addr) return "verifier";
    if (d.resolverAddress?.toLowerCase() === addr) return "resolver";

    return "none";
  }, [actualDeal, address]);

  const currentState: DealState =
    (actualDeal?.state as DealState) ?? DealState.AwaitingFunding;

  // Access control
  const isPrivateDeal = !!(
    (actualDeal as any)?.sellerAddress &&
    (actualDeal as any)?.sellerAddress !==
      "0x0000000000000000000000000000000000000000"
  );
  const isParty = userRole !== "none";

  // ── Loading ──
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-base)] gap-4">
        <Spinner size={40} />
        <p className="text-sm text-[var(--text-muted)] animate-pulse">
          Loading deal room…
        </p>
      </div>
    );
  }

  // ── Error ──
  if (isError || !actualDeal) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-base)] gap-4 text-center px-4">
        <div className="w-16 h-16 rounded-full bg-[var(--accent-red)]/10 flex items-center justify-center border border-[var(--accent-red)]/30">
          <AlertCircle size={32} className="text-[var(--accent-red)]" />
        </div>
        <h2 className="text-xl font-bold text-[var(--text-primary)]">
          Deal Not Found
        </h2>
        <p className="text-sm text-[var(--text-secondary)] max-w-md">
          We couldn't find this deal. It may not exist or there was a network
          error.
        </p>
        <button
          onClick={() => refetch()}
          className="mt-2 px-4 py-2 rounded-lg bg-[var(--accent-blue)] text-white text-sm font-semibold hover:brightness-110"
        >
          Try Again
        </button>
      </div>
    );
  }

  // ── Private Deal Access Gate ──
  if (isPrivateDeal && !isParty) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-[var(--bg-base)] p-4">
        <div className="max-w-md w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-8 text-center shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)]" />
          <div className="w-16 h-16 bg-[var(--bg-subtle)] rounded-full flex items-center justify-center mx-auto mb-6 border border-[var(--border)] shadow-inner">
            <Lock size={28} className="text-[var(--text-muted)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
            Private Deal Room
          </h2>
          <p className="text-[var(--text-secondary)] mb-8">
            This deal has a designated seller. Access is restricted to the
            buyer, seller, verifier, and resolver of this deal.
          </p>
          <div className="bg-[var(--bg-subtle)] rounded-lg p-4 mb-8 border border-[var(--border)]">
            <p className="text-sm font-medium text-[var(--text-primary)] mb-1">
              Currently connected as:
            </p>
            <p className="text-xs font-mono text-[var(--text-muted)] break-all">
              {address || "Not connected"}
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => window.history.back()}
            className="w-full h-12 text-base shadow-glow"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "terms", label: "Terms" },
    { id: "delivery", label: "Delivery" },
    { id: "evidence", label: "Evidence" },
    { id: "activity", label: "Activity" },
    { id: "dispute", label: "Dispute" },
    { id: "chat", label: "Chat" },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[var(--bg-base)] font-sans">
      <DealHeroHeader deal={actualDeal} />

      <div className="max-w-[1400px] w-full mx-auto px-4 md:px-8 py-8 flex flex-col gap-6">
        {/* Timeline */}
        <DealLifecycleTimeline
          currentState={currentState as unknown as string}
        />

        {/* Tabs Row */}
        <div className="border-b border-[var(--border)] flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-[var(--accent-blue)] text-[var(--accent-blue)] bg-[var(--accent-blue)]/5"
                  : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Full-width Next Action Banner */}
        <NextActionBanner
          currentState={currentState as unknown as string}
          userRole={userRole}
          deal={actualDeal}
        />

        {/* Main Content Split */}
        <div className="flex flex-col xl:flex-row gap-6 items-start mt-2">
          {/* Main Tab Area */}
          <div className="flex-1 min-w-0 w-full">
            {activeTab === "overview" && <OverviewTab deal={actualDeal} />}
            {activeTab === "terms" && <TermsTab deal={actualDeal} />}
            {activeTab === "delivery" && (
              <div className="space-y-6">
                <SubmittedDeliveriesLog dealId={dealId} />
                {userRole === "buyer" &&
                  ["AwaitingAcceptance", "Disputed"].includes(
                    currentState as unknown as string,
                  ) && <BuyerAcceptancePanel deal={actualDeal} />}
              </div>
            )}
            {activeTab === "evidence" && <EvidenceTab deal={actualDeal} />}
            {activeTab === "activity" && <ActivityFeed dealId={dealId} />}
            {activeTab === "dispute" && <DisputeTab deal={actualDeal} />}
            {activeTab === "chat" && <DealChatRoom dealId={dealId} />}
          </div>

          {/* Persistent Context Sidebar */}
          <div className="w-full xl:w-[320px] shrink-0 space-y-4">
            <DealInfoSidebar deal={actualDeal} />
          </div>
        </div>
      </div>
    </div>
  );
}
