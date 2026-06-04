import React from 'react';
import { MarketplaceDealCard } from '@settleone/design-system';
import { Search, Filter, SlidersHorizontal, ArrowUpRight } from 'lucide-react';

const mockMarketplaceDeals = [
  { id: '1', title: 'React Frontend Implementation for SaaS', budget: '2,500', category: 'Software', deadline: 'Oct 20, 2026', buyerName: 'TechFlow Inc', buyerVerified: true, escrowFunded: true },
  { id: '2', title: 'Smart Contract Audit - V3 Vaults', budget: '5,000', category: 'Security', deadline: 'Oct 22, 2026', buyerName: 'DeFi Labs', buyerVerified: true, escrowFunded: true },
  { id: '3', title: 'Wholesale Purchase of Electronic Components', budget: '15,000', category: 'Supply Chain', deadline: 'Oct 25, 2026', buyerName: 'ElectroSource', buyerVerified: true, escrowFunded: false },
  { id: '4', title: 'Technical Writing - Protocol Documentation', budget: '1,200', category: 'Writing', deadline: 'Oct 18, 2026', buyerName: 'SettleOne Foundation', buyerVerified: true, escrowFunded: true },
  { id: '5', title: 'Brand Identity Design Pack', budget: '800', category: 'Design', deadline: 'Oct 15, 2026', buyerName: 'AlphaDev', buyerVerified: false, escrowFunded: true },
  { id: '6', title: 'L2 Bridge Integration Strategy', budget: '3,500', category: 'Consulting', deadline: 'Oct 30, 2026', buyerName: 'ChainLogic', buyerVerified: true, escrowFunded: true },
];

export const Marketplace = () => {
  return (
    <div className="flex flex-col gap-8 p-2 md:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black tracking-tight text-[#111827]">Open Deal Marketplace</h1>
          <p className="text-base text-[#6B7280]">
            Discover protected transaction opportunities with pre-funded escrow.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest">Total Market TVL</span>
            <span className="text-xl font-black text-[#111827]">$1,240,500 <span className="text-xs text-[#10B981]">+2.4%</span></span>
          </div>
          <div className="h-10 w-px bg-[#E5E7EB]" />
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest">Active Deals</span>
            <span className="text-xl font-black text-[#111827]">142</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full max-w-xl">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
          <input
            type="text"
            placeholder="Search deals, categories, or keywords..."
            className="h-12 w-full rounded-xl border border-[#E5E7EB] bg-white pl-10 pr-4 text-sm outline-none transition-all focus:border-[#111827] focus:shadow-sm"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-6 py-3 text-sm font-bold text-[#111827] hover:bg-[#FAFAFA]">
            <Filter className="h-4 w-4" /> Filters
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-6 py-3 text-sm font-bold text-[#111827] hover:bg-[#FAFAFA]">
            <SlidersHorizontal className="h-4 w-4" /> Sort
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockMarketplaceDeals.map((deal) => (
          <MarketplaceDealCard 
            key={deal.id}
            title={deal.title}
            budget={deal.budget}
            category={deal.category}
            deadline={deal.deadline}
            buyerName={deal.buyerName}
            buyerVerified={deal.buyerVerified}
            escrowFunded={deal.escrowFunded}
          />
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center gap-4 py-12 border-t border-[#E5E7EB]">
        <p className="text-sm text-[#6B7280]">Showing 6 of 142 active deals</p>
        <button className="rounded-xl border border-[#111827] bg-[#111827] px-8 py-3 text-sm font-bold text-white hover:bg-white hover:text-[#111827] transition-all">
          Load More Opportunities
        </button>
      </div>
    </div>
  );
};
