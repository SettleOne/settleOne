import React from 'react';
import { ShieldCheck, Hash, Link, ExternalLink } from 'lucide-react';
import { cn } from '../../index';

interface EvidenceHashVerifierProps {
  hash: string;
  txHash: string;
  timestamp: string;
  verifier: string;
}

export const EvidenceHashVerifier = ({ hash, txHash, timestamp, verifier }: EvidenceHashVerifierProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-[12px] border border-[#10B981]/20 bg-[#10B981]/5 p-6 shadow-sm">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-[#10B981]" />
        <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider">Cryptographic Verification</h3>
      </div>
      <div className="space-y-3">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider flex items-center gap-1">
            <Hash className="h-3 w-3" /> SHA-256 Hash
          </span>
          <code className="text-sm font-mono text-[#111827] bg-white border border-[#E5E7EB] rounded p-2 overflow-x-auto">
            {hash}
          </code>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider flex items-center gap-1">
              <Link className="h-3 w-3" /> On-Chain Anchor
            </span>
            <a href="#" className="text-sm font-mono text-[#3B82F6] hover:underline flex items-center gap-1">
              {txHash} <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Verified By</span>
            <span className="text-sm font-medium text-[#111827]">{verifier}</span>
          </div>
        </div>
        <div className="pt-2 border-t border-[#10B981]/20">
          <span className="text-xs text-[#10B981] font-medium flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5" /> Hash matches on-chain record at {timestamp}.
          </span>
        </div>
      </div>
    </div>
  );
};
