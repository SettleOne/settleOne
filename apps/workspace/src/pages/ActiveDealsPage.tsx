import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  Calendar,
  Clock,
  Copy,
  Zap,
  Eye,
  Filter,
  TrendingUp,
  DollarSign,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

function getDealStateStyle(state: string) {
  const map: Record<
    string,
    { color: string; bg: string; border: string; dot: string }
  > = {
    AwaitingFunding: {
      color: "#fbbf24",
      bg: "rgba(245,158,11,0.12)",
      border: "rgba(245,158,11,0.3)",
      dot: "#f59e0b",
    },
    PendingSellerAcceptance: {
      color: "#60a5fa",
      bg: "rgba(59,130,246,0.12)",
      border: "rgba(59,130,246,0.3)",
      dot: "#3b82f6",
    },
    Active: {
      color: "#4ade80",
      bg: "rgba(34,197,94,0.12)",
      border: "rgba(34,197,94,0.3)",
      dot: "#22c55e",
    },
    DeliverySubmitted: {
      color: "#a78bfa",
      bg: "rgba(139,92,246,0.12)",
      border: "rgba(139,92,246,0.3)",
      dot: "#8b5cf6",
    },
    AwaitingAcceptance: {
      color: "#22d3ee",
      bg: "rgba(6,182,212,0.12)",
      border: "rgba(6,182,212,0.3)",
      dot: "#06b6d4",
    },
    Accepted: {
      color: "#2dd4bf",
      bg: "rgba(20,184,166,0.12)",
      border: "rgba(20,184,166,0.3)",
      dot: "#14b8a6",
    },
    Disputed: {
      color: "#f87171",
      bg: "rgba(239,68,68,0.12)",
      border: "rgba(239,68,68,0.3)",
      dot: "#ef4444",
    },
  };
  return map[state] || map["Active"]!;
}

const MOCK_ACTIVE_DEALS = [
  {
    id: 143,
    title: "Smart Contract Audit for DeFi Protocol",
    dealType: 0,
    category: "Smart Contract Audit",
    stateName: "Active",
    role: "Buyer",
    buyer: "0xabcdef1234567890abcdef1234567890abcdef12",
    seller: "0x9876fedcba9876fedcba9876fedcba9876fedcba",
    amount: 5000,
    depositedFunds: 3000,
    token: "USDC",
    chain: "Arbitrum",
    deliveryDeadline: new Date(Date.now() + 1800000 * 10),
    createdAt: new Date(Date.now() - 259200000),
    yieldSoFar: 6.2,
  },
  {
    id: 129,
    title: "React Dashboard UI Development",
    dealType: 0,
    category: "Web Development",
    stateName: "PendingSellerAcceptance",
    role: "Buyer",
    buyer: "0xba987654321fedcba987654321fedcba9876543",
    seller: null,
    amount: 2500,
    depositedFunds: 2500,
    token: "USDT",
    chain: "Ethereum",
    deliveryDeadline: new Date(Date.now() + 604800000),
    createdAt: new Date(Date.now() - 86400000),
    yieldSoFar: 1.5,
  },
  {
    id: 101,
    title: "Mobile App — iOS & Android",
    dealType: 0,
    category: "Mobile App",
    stateName: "DeliverySubmitted",
    role: "Seller",
    buyer: "0xaabb11223344556677889900aabb112233445566",
    seller: "0xabcdef1234567890abcdef1234567890abcdef12",
    amount: 8000,
    depositedFunds: 8000,
    token: "DAI",
    chain: "Base",
    deliveryDeadline: new Date(Date.now() + 86400000 * 5),
    createdAt: new Date(Date.now() - 86400000 * 10),
    yieldSoFar: 0,
  },
  {
    id: 98,
    title: "Backend API Integration & Cloud Deployment",
    dealType: 0,
    category: "Backend/API",
    stateName: "AwaitingAcceptance",
    role: "Buyer",
    buyer: "0xabcdef1234567890abcdef1234567890abcdef12",
    seller: "0xccdd99887766554433221100ccdd998877665544",
    amount: 3200,
    depositedFunds: 3200,
    token: "USDC",
    chain: "Arbitrum",
    deliveryDeadline: new Date(Date.now() + 172800000),
    createdAt: new Date(Date.now() - 86400000 * 5),
    yieldSoFar: 3.8,
  },
];

function DealCard({ deal, onClick }: { deal: any; onClick: () => void }) {
  const [copied, setCopied] = useState(false);
  const style = getDealStateStyle(deal.stateName);
  const isSoftware = deal.dealType === 0;
  const progress = deal.amount
    ? Math.min(100, (deal.depositedFunds / deal.amount) * 100)
    : 0;
  const hoursLeft = deal.deliveryDeadline
    ? (deal.deliveryDeadline.getTime() - Date.now()) / 3_600_000
    : null;
  const isExpiringSoon = hoursLeft !== null && hoursLeft < 72 && hoursLeft > 0;

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
      {/* Role Badge */}
      <div
        className="absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full"
        style={{
          background:
            deal.role === "Buyer"
              ? "rgba(59,130,246,0.15)"
              : "rgba(139,92,246,0.15)",
          color: deal.role === "Buyer" ? "#60a5fa" : "#a78bfa",
          border: `1px solid ${deal.role === "Buyer" ? "rgba(59,130,246,0.3)" : "rgba(139,92,246,0.3)"}`,
        }}
      >
        {deal.role}
      </div>

      {/* Top: Type badges + State */}
      <div className="flex items-start gap-2 mb-3 pr-16">
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
      <div className="flex items-center gap-2 mb-3">
        <span
          className="text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5"
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

      {/* Amount row */}
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-xl font-bold text-[var(--text-primary)]">
          {deal.amount.toLocaleString()}
        </span>
        <span className="text-sm text-[var(--text-muted)]">{deal.token}</span>
        {deal.yieldSoFar > 0 && (
          <span className="ml-auto text-xs font-semibold text-[var(--accent-green)]">
            +${deal.yieldSoFar.toFixed(2)} yield
          </span>
        )}
      </div>

      {/* Progress bar */}
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

      {/* Timeline */}
      <div className="space-y-1 mb-4 text-xs text-[var(--text-secondary)]">
        <div className="flex items-center gap-1.5">
          <Calendar size={11} className="text-[var(--text-muted)]" />
          <span>
            Deadline:{" "}
            {deal.deliveryDeadline.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={11} className="text-[var(--text-muted)]" />
          <span>
            Created{" "}
            {Math.round((Date.now() - deal.createdAt.getTime()) / 86400000)}{" "}
            days ago
          </span>
        </div>
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
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-blue)] hover:text-[var(--accent-blue-bright)] transition-colors"
        >
          <Eye size={13} />
          View Deal
        </button>
      </div>
    </div>
  );
}

export function ActiveDealsPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");

  const stateFilters = [
    "All",
    "Active",
    "PendingSellerAcceptance",
    "DeliverySubmitted",
    "AwaitingAcceptance",
    "Disputed",
  ];
  const roleFilters = ["All", "Buyer", "Seller"];

  const filteredDeals = MOCK_ACTIVE_DEALS.filter((d) => {
    if (filter !== "All" && d.stateName !== filter) return false;
    if (roleFilter !== "All" && d.role !== roleFilter) return false;
    return true;
  });

  const totalCapital = filteredDeals.reduce(
    (sum, d) => sum + d.depositedFunds,
    0,
  );
  const totalYield = filteredDeals.reduce(
    (sum, d) => sum + (d.yieldSoFar || 0),
    0,
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 text-[var(--text-primary)]">
      {/* Background image */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(/docs-hero.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center top",
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
                <Activity size={22} />
              </div>
              <h1 className="text-2xl font-bold">Active Deals</h1>
            </div>
            <p className="text-sm text-[var(--text-muted)] ml-11">
              Deals you are currently participating in as buyer or seller
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-card)] p-4">
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-2">
              <Activity size={14} />
              Total Active
            </div>
            <div className="text-2xl font-bold">{MOCK_ACTIVE_DEALS.length}</div>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              ongoing deals
            </p>
          </div>
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-card)] p-4">
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-2">
              <DollarSign size={14} />
              Capital Locked
            </div>
            <div className="text-2xl font-bold">
              ${totalCapital.toLocaleString()}
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              USDC equivalent
            </p>
          </div>
          <div className="bg-[var(--bg-card)] border border-[var(--accent-green)]/30 rounded-[var(--radius-card)] p-4">
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-2">
              <TrendingUp size={14} />
              Yield Accruing
            </div>
            <div className="text-2xl font-bold text-[var(--accent-green)]">
              +${totalYield.toFixed(2)}
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-1">so far</p>
          </div>
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-card)] p-4">
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-2">
              <AlertCircle size={14} />
              Needs Action
            </div>
            <div className="text-2xl font-bold text-[var(--accent-amber)]">
              {
                MOCK_ACTIVE_DEALS.filter(
                  (d) =>
                    d.stateName === "AwaitingAcceptance" ||
                    d.stateName === "PendingSellerAcceptance",
                ).length
              }
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              require review
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-card)] p-4 mb-6 space-y-3">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] font-medium">
              <Filter size={13} />
              State:
            </div>
            <div className="flex gap-1.5 flex-wrap">
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
            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs text-[var(--text-muted)]">Role:</span>
              {roleFilters.map((r) => (
                <button
                  key={r}
                  onClick={() => setRoleFilter(r)}
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                    roleFilter === r
                      ? "bg-[var(--accent-blue)]/20 text-[var(--accent-blue)] border border-[var(--accent-blue)]/30"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
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
            <Activity
              size={48}
              className="mx-auto text-[var(--text-muted)] mb-4 opacity-40"
            />
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
              No active deals
            </h3>
            <p className="text-sm text-[var(--text-muted)] max-w-sm mx-auto">
              You don't have any deals matching the current filter. Try
              adjusting your filters or create a new deal.
            </p>
            <button
              onClick={() => navigate("/marketplace")}
              className="mt-6 px-4 py-2 text-sm font-semibold text-white rounded-[var(--radius-input)] transition-all"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent-blue), #06b6d4)",
              }}
            >
              Browse Marketplace
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Named export alias for compatibility
export { ActiveDealsPage as default };
