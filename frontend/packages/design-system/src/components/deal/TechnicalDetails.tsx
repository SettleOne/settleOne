import React from 'react';
import { Database, Copy, Check, ExternalLink } from 'lucide-react';
import { cn } from '../../index';

interface TechnicalDetailsProps {
  dealId: string;
  contractAddress: string;
  vaultId: string;
  verifier: string;
  chain: string;
  isOpen: boolean;
  onClose: () => void;
}

export const TechnicalDetails = ({
  dealId,
  contractAddress,
  vaultId,
  verifier,
  chain,
  isOpen,
  onClose
}: TechnicalDetailsProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-end bg-black/20 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="h-full w-full max-w-[480px] bg-white shadow-2xl animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-[#E5E7EB] px-8 py-6">
            <div className="flex items-center gap-3">
              <Database className="h-5 w-5 text-[#111827]" />
              <h2 className="text-xl font-bold text-[#111827]">Technical Details</h2>
            </div>
            <button onClick={onClose} className="text-[#6B7280] hover:text-[#111827]">
              Close
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            <section className="space-y-4">
              <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-widest">On-Chain Metadata</h3>
              <div className="space-y-4">
                <DetailRow label="Deal UUID" value={dealId} />
                <DetailRow label="Contract" value={contractAddress} isAddress />
                <DetailRow label="Vault Position" value={vaultId} isAddress />
                <DetailRow label="Verifier Agency" value={verifier} />
                <DetailRow label="Deployment Chain" value={chain} />
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-widest">Protocol Invariants</h3>
              <div className="rounded-lg bg-[#FAFAFA] border border-[#E5E7EB] p-4 text-xs text-[#6B7280] leading-relaxed">
                This transaction is governed by the SettleOne V1 Settlement Engine. Funds are non-custodial and locked in a yield-bearing vault until state transition conditions are met via proof-of-delivery or arbitrator verdict.
              </div>
            </section>
          </div>

          <div className="border-t border-[#E5E7EB] bg-[#FAFAFA] p-8">
            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#111827] px-4 py-3 text-sm font-bold text-white hover:bg-[#111827]/90 transition-colors">
              View on Block Explorer <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value, isAddress }: { label: string; value: string; isAddress?: boolean }) => {
  const [copied, setCopied] = React.useState(false);

  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">{label}</span>
      <div className="flex items-center justify-between group">
        <code className={cn(
          "text-sm font-mono text-[#111827] truncate pr-4",
          isAddress && "bg-[#FAFAFA] px-2 py-1 rounded"
        )}>
          {value}
        </code>
        <button onClick={copy} className="text-[#6B7280] opacity-0 group-hover:opacity-100 transition-opacity">
          {copied ? <Check className="h-3.5 w-3.5 text-[#10B981]" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>
    </div>
  );
};
