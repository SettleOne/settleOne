import React from "react";
import {
  FileText,
  Download,
  CheckCircle,
  ExternalLink,
  AlertCircle,
} from "lucide-react";
import { AddressDisplay, Spinner } from "@settleone/design-system";
import { useDeliveries } from "@settleone/api";
import { formatTimestamp } from "@settleone/utils";

interface SubmittedDeliveriesLogProps {
  dealId: bigint | undefined;
}

export function SubmittedDeliveriesLog({
  dealId,
}: SubmittedDeliveriesLogProps) {
  const { data, isLoading, error } = useDeliveries(dealId?.toString());

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="md" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center bg-red-50 rounded-lg border border-red-100">
        <AlertCircle className="mx-auto text-red-500 mb-2" size={24} />
        <p className="text-sm text-red-700">
          Error loading deliveries. Please try again later.
        </p>
      </div>
    );
  }

  const deliveries = data?.deliveries || [];

  if (deliveries.length === 0) {
    return (
      <div className="p-12 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <FileText className="mx-auto text-gray-300 mb-2" size={32} />
        <p className="text-sm text-gray-500">
          No deliveries have been submitted yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {deliveries.map((delivery, idx) => (
        <div
          key={delivery.id || idx}
          className="bg-white border border-[var(--border)] rounded-lg p-4 shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-2 h-full bg-purple-500"></div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded uppercase">
                  Rev {deliveries.length - idx}
                </span>
                <h4 className="font-semibold text-sm text-gray-900">
                  Delivery Submission
                </h4>
              </div>
              <p className="text-xs text-gray-500 flex items-center gap-2">
                Submitted{" "}
                <span className="text-gray-900 font-medium">
                  {formatTimestamp(BigInt(delivery.createdAt || 0))}
                </span>
              </p>
            </div>
            <span className="text-xs font-semibold text-purple-700 bg-purple-100 px-2 py-1 rounded-md flex items-center gap-1.5">
              <CheckCircle size={14} /> Submitted
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md bg-white hover:border-gray-300 transition-colors">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2 bg-blue-50 text-blue-500 rounded-md shrink-0">
                  <FileText size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    Delivery Proof CID
                  </p>
                  <p className="text-xs text-gray-500 font-mono truncate">
                    {delivery.cid}
                  </p>
                </div>
              </div>
              <a
                href={`https://ipfs.io/ipfs/${delivery.cid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
              >
                <ExternalLink size={18} />
              </a>
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md bg-white hover:border-gray-300 transition-colors">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2 bg-purple-50 text-purple-500 rounded-md shrink-0">
                  <CheckCircle size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    On-chain Proof Hash
                  </p>
                  <p className="text-xs text-gray-500 font-mono truncate">
                    {delivery.proofHash}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
