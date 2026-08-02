import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckSquare, Calendar, Clock, Eye, Filter,
  TrendingUp, DollarSign, CheckCircle, Package, Copy
} from "lucide-react";

function getDealStateStyle(state: string) {
  const map: Record<string, { color: string; bg: string; border: string; dot: string }> = {
    Active:            { color: "#4ade80", bg: "rgba(34,197,94,0.12)",   border: "rgba(34,197,94,0.3)",   dot: "#22c55e" },
    DeliverySubmitted: { color: "#a78bfa", bg: "rgba(139,92,246,0.12)",  border: "rgba(139,92,246,0.3)",  dot: "#8b5cf6" },
    AwaitingAcceptance:{ color: "#22d3ee", bg: "rgba(6,182,212,0.12)",   border: "rgba(6,182,212,0.3)",   dot: "#06b6d4" },
    Accepted:          { color: "#2dd4bf", bg: "rgba(20,184,166,0.12)",  border: "rgba(20,184,166,0.3)",  dot: "#14b8a6" },
    Released:          { color: "#4ade80", bg: "rgba(34,197,94,0.12)",   border: "rgba(34,197,94,0.3)",   dot: "#22c55e" },
    Settled:           { color: "#94a3b8", bg: "rgba(100,116,139,0.12)", border: "rgba(100,116,139,0.3)", dot: "#64748b" },
    Disputed:          { color: "#f87171", bg: "rgba(239,68,68,0.12)",   border: "rgba(239,68,68,0.3)",   dot: "#ef4444" },
  };
  return map[state] || map["Settled"]!;
}

const MOCK_ACCEPTED_DEALS = [
  {
    id: 101,
    title: "Mobile App — iOS & Android",
    dealType: 0,
    category: "Mobile App",
    stateName: "DeliverySubmitted",
    buyer: "0xaabb11223344556677889900aabb112233445566",
    amount: 8000,
    depositedFunds: 8000,
    token: "DAI",
    chain: "Base",
    deliveryDeadline: new Date(Date.now() + 86400000 * 5),
    acceptedAt: new Date(Date.now() - 86400000 * 8),
    myEarnings: 8000,
    status: "Awaiting Verification",
  },
  {
    id: 77,
    title: "Figma Design System & Component Library",
    dealType: 0,
    category: "Design/UI",
    stateName: "Active",
    buyer: "0x1122334455667788990011223344556677889900",
    amount: 4500,
    depositedFunds: 4500,
    token: "USDC",
    chain: "Polygon",
    deliveryDeadline: new Date(Date.now() + 86400000 * 12),
    acceptedAt: new Date(Date.now() - 86400000 * 3),
    myEarnings: 4500,
    status: "In Progress",
  },
  {
    id: 63,
    title: "Smart Contract Audit — DEX Protocol",
    dealType: 0,
    category: "Smart Contract Audit",
    stateName: "Released",
    buyer: "0xccdd99887766554433221100ccdd998877665544",
    amount: 7500,
    depositedFunds: 7500,
    token: "USDC",
    chain: "Arbitrum",
    deliveryDeadline: new Date(Date.now() - 86400000 * 10),
    acceptedAt: new Date(Date.now() - 86400000 * 35),
    myEarnings: 7500,
    status: "Completed",
  },
  {
    id: 52,
    title: "Electronics Batch — 200 Units Circuit Boards",
    dealType: 1,
    category: "Electronics",
    stateName: "Released",
    buyer: "0x9988776655443322110099887766554433221100",
    amount: 18000,
    depositedFunds: 18000,
    token: "USDC",
    chain: "Ethereum",
    deliveryDeadline: new Date(Date.now() - 86400000 * 20),
    acceptedAt: new Date(Date.now() - 86400000 * 50),
    myEarnings: 18000,
    status: "Completed",
  },
];

function DealCard({ deal, onClick }: { deal: any; onClick: () => void }) {
  const [copied, setCopied] = useState(false);
  const style = getDealStateStyle(deal.stateName);
  const isSoftware = deal.dealType === 0;
  const daysLeft = deal.deliveryDeadline
    ? Math.ceil((deal.deliveryDeadline.getTime() - Date.now()) / 86400000)
    : null;
  const isCompleted = ["Released", "Settled"].includes(deal.stateName);
  const isOverdue = daysLeft !== null && daysLeft < 0 && !isCompleted;

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
        <div className="absolute top-3 right-3 flex items-center gap-1 text-[var(--accent-green)] text-[10px] font-bold">
          <CheckCircle size={14} />
          Paid
        </div>
      )}

      {/* Type + State badges */}
      <div className="flex flex-wrap gap-1.5 mb-3 pr-16">
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${
            isSoftware
              ? "bg-blue-900/30 text-blue-400 border border-blue-800/40"
              : "bg-orange-900/30 text-orange-400 border border-orange-800/40"
          }`}
        >
          {isSoftware ? "Software" : "Hardware"}
        </span>
        <span
          className="text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5"
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
        #{String(deal.id).padStart(5, "0")} · {deal.category}
      </p>

      {/* Buyer info */}
      <div className="flex items-center gap-1.5 mb-3 text-xs text-[var(--text-secondary)]">
        <Package size={11} className="text-[var(--text-muted)]" />
        <span className="text-[var(--text-muted)]">Buyer:</span>
        <span className="font-mono text-[var(--text-primary)]">
          {`${deal.buyer.slice(0, 6)}…${deal.buyer.slice(-4)}`}
        </span>
        <button
          onClick={(e) => handleCopy(e, deal.buyer)}
          className="p-0.5 text-[var(--text-muted)] hover:text-[var(--accent-blue)] transition-colors"
        >
          {copied ? <span className="text-[var(--accent-green)]">✓</span> : <Copy size={10} />}
        </button>
      </div>

      {/* Earnings */}
      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-xs text-[var(--text-muted)]">My earnings:</span>
        <span className="text-xl font-bold text-[var(--text-primary)] ml-1">
          {deal.myEarnings.toLocaleString()}
        </span>
        <span className="text-sm text-[var(--text-muted)]">{deal.token}</span>
      </div>

      {/* Timeline */}
      <div className="space-y-1 mb-4 text-xs text-[var(--text-secondary)]">
        <div className="flex items-center gap-1.5">
          <Calendar size={11} className="text-[var(--text-muted)]" />
          <span>
            Deadline: {deal.deliveryDeadline.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
          {!isCompleted && daysLeft !== null && daysLeft > 0 && (
            <span className={`font-semibold ${daysLeft < 3 ? "text-[var(--accent-amber)]" : "text-[var(--text-muted)]"}`}>
              · {daysLeft}d left
            </span>
          )}
          {isOverdue && (
            <span className="font-semibold text-[var(--accent-red)]">· Overdue</span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={11} className="text-[var(--text-muted)]" />
          <span>Accepted {Math.round((Date.now() - deal.acceptedAt.getTime()) / 86400000)} days ago</span>
        </div>
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

export function AcceptedDealsPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");

  const stateFilters = ["All", "Active", "DeliverySubmitted", "AwaitingAcceptance", "Released", "Settled"];

  const filteredDeals = MOCK_ACCEPTED_DEALS.filter((d) => {
    if (filter !== "All" && d.stateName !== filter) return false;
    return true;
  });

  const activeDeals = MOCK_ACCEPTED_DEALS.filter(d => !["Released", "Settled"].includes(d.stateName)).length;
  const completedDeals = MOCK_ACCEPTED_DEALS.filter(d => ["Released", "Settled"].includes(d.stateName)).length;
  const totalEarnings = MOCK_ACCEPTED_DEALS.filter(d => ["Released", "Settled"].includes(d.stateName))
    .reduce((sum, d) => sum + d.myEarnings, 0);
  const pendingEarnings = MOCK_ACCEPTED_DEALS.filter(d => !["Released", "Settled"].includes(d.stateName))
    .reduce((sum, d) => sum + d.myEarnings, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-6 text-[var(--text-primary)]">
      {/* Background image */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(/docs-hero.jpg)",
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
              <div className="p-2 bg-[var(--accent-teal)]/15 rounded-lg" style={{ color: "var(--accent-teal)" }}>
                <CheckSquare size={22} />
              </div>
              <h1 className="text-2xl font-bold">Accepted Deals</h1>
            </div>
            <p className="text-sm text-[var(--text-muted)] ml-11">
              Deals you accepted and are delivering as a seller
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-card)] p-4">
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-2">
              <CheckSquare size={14} />
              Total Accepted
            </div>
            <div className="text-2xl font-bold">{MOCK_ACCEPTED_DEALS.length}</div>
            <p className="text-xs text-[var(--text-muted)] mt-1">lifetime deals</p>
          </div>
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-card)] p-4">
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-2">
              <Package size={14} />
              In Progress
            </div>
            <div className="text-2xl font-bold text-[var(--accent-blue)]">{activeDeals}</div>
            <p className="text-xs text-[var(--text-muted)] mt-1">active now</p>
          </div>
          <div className="bg-[var(--bg-card)] border border-[var(--accent-green)]/30 rounded-[var(--radius-card)] p-4">
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-2">
              <DollarSign size={14} />
              Earned
            </div>
            <div className="text-2xl font-bold text-[var(--accent-green)]">${totalEarnings.toLocaleString()}</div>
            <p className="text-xs text-[var(--text-muted)] mt-1">settled USDC</p>
          </div>
          <div className="bg-[var(--bg-card)] border border-[var(--accent-amber)]/30 rounded-[var(--radius-card)] p-4">
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-2">
              <TrendingUp size={14} />
              Pending
            </div>
            <div className="text-2xl font-bold text-[var(--accent-amber)]">${pendingEarnings.toLocaleString()}</div>
            <p className="text-xs text-[var(--text-muted)] mt-1">awaiting release</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-card)] p-4 mb-6">
          <div className="flex flex-wrap gap-2 items-center">
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] font-medium">
              <Filter size={13} />
              Filter:
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
            <CheckSquare size={48} className="mx-auto text-[var(--text-muted)] mb-4 opacity-40" />
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">No accepted deals</h3>
            <p className="text-sm text-[var(--text-muted)] max-w-sm mx-auto mb-6">
              Browse the marketplace and find deals you can accept as a seller.
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

export default AcceptedDealsPage;
