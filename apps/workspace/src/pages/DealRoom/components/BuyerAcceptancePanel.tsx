import React from 'react';
import { CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@settleone/design-system';

export function BuyerAcceptancePanel() {
  return (
    <div className="bg-white border border-[var(--border)] rounded-lg shadow-sm overflow-hidden mb-6">
      <div className="px-4 py-3 border-b border-[var(--border)] bg-gray-50 flex items-center gap-2">
        <CheckCircle size={16} className="text-gray-500" />
        <h3 className="font-semibold text-sm">Review & Accept</h3>
      </div>
      <div className="p-4 space-y-6">
        
        <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-md text-green-800 text-sm">
          <CheckCircle size={20} className="shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold mb-1">Escrow Vault Fully Funded</p>
            <p className="text-green-700">The vault contains exactly 5,000 USDC. Accepting the delivery will immediately release 4,250 USDC (85%) to the seller and return 750 USDC (15%) to you, plus any accrued yield.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 text-center hover:border-green-400 hover:bg-green-50 transition-colors cursor-pointer">
            <CheckCircle size={24} className="text-green-500 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-900">Accept Delivery</h4>
            <p className="text-xs text-gray-500 mt-1">Release funds to seller and finalize the deal.</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 text-center hover:border-amber-400 hover:bg-amber-50 transition-colors cursor-pointer">
            <RefreshCw size={24} className="text-amber-500 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-900">Request Revision</h4>
            <p className="text-xs text-gray-500 mt-1">Send the delivery back to the seller for changes.</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 text-center hover:border-red-400 hover:bg-red-50 transition-colors cursor-pointer">
            <AlertTriangle size={24} className="text-red-500 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-900">Open Dispute</h4>
            <p className="text-xs text-gray-500 mt-1">Escalate to the Dispute Resolver if terms were violated.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
