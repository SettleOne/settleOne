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
import { formatUnits } from "viem";
import { DealCard, getDealStateStyle } from "./Marketplace/components/DealCard";
import { CHAIN_CONFIG } from "../lib/config";

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
        // 1. Search Query
        if (
          searchQuery &&
          !(d.name || "").toLowerCase().includes(searchQuery.toLowerCase()) &&
          !String(d.id).includes(searchQuery)
        ) return false;
    
        // 2. Status
        if (statusFilter !== "All" && d.state !== statusFilter) return false;
    
        // 3. Deal Type (Backend returns strings like "SoftDelivery")
        if (
          dealType !== "All Types" &&
          (dealType === "Software" ? d.dealType !== "SoftDelivery" : d.dealType !== "HardDelivery")
        ) return false;
    
        // 4. Chain (Backend returns numbers like 421614)
        if (chain !== "All Chains") {
          const targetChainId = CHAIN_CONFIG[chain]?.chainId;
          if (d.chainId !== targetChainId) return false;
        }
    
        // 5. Token (Convert string "USDC" to address based on the deal's chain)
        if (token !== "All Tokens") {
          // Find which chain config this deal belongs to
          const configEntry = Object.values(CHAIN_CONFIG).find(c => c.chainId === d.chainId);
          // Get the address for the selected token on that chain
          const requiredTokenAddress = configEntry?.tokens[token as keyof typeof configEntry.tokens];
          
          // Compare addresses (case-insensitive)
          if (d.tokenAddress?.toLowerCase() !== requiredTokenAddress?.toLowerCase()) return false;
        }
    
        return true;
      });
      

  return (
    <>
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Marketplace Background */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundImage: "url(/marketplace-hero-bg.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center top",
            opacity: 0.055,
            zIndex: 0,
          }}
        />
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59,130,246,0.07) 0%, transparent 70%)",
            zIndex: 0,
          }}
        />
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 animate-fade-in">
            <div>
              <h1 className="text-3xl font-black text-[var(--text-primary)] tracking-tight">
                <span className="gradient-text">Marketplace</span>
              </h1>
              <p className="text-sm text-[var(--text-muted)] mt-1">
                Discover and participate in on-chain deals
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white rounded-xl transition-all btn-primary"
            >
              <Plus size={15} />
              Create Deal
            </button>
          </div>

          {/* Quick Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 relative z-10 stagger-children">
            {[
              {
                label: "Total Deals",
                value: "1,248",
                icon: "📋",
                color: "#3b82f6",
              },
              {
                label: "Yield Generated",
                value: "$4.2M",
                icon: "💰",
                color: "#22c55e",
              },
              {
                label: "Completed",
                value: "1,180",
                icon: "✅",
                color: "#06b6d4",
              },
              {
                label: "Active Now",
                value: "342",
                icon: "⚡",
                color: "#8b5cf6",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="animate-card-enter rounded-[var(--radius-card)] p-5 flex flex-col items-center justify-center text-center card-hover"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(14,25,45,0.8) 0%, rgba(10,18,32,0.7) 100%)",
                  backdropFilter: "blur(20px)",
                  border: `1px solid rgba(255,255,255,0.06)`,
                  boxShadow:
                    "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
                  animationDelay: `${i * 60}ms`,
                }}
              >
                <span className="text-2xl mb-1">{stat.icon}</span>
                <span
                  className="text-2xl font-black"
                  style={{
                    background: `linear-gradient(135deg, white, ${stat.color})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </span>
                <span className="text-[9px] text-[var(--text-muted)] mt-1.5 uppercase tracking-[0.12em] font-bold">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Filter & Search Bar */}
          <div
            className="sticky top-0 z-20 pb-4 mb-4 space-y-3"
            style={{
              background: "rgba(4, 8, 16, 0.85)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
            }}
          >
            <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
              {/* Status filters */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
                {STATUS_FILTERS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${statusFilter === s
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
                  className={`p-2 border rounded-[var(--radius-input)] transition-colors ${isMoreFiltersOpen
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
                className={`pb-3 px-2 text-sm font-medium flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${activeTab === label
                    ? "border-[var(--accent-blue)] text-[var(--text-primary)]"
                    : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border)]"
                  }`}
              >
                <Icon size={14} />
                {label}
                {count !== undefined && (
                  <span
                    className={`px-1.5 py-0.5 text-[10px] font-bold rounded-full ${activeTab === label
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
