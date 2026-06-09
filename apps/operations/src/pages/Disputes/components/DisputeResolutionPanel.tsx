import React from "react";
import {
  ShieldAlert,
  Gavel,
  CheckCircle,
  SplitSquareVertical,
} from "lucide-react";
import { Button } from "@settleone/design-system";

export function DisputeResolutionPanel() {
  return (
    <div className="bg-white border border-[var(--border)] rounded-lg shadow-sm overflow-hidden mb-6">
      <div className="px-4 py-3 border-b border-[var(--border)] bg-gray-50 flex items-center gap-2">
        <Gavel size={16} className="text-gray-500" />
        <h3 className="font-semibold text-sm">Dispute Resolution</h3>
      </div>

      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex gap-3 text-red-900">
          <ShieldAlert className="text-red-600 shrink-0 mt-0.5" size={20} />
          <div className="text-sm">
            <p className="font-semibold mb-1">Active Dispute</p>
            <p>
              Review the evidence submitted by both parties. As an Arbitrator,
              you have the authority to resolve this dispute and enforce
              settlement payouts.
            </p>
          </div>
        </div>

        <h4 className="text-sm font-semibold mb-4 text-gray-900">
          Arbitration Verdicts
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 hover:border-green-400 hover:bg-green-50 transition-colors cursor-pointer text-center">
            <CheckCircle size={24} className="text-green-500 mx-auto mb-2" />
            <h5 className="font-bold text-gray-900 text-sm">Seller Wins</h5>
            <p className="text-xs text-gray-500 mt-1 mb-3">
              Release 100% of funds to the seller. Delivery was valid.
            </p>
            <Button variant="primary" className="w-full text-xs py-1.5">
              Enforce
            </Button>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 hover:border-amber-400 hover:bg-amber-50 transition-colors cursor-pointer text-center">
            <SplitSquareVertical
              size={24}
              className="text-amber-500 mx-auto mb-2"
            />
            <h5 className="font-bold text-gray-900 text-sm">
              Split / Compromise
            </h5>
            <p className="text-xs text-gray-500 mt-1 mb-3">
              Manually allocate percentages to both parties.
            </p>
            <Button variant="primary" className="w-full text-xs py-1.5">
              Configure Split
            </Button>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 hover:border-red-400 hover:bg-red-50 transition-colors cursor-pointer text-center">
            <ShieldAlert size={24} className="text-red-500 mx-auto mb-2" />
            <h5 className="font-bold text-gray-900 text-sm">Buyer Wins</h5>
            <p className="text-xs text-gray-500 mt-1 mb-3">
              Refund 100% of funds back to the buyer. Delivery was invalid.
            </p>
            <Button variant="danger" className="w-full text-xs py-1.5">
              Enforce
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
