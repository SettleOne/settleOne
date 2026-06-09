import React from "react";
import { Filter, X } from "lucide-react";
import { DealType } from "@settleone/types";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FilterSidebar({ isOpen, onClose }: FilterSidebarProps) {
  return (
    <div
      className={`
      fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-[var(--border)] shadow-xl transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:shadow-none md:z-0
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
    `}
    >
      <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold">
          <Filter size={18} /> Filters
        </div>
        <button
          onClick={onClose}
          className="md:hidden text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-4 space-y-6">
        {/* Deal Type */}
        <div>
          <h4 className="text-sm font-semibold mb-3">Deal Type</h4>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="rounded text-[var(--accent-blue)] focus:ring-[var(--accent-blue)]"
                defaultChecked
              />
              <span className="text-sm text-[var(--text-secondary)]">
                Digital Services
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="rounded text-[var(--accent-blue)] focus:ring-[var(--accent-blue)]"
              />
              <span className="text-sm text-[var(--text-secondary)]">
                Physical Goods
              </span>
            </label>
          </div>
        </div>

        {/* Network / Chain */}
        <div>
          <h4 className="text-sm font-semibold mb-3">Network</h4>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="rounded text-[var(--accent-blue)] focus:ring-[var(--accent-blue)]"
                defaultChecked
              />
              <span className="text-sm text-[var(--text-secondary)]">
                Arbitrum Sepolia
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="rounded text-[var(--accent-blue)] focus:ring-[var(--accent-blue)]"
                defaultChecked
              />
              <span className="text-sm text-[var(--text-secondary)]">
                Ethereum Sepolia
              </span>
            </label>
          </div>
        </div>

        {/* Budget Range */}
        <div>
          <h4 className="text-sm font-semibold mb-3">Budget Range (USDC)</h4>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              className="w-full px-2 py-1.5 text-sm border border-[var(--border)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)]"
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              placeholder="Max"
              className="w-full px-2 py-1.5 text-sm border border-[var(--border)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)]"
            />
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-[var(--border)] bg-gray-50 absolute bottom-0 w-full">
        <button className="w-full py-2 bg-white border border-[var(--border)] text-sm font-semibold rounded shadow-sm hover:bg-gray-50 transition-colors">
          Reset Filters
        </button>
      </div>
    </div>
  );
}
