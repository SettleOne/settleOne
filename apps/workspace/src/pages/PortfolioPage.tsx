import React from 'react';
import { Wallet, PieChart, ArrowUpRight, ArrowDownRight, History } from 'lucide-react';
import { formatAmount } from '@settleone/utils';
import { NetworkBadge, AddressDisplay } from '@settleone/design-system';

export function PortfolioPage() {
  const assets = [
    { token: 'USDC', symbol: 'USDC', decimals: 6, amount: 15000n * 1000000n, usdValue: 15000, yield: 45.20 },
    { token: 'USDT', symbol: 'USDT', decimals: 6, amount: 2500n * 1000000n, usdValue: 2500, yield: 8.40 },
    { token: 'WETH', symbol: 'WETH', decimals: 18, amount: 15n * 100000000000000000n, usdValue: 3450, yield: 0 },
  ];

  const totalValue = assets.reduce((sum, a) => sum + a.usdValue, 0);
  const totalYield = assets.reduce((sum, a) => sum + a.yield, 0);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Portfolio</h1>
          <p className="text-gray-500 text-sm mt-1">Assets currently locked in Escrow Vaults</p>
        </div>
      </div>

      {/* Aggregate Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Wallet size={16} /> Total Value Locked
          </div>
          <div className="text-3xl font-bold text-gray-900">${totalValue.toLocaleString()}</div>
        </div>
        
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-purple-100 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 text-purple-600 text-sm mb-2 font-medium">
            <PieChart size={16} /> Total Yield Generated
          </div>
          <div className="text-3xl font-bold text-purple-700">+${totalYield.toFixed(2)}</div>
          <p className="text-xs text-purple-500 mt-2">Yield is generated from Aave V3 integration while funds are in escrow.</p>
        </div>
      </div>

      {/* Asset List */}
      <h3 className="text-lg font-bold text-gray-900 mt-8 mb-4">Assets by Token</h3>
      <div className="bg-white border border-[var(--border)] rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 border-b border-[var(--border)] text-xs text-gray-500 uppercase">
              <tr>
                <th className="px-6 py-4 font-semibold">Asset</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">USD Value</th>
                <th className="px-6 py-4 font-semibold">Accrued Yield</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {assets.map((asset, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                      {asset.symbol[0]}
                    </div>
                    {asset.symbol}
                  </td>
                  <td className="px-6 py-4 font-mono">{formatAmount(asset.amount, asset.decimals, '')}</td>
                  <td className="px-6 py-4">${asset.usdValue.toLocaleString()}</td>
                  <td className="px-6 py-4 text-green-600 font-medium">+${asset.yield.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Vault Activity */}
      <h3 className="text-lg font-bold text-gray-900 mt-8 mb-4 flex items-center gap-2">
        <History size={18} /> Recent Activity
      </h3>
      <div className="space-y-3">
        <div className="bg-white border border-[var(--border)] rounded-lg p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0">
              <ArrowUpRight size={20} />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Funded Deal #DL-00143</p>
              <p className="text-xs text-gray-500 mt-0.5">Jan 5, 2026</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-gray-900">-5,000 USDC</p>
            <AddressDisplay address="0x123...456" length={4} showCopy={false} />
          </div>
        </div>

        <div className="bg-white border border-[var(--border)] rounded-lg p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-green-50 text-green-500 flex items-center justify-center shrink-0">
              <ArrowDownRight size={20} />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Settlement Payout #DL-00092</p>
              <p className="text-xs text-gray-500 mt-0.5">Dec 20, 2025</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-green-600">+10,240.50 USDC</p>
            <span className="text-xs text-purple-500 font-medium">+240.50 Yield</span>
          </div>
        </div>
      </div>

    </div>
  );
}
