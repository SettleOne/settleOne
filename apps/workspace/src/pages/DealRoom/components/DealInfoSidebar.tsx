import React, { useState } from "react";
import { DollarSign, Users, Calendar, Copy, ExternalLink, CheckCircle } from "lucide-react";
import { formatUnits } from "viem";
import { CHAIN_CONFIG } from "../../../lib/config";
import { SUPPORTED_CHAINS } from "../../../lib/constants";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--accent-blue)]">
      {copied ? <CheckCircle size={12} className="text-[var(--accent-green)]" /> : <Copy size={12} />}
    </button>
  );
}

function AddressRow({ label, address, empty }: { label: string; address?: string | null; empty?: string }) {
  if (!address || address === "0x0000000000000000000000000000000000000000") {
    return (
      <div className="flex items-center justify-between py-1.5">
        <span className="text-xs text-[var(--text-muted)]">{label}</span>
        <span className="text-xs text-[var(--text-muted)] italic">{empty || "None"}</span>
      </div>
    );
  }
  const short = `${address.slice(0, 6)}…${address.slice(-4)}`;
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-xs text-[var(--text-muted)]">{label}</span>
      <div className="flex items-center gap-1">
        <span className="text-xs font-mono text-[var(--text-primary)]">{short}</span>
        <CopyButton text={address} />
        <a href={`https://etherscan.io/address/${address}`} target="_blank" rel="noopener noreferrer" className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--accent-blue)]">
          <ExternalLink size={10} />
        </a>
      </div>
    </div>
  );
}

export function DealInfoSidebar({ deal }: { deal: any }) {
  const chainName = Object.keys(CHAIN_CONFIG).find((key) => CHAIN_CONFIG[key].chainId === deal.chainId) || "Unknown";
  const chainConfig = CHAIN_CONFIG[chainName];

  let tokenSymbol = "USDC";
  let tokenDecimals = 6;
  if (chainConfig && deal.tokenAddress) {
    const entry = Object.entries(chainConfig.tokens).find(([, addr]) => (addr as string).toLowerCase() === deal.tokenAddress?.toLowerCase());
    if (entry) {
      tokenSymbol = entry[0];
      tokenDecimals = chainConfig.decimals[tokenSymbol as keyof typeof chainConfig.decimals] || 6;
    }
  }

  const safeAmount = deal.amount ? BigInt(deal.amount.toString()) : 0n;
  const safeDeposited = deal.depositedFunds ? BigInt(deal.depositedFunds.toString()) : 0n;
  const formattedAmount = Number(formatUnits(safeAmount, tokenDecimals));
  const formattedDeposited = Number(formatUnits(safeDeposited, tokenDecimals));

  return (
    <div className="space-y-4">
      {/* Escrow */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 flex items-center gap-2 border-b border-[var(--border)] bg-[var(--bg-subtle)]">
          <DollarSign size={15} className="text-[var(--accent-green)]" />
          <h3 className="font-semibold text-sm text-[var(--text-primary)]">Escrow</h3>
        </div>
        <div className="p-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-[var(--text-muted)]">Required</span>
            <span className="font-semibold text-[var(--text-primary)]">{formattedAmount.toLocaleString()} {tokenSymbol}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-muted)]">Deposited</span>
            <span className="font-semibold text-[var(--text-primary)]">{formattedDeposited.toLocaleString()} {tokenSymbol}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-muted)]">Funding Type</span>
            <span className="font-semibold text-[var(--text-primary)]">{deal.fundingType === "staged" ? "Staged" : "Full"}</span>
          </div>
        </div>
      </div>

      {/* Parties */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 flex items-center gap-2 border-b border-[var(--border)] bg-[var(--bg-subtle)]">
          <Users size={15} className="text-[var(--accent-purple)]" />
          <h3 className="font-semibold text-sm text-[var(--text-primary)]">Parties</h3>
        </div>
        <div className="p-4 space-y-1 text-sm">
          <AddressRow label="Buyer" address={deal.buyerAddress} />
          <AddressRow label="Seller" address={deal.sellerAddress} />
          <AddressRow label="Verifier" address={deal.verifierAddress} />
          <AddressRow label="Resolver" address={deal.resolverAddress} />
        </div>
      </div>

      {/* Deadlines */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 flex items-center gap-2 border-b border-[var(--border)] bg-[var(--bg-subtle)]">
          <Calendar size={15} className="text-[var(--accent-amber)]" />
          <h3 className="font-semibold text-sm text-[var(--text-primary)]">Deadlines</h3>
        </div>
        <div className="p-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-[var(--text-muted)]">Seller Acceptance</span>
            <span className="font-medium text-[var(--text-primary)]">{deal.sellerAcceptanceDeadline ? new Date(deal.sellerAcceptanceDeadline).toLocaleDateString() : "None"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-muted)]">Delivery</span>
            <span className="font-medium text-[var(--text-primary)]">{deal.deliveryDeadline ? new Date(deal.deliveryDeadline).toLocaleDateString() : "None"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
