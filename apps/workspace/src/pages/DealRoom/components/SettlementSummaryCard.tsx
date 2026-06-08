import React from 'react';
import { DollarSign, CheckCircle, TrendingUp } from 'lucide-react';
import { AddressDisplay } from '@settleone/design-system';

export function SettlementSummaryCard() {
  return (
    <div className="bg-white border border-[var(--border)] rounded-lg shadow-sm overflow-hidden mb-6">
      <div className="px-4 py-3 border-b border-[var(--border)] bg-gray-50 flex items-center gap-2">
        <CheckCircle size={16} className="text-green-600" />
        <h3 className="font-semibold text-sm">Settlement Summary</h3>
      </div>
      <div className="p-6">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
            <DollarSign size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Deal Successfully Settled</h2>
          <p className="text-gray-500 mt-1">Funds have been distributed according to the settlement rules.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Seller Payout</h4>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-end mb-2">
                <AddressDisplay address="0xseller..." showCopy={false} showLink={false} />
                <span className="text-lg font-bold text-gray-900">4,250.00 USDC</span>
              </div>
              <p className="text-xs text-gray-500">85% of principal</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Buyer Refund & Yield</h4>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-end mb-2">
                <AddressDisplay address="0xbuyer..." showCopy={false} showLink={false} />
                <span className="text-lg font-bold text-green-600 flex items-center gap-1">
                  762.40 USDC
                </span>
              </div>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                15% principal + <TrendingUp size={12} className="text-purple-500" /> 12.40 USDC yield
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
