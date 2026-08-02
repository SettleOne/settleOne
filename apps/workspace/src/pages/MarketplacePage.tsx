import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search, SlidersHorizontal, Plus, TrendingUp, Zap, Clock,
  Copy, Calendar, ChevronDown, LayoutGrid
} from "lucide-react";
import { Button, Spinner } from "@settleone/design-system";
import { useDeals } from "@settleone/api";
import { EmptyState } from "./Marketplace/components/EmptyState";
import { CreateDealModal } from "../components/modals/CreateDealModal";

// ── Inline enhanced DealCard ────────────────────────────────────
function getDealStateStyle(state: string) {
  const map: Record<string, { color: string; bg: string; border: string; dot: string }> = {
    AwaitingFunding:   { color: "#fbbf24", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.3)", dot: "#f59e0b" },
    PendingSellerAcceptance: { color: "#60a5fa", bg: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.3)", dot: "#3b82f6" },
    Active:            { color: "#4ade80", bg: "rgba(34,197,94,0.12)", border: "rgba(34,197,94,0.3)", dot: "#22c55e" },
    DeliverySubmitted: { color: "#a78bfa", bg: "rgba(139,92,246,0.12)", border: "rgba(139,92,246,0.3)", dot: "#8b5cf6" },
    AwaitingAcceptance:{ color: "#22d3ee", bg: "rgba(6,182,212,0.12)", border: "rgba(6,182,212,0.3)", dot: "#06b6d4" },
    Accepted:          { color: "#2dd4bf", bg: "rgba(20,184,166,0.12)", border: "rgba(20,184,166,0.3)", dot: "#14b8a6" },
    Disputed:          { color: "#f87171", bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.3)", dot: "#ef4444" },
    Released:          { color: "#4ade80", bg: "rgba(34,197,94,0.12)", border: "rgba(34,197,94,0.3)", dot: "#22c55e" },
    Refunded:          { color: "#fbbf24", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.3)", dot: "#f59e0b" },
    Settled:           { color: "#94a3b8", bg: "rgba(100,116,139,0.12)", border: "rgba(100,116,139,0.3)", dot: "#64748b" },
    Cancelled:         { color: "#9ca3af", bg: "rgba(156,163,175,0.12)", border: "rgba(156,163,175,0.3)", dot: "#9ca3af" },
  };
  return map[state] || map["Settled"]!;
}

function DealCard({ deal, onClick }: { deal: any; onClick: () => void }) {
  const [copied, setCopied] = useState(false);
  const stateKey = deal.stateName || "Active";
  const style = getDealStateStyle(stateKey);
  const isSoftware = deal.dealType === 0 || deal.dealType === "SoftDelivery";
  const deadline = deal.deliveryDeadline ? new Date(Number(deal.deliveryDeadline) * 1000) : null;
  const now = Date.now();
  const hoursLeft = deadline ? (deadline.getTime() - now) / 3_600_000 : null;
  const isExpiringSoon = hoursLeft !== null && hoursLeft < 72 && hoursLeft > 0;

  const progress = deal.depositedFunds && deal.amount
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
      {/* Top row: badges */}
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
          {deal.category && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border)] uppercase tracking-wide">
              {deal.category}
            </span>
          )}
        </div>
        {/* State badge */}
        <span
          className="text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 whitespace-nowrap"
          style={{ color: style.color, background: style.bg, border: `1px solid ${style.border}` }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse-dot"
            style={{ background: style.dot }}
          />
          {stateKey.replace(/([A-Z])/g, " $1").trim()}
        </span>
      </div>

      {/* Deal name */}
      <h3 className="font-bold text-[var(--text-primary)] text-[15px] leading-snug line-clamp-2 mb-1">
        {deal.title || deal.name || `Deal #${deal.id}`}
      </h3>

      {/* Deal ID */}
      <p className="text-xs text-[var(--text-muted)] font-mono mb-3">
        #{String(deal.id).padStart(5, "0")}
      </p>

      {/* Buyer */}
      <div className="flex items-center gap-1.5 mb-3 text-xs text-[var(--text-secondary)]">
        <span className="text-[var(--text-muted)]">Creator:</span>
        <span className="font-mono text-[var(--text-primary)]">
          {deal.buyer ? `${deal.buyer.slice(0, 6)}…${deal.buyer.slice(-4)}` : "0x0000…0000"}
        </span>
        <button
          onClick={handleCopy}
          className="p-0.5 text-[var(--text-muted)] hover:text-[var(--accent-blue)] transition-colors"
        >
          {copied ? <span className="text-[var(--accent-green)]">✓</span> : <Copy size={11} />}
        </button>
      </div>

      {/* Amount */}
      <div className="mb-3">
        <span className="text-xl font-bold text-[var(--text-primary)]">
          {deal.amount ? Number(deal.amount / 1_000_000n || deal.amount).toLocaleString() : "5,000"}
        </span>
        <span className="text-sm text-[var(--text-muted)] ml-1">{deal.token || "USDC"}</span>
        {progress > 0 && progress < 100 && (
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            Deposited: {progress.toFixed(0)}%
          </p>
        )}
      </div>

      {/* Progress bar */}
      {deal.amount && (
        <div className="w-full h-1 bg-[var(--bg-subtle)] rounded-full mb-3 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: progress >= 100 ? "#22c55e" : progress > 0 ? "#f59e0b" : "#374151",
            }}
          />
        </div>
      )}

      {/* Timeline */}
      <div className="space-y-1 mb-4 text-xs text-[var(--text-secondary)]">
        {deadline && (
          <div className="flex items-center gap-1.5">
            <Calendar size={11} className="text-[var(--text-muted)]" />
            <span>Deadline: {deadline.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
          </div>
        )}
        {deal.createdAt && (
          <div className="flex items-center gap-1.5">
            <Clock size={11} className="text-[var(--text-muted)]" />
            <span>Created {Math.round((now / 1000 - Number(deal.createdAt)) / 86400)} days ago</span>
          </div>
        )}
        {isExpiringSoon && (
          <div className="flex items-center gap-1 text-[var(--accent-amber)]">
            <Zap size={11} />
            <span className="font-semibold">
              Expires in {hoursLeft! > 24 ? `${Math.floor(hoursLeft! / 24)}d ${Math.floor(hoursLeft! % 24)}h` : `${Math.floor(hoursLeft!)}h`}
            </span>
          </div>
        )}
      </div>

      {/* Bottom row */}
      <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-medium text-[var(--text-muted)] bg-[var(--bg-subtle)] px-2 py-0.5 rounded-full border border-[var(--border)]">
            {deal.chain || "Arbitrum"}
          </span>
          <span className="text-[10px] font-medium text-[var(--accent-blue-bright)] bg-[var(--accent-blue-glow2)] px-2 py-0.5 rounded-full border border-[var(--accent-blue)]/20">
            {deal.token || "USDC"}
          </span>
        </div>
        <span className="text-xs font-semibold text-[var(--accent-blue)] group-hover:text-[var(--accent-blue-bright)] transition-colors">
          View Deal →
        </span>
      </div>

      {/* Accept Deal button on hover (for open deals) */}
      {(stateKey === "AwaitingFunding" || stateKey === "PendingSellerAcceptance") && (
        <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
          <button
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            className="w-full py-1.5 text-xs font-semibold text-white rounded-[var(--radius-input)] transition-all"
            style={{ background: "linear-gradient(135deg, #3b82f6, #06b6d4)" }}
          >
            Accept Deal
          </button>
        </div>
      )}
    </div>
  );
}

// ── Mock data (if no backend) ───────────────────────────────────
const MOCK_DEALS = [
  { id: 143, title: "Smart Contract Audit for DeFi Protocol", dealType: 0, category: "Smart Contract Audit", stateName: "Active", buyer: "0xabcdef1234567890abcdef1234567890abcdef12", amount: 5000000000n, depositedFunds: 3000000000n, token: "USDC", chain: "Arbitrum", deliveryDeadline: BigInt(Math.floor(Date.now()/1000) + 1800000), createdAt: BigInt(Math.floor(Date.now()/1000) - 259200) },
  { id: 129, title: "React Dashboard UI Development", dealType: 0, category: "Web Development", stateName: "PendingSellerAcceptance", buyer: "0xba987654321fedcba987654321fedcba9876543", amount: 2500000000n, depositedFunds: 2500000000n, token: "USDT", chain: "Ethereum", deliveryDeadline: BigInt(Math.floor(Date.now()/1000) + 604800), createdAt: BigInt(Math.floor(Date.now()/1000) - 86400) },
  { id: 118, title: "Industrial Electronics Manufacturing Batch", dealType: 1, category: "Electronics", stateName: "AwaitingFunding", buyer: "0x1122334455667788990011223344556677889900", amount: 15000000000n, depositedFunds: 0n, token: "USDC", chain: "Polygon", deliveryDeadline: BigInt(Math.floor(Date.now()/1000) + 2592000), createdAt: BigInt(Math.floor(Date.now()/1000) - 172800) },
  { id: 101, title: "Mobile App — iOS & Android", dealType: 0, category: "Mobile App", stateName: "DeliverySubmitted", buyer: "0xaabb11223344556677889900aabb112233445566", amount: 8000000000n, depositedFunds: 8000000000n, token: "DAI", chain: "Base", deliveryDeadline: BigInt(Math.floor(Date.now()/1000) + 86400 * 5), createdAt: BigInt(Math.floor(Date.now()/1000) - 86400 * 10) },
  { id: 98, title: "Backend API Integration & Cloud Deployment", dealType: 0, category: "Backend/API", stateName: "AwaitingAcceptance", buyer: "0xccdd99887766554433221100ccdd998877665544", amount: 3200000000n, depositedFunds: 3200000000n, token: "USDC", chain: "Arbitrum", deliveryDeadline: BigInt(Math.floor(Date.now()/1000) + 172800), createdAt: BigInt(Math.floor(Date.now()/1000) - 86400 * 5) },
  { id: 84, title: "Custom Office Furniture Set — 50 Units", dealType: 1, category: "Furniture", stateName: "Accepted", buyer: "0xeeff00112233445566778899eeff001122334455", amount: 22000000000n, depositedFunds: 22000000000n, token: "USDC", chain: "Ethereum", deliveryDeadline: BigInt(Math.floor(Date.now()/1000) + 86400 * 2), createdAt: BigInt(Math.floor(Date.now()/1000) - 86400 * 15) },
];

// ── Status filter options ───────────────────────────────────────
const STATUS_FILTERS = ["All", "Open", "Active", "Accepted", "Completed", "Expired"];
const SORT_OPTIONS = ["Newest First", "Oldest First", "Highest Value", "Lowest Value", "Ending Soon"];

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

  const { data, isLoading } = useDeals({});
  const deals: any[] = data?.deals?.length ? data.deals : MOCK_DEALS;

  const filteredDeals = deals.filter((d: any) => {
    if (searchQuery && !(d.title || "").toLowerCase().includes(searchQuery.toLowerCase()) && !String(d.id).includes(searchQuery)) return false;
    if (statusFilter !== "All" && d.stateName !== statusFilter) return false;
    if (dealType !== "All Types" && (dealType === "Software" ? d.dealType !== 0 : d.dealType !== 1)) return false;
    if (chain !== "All Chains" && d.chain !== chain) return false;
    if (token !== "All Tokens" && d.token !== token) return false;
    return true;
  });

  return (
    <>
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Background image — low opacity behind marketplace */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundImage: "url(/hero-bg.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.035,
            zIndex: 0,
          }}
        />
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-[var(--text-primary)]">Marketplace</h1>
              <p className="text-sm text-[var(--text-muted)] mt-0.5">Discover and participate in on-chain deals</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-[var(--radius-input)] transition-all"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), #06b6d4)", boxShadow: "0 0 16px rgba(59,130,246,0.3)" }}
            >
              <Plus size={16} />
              Create Deal
            </button>
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
                    {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                  </select>
                  <ChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
                </div>

                <div className="relative flex-1 md:w-60">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
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
                    <label key={item.label} className="flex items-center gap-2 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer">
                      <input type="checkbox" defaultChecked={item.default} className="accent-[var(--accent-blue)] rounded" />
                      {item.label}
                    </label>
                  ))}
                  <div className="flex items-center gap-2 ml-auto">
                    <span className="text-xs text-[var(--text-secondary)]">Delivery:</span>
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
              { label: "All Deals", count: filteredDeals.length, icon: LayoutGrid },
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
              <p className="mt-4 text-[var(--text-secondary)] font-medium">Scanning Marketplace…</p>
            </div>
          ) : filteredDeals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 pb-10">
              {filteredDeals.map((deal: any) => (
                <DealCard
                  key={deal.id}
                  deal={deal}
                  onClick={() => navigate(`/marketplace/${deal.id}`)}
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

      <CreateDealModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />
    </>
  );
}


