import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal, ArrowDownAZ } from "lucide-react";
import { Button, Spinner } from "@settleone/design-system";
import { useDeals } from "@settleone/api";
import { DealCard } from "./Marketplace/components/DealCard";
import { FilterSidebar } from "./Marketplace/components/FilterSidebar";
import { EmptyState } from "./Marketplace/components/EmptyState";

export function MarketplacePage() {
  const navigate = useNavigate();
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<any>({});

  const { data, isLoading, error } = useDeals({
    ...filters,
  });

  const deals = data?.deals || [];

  // Client-side search filtering (can be moved to API in production)
  const filteredDeals = deals.filter(
    (d) =>
      (d.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(d.id).includes(searchQuery),
  );

  return (
    <div className="flex flex-col md:flex-row h-full gap-6">
      {/* Overlay for mobile filter sidebar */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setFilterOpen(false)}
        />
      )}

      {/* Filter Sidebar */}
      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setFilterOpen(false)}
        onFilterChange={setFilters}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        {/* Header & Controls */}
        <div className="mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Marketplace</h1>
            <Button variant="primary" onClick={() => navigate("/create-deal")}>
              Create Deal
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by keyword or deal ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-[var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)] shadow-sm text-sm"
              />
            </div>

            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => setFilterOpen(true)}
                className="md:hidden flex items-center gap-2 px-3 py-2 bg-white border border-[var(--border)] rounded-md shadow-sm hover:bg-gray-50 text-sm font-medium"
              >
                <SlidersHorizontal size={16} /> Filters
              </button>

              <div className="relative">
                <select className="appearance-none pl-9 pr-8 py-2 bg-white border border-[var(--border)] rounded-md shadow-sm hover:bg-gray-50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)] cursor-pointer">
                  <option>Newest First</option>
                  <option>Highest Budget</option>
                  <option>Ending Soon</option>
                </select>
                <ArrowDownAZ
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Deals Grid */}
        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20">
            <Spinner size="lg" />
            <p className="mt-4 text-gray-500 font-medium">
              Scanning Marketplace...
            </p>
          </div>
        ) : filteredDeals.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 pb-10">
            {filteredDeals.map((deal) => (
              <DealCard key={deal.id} {...deal} />
            ))}
          </div>
        ) : (
          <EmptyState
            onClearFilters={() => {
              setSearchQuery("");
              setFilters({});
            }}
          />
        )}
      </div>
    </div>
  );
}
