import React, { useState } from "react";
import { useChainId } from "wagmi";
import { CheckCircle, AlertTriangle, RefreshCw } from "lucide-react";
import { Button, Spinner } from "@settleone/design-system";
import { useAcceptDelivery, useRequestRevision } from "@settleone/sdk";
import { formatAmount } from "@settleone/utils";

interface BuyerAcceptancePanelProps {
  deal: any;
}

export function BuyerAcceptancePanel({ deal }: BuyerAcceptancePanelProps) {
  const chainId = useChainId();
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const { acceptDelivery } = useAcceptDelivery(chainId);
  const { requestRevision } = useRequestRevision(chainId);

  const isFullyFunded = BigInt(deal.depositedFunds) >= BigInt(deal.amount);

  const handleAccept = async () => {
    if (!isFullyFunded) return;
    try {
      setStatus("submitting");
      await acceptDelivery(BigInt(deal.id));
      setStatus("success");
    } catch (err) {
      console.error("Acceptance failed", err);
      setStatus("error");
    }
  };

  const handleRevision = async () => {
    try {
      setStatus("submitting");
      // Mocking reason hash for now
      const reasonHash =
        "0x1234567890123456789012345678901234567890123456789012345678901234";
      await requestRevision(BigInt(deal.id), reasonHash);
      setStatus("success");
    } catch (err) {
      console.error("Revision request failed", err);
      setStatus("error");
    }
  };

  return (
    <div className="bg-white border border-[var(--border)] rounded-lg shadow-sm overflow-hidden mb-6">
      <div className="px-4 py-3 border-b border-[var(--border)] bg-gray-50 flex items-center gap-2">
        <CheckCircle size={16} className="text-gray-500" />
        <h3 className="font-semibold text-sm">Review & Accept</h3>
      </div>
      <div className="p-4 space-y-6">
        {!isFullyFunded ? (
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-md text-amber-800 text-sm">
            <AlertTriangle size={20} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Funding Required</p>
              <p className="text-amber-700">
                The deal is not yet fully funded. You must deposit the remaining{" "}
                {formatAmount(
                  BigInt(deal.amount) - BigInt(deal.depositedFunds),
                  6,
                )}{" "}
                USDC before you can accept the delivery.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-md text-green-800 text-sm">
            <CheckCircle size={20} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Escrow Vault Fully Funded</p>
              <p className="text-green-700">
                Accepting the delivery will immediately release the funds to the
                seller and return any accrued yield to you according to the
                settlement rules.
              </p>
            </div>
          </div>
        )}

        {status === "success" ? (
          <div className="bg-green-50 p-4 rounded-md border border-green-200 text-green-700 text-sm font-medium text-center">
            Action submitted successfully! The deal state will update shortly.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={handleAccept}
              disabled={!isFullyFunded || status === "submitting"}
              className={`border rounded-lg p-4 text-center transition-colors ${
                !isFullyFunded
                  ? "bg-gray-50 border-gray-100 opacity-50 cursor-not-allowed"
                  : "border-gray-200 hover:border-green-400 hover:bg-green-50"
              }`}
            >
              {status === "submitting" ? (
                <Spinner size="sm" className="mx-auto mb-2" />
              ) : (
                <CheckCircle
                  size={24}
                  className="text-green-500 mx-auto mb-2"
                />
              )}
              <h4 className="font-semibold text-gray-900">Accept Delivery</h4>
              <p className="text-xs text-gray-500 mt-1">
                Release funds to seller and finalize the deal.
              </p>
            </button>

            <button
              onClick={handleRevision}
              disabled={status === "submitting"}
              className="border border-gray-200 rounded-lg p-4 text-center hover:border-amber-400 hover:bg-amber-50 transition-colors"
            >
              {status === "submitting" ? (
                <Spinner size="sm" className="mx-auto mb-2" />
              ) : (
                <RefreshCw size={24} className="text-amber-500 mx-auto mb-2" />
              )}
              <h4 className="font-semibold text-gray-900">Request Revision</h4>
              <p className="text-xs text-gray-500 mt-1">
                Send the delivery back to the seller for changes.
              </p>
            </button>

            <div className="border border-gray-200 rounded-lg p-4 text-center hover:border-red-400 hover:bg-red-50 transition-colors cursor-pointer">
              <AlertTriangle size={24} className="text-red-500 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900">Open Dispute</h4>
              <p className="text-xs text-gray-500 mt-1">
                Escalate to the Dispute Resolver if terms were violated.
              </p>
            </div>
          </div>
        )}

        {status === "error" && (
          <p className="text-xs text-red-600 font-medium text-center">
            Transaction failed. Please check your wallet and try again.
          </p>
        )}
      </div>
    </div>
  );
}
