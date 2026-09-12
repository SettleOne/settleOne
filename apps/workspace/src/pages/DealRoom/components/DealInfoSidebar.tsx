import React, { useState } from "react";
import {
  DollarSign,
  Users,
  Calendar,
  Copy,
  ExternalLink,
  CheckCircle,
} from "lucide-react";
import { formatUnits } from "viem";
import { CHAIN_CONFIG } from "../../../lib/config";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--accent-blue)]"
    >
      {copied ? (
        <CheckCircle size={12} className="text-[var(--accent-green)]" />
      ) : (
        <Copy size={12} />
      )}
    </button>
  );
}

function AddressRow({
  label,
  address,
  user,
  empty,
}: {
  label: string;
  address?: string | null;
  user?: any;
  empty?: string;
}) {
  if (!address || address === "0x0000000000000000000000000000000000000000") {
    return (
      <div className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0">
        <span className="text-xs font-semibold text-[var(--text-muted)]">
          {label}
        </span>
        <span className="text-xs text-[var(--text-muted)] italic">
          {empty || "None"}
        </span>
      </div>
    );
  }
  const short = `${address.slice(0, 6)}…${address.slice(-4)}`;
  return (
    <div className="py-2.5 border-b border-[var(--border)] last:border-0 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[var(--text-muted)]">
          {label}
        </span>
        <div className="flex items-center gap-1">
          <span className="text-xs font-mono text-[var(--text-secondary)]">
            {short}
          </span>
          <CopyButton text={address} />
          <a
            href={`https://etherscan.io/address/${address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--accent-blue)]"
          >
            <ExternalLink size={10} />
          </a>
        </div>
      </div>
      {user && (
        <div className="flex items-center gap-2 mt-0.5 bg-[var(--bg-base)] p-1.5 rounded-md border border-[var(--border)]">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name || "User"}
              className="w-6 h-6 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-[var(--accent-blue)]/10 flex items-center justify-center text-[var(--accent-blue)] text-xs font-bold shrink-0">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
          )}
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[var(--text-primary)] truncate">
              {user.name || "Unknown User"}
            </p>
            {user.organization && (
              <p className="text-[10px] text-[var(--text-muted)] truncate">
                {user.organization}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function DealInfoSidebar({ deal }: { deal: any }) {
  const chainName =
    Object.keys(CHAIN_CONFIG).find(
      (key: any) =>
        CHAIN_CONFIG[key as keyof typeof CHAIN_CONFIG].chainId === deal.chainId,
    ) || "Unknown";
  const chainConfig = CHAIN_CONFIG[chainName as keyof typeof CHAIN_CONFIG];

  let tokenSymbol = "USDC";
  let tokenDecimals = 6;
  if (chainConfig && deal.tokenAddress) {
    const entry = Object.entries(chainConfig.tokens).find(
      ([, addr]) =>
        (addr as string).toLowerCase() === deal.tokenAddress?.toLowerCase(),
    );
    if (entry) {
      tokenSymbol = entry[0];
      tokenDecimals =
        chainConfig.decimals[
          tokenSymbol as keyof typeof chainConfig.decimals
        ] || 6;
    }
  }

  const safeAmount = deal.amount ? BigInt(deal.amount.toString()) : 0n;
  const safeDeposited = deal.depositedFunds
    ? BigInt(deal.depositedFunds.toString())
    : 0n;
  const formattedAmount = Number(formatUnits(safeAmount, tokenDecimals));
  const formattedDeposited = Number(formatUnits(safeDeposited, tokenDecimals));

  return (
    <div className="space-y-4">
      {/* Escrow */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 flex items-center gap-2 border-b border-[var(--border)] bg-[var(--bg-subtle)]">
          <DollarSign size={15} className="text-[var(--accent-green)]" />
          <h3 className="font-semibold text-sm text-[var(--text-primary)]">
            Escrow
          </h3>
        </div>
        <div className="p-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-[var(--text-muted)]">Required</span>
            <span className="font-semibold text-[var(--text-primary)]">
              {formattedAmount.toLocaleString()} {tokenSymbol}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-muted)]">Deposited</span>
            <span className="font-semibold text-[var(--text-primary)]">
              {formattedDeposited.toLocaleString()} {tokenSymbol}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-muted)]">Funding Type</span>
            <span className="font-semibold text-[var(--text-primary)] capitalize">
              {deal.fundingType || "full"}
            </span>
          </div>
        </div>
      </div>

      {/* Parties */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 flex items-center gap-2 border-b border-[var(--border)] bg-[var(--bg-subtle)]">
          <Users size={15} className="text-[var(--accent-purple)]" />
          <h3 className="font-semibold text-sm text-[var(--text-primary)]">
            Parties
          </h3>
        </div>
        <div className="px-4 pb-2">
          <AddressRow
            label="Buyer"
            address={deal.buyerAddress}
            user={deal.buyer}
          />
          <AddressRow
            label="Seller"
            address={deal.sellerAddress}
            user={deal.seller}
          />
          <AddressRow
            label="Verifier"
            address={deal.verifierAddress}
            user={deal.verifier}
          />
          <AddressRow
            label="Resolver"
            address={deal.resolverAddress}
            user={deal.resolver}
          />
        </div>
      </div>

      {/* Deadlines */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 flex items-center gap-2 border-b border-[var(--border)] bg-[var(--bg-subtle)]">
          <Calendar size={15} className="text-[var(--accent-amber)]" />
          <h3 className="font-semibold text-sm text-[var(--text-primary)]">
            Deadlines
          </h3>
        </div>
        <div className="p-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-[var(--text-muted)]">Acceptance Date</span>
            <span className="font-medium text-[var(--text-primary)]">
              {deal.sellerAcceptanceDeadline
                ? new Date(deal.sellerAcceptanceDeadline).toLocaleDateString()
                : "None"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-muted)]">Delivery Due</span>
            <span className="font-medium text-[var(--text-primary)]">
              {deal.deliveryDeadline
                ? new Date(deal.deliveryDeadline).toLocaleDateString()
                : "None"}
            </span>
          </div>
          {deal.acceptanceWindowEndsAt && (
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Review Ends</span>
              <span className="font-medium text-[var(--accent-amber)]">
                {new Date(deal.acceptanceWindowEndsAt).toLocaleDateString()}
              </span>
            </div>
          )}
          {deal.disputeWindowEndsAt && (
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Dispute Ends</span>
              <span className="font-medium text-[var(--accent-red)]">
                {new Date(deal.disputeWindowEndsAt).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
