import React, { useState, useRef, useEffect } from "react";
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
import {
  useInfiniteDeals,
  usePortfolio,
  useMarketplaceStats,
  useMyCreatedDeals,
  useMyAcceptedDeals,
} from "@settleone/api";
import { DealState, DealType } from "@settleone/types";
import { EmptyState } from "./Marketplace/components/EmptyState";
import { CreateDealModal } from "../components/modals/CreateDealModal";
import { formatUnits } from "viem";
import { DealCard, getDealStateStyle } from "./Marketplace/components/DealCard";
import { CHAIN_CONFIG } from "../lib/config";
import { SUPPORTED_CHAINS, SUPPORTED_TOKENS } from "../lib/constants";

// Returns comma-separated addresses for a token symbol across all supported chains
const getTokenAddresses = (symbol: string) => {
  if (symbol === "All Tokens" || !symbol) return undefined;
  const addresses: string[] = [];
  for (const c of Object.values(CHAIN_CONFIG)) {
    const addr = c.tokens[symbol as keyof typeof c.tokens];
    if (addr) addresses.push(addr);
  }
  return addresses.length > 0 ? addresses.join(",") : undefined;
};

const STATUS_FILTERS = [
  "All",
  "Open",
  "Active",
  "Finalizing",
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

const SOFTWARE_CATEGORIES = [
  "Smart Contract Audit",
  "Web Development",
  "Mobile App",
];
const HARDWARE_CATEGORIES = [
  "Electronics",
  "Hardware Manufacturing",
  "IoT Devices",
];

function CustomDropdown({
  value,
  onChange,
  options,
  defaultLabel,
  width = "w-full",
}: any) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((o: any) => o.id === value);

  return (
    <div className={`relative ${width}`} ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-[var(--radius-input)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-blue)] transition-colors"
      >
        <div className="flex items-center gap-2">
          {selected?.logo && (
            <img src={selected.logo} alt="" className="w-4 h-4 rounded-full" />
          )}
          <span>
            {selected
              ? selected.name || selected.symbol || selected.id
              : defaultLabel}
          </span>
        </div>
        <ChevronDown
          size={14}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full max-h-60 overflow-y-auto bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-input)] z-50 shadow-xl">
          <button
            onClick={() => {
              onChange(defaultLabel);
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-left text-xs hover:bg-[var(--bg-subtle)] text-[var(--text-secondary)]"
          >
            {defaultLabel}
          </button>
          {options.map((opt: any) => (
            <button
              key={opt.id}
              onClick={() => {
                onChange(opt.id);
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-left text-xs hover:bg-[var(--bg-subtle)] text-[var(--text-primary)]"
            >
              {opt.logo && (
                <img src={opt.logo} alt="" className="w-4 h-4 rounded-full" />
              )}
              <span>{opt.name || opt.symbol || opt.id}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

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
  const [fundingType, setFundingType] = useState<"All" | "full" | "staged">(
    "All",
  );
  const [partialSettlement, setPartialSettlement] = useState<boolean>(true);
  const [category, setCategory] = useState("");

  // Map status pill to the backend state values
  const statusToBackendState: Record<string, string> = {
    Open: "AwaitingFunding,PendingSellerAcceptance",
    Active: "Active",
    Finalizing: "DeliverySubmitted,AwaitingAcceptance,Accepted",
    Completed: "Released,Settled",
    Expired: "Expired,Cancelled",
  };

  const effectiveState =
    statusFilter !== "All" ? statusToBackendState[statusFilter] : undefined;

  const endpoint =
    activeTab === "My Created"
      ? "/deals/my/created"
      : activeTab === "My Selling" || activeTab === "My Accepted"
        ? "/deals/my/accepted"
        : "/deals";

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteDeals(endpoint, {
      state: effectiveState,
      search: searchQuery || undefined,
      sortBy:
        sortBy === "Highest Value" || sortBy === "Lowest Value"
          ? "amount"
          : sortBy === "Ending Soon"
            ? "deliveryDeadline"
            : "createdAt",
      sortDir:
        sortBy === "Oldest First" || sortBy === "Lowest Value" ? "asc" : "desc",
      dealType:
        dealType !== "All Types"
          ? dealType === "Software"
            ? "SoftDelivery"
            : "HardDelivery"
          : undefined,
      chainId:
        chain !== "All Chains"
          ? SUPPORTED_CHAINS.find((c) => c.name === chain)?.chainId
          : undefined,
      token: getTokenAddresses(token),
      category: category || undefined,
      fundingType: fundingType !== "All" ? fundingType : undefined,
      partialSettlement: partialSettlement ? true : undefined,
      limit: 20,
    });

  const deals = data?.pages.flatMap((page: any) => page.deals) || [];
  const { data: portfolioData } = usePortfolio();
  const { data: statsData } = useMarketplaceStats();
  const { data: myCreatedData } = useMyCreatedDeals({ limit: 1 });
  const { data: myAcceptedData } = useMyAcceptedDeals({ limit: 1 });

  const stats = (statsData as any)?.data || statsData;
  const myCreatedCount =
    (myCreatedData as any)?.data?.total ?? (myCreatedData as any)?.total ?? 0;
  const myAcceptedCount =
    (myAcceptedData as any)?.data?.total ?? (myAcceptedData as any)?.total ?? 0;

  // No more JS filtering — backend does all the work
  const filteredDeals = deals;

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
                label: "Total On-chain",
                value: stats?.totalDeals?.toLocaleString() ?? "—",
                Icon: LayoutGrid,
                color: "#3b82f6",
              },
              {
                label: "Total Volume",
                value: stats?.totalVolume ?? "—",
                Icon: TrendingUp,
                color: "#22c55e",
              },
              {
                label: "Completed",
                value: stats?.completedDeals?.toLocaleString() ?? "—",
                Icon: Clock,
                color: "#06b6d4",
              },
              {
                label: "Active Now",
                value: stats?.activeDeals?.toLocaleString() ?? "—",
                Icon: Zap,
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
                <stat.Icon
                  size={18}
                  className="mb-2"
                  style={{ color: stat.color }}
                />
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

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(
                      e.target.value === "All Categories" ? "" : e.target.value,
                    )
                  }
                  className="px-3 py-2 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-[var(--radius-input)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-blue)]"
                >
                  <option value="">All Categories</option>
                  {(dealType === "All Types" || dealType === "Software"
                    ? SOFTWARE_CATEGORIES
                    : []
                  ).map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                  {(dealType === "All Types" || dealType === "Hardware"
                    ? HARDWARE_CATEGORIES
                    : []
                  ).map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                <CustomDropdown
                  value={chain === "All Chains" ? "All" : chain}
                  onChange={(val: string) =>
                    setChain(val === "All" ? "All Chains" : val)
                  }
                  options={SUPPORTED_CHAINS.map((c) => ({ ...c, id: c.name }))}
                  defaultLabel="All Chains"
                />

                <CustomDropdown
                  value={token === "All Tokens" ? "All" : token}
                  onChange={(val: string) =>
                    setToken(val === "All" ? "All Tokens" : val)
                  }
                  options={SUPPORTED_TOKENS}
                  defaultLabel="All Tokens"
                />

                <div className="col-span-2 md:col-span-4 flex flex-wrap gap-6 pt-3 border-t border-[var(--border)] mt-1">
                  <label className="flex items-center gap-2 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={fundingType === "full"}
                      onChange={(e) =>
                        setFundingType(e.target.checked ? "full" : "All")
                      }
                      className="accent-[var(--accent-blue)] rounded"
                    />
                    Full deals only (100% Upfront)
                  </label>

                  <label className="flex items-center gap-2 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={partialSettlement}
                      onChange={(e) => setPartialSettlement(e.target.checked)}
                      className="accent-[var(--accent-blue)] rounded"
                    />
                    Partial settlement allowed
                  </label>
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
                count: stats?.totalDeals,
                icon: LayoutGrid,
              },
              {
                label: "My Created",
                count: myCreatedCount || undefined,
                icon: Plus,
              },
              {
                label: "My Selling",
                count: myAcceptedCount || undefined,
                icon: TrendingUp,
              },
              { label: "Trending", icon: Zap },
            ].map(({ label, count, icon: Icon }) => (
              <button
                key={label}
                onClick={() => {
                  setActiveTab(label);
                  setStatusFilter("All"); // Reset pill on tab switch (industry best practice)
                }}
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
              <Spinner size={24} />
              <p className="mt-4 text-[var(--text-secondary)] font-medium">
                Scanning Marketplace…
              </p>
            </div>
          ) : filteredDeals.length > 0 ? (
            <div className="pb-10">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredDeals.map((deal: any) => (
                  <DealCard
                    key={deal.id}
                    deal={deal}
                    onClick={() => navigate(`/marketplace/${deal.id}`)}
                  />
                ))}
              </div>
              {hasNextPage && (
                <div className="flex justify-center mt-8">
                  <Button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    variant="secondary"
                  >
                    {isFetchingNextPage ? "Loading more..." : "Load More Deals"}
                  </Button>
                </div>
              )}
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
