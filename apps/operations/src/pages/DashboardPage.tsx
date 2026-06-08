import React from 'react';
import { Activity, DollarSign, AlertOctagon, TrendingUp, Users } from 'lucide-react';
import { NetworkBadge } from '@settleone/design-system';

export function DashboardPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto py-8 px-4">
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Operations Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">SettleOne protocol metrics and active operations.</p>
        </div>
        <div className="flex gap-2">
          <NetworkBadge chainId={421614} />
          <NetworkBadge chainId={11155111} />
        </div>
      </div>

      {/* Aggregate Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white border border-[var(--border)] rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div className="text-gray-500 text-sm font-medium">Total Value Locked</div>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><DollarSign size={18} /></div>
          </div>
          <div className="text-2xl font-bold text-gray-900">$2,450,120</div>
          <div className="text-xs text-green-600 font-medium flex items-center gap-1 mt-2">
            <TrendingUp size={14} /> +12.5% from last week
          </div>
        </div>

        <div className="bg-white border border-[var(--border)] rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div className="text-gray-500 text-sm font-medium">Active Deals</div>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Activity size={18} /></div>
          </div>
          <div className="text-2xl font-bold text-gray-900">1,204</div>
          <div className="text-xs text-gray-500 font-medium mt-2">
            Across 2 chains
          </div>
        </div>

        <div className="bg-white border border-[var(--border)] rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div className="text-gray-500 text-sm font-medium">Active Disputes</div>
            <div className="p-2 bg-red-50 text-red-600 rounded-lg"><AlertOctagon size={18} /></div>
          </div>
          <div className="text-2xl font-bold text-gray-900">42</div>
          <div className="text-xs text-red-600 font-medium mt-2">
            3.4% Dispute Rate (Requires Attention)
          </div>
        </div>

        <div className="bg-white border border-[var(--border)] rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div className="text-gray-500 text-sm font-medium">Total Users</div>
            <div className="p-2 bg-green-50 text-green-600 rounded-lg"><Users size={18} /></div>
          </div>
          <div className="text-2xl font-bold text-gray-900">8,492</div>
          <div className="text-xs text-gray-500 font-medium mt-2">
            Verified wallets
          </div>
        </div>

      </div>

      {/* Main Charts / Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 bg-white border border-[var(--border)] rounded-xl shadow-sm min-h-[400px] flex items-center justify-center text-gray-400">
          [ TVL & Volume Chart Placeholder ]
        </div>
        <div className="bg-white border border-[var(--border)] rounded-xl shadow-sm p-5">
          <h3 className="font-bold text-gray-900 mb-4">Urgent Tasks</h3>
          <ul className="space-y-3">
            <li className="flex items-center justify-between p-3 bg-red-50 text-red-900 border border-red-100 rounded-lg text-sm font-medium cursor-pointer hover:bg-red-100 transition-colors">
              <span>Resolve Dispute #DL-00042</span>
              <span className="text-red-500 bg-white px-2 py-0.5 rounded text-xs">High</span>
            </li>
            <li className="flex items-center justify-between p-3 bg-red-50 text-red-900 border border-red-100 rounded-lg text-sm font-medium cursor-pointer hover:bg-red-100 transition-colors">
              <span>Resolve Dispute #DL-00088</span>
              <span className="text-red-500 bg-white px-2 py-0.5 rounded text-xs">High</span>
            </li>
            <li className="flex items-center justify-between p-3 bg-amber-50 text-amber-900 border border-amber-100 rounded-lg text-sm font-medium cursor-pointer hover:bg-amber-100 transition-colors">
              <span>Vault Rebalancing Required</span>
              <span className="text-amber-600 bg-white px-2 py-0.5 rounded text-xs">Med</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
}
