import React from 'react';
import { Avatar, AddressDisplay, CountdownTimer } from '@settleone/design-system';
import { DollarSign, ShieldAlert, Users, TrendingUp } from 'lucide-react';

export function IntelligencePanels() {
  return (
    <div className="space-y-6 w-full md:w-[280px] shrink-0">
      
      {/* Financial Overview */}
      <div className="bg-white border border-[var(--border)] rounded-lg shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--border)] bg-gray-50 flex items-center gap-2">
          <DollarSign size={16} className="text-gray-500" />
          <h3 className="font-semibold text-sm">Deal Economics</h3>
        </div>
        <div className="p-4 space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-[var(--text-secondary)]">Deal Amount:</span>
            <span className="font-medium">5,000 USDC</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[var(--text-secondary)]">Deposited:</span>
            <span className="font-medium text-[var(--accent-green)]">0 USDC (0%)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[var(--text-secondary)]">Remaining:</span>
            <span className="font-medium">5,000 USDC</span>
          </div>
          <div className="pt-3 mt-3 border-t border-[var(--border)] border-dashed">
            <div className="flex justify-between items-center">
              <span className="text-[var(--text-secondary)] flex items-center gap-1">
                <TrendingUp size={14} className="text-[var(--accent-purple)]" /> Est. Yield:
              </span>
              <span className="font-medium text-[var(--accent-purple)]">+$12.40</span>
            </div>
            <div className="flex justify-between items-center mt-1 text-xs">
              <span className="text-gray-400">Buyer Share:</span>
              <span className="text-gray-500">85%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Tracker */}
      <div className="bg-white border border-[var(--border)] rounded-lg shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--border)] bg-gray-50 flex items-center gap-2">
          <ShieldAlert size={16} className="text-gray-500" />
          <h3 className="font-semibold text-sm">Key Deadlines</h3>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[var(--text-secondary)]">Seller Must Accept By</span>
            </div>
            <div className="text-sm font-medium">
              Jan 10, 2026
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[var(--text-secondary)]">Delivery Due</span>
            </div>
            <div className="text-sm font-medium">
              Feb 01, 2026
            </div>
          </div>
          <div className="pt-2">
            <CountdownTimer deadline={Math.floor(Date.now() / 1000) + 86400 * 18} />
          </div>
        </div>
      </div>

      {/* Parties Involved */}
      <div className="bg-white border border-[var(--border)] rounded-lg shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--border)] bg-gray-50 flex items-center gap-2">
          <Users size={16} className="text-gray-500" />
          <h3 className="font-semibold text-sm">Participants</h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-start gap-3">
            <Avatar initials="JD" size="sm" />
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Buyer</p>
              <p className="text-sm font-medium mb-1 flex items-center gap-2">
                John D. <span className="bg-blue-100 text-blue-700 text-[10px] px-1.5 rounded">YOU</span>
              </p>
              <AddressDisplay address="0x1234567890abcdef1234567890abcdef12345678" />
            </div>
          </div>
          
          <div className="flex items-start gap-3 pt-3 border-t border-gray-100">
            <Avatar size="sm" />
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Seller</p>
              <p className="text-sm font-medium italic text-gray-500 mb-1">Open Marketplace</p>
              <p className="text-xs text-gray-400">Any seller can accept</p>
            </div>
          </div>

          <div className="flex items-start gap-3 pt-3 border-t border-gray-100">
            <div className="w-8 flex justify-center text-gray-400">
              <ShieldAlert size={18} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Verifier</p>
              <p className="text-sm font-medium mb-1">Protocol Verifier</p>
              <AddressDisplay address="0x9876543210fedcba9876543210fedcba98765432" showCopy={false} />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
