import React from 'react';
import { FileText, Download, CheckCircle, ExternalLink } from 'lucide-react';
import { AddressDisplay } from '@settleone/design-system';

export function SubmittedDeliveriesLog() {
  return (
    <div className="space-y-4">
      
      {/* Example Delivery Revision 2 */}
      <div className="bg-white border border-[var(--border)] rounded-lg p-4 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-2 h-full bg-purple-500"></div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded uppercase">Rev 2</span>
              <h4 className="font-semibold text-sm text-gray-900">Final Audit Report</h4>
            </div>
            <p className="text-xs text-gray-500 flex items-center gap-2">
              Submitted by <AddressDisplay address="0x987..." length={3} showCopy={false} /> • Jan 20, 2026, 2:30 PM
            </p>
          </div>
          <span className="text-xs font-semibold text-purple-700 bg-purple-100 px-2 py-1 rounded-md flex items-center gap-1.5">
            <CheckCircle size={14} /> Pending Review
          </span>
        </div>

        <p className="text-sm text-gray-700 mb-4 bg-gray-50 p-3 rounded-md border border-gray-100">
          "I've addressed the issues found in Rev 1 regarding the reentrancy guard in the staking contract. See attached PDF for the full updated report."
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md bg-white hover:border-gray-300 transition-colors">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="p-2 bg-red-50 text-red-500 rounded-md shrink-0">
                <FileText size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">SettleOne_Audit_Final.pdf</p>
                <p className="text-xs text-gray-500">2.4 MB</p>
              </div>
            </div>
            <button className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors">
              <Download size={18} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md bg-white hover:border-gray-300 transition-colors">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="p-2 bg-blue-50 text-blue-500 rounded-md shrink-0">
                <ExternalLink size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">IPFS Evidence Hash</p>
                <p className="text-xs text-gray-500 font-mono">QmXyZ...</p>
              </div>
            </div>
            <button className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors">
              <ExternalLink size={18} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
