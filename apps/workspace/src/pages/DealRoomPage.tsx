import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAccount, useChainId } from "wagmi";
import { DealState } from "@settleone/types";
import { useDeal } from "@settleone/api";
import { Spinner } from "@settleone/design-system";
import { AlertCircle, ArrowLeft, Share2, Bookmark } from "lucide-react";

import { DealLifecycleTimeline } from "./DealRoom/components/DealLifecycleTimeline";
import { ActionCenter } from "./DealRoom/components/ActionCenter";
import { DealChatRoom } from "./DealRoom/components/DealChatRoom";
import { SubmittedDeliveriesLog } from "./DealRoom/components/SubmittedDeliveriesLog";
import { ActivityFeed } from "./DealRoom/components/ActivityFeed";
import { BuyerAcceptancePanel } from "./DealRoom/components/BuyerAcceptancePanel";
import { SettlementSummaryCard } from "./DealRoom/components/SettlementSummaryCard";
import { DealInfoSidebar } from "./DealRoom/components/DealInfoSidebar";
import { getDealStateStyle } from "./Marketplace/components/DealCard";
import { SUPPORTED_CHAINS } from "../lib/constants";
import { CHAIN_CONFIG } from "../lib/config";
import { formatUnits } from "viem";

// ─── Helpers ────────────────────────────────────────────────────────────────

function getDealStateLabel(state: string): string {
  return state.replace(/([A-Z])/g, " $1").trim();
}

function getChainName(chainId: number): string {
  return (
    Object.keys(CHAIN_CONFIG).find(
      (key) => CHAIN_CONFIG[key].chainId === chainId,
    ) || "Unknown"
  );
}

// ─── Hero Header ─────────────────────────────────────────────────────────────

function DealHeroHeader({ deal }: { deal: any }) {
  const navigate = useNavigate();
  const style = getDealStateStyle(deal.state || "AwaitingFunding");
  const chainName = getChainName(deal.chainId);
  const chainInfo = SUPPORTED_CHAINS.find((c) => c.id === chainName);

  // Amount + token
  const chainConfig = CHAIN_CONFIG[chainName];
  let tokenSymbol = "USDC";
  let tokenDecimals = 6;
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

  // Countdown
  const deadline = deal.deliveryDeadline
    ? new Date(deal.deliveryDeadline)
    : null;
  const hoursLeft = deadline
    ? (deadline.getTime() - Date.now()) / 3600000
    : null;

  return (
    <div
      className="relative overflow-hidden border-b border-[var(--border)]"
      style={{
        background:
          "linear-gradient(135deg, rgba(10,15,30,0.98) 0%, rgba(17,24,39,0.98) 100%)",
      }}
    >
      {/* Subtle glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 80% at 20% 50%, ${style.bg} 0%, transparent 70%)`,
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-4 md:px-8 py-5">
        {/* Breadcrumb row */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors group"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
            Back to Marketplace
          </button>
          <div className="flex items-center gap-3 text-[var(--text-muted)]">
            <button className="flex items-center gap-1.5 text-xs hover:text-[var(--text-primary)] transition-colors">
              <Share2 size={14} /> Share
            </button>
            <button className="flex items-center gap-1.5 text-xs hover:text-[var(--text-primary)] transition-colors">
              <Bookmark size={14} /> Save
            </button>
          </div>
        </div>

        {/* Main Hero row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          {/* Left: Identity */}
          <div className="flex-1 min-w-0">
            {/* Status pill */}
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 border"
              style={{
                backgroundColor: style.bg,
                color: style.color,
                borderColor: style.border,
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: style.dot }}
              />
              {getDealStateLabel(deal.state || "Unknown")}
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
              {chainInfo && (
                <span className="flex items-center gap-1 bg-[var(--bg-subtle)] text-[var(--text-secondary)] px-2 py-0.5 rounded border border-[var(--border)]">
                  <img
                    src={chainInfo.logo}
                    alt={chainName}
                    className="w-3 h-3 rounded-full"
                  />
                  {chainName}
                </span>
              )}
            </div>
          </div>

          {/* Right: Amount + Deadline */}
          <div className="shrink-0 md:text-right">
            <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1">
              Deal Value
            </p>
            <div className="flex items-end gap-2 md:justify-end">
              <span className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
                {formattedAmount > 0 ? formattedAmount.toLocaleString() : "—"}
              </span>
              <span className="text-lg text-[var(--text-muted)] font-semibold mb-1">
                {tokenSymbol}
              </span>
            </div>
            {hoursLeft !== null && hoursLeft > 0 && (
              <p
                className={`text-xs font-semibold mt-1 flex items-center gap-1 md:justify-end ${hoursLeft <= 48 ? "text-[var(--accent-red)]" : "text-[var(--text-muted)]"}`}
              >
                ⏱{" "}
                {hoursLeft > 24
                  ? `${Math.floor(hoursLeft / 24)}d ${Math.floor(hoursLeft % 24)}h left`
                  : `${Math.floor(hoursLeft)}h left`}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Lifecycle Timeline */}
      <div className="border-t border-[var(--border)]/50">
        <DealLifecycleTimeline
          currentState={deal.state ?? DealState.AwaitingFunding}
        />
      </div>
    </div>
  );
}

// ─── Work Log Section ─────────────────────────────────────────────────────────

function WorkLogSection({
  deal,
  dealId,
  userRole,
  currentState,
}: {
  deal: any;
  dealId: bigint | undefined;
  userRole: string;
  currentState: DealState;
}) {
  const showDeliveries = [
    DealState.Active,
    DealState.DeliverySubmitted,
    DealState.AwaitingAcceptance,
    DealState.Accepted,
    DealState.Disputed,
    DealState.Released,
    DealState.Settled,
  ].includes(currentState);

  const showBuyerAcceptance =
    currentState === DealState.AwaitingAcceptance && userRole === "buyer";

  const isTerminal = [
    DealState.Released,
    DealState.Refunded,
    DealState.Settled,
    DealState.Cancelled,
  ].includes(currentState);

  if (!showDeliveries && !isTerminal) return null;

  return (
    <div className="space-y-6">
      {showDeliveries && (
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 border-b border-[var(--border)] bg-[var(--bg-subtle)]">
            <h3 className="font-semibold text-sm text-[var(--text-primary)]">
              Work Log & Deliveries
            </h3>
          </div>
          <div className="p-5">
            <SubmittedDeliveriesLog dealId={dealId} />
          </div>
        </div>
      )}

      {showBuyerAcceptance && <BuyerAcceptancePanel deal={deal} />}

      {currentState === DealState.Disputed && (
        <div className="bg-[var(--accent-red)]/5 border border-[var(--accent-red)]/20 rounded-xl p-5">
          <h3 className="font-semibold text-sm text-[var(--accent-red)] mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-red)] animate-pulse" />
            Dispute Evidence Room
          </h3>
          <p className="text-xs text-[var(--text-muted)]">
            The arbitrator is reviewing evidence submitted by both parties.
            Evidence documents will appear here.
          </p>
        </div>
      )}

      {isTerminal && <SettlementSummaryCard deal={deal} />}
    </div>
  );
}

// ─── Communication Section ────────────────────────────────────────────────────

function CommunicationSection({ dealId }: { dealId: bigint | undefined }) {
  const [tab, setTab] = useState<"chat" | "activity">("chat");
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-sm overflow-hidden">
      {/* Tab Headers */}
      <div className="flex border-b border-[var(--border)] bg-[var(--bg-subtle)]">
        {(["chat", "activity"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-3 text-sm font-semibold capitalize transition-all border-b-2 ${
              tab === t
                ? "border-[var(--accent-blue)] text-[var(--accent-blue)]"
                : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            {t === "chat" ? "💬 Deal Chat" : "🔗 Audit Trail"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {tab === "chat" ? (
          <DealChatRoom dealId={dealId} />
        ) : (
          <div className="p-5">
            <ActivityFeed dealId={dealId} />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main DealRoomPage ────────────────────────────────────────────────────────

export function DealRoomPage() {
  const { id } = useParams<{ id: string }>();
  const { data: deal, isLoading, isError, refetch } = useDeal(id);
  const { address } = useAccount();

  const dealId = useMemo(() => {
    if (!deal?.onChainId && !id) return undefined;
    try {
      return BigInt(deal?.onChainId || id || 0);
    } catch {
      return undefined;
    }
  }, [deal, id]);

  const userRole = useMemo(() => {
    if (!deal || !address) return "none";
    const addr = address.toLowerCase();
    if (deal.buyer?.toLowerCase() === addr) return "buyer";
    if (deal.seller?.toLowerCase() === addr) return "seller";
    return "none";
  }, [deal, address]);

  const currentState: DealState =
    (deal?.state as DealState) ?? DealState.AwaitingFunding;

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
  if (isError || !deal) {
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
          className="mt-2 px-4 py-2 rounded-lg bg-[var(--accent-blue)] text-white text-sm font-semibold hover:brightness-110 transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col -mx-4 md:-mx-6 -mt-4 md:-mt-6 min-h-screen bg-[var(--bg-base)]">
      {/* Zone 1: Hero Header + Timeline */}
      <DealHeroHeader deal={deal} />

      {/* Zone 2: Two-column layout (65/35) → stacks on mobile */}
      <div className="max-w-[1400px] w-full mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col xl:flex-row gap-6 items-start">
          {/* LEFT: Work Column (65%) */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Action Center */}
            <ActionCenter
              currentState={currentState}
              userRole={userRole as "buyer" | "seller" | "none"}
              deal={deal}
            />

            {/* Work Log (conditional) */}
            <WorkLogSection
              deal={deal}
              dealId={dealId}
              userRole={userRole}
              currentState={currentState}
            />
          </div>

          {/* RIGHT: Info Sidebar (35%) — always visible */}
          <div className="w-full xl:w-[380px] shrink-0">
            {/* On mobile it's full-width and appears below the action center */}
            <DealInfoSidebar deal={deal} />
          </div>
        </div>

        {/* Zone 3: Full-width Communication Section */}
        <div className="mt-8">
          <CommunicationSection dealId={dealId} />
        </div>
      </div>
    </div>
  );
}
