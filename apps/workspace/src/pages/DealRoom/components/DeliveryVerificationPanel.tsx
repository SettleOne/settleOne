import React from 'react';
import { Shield, Key } from 'lucide-react';
import { Button } from '@settleone/design-system';

export function DeliveryVerificationPanel() {
  return (
    <div className="bg-white border border-[var(--border)] rounded-lg shadow-sm overflow-hidden mb-6">
      <div className="px-4 py-3 border-b border-[var(--border)] bg-gray-50 flex items-center gap-2">
        <Shield size={16} className="text-gray-500" />
        <h3 className="font-semibold text-sm">Delivery Verification</h3>
      </div>
      <div className="p-4 space-y-4">
        <p className="text-sm text-gray-600">
          This delivery requires EIP-712 cryptographic signature verification before it can be finalized.
        </p>
        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-md border border-gray-200">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0">
            <Key size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold">Sign Verification Payload</p>
            <p className="text-xs text-gray-500">Sign a message with your wallet to prove authenticity of the delivery hash.</p>
          </div>
          <Button variant="primary" className="ml-auto">Sign Message</Button>
        </div>
      </div>
    </div>
  );
}
