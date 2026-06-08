import React from 'react';
import { Gavel, Clock } from 'lucide-react';
import { Button, AddressDisplay } from '@settleone/design-system';

export function DisputesPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto py-8 px-4">
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dispute Resolution Queue</h1>
          <p className="text-gray-500 text-sm mt-1">Review and resolve active conflicts.</p>
        </div>
      </div>

      <div className="bg-white border border-[var(--border)] rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 border-b border-[var(--border)] text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-6 py-4 font-semibold">Deal ID</th>
              <th className="px-6 py-4 font-semibold">Value</th>
              <th className="px-6 py-4 font-semibold">Parties</th>
              <th className="px-6 py-4 font-semibold">Time Active</th>
              <th className="px-6 py-4 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 font-mono font-medium text-gray-900">DL-00042</td>
              <td className="px-6 py-4 font-medium text-red-600">15,000 USDC</td>
              <td className="px-6 py-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-10 text-gray-500">Buyer</span>
                    <AddressDisplay address="0x123...456" length={4} showCopy={false} />
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-10 text-gray-500">Seller</span>
                    <AddressDisplay address="0xabc...def" length={4} showCopy={false} />
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-amber-600 font-medium flex items-center gap-1.5 pt-7">
                <Clock size={14} /> 5 Days
              </td>
              <td className="px-6 py-4 text-right">
                <Button variant="primary" className="bg-red-600 hover:bg-red-700 text-xs py-1.5 flex items-center gap-1.5 ml-auto">
                  <Gavel size={14} /> Review Case
                </Button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 font-mono font-medium text-gray-900">DL-00088</td>
              <td className="px-6 py-4 font-medium text-red-600">2,500 USDT</td>
              <td className="px-6 py-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-10 text-gray-500">Buyer</span>
                    <AddressDisplay address="0x789...012" length={4} showCopy={false} />
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-10 text-gray-500">Seller</span>
                    <AddressDisplay address="0xdef...123" length={4} showCopy={false} />
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-amber-600 font-medium flex items-center gap-1.5 pt-7">
                <Clock size={14} /> 2 Days
              </td>
              <td className="px-6 py-4 text-right">
                <Button variant="primary" className="bg-red-600 hover:bg-red-700 text-xs py-1.5 flex items-center gap-1.5 ml-auto">
                  <Gavel size={14} /> Review Case
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
