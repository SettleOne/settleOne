import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  Plus,
  TrendingUp,
  Zap,
  Clock,
  Copy,
  Calendar,
  ChevronDown,
  LayoutGrid,
} from "lucide-react";
import { Button, Spinner } from "@settleone/design-system";
import { useDeals, usePortfolio } from "@settleone/api";
import { DealState, DealType } from "@settleone/types";
import { EmptyState } from "./Marketplace/components/EmptyState";
import { CreateDealModal } from "../components/modals/CreateDealModal";

// ── Inline enhanced DealCard ────────────────────────────────────
function getDealStateStyle(state: number) {
  const map: Record<
    number,
    { color: string; bg: string; border: string; dot: string }
  > = {
    [DealState.AwaitingFunding]: {
      color: "#fbbf24",
      bg: "rgba(245,158,11,0.12)",
      border: "rgba(245,158,11,0.3)",
      dot: "#f59e0b",
    },
    [DealState.PendingSellerAcceptance]: {
      color: "#60a5fa",
      bg: "rgba(59,130,246,0.12)",
      border: "rgba(59,130,246,0.3)",
      dot: "#3b82f6",
    },
    [DealState.Active]: {
      color: "#4ade80",
      bg: "rgba(34,197,94,0.12)",
      border: "rgba(34,197,94,0.3)",
      dot: "#22c55e",
    },
    [DealState.DeliverySubmitted]: {
      color: "#a78bfa",
      bg: "rgba(139,92,246,0.12)",
      border: "rgba(139,92,246,0.3)",
      dot: "#8b5cf6",
    },
    [DealState.AwaitingAcceptance]: {
      color: "#22d3ee",
      bg: "rgba(6,182,212,0.12)",
      border: "rgba(6,182,212,0.3)",
      dot: "#06b6d4",
    },
    [DealState.Accepted]: {
      color: "#2dd4bf",
      bg: "rgba(20,184,166,0.12)",
      border: "rgba(20,184,166,0.3)",
      dot: "#14b8a6",
    },
    [DealState.Disputed]: {
      color: "#f87171",
      bg: "rgba(239,68,68,0.12)",
      border: "rgba(239,68,68,0.3)",
      dot: "#ef4444",
    },
    [DealState.Released]: {
      color: "#4ade80",
      bg: "rgba(34,197,94,0.12)",
      border: "rgba(34,197,94,0.3)",
      dot: "#22c55e",
    },
    [DealState.Refunded]: {
      color: "#9ca3af",
      bg: "rgba(156,163,175,0.12)",
      border: "rgba(156,163,175,0.3)",
      dot: "#9ca3af",
    },
    [DealState.Settled]: {
      color: "#94a3b8",
      bg: "rgba(100,116,139,0.12)",
      border: "rgba(100,116,139,0.3)",
      dot: "#64748b",
    },
  };
  return map[state] || map[DealState.Settled]!;
}

function getDealStateLabel(state: number) {
  const map: Record<number, string> = {
    [DealState.AwaitingFunding]: "Awaiting Funding",
    [DealState.PendingSellerAcceptance]: "Pending Acceptance",
    [DealState.Active]: "Active",
    [DealState.DeliverySubmitted]: "Delivery Submitted",
    [DealState.AwaitingAcceptance]: "Awaiting Buyer Acceptance",
    [DealState.Accepted]: "Accepted",
    [DealState.Disputed]: "Disputed",
    [DealState.Released]: "Released",
    [DealState.Refunded]: "Refunded",
    [DealState.Settled]: "Settled",
  };
  return map[state] || "Unknown";
}

function DealCard({ deal, onClick }: { deal: any; onClick: () => void }) {
  const [copied, setCopied] = useState(false);
  const stateKey = deal.state || DealState.Active;
  const style = getDealStateStyle(stateKey);
  const isSoftware = deal.dealType === 0 || deal.dealType === "SoftDelivery";
  const deadline = deal.deliveryDeadline
    ? new Date(Number(deal.deliveryDeadline) * 1000)
    : null;
  const now = Date.now();
  const hoursLeft = deadline ? (deadline.getTime() - now) / 3_600_000 : null;
  const isExpiringSoon = hoursLeft !== null && hoursLeft < 72 && hoursLeft > 0;

  const progress =
    deal.depositedFunds && deal.amount
      ? Math.min(100, (Number(deal.depositedFunds) / Number(deal.amount)) * 100)
      : 0;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(deal.buyer || "0x0");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      onClick={onClick}
      className="group relative bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-card)] p-5 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-[var(--border-light)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.4),0_0_0_1px_rgba(59,130,246,0.15)]"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex flex-wrap gap-1.5">
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${
              isSoftware
                ? "bg-blue-900/30 text-blue-400 border border-blue-800/40"
                : "bg-orange-900/30 text-orange-400 border border-orange-800/40"
            }`}
          >
            {isSoftware ? "Software" : "Hardware"}
          </span>
        </div>
        <span
          className="text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 whitespace-nowrap"
          style={{
            color: style.color,
            background: style.bg,
            border: `1px solid ${style.border}`,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse-dot"
            style={{ background: style.dot }}
          />
          {getDealStateLabel(stateKey)}
        </span>
      </div>

      <h3 className="font-bold text-[var(--text-primary)] text-[15px] leading-snug line-clamp-2 mb-1">
        {deal.title || deal.name || `Deal #${deal.id}`}
      </h3>

      <p className="text-xs text-[var(--text-muted)] font-mono mb-3">
        #{String(deal.id).padStart(5, "0")}
      </p>

      <div className="flex items-center gap-1.5 mb-3 text-xs text-[var(--text-secondary)]">
        <span className="text-[var(--text-muted)]">Creator:</span>
        <span className="font-mono text-[var(--text-primary)]">
          {deal.buyer
            ? `${deal.buyer.slice(0, 6)}…${deal.buyer.slice(-4)}`
            : "0x0000…0000"}
        </span>
        <button
          onClick={handleCopy}
          className="p-0.5 text-[var(--text-muted)] hover:text-[var(--accent-blue)] transition-colors"
        >
          {copied ? (
            <span className="text-[var(--accent-green)]">✓</span>
          ) : (
            <Copy size={11} />
          )}
        </button>
      </div>

      <div className="mb-3">
        <span className="text-xl font-bold text-[var(--text-primary)]">
          {deal.amount
            ? Number(deal.amount / 1_000_000n || deal.amount).toLocaleString()
            : "5,000"}
        </span>
        <span className="text-sm text-[var(--text-muted)] ml-1">
          {deal.token || "USDC"}
        </span>
        {progress > 0 && progress < 100 && (
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            Deposited: {progress.toFixed(0)}%
          </p>
        )}
      </div>

      {deal.amount && (
        <div className="w-full h-1 bg-[var(--bg-subtle)] rounded-full mb-3 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background:
                progress >= 100
                  ? "#22c55e"
                  : progress > 0
                    ? "#f59e0b"
                    : "#374151",
            }}
          />
        </div>
      )}

      <div className="space-y-1 mb-4 text-xs text-[var(--text-secondary)]">
        {deadline && (
          <div className="flex items-center gap-1.5">
            <Calendar size={11} className="text-[var(--text-muted)]" />
            <span>
              Deadline:{" "}
              {deadline.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        )}
        {deal.createdAt && (
          <div className="flex items-center gap-1.5">
            <Clock size={11} className="text-[var(--text-muted)]" />
            <span>
              Created{" "}
              {Math.round((now / 1000 - Number(deal.createdAt)) / 86400)} days
              ago
            </span>
          </div>
        )}
        {isExpiringSoon && (
          <div className="flex items-center gap-1 text-[var(--accent-amber)]">
            <Zap size={11} />
            <span className="font-semibold">
              Expires in{" "}
              {hoursLeft! > 24
                ? `${Math.floor(hoursLeft! / 24)}d ${Math.floor(hoursLeft! % 24)}h`
                : `${Math.floor(hoursLeft!)}h`}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-medium text-[var(--text-muted)] bg-[var(--bg-subtle)] px-2 py-0.5 rounded-full border border-[var(--border)]">
            {deal.chain || "Arbitrum"}
          </span>
        </div>
        <span className="text-xs font-semibold text-[var(--accent-blue)] group-hover:text-[var(--accent-blue-bright)] transition-colors">
          View Deal →
        </span>
      </div>
    </div>
  );
}

const STATUS_FILTERS = [
  "All",
  "Open",
  "Active",
  "Accepted",
  "Completed",
  "Expired",
];
const SORT_OPTIONS = [
  "Newest First",
  "Oldest First",
  "Highest Value",
  "Lowest Value",
  "Ending Soon",
];

export function MarketplacePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dealType, setDealType] = useState("All Types");
  const [chain, setChain] = useState("All Chains");
  const [token, setToken] = useState("All Tokens");
  const [sortBy, setSortBy] = useState("Newest First");
  const [isMoreFiltersOpen, setMoreFiltersOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All Deals");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { data, isLoading } = useDeals({
    state:
      activeTab === "Open"
        ? "AwaitingFunding,PendingSellerAcceptance"
        : activeTab === "Active"
          ? "Active"
          : activeTab === "Accepted"
            ? "Accepted"
            : activeTab === "Completed"
              ? "Released,Settled"
              : activeTab === "Expired"
                ? "Expired,Cancelled"
                : undefined,
    search: searchQuery || undefined,
    limit: 20,
  });

  const deals = data?.deals || [];
  const { data: portfolioData } = usePortfolio();

  const filteredDeals = deals.filter((d: any) => {
    if (
      searchQuery &&
      !(d.name || "").toLowerCase().includes(searchQuery.toLowerCase()) &&
      !String(d.id).includes(searchQuery)
    )
      return false;
    if (statusFilter !== "All" && d.stateName !== statusFilter) return false;
    if (
      dealType !== "All Types" &&
      (dealType === "Software" ? d.dealType !== 0 : d.dealType !== 1)
    )
      return false;
    if (chain !== "All Chains" && d.chain !== chain) return false;
    if (token !== "All Tokens" && d.token !== token) return false;
    return true;
  });

  return (
    <>
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Base Texture Background */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundImage: "url(/hero-bg.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.04,
            zIndex: 0,
          }}
        />

        {/* Silver Logo Watermark Overlay */}
        <div
          className="fixed inset-0 pointer-events-none mix-blend-plus-lighter"
          style={{
            backgroundImage: "url(/silverLogo.png)",
            backgroundSize: "120%", // Massively enlarged to fit throughout
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.03, // Very subtle integration
            filter: "blur(2px)",
            zIndex: 0,
          }}
        />
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                Marketplace
              </h1>
              <p className="text-sm text-[var(--text-muted)] mt-0.5">
                Discover and participate in on-chain deals
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-[var(--radius-input)] transition-all"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent-blue), #06b6d4)",
                boxShadow: "0 0 16px rgba(59,130,246,0.3)",
              }}
            >
              <Plus size={16} />
              Create Deal
            </button>
          </div>

          {/* Quick Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 relative z-10">
            {[
              { label: "Total Deals Created", value: "1,248" },
              { label: "Total Yield Generated", value: "$4.2M" },
              { label: "Successfully Executed", value: "1,180" },
              { label: "Active Deals", value: "342" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-[var(--bg-card)]/50 backdrop-blur-lg border border-[var(--border)] rounded-[var(--radius-card)] p-5 flex flex-col items-center justify-center text-center shadow-[0_4px_24px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(6,182,212,0.2)] hover:border-[var(--accent-blue)]/40 hover:bg-[var(--bg-card)]/70"
              >
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-200 to-cyan-400 drop-shadow-md">
                  {stat.value}
                </span>
                <span className="text-[10px] text-[var(--text-secondary)] mt-2 uppercase tracking-widest font-bold">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Filter & Search Bar */}
          <div className="sticky top-0 z-20 bg-[var(--bg-base)]/90 backdrop-blur-md border-b border-[var(--border)] pb-4 mb-4 space-y-3">
            <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
              {/* Status filters */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
                {STATUS_FILTERS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                      statusFilter === s
                        ? "bg-[var(--accent-blue)] text-white shadow-[var(--shadow-glow)]"
                        : "bg-[var(--bg-subtle)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--border-light)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Sort + Search */}
              <div className="flex gap-2 w-full md:w-auto md:ml-auto">
                <div className="relative hidden md:block">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none pl-3 pr-8 py-2 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-[var(--radius-input)] text-xs font-medium text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-blue)] cursor-pointer"
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                  <ChevronDown
                    size={13}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none"
                  />
                </div>

                <div className="relative flex-1 md:w-60">
                  <Search
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                  />
                  <input
                    type="text"
                    placeholder="Search by deal name or ID…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-input)] text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)] focus:shadow-[0_0_0_2px_var(--accent-blue-glow)]"
                  />
                </div>

                <button
                  onClick={() => setMoreFiltersOpen(!isMoreFiltersOpen)}
                  className={`p-2 border rounded-[var(--radius-input)] transition-colors ${
                    isMoreFiltersOpen
                      ? "bg-[var(--accent-blue)] border-[var(--accent-blue)] text-white"
                      : "bg-[var(--bg-subtle)] border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                  title="More filters"
                >
                  <SlidersHorizontal size={16} />
                </button>
              </div>
            </div>

            {/* More Filters panel */}
            {isMoreFiltersOpen && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-[var(--bg-card)] rounded-[var(--radius-card)] border border-[var(--border)] animate-fade-in">
                <select
                  value={dealType}
                  onChange={(e) => setDealType(e.target.value)}
                  className="px-3 py-2 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-[var(--radius-input)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-blue)]"
                >
                  <option>All Types</option>
                  <option>Software</option>
                  <option>Hardware</option>
                </select>

                <select className="px-3 py-2 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-[var(--radius-input)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-blue)]">
                  <option>All Categories</option>
                  <option>Smart Contract Audit</option>
                  <option>Web Development</option>
                  <option>Mobile App</option>
                  <option>Electronics</option>
                </select>

                <select
                  value={chain}
                  onChange={(e) => setChain(e.target.value)}
                  className="px-3 py-2 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-[var(--radius-input)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-blue)]"
                >
                  <option>All Chains</option>
                  <option>Ethereum</option>
                  <option>Arbitrum</option>
                  <option>Polygon</option>
                  <option>Base</option>
                </select>

                <select
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="px-3 py-2 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-[var(--radius-input)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-blue)]"
                >
                  <option>All Tokens</option>
                  <option>USDC</option>
                  <option>USDT</option>
                  <option>DAI</option>
                  <option>ETH</option>
                  <option>SETL</option>
                </select>

                <div className="col-span-2 md:col-span-4 flex flex-wrap gap-6 pt-3 border-t border-[var(--border)] mt-1">
                  {[
                    { label: "Full deals only", default: false },
                    { label: "Partial settlement allowed", default: true },
                    { label: "My Deals Only", default: false },
                  ].map((item) => (
                    <label
                      key={item.label}
                      className="flex items-center gap-2 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        defaultChecked={item.default}
                        className="accent-[var(--accent-blue)] rounded"
                      />
                      {item.label}
                    </label>
                  ))}
                  <div className="flex items-center gap-2 ml-auto">
                    <span className="text-xs text-[var(--text-secondary)]">
                      Delivery:
                    </span>
                    <select className="px-2 py-1 bg-[var(--bg-subtle)] border border-[var(--border)] rounded text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-blue)]">
                      <option>Any</option>
                      <option>Within 7d</option>
                      <option>Within 30d</option>
                      <option>Within 90d</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Tabs */}
          <div className="flex gap-1 mb-6 overflow-x-auto hide-scrollbar border-b border-[var(--border)]">
            {[
              {
                label: "All Deals",
                count: filteredDeals.length,
                icon: LayoutGrid,
              },
              { label: "My Created", count: 0, icon: Plus },
              { label: "My Accepted", count: 0, icon: TrendingUp },
              { label: "Trending", icon: Zap },
            ].map(({ label, count, icon: Icon }) => (
              <button
                key={label}
                onClick={() => setActiveTab(label)}
                className={`pb-3 px-2 text-sm font-medium flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                  activeTab === label
                    ? "border-[var(--accent-blue)] text-[var(--text-primary)]"
                    : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border)]"
                }`}
              >
                <Icon size={14} />
                {label}
                {count !== undefined && (
                  <span
                    className={`px-1.5 py-0.5 text-[10px] font-bold rounded-full ${
                      activeTab === label
                        ? "bg-[var(--accent-blue)] text-white"
                        : "bg-[var(--bg-subtle)] text-[var(--text-muted)]"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Deal Cards Grid */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Spinner size="lg" />
              <p className="mt-4 text-[var(--text-secondary)] font-medium">
                Scanning Marketplace…
              </p>
            </div>
          ) : filteredDeals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 pb-10">
              {filteredDeals.map((deal: any) => (
                <DealCard
                  key={deal.id}
                  deal={deal}
                  onClick={() => navigate(`/deal/${deal.id}`)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              onClearFilters={() => {
                setSearchQuery("");
                setStatusFilter("All");
                setDealType("All Types");
                setChain("All Chains");
                setToken("All Tokens");
              }}
            />
          )}
        </div>
      </div>

      <CreateDealModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </>
  );
}
