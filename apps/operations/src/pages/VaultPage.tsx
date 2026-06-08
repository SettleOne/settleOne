import React from 'react';
import { DollarSign, ShieldCheck, ArrowRightLeft } from 'lucide-react';
import { Button } from '@settleone/design-system';

export function VaultPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto py-8 px-4">
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Escrow Vault Manager</h1>
          <p className="text-gray-500 text-sm mt-1">Manage underlying yield strategies and vault liquidity.</p>
        </div>
        <Button variant="primary">Deposit to Strategy</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Vault A */}
        <div className="bg-white border border-[var(--border)] rounded-xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-[var(--border)] flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">USDC</div>
              <div>
                <h3 className="font-bold text-gray-900">USDC Core Vault</h3>
                <p className="text-xs text-gray-500">Arbitrum Sepolia</p>
              </div>
            </div>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">AAVE V3 STRATEGY</span>
          </div>
          <div className="p-5 bg-gray-50">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-xs text-gray-500 mb-1">Total Assets Locked</p>
                <p className="text-xl font-bold text-gray-900">1,250,000 USDC</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Current APY</p>
                <p className="text-xl font-bold text-green-600">4.25%</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Uninvested Buffer</p>
                <p className="text-sm font-medium text-gray-900">50,000 USDC (4%)</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Generated Protocol Fees</p>
                <p className="text-sm font-medium text-purple-600">12,400 USDC</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1 flex justify-center gap-2">
                <ArrowRightLeft size={16} /> Rebalance
              </Button>
              <Button variant="primary" className="flex-1 flex justify-center gap-2 bg-green-600 hover:bg-green-700 focus:ring-green-500">
                <ShieldCheck size={16} /> Claim Fees
              </Button>
            </div>
          </div>
        </div>

        {/* Vault B */}
        <div className="bg-white border border-[var(--border)] rounded-xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-[var(--border)] flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">USDT</div>
              <div>
                <h3 className="font-bold text-gray-900">USDT Core Vault</h3>
                <p className="text-xs text-gray-500">Arbitrum Sepolia</p>
              </div>
            </div>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">AAVE V3 STRATEGY</span>
          </div>
          <div className="p-5 bg-gray-50">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-xs text-gray-500 mb-1">Total Assets Locked</p>
                <p className="text-xl font-bold text-gray-900">850,000 USDT</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Current APY</p>
                <p className="text-xl font-bold text-green-600">3.80%</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Uninvested Buffer</p>
                <p className="text-sm font-medium text-gray-900">42,500 USDT (5%)</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Generated Protocol Fees</p>
                <p className="text-sm font-medium text-purple-600">8,200 USDT</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1 flex justify-center gap-2">
                <ArrowRightLeft size={16} /> Rebalance
              </Button>
              <Button variant="primary" className="flex-1 flex justify-center gap-2 bg-green-600 hover:bg-green-700 focus:ring-green-500">
                <ShieldCheck size={16} /> Claim Fees
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
