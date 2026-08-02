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
      <div className="p-8 text-center bg-[var(--accent-red)]/10 rounded-lg border border-[var(--accent-red)]/30">
        <AlertCircle className="mx-auto text-[var(--accent-red)] mb-2" size={24} />
        <p className="text-sm text-[var(--accent-red)]">
          Error loading deliveries. Please try again later.
        </p>
      </div>
    );
  }

  const deliveries = (data?.deliveries || []) as any[];

  if (deliveries.length === 0) {
    return (
      <div className="p-12 text-center bg-[var(--bg-subtle)] rounded-lg border border-dashed border-[var(--border-light)]">
        <FileText className="mx-auto text-[var(--text-muted)] mb-2" size={32} />
        <p className="text-sm text-[var(--text-muted)]">
          No deliveries have been submitted yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-[var(--text-primary)]">Submitted Deliveries Log</h3>
      {deliveries.map((delivery, idx) => (
        <div
          key={delivery.id || idx}
          className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-4 shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-2 h-full bg-[var(--accent-purple)]"></div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-[var(--bg-subtle)] text-[var(--text-secondary)] text-xs font-bold px-2 py-0.5 rounded uppercase">
                  Rev {deliveries.length - idx}
                </span>
                <h4 className="font-semibold text-sm text-[var(--text-primary)]">
                  Delivery Submission
                </h4>
              </div>
              <p className="text-xs text-[var(--text-muted)] flex items-center gap-2">
                Submitted{" "}
                <span className="text-[var(--text-primary)] font-medium">
                  {formatTimestamp(BigInt(delivery.createdAt || 0))}
                </span>
              </p>
            </div>
            <span className="text-xs font-semibold text-[var(--accent-purple)] bg-[var(--accent-purple)]/20 px-2 py-1 rounded-md flex items-center gap-1.5 shadow-glow">
              <CheckCircle size={14} /> Submitted
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center justify-between p-3 border border-[var(--border)] rounded-md bg-[var(--bg-card)] hover:border-[var(--border-light)] transition-colors group">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2 bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] rounded-md shrink-0">
                  <FileText size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                    Delivery Proof CID
                  </p>
                  <p className="text-xs text-[var(--text-muted)] font-mono truncate">
                    {delivery.cid}
                  </p>
                </div>
              </div>
              <a
                href={`https://ipfs.io/ipfs/${delivery.cid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[var(--text-muted)] hover:text-[var(--accent-blue)] rounded-full hover:bg-[var(--accent-blue)]/10 transition-colors"
              >
                <ExternalLink size={18} />
              </a>
            </div>

            <div className="flex items-center justify-between p-3 border border-[var(--border)] rounded-md bg-[var(--bg-card)] hover:border-[var(--border-light)] transition-colors">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2 bg-[var(--accent-purple)]/10 text-[var(--accent-purple)] rounded-md shrink-0">
                  <CheckCircle size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                    On-chain Proof Hash
                  </p>
                  <p className="text-xs text-[var(--text-muted)] font-mono truncate">
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
