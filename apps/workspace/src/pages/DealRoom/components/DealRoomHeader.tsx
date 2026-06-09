import React from "react";
import { useChainId } from "wagmi";
import { Share, Bookmark, MoreHorizontal } from "lucide-react";
import { DealStateTag, AddressDisplay } from "@settleone/design-system";
import {
  getDealStateColor,
  getDealStateLabel,
  formatAmount,
} from "@settleone/utils";

interface DealRoomHeaderProps {
  deal: any;
}

export function DealRoomHeader({ deal }: DealRoomHeaderProps) {
  const chainId = useChainId();
  const currentState = deal.state;

  return (
    <div className="sticky top-[56px] z-30 bg-white border-b border-[var(--border)] px-4 md:px-6 py-4">
      <div className="flex flex-col gap-3 max-w-[1200px] mx-auto">
        {/* Row 1: Breadcrumb + Actions */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-[var(--text-secondary)]">
            <span className="hover:text-[var(--text-primary)] cursor-pointer">
              Marketplace
            </span>
            <span className="mx-2">/</span>
            <span className="font-mono text-xs">
              #DL-{String(deal.id).padStart(5, "0")}
            </span>
            <span className="mx-2">—</span>
            <span className="truncate max-w-[200px]">
              {deal.title || "Smart Contract Audit"}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[var(--text-secondary)]">
            <button className="flex items-center gap-1.5 hover:text-[var(--text-primary)] transition-colors">
              <Share size={16} />{" "}
              <span className="hidden sm:inline">Share</span>
            </button>
            <button className="flex items-center gap-1.5 hover:text-[var(--text-primary)] transition-colors">
              <Bookmark size={16} />{" "}
              <span className="hidden sm:inline">Save</span>
            </button>
            <button className="p-1 hover:text-[var(--text-primary)] transition-colors rounded hover:bg-gray-100">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>

        {/* Row 2: Identity & Status */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
              {deal.title || "Smart Contract Audit for DeFi Protocol"}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-gray-100 border border-[var(--border)] font-mono text-xs text-gray-600">
                #DL-{String(deal.id).padStart(5, "0")}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold">
                {deal.dealType === 0 ? "Software" : "Hardware"}
              </span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 text-xs font-medium">
                <div
                  className={`w-3 h-3 rounded-full ${chainId === 421614 ? "bg-[#2D374B]" : "bg-[#627EEA]"}`}
                ></div>
                {chainId === 421614 ? "Arbitrum Sepolia" : "Ethereum Sepolia"}
              </span>
              <div className="text-xs text-gray-400 ml-2 flex items-center gap-1">
                Buyer: <AddressDisplay address={deal.buyer} size="sm" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
            <DealStateTag
              state={currentState}
              label={getDealStateLabel(currentState)}
              colorHex={getDealStateColor(currentState)}
              showDot={true}
            />
            <div className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
              {formatAmount(deal.amount, 6)}{" "}
              <span className="text-lg text-[var(--text-secondary)]">USDC</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
