import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PlusSquare, Calendar, Clock, Zap, Eye, Filter, Plus,
  TrendingUp, DollarSign, CheckCircle, Users, Copy
} from "lucide-react";

function getDealStateStyle(state: string) {
  const map: Record<string, { color: string; bg: string; border: string; dot: string }> = {
    AwaitingFunding:         { color: "#fbbf24", bg: "rgba(245,158,11,0.12)",  border: "rgba(245,158,11,0.3)",  dot: "#f59e0b" },
    PendingSellerAcceptance: { color: "#60a5fa", bg: "rgba(59,130,246,0.12)",  border: "rgba(59,130,246,0.3)",  dot: "#3b82f6" },
    Active:                  { color: "#4ade80", bg: "rgba(34,197,94,0.12)",   border: "rgba(34,197,94,0.3)",   dot: "#22c55e" },
    DeliverySubmitted:       { color: "#a78bfa", bg: "rgba(139,92,246,0.12)",  border: "rgba(139,92,246,0.3)",  dot: "#8b5cf6" },
    AwaitingAcceptance:      { color: "#22d3ee", bg: "rgba(6,182,212,0.12)",   border: "rgba(6,182,212,0.3)",   dot: "#06b6d4" },
    Accepted:                { color: "#2dd4bf", bg: "rgba(20,184,166,0.12)",  border: "rgba(20,184,166,0.3)",  dot: "#14b8a6" },
    Released:                { color: "#4ade80", bg: "rgba(34,197,94,0.12)",   border: "rgba(34,197,94,0.3)",   dot: "#22c55e" },
    Settled:                 { color: "#94a3b8", bg: "rgba(100,116,139,0.12)", border: "rgba(100,116,139,0.3)", dot: "#64748b" },
    Cancelled:               { color: "#9ca3af", bg: "rgba(156,163,175,0.12)", border: "rgba(156,163,175,0.3)", dot: "#9ca3af" },
  };
  return map[state] || map["Settled"]!;
}

const MOCK_CREATED_DEALS = [
  {
    id: 143,
    title: "Smart Contract Audit for DeFi Protocol",
    dealType: 0,
    category: "Smart Contract Audit",
    stateName: "Active",
    seller: "0x9876fedcba9876fedcba9876fedcba9876fedcba",
    amount: 5000,
    depositedFunds: 3000,
    token: "USDC",
    chain: "Arbitrum",
    deliveryDeadline: new Date(Date.now() + 1800000 * 10),
    createdAt: new Date(Date.now() - 259200000),
    yieldSoFar: 6.20,
  },
  {
    id: 129,
    title: "React Dashboard UI Development",
    dealType: 0,
    category: "Web Development",
    stateName: "PendingSellerAcceptance",
    seller: null,
    amount: 2500,
    depositedFunds: 2500,
    token: "USDT",
    chain: "Ethereum",
    deliveryDeadline: new Date(Date.now() + 604800000),
    createdAt: new Date(Date.now() - 86400000),
    yieldSoFar: 1.50,
  },
  {
    id: 98,
    title: "Backend API Integration & Cloud Deployment",
    dealType: 0,
    category: "Backend/API",
    stateName: "AwaitingAcceptance",
    seller: "0xccdd99887766554433221100ccdd998877665544",
    amount: 3200,
    depositedFunds: 3200,
    token: "USDC",
    chain: "Arbitrum",
    deliveryDeadline: new Date(Date.now() + 172800000),
    createdAt: new Date(Date.now() - 86400000 * 5),
    yieldSoFar: 3.80,
  },
  {
    id: 84,
    title: "Custom Office Furniture Set — 50 Units",
    dealType: 1,
    category: "Furniture",
    stateName: "Accepted",
    seller: "0xeeff00112233445566778899eeff001122334455",
    amount: 22000,
    depositedFunds: 22000,
    token: "USDC",
    chain: "Ethereum",
    deliveryDeadline: new Date(Date.now() + 86400000 * 2),
    createdAt: new Date(Date.now() - 86400000 * 15),
    yieldSoFar: 28.50,
  },
  {
    id: 71,
    title: "Enterprise ERP System Integration",
    dealType: 0,
    category: "Backend/API",
    stateName: "Released",
    seller: "0x1234567890123456789012345678901234567890",
    amount: 12000,
    depositedFunds: 12000,
    token: "USDC",
    chain: "Arbitrum",
    deliveryDeadline: new Date(Date.now() - 86400000 * 5),
    createdAt: new Date(Date.now() - 86400000 * 45),
    yieldSoFar: 52.40,
  },
];

function DealCard({ deal, onClick }: { deal: any; onClick: () => void }) {
  const [copied, setCopied] = useState(false);
  const style = getDealStateStyle(deal.stateName);
  const isSoftware = deal.dealType === 0;
  const progress = deal.amount ? Math.min(100, (deal.depositedFunds / deal.amount) * 100) : 0;
  const hoursLeft = deal.deliveryDeadline
    ? (deal.deliveryDeadline.getTime() - Date.now()) / 3_600_000
    : null;
  const isExpiringSoon = hoursLeft !== null && hoursLeft < 72 && hoursLeft > 0;
  const isCompleted = ["Released", "Settled", "Refunded"].includes(deal.stateName);

  const handleCopy = (e: React.MouseEvent, addr: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(addr);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      onClick={onClick}
      className="group relative bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-card)] p-5 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-[var(--border-light)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.4),0_0_0_1px_rgba(59,130,246,0.15)]"
    >
      {isCompleted && (
        <div className="absolute top-3 right-3">
          <CheckCircle size={16} className="text-[var(--accent-green)]" />
        </div>
      )}

      {/* Type badges */}
      <div className="flex flex-wrap gap-1.5 mb-3">
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
      <div className="mb-3">
        <span
          className="text-[10px] font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1.5"
          style={{ color: style.color, background: style.bg, border: `1px solid ${style.border}` }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: style.dot }} />
          {deal.stateName.replace(/([A-Z])/g, " $1").trim()}
        </span>
      </div>

      {/* Deal name */}
      <h3 className="font-bold text-[var(--text-primary)] text-[15px] leading-snug line-clamp-2 mb-1">
        {deal.title}
      </h3>
      <p className="text-xs text-[var(--text-muted)] font-mono mb-3">
        #{String(deal.id).padStart(5, "0")}
      </p>

      {/* Seller info */}
      <div className="flex items-center gap-1.5 mb-3 text-xs text-[var(--text-secondary)]">
        <Users size={11} className="text-[var(--text-muted)]" />
        <span className="text-[var(--text-muted)]">Seller:</span>
        {deal.seller ? (
          <>
            <span className="font-mono text-[var(--text-primary)]">
              {`${deal.seller.slice(0, 6)}…${deal.seller.slice(-4)}`}
            </span>
            <button
              onClick={(e) => handleCopy(e, deal.seller)}
              className="p-0.5 text-[var(--text-muted)] hover:text-[var(--accent-blue)] transition-colors"
            >
              {copied ? <span className="text-[var(--accent-green)]">✓</span> : <Copy size={10} />}
            </button>
          </>
        ) : (
          <span className="text-[var(--accent-amber)] font-medium">Open — Any seller</span>
        )}
      </div>

      {/* Amount */}
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-xl font-bold text-[var(--text-primary)]">
          {deal.amount.toLocaleString()}
        </span>
        <span className="text-sm text-[var(--text-muted)]">{deal.token}</span>
        {deal.yieldSoFar > 0 && (
          <span className="ml-auto text-xs font-semibold text-[var(--accent-green)]">
            +${deal.yieldSoFar.toFixed(2)}
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div className="w-full h-1 bg-[var(--bg-subtle)] rounded-full mb-3 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${progress}%`,
            background: progress >= 100 ? "#22c55e" : progress > 0 ? "#f59e0b" : "#374151",
          }}
        />
      </div>

      {/* Timeline */}
      <div className="space-y-1 mb-4 text-xs text-[var(--text-secondary)]">
        <div className="flex items-center gap-1.5">
          <Calendar size={11} className="text-[var(--text-muted)]" />
          <span>
            Deadline: {deal.deliveryDeadline.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={11} className="text-[var(--text-muted)]" />
          <span>Created {Math.round((Date.now() - deal.createdAt.getTime()) / 86400000)} days ago</span>
        </div>
        {isExpiringSoon && (
          <div className="flex items-center gap-1 text-[var(--accent-amber)]">
            <Zap size={11} />
            <span className="font-semibold">
              Expires soon
            </span>
          </div>
        )}
      </div>

      {/* Bottom row */}
      <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-medium text-[var(--text-muted)] bg-[var(--bg-subtle)] px-2 py-0.5 rounded-full border border-[var(--border)]">
            {deal.chain}
          </span>
          <span className="text-[10px] font-medium text-[var(--accent-blue-bright)] bg-[var(--accent-blue-glow2)] px-2 py-0.5 rounded-full border border-[var(--accent-blue)]/20">
            {deal.token}
          </span>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onClick(); }}
          className="flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-blue)] hover:text-[var(--accent-blue-bright)] transition-colors"
        >
          <Eye size={13} />
          View Deal
        </button>
      </div>
    </div>
  );
}

export function CreatedDealsPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");

  const stateFilters = ["All", "AwaitingFunding", "PendingSellerAcceptance", "Active", "Accepted", "Released", "Settled"];

  const filteredDeals = MOCK_CREATED_DEALS.filter((d) => {
    if (filter !== "All" && d.stateName !== filter) return false;
    return true;
  });

  const activeDeals = MOCK_CREATED_DEALS.filter(d => ["Active", "AwaitingAcceptance", "DeliverySubmitted"].includes(d.stateName)).length;
  const completedDeals = MOCK_CREATED_DEALS.filter(d => ["Released", "Settled"].includes(d.stateName)).length;
  const totalCapital = MOCK_CREATED_DEALS.filter(d => !["Released", "Settled", "Cancelled"].includes(d.stateName))
    .reduce((sum, d) => sum + d.depositedFunds, 0);
  const totalYield = MOCK_CREATED_DEALS.reduce((sum, d) => sum + (d.yieldSoFar || 0), 0);

  return (
    <div className="max-w-6xl mx-auto space-y-6 text-[var(--text-primary)]">
      {/* Background image */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(/hero-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.03,
          zIndex: 0,
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 bg-[var(--accent-blue)]/15 rounded-lg text-[var(--accent-blue)]">
                <PlusSquare size={22} />
              </div>
              <h1 className="text-2xl font-bold">Created Deals</h1>
            </div>
            <p className="text-sm text-[var(--text-muted)] ml-11">
              All deals you have created as a buyer
            </p>
          </div>
          <button
            onClick={() => navigate("/marketplace")}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-[var(--radius-input)] transition-all"
            style={{ background: "linear-gradient(135deg, var(--accent-blue), #06b6d4)", boxShadow: "0 0 16px rgba(59,130,246,0.3)" }}
          >
            <Plus size={16} />
            Create New Deal
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-card)] p-4">
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-2">
              <PlusSquare size={14} />
              Total Created
            </div>
            <div className="text-2xl font-bold">{MOCK_CREATED_DEALS.length}</div>
            <p className="text-xs text-[var(--text-muted)] mt-1">lifetime deals</p>
          </div>
          <div className="bg-[var(--bg-card)] border border-[var(--accent-blue)]/30 rounded-[var(--radius-card)] p-4">
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-2">
              <DollarSign size={14} />
              Capital Locked
            </div>
            <div className="text-2xl font-bold">${totalCapital.toLocaleString()}</div>
            <p className="text-xs text-[var(--text-muted)] mt-1">in active deals</p>
          </div>
          <div className="bg-[var(--bg-card)] border border-[var(--accent-green)]/30 rounded-[var(--radius-card)] p-4">
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-2">
              <TrendingUp size={14} />
              Total Yield
            </div>
            <div className="text-2xl font-bold text-[var(--accent-green)]">+${totalYield.toFixed(2)}</div>
            <p className="text-xs text-[var(--text-muted)] mt-1">earned all-time</p>
          </div>
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-card)] p-4">
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-2">
              <CheckCircle size={14} />
              Completed
            </div>
            <div className="text-2xl font-bold">{completedDeals}</div>
            <p className="text-xs text-[var(--text-muted)] mt-1">{activeDeals} still active</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-card)] p-4 mb-6">
          <div className="flex flex-wrap gap-2 items-center">
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] font-medium">
              <Filter size={13} />
              Filter by State:
            </div>
            {stateFilters.map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  filter === s
                    ? "bg-[var(--accent-blue)] text-white"
                    : "bg-[var(--bg-subtle)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--border-light)]"
                }`}
              >
                {s === "All" ? "All" : s.replace(/([A-Z])/g, " $1").trim()}
              </button>
            ))}
          </div>
        </div>

        {/* Deals Grid */}
        {filteredDeals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredDeals.map((deal) => (
              <DealCard
                key={deal.id}
                deal={deal}
                onClick={() => navigate(`/marketplace/${deal.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-card)]">
            <PlusSquare size={48} className="mx-auto text-[var(--text-muted)] mb-4 opacity-40" />
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">No deals found</h3>
            <p className="text-sm text-[var(--text-muted)] max-w-sm mx-auto mb-6">
              No deals match the selected filter. Create your first deal to get started.
            </p>
            <button
              onClick={() => navigate("/marketplace")}
              className="px-4 py-2 text-sm font-semibold text-white rounded-[var(--radius-input)]"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), #06b6d4)" }}
            >
              Browse Marketplace
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreatedDealsPage;
