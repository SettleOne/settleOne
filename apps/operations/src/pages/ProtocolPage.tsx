import React from 'react';
import { Settings, Save } from 'lucide-react';
import { Button, Input } from '@settleone/design-system';

export function ProtocolPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto py-8 px-4">
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Protocol Configuration</h1>
          <p className="text-gray-500 text-sm mt-1">Manage global platform fees and parameters.</p>
        </div>
      </div>

      <div className="bg-white border border-[var(--border)] rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--border)] bg-gray-50 flex items-center gap-2">
          <Settings size={18} className="text-gray-500" />
          <h3 className="font-semibold text-gray-900">Fee Structures</h3>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Base Platform Fee (%)</label>
              <div className="relative">
                <Input type="number" defaultValue="1.5" className="pr-8" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Applied to total deal value at settlement.</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dispute Resolution Fee (%)</label>
              <div className="relative">
                <Input type="number" defaultValue="2.5" className="pr-8" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Additional fee levied on disputed deals.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Yield Protocol Share (%)</label>
              <div className="relative">
                <Input type="number" defaultValue="10" className="pr-8" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Percentage of generated yield taken by treasury.</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Dispute Window (Secs)</label>
              <Input type="number" defaultValue="86400" />
              <p className="text-xs text-gray-500 mt-1">24 hours minimum required for disputes.</p>
            </div>
          </div>

          <div className="pt-6 border-t border-[var(--border)] flex justify-end">
            <Button variant="primary" className="flex items-center gap-2 bg-blue-600">
              <Save size={16} /> Save Protocol Config
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
}
