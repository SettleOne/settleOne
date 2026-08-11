import React, { useState } from "react";
import {
  DollarSign,
  Users,
  Calendar,
  ChevronDown,
  ChevronUp,
  Copy,
  ExternalLink,
  Shield,
  Clock,
  Hash,
  FileText,
  CheckCircle,
  TrendingUp,
  Zap,
} from "lucide-react";
import { formatUnits } from "viem";
import { CHAIN_CONFIG } from "../../../lib/config";
import { SUPPORTED_CHAINS } from "../../../lib/constants";

interface DealInfoSidebarProps {
  deal: any;
}

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
      className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--accent-blue)] hover:bg-[var(--accent-blue)]/10 transition-all"
      title="Copy"
    >
      {copied ? (
        <CheckCircle size={12} className="text-[var(--accent-green)]" />
      ) : (
        <Copy size={12} />
      )}
    </button>
  );
}

function SidebarCard({
  title,
  icon,
  children,
  collapsible = false,
  accentColor = "var(--accent-blue)",
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  collapsible?: boolean;
  accentColor?: string;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-sm overflow-hidden">
      <button
        onClick={() => collapsible && setOpen((o) => !o)}
        className={`w-full px-4 py-3 flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg-subtle)] ${collapsible ? "cursor-pointer hover:bg-[var(--bg-hover)] transition-colors" : "cursor-default"}`}
      >
        <div className="flex items-center gap-2">
          <span style={{ color: accentColor }}>{icon}</span>
          <h3 className="font-semibold text-sm text-[var(--text-primary)]">
            {title}
          </h3>
        </div>
        {collapsible &&
          (open ? (
            <ChevronUp size={14} className="text-[var(--text-muted)]" />
          ) : (
            <ChevronDown size={14} className="text-[var(--text-muted)]" />
          ))}
      </button>
      {open && <div className="p-4">{children}</div>}
    </div>
  );
}

function AddressRow({
  label,
  address,
  empty,
}: {
  label: string;
  address?: string | null;
  empty?: string;
}) {
  if (!address || address === "0x0000000000000000000000000000000000000000") {
    return (
      <div className="flex items-center justify-between py-1.5">
        <span className="text-xs text-[var(--text-muted)]">{label}</span>
        <span className="text-xs text-[var(--text-muted)] italic">
          {empty || "None"}
        </span>
      </div>
    );
  }
  const short = `${address.slice(0, 6)}…${address.slice(-4)}`;
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-xs text-[var(--text-muted)]">{label}</span>
      <div className="flex items-center gap-1">
        <span className="text-xs font-mono text-[var(--text-primary)]">
          {short}
        </span>
        <CopyButton text={address} />
        <a
          href={`https://etherscan.io/address/${address}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--accent-blue)] transition-colors"
        >
          <ExternalLink size={10} />
        </a>
      </div>
    </div>
  );
}

export function DealInfoSidebar({ deal }: DealInfoSidebarProps) {
  // Resolve chain name and token symbol from config
  const chainName =
    Object.keys(CHAIN_CONFIG).find(
      (key) => CHAIN_CONFIG[key].chainId === deal.chainId,
    ) || "Unknown";
  const chainConfig = CHAIN_CONFIG[chainName];
  const chainInfo = SUPPORTED_CHAINS.find((c) => c.id === chainName);

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
  const progress =
    formattedAmount > 0
      ? Math.min(100, (formattedDeposited / formattedAmount) * 100)
      : 0;

  // Deadlines
  const now = Date.now();
  const deliveryDeadline = deal.deliveryDeadline
    ? new Date(deal.deliveryDeadline)
    : null;
  const hoursLeft = deliveryDeadline
    ? (deliveryDeadline.getTime() - now) / 3600000
    : null;
  const isExpiringSoon = hoursLeft !== null && hoursLeft > 0 && hoursLeft <= 48;

  const sellerWindowSecs = deal.sellerAcceptanceWindowSecs;
  const disputeWindowSecs = deal.disputeWindowSecs;
  const acceptanceWindowSecs = deal.acceptanceWindowSecs;

  return (
    <div className="space-y-4">
      {/* Financials */}
      <SidebarCard
        title="Financials"
        icon={<DollarSign size={15} />}
        accentColor="var(--accent-green)"
      >
        <div className="space-y-3">
          {/* Amount */}
          <div className="flex items-end justify-between">
            <span className="text-xs text-[var(--text-muted)]">
              Total Amount
            </span>
            <div className="flex items-center gap-1">
              {chainInfo?.logo && (
                <img
                  src={chainInfo.logo}
                  alt={tokenSymbol}
                  className="w-4 h-4 rounded-full bg-white"
                />
              )}
              <span className="text-base font-bold text-[var(--text-primary)]">
                {formattedAmount.toLocaleString()}
              </span>
              <span className="text-xs text-[var(--text-muted)] font-semibold">
                {tokenSymbol}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-[var(--text-muted)]">Deposited</span>
              <span
                className={
                  progress >= 100
                    ? "text-[var(--accent-green)] font-semibold"
                    : "text-[var(--accent-amber)] font-semibold"
                }
              >
                {progress.toFixed(0)}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-[var(--bg-subtle)] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${progress}%`,
                  background:
                    progress >= 100
                      ? "var(--accent-green)"
                      : "var(--accent-amber)",
                  boxShadow:
                    progress >= 100
                      ? "0 0 8px rgba(34,197,94,0.5)"
                      : "0 0 8px rgba(245,158,11,0.4)",
                }}
              />
            </div>
            <div className="flex justify-between text-[10px] mt-1 text-[var(--text-muted)]">
              <span>{formattedDeposited.toLocaleString()} deposited</span>
              <span>
                {(formattedAmount - formattedDeposited).toLocaleString()}{" "}
                remaining
              </span>
            </div>
          </div>

          <div className="border-t border-[var(--border)] pt-3 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-[var(--text-muted)]">Funding Type</span>
              <span className="text-[var(--text-primary)] font-medium capitalize">
                {deal.fundingType === "staged"
                  ? "60/40 Staged"
                  : "100% Upfront"}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[var(--text-muted)]">
                Partial Settlement
              </span>
              <span
                className={
                  deal.partialSettlementAllowed
                    ? "text-[var(--accent-green)] font-medium"
                    : "text-[var(--text-muted)] font-medium"
                }
              >
                {deal.partialSettlementAllowed ? "Allowed" : "Not Allowed"}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--text-muted)]">Chain</span>
              <div className="flex items-center gap-1.5">
                {chainInfo?.logo && (
                  <img
                    src={chainInfo.logo}
                    alt={chainName}
                    className="w-3.5 h-3.5 rounded-full"
                  />
                )}
                <span className="text-[var(--text-primary)] font-medium">
                  {chainName}
                </span>
              </div>
            </div>
          </div>
        </div>
      </SidebarCard>

      {/* Parties */}
      <SidebarCard
        title="Participants"
        icon={<Users size={15} />}
        accentColor="var(--accent-blue)"
      >
        <div className="space-y-1 divide-y divide-[var(--border)]">
          <div className="pb-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
              Buyer (Creator)
            </p>
            <AddressRow label="" address={deal.buyerAddress} />
          </div>
          <div className="py-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
              Seller
            </p>
            <AddressRow
              label=""
              address={deal.sellerAddress}
              empty="Open — Any seller can accept"
            />
          </div>
          <div className="pt-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
              Verifier / Resolver
            </p>
            <AddressRow
              label=""
              address={deal.verifierAddress}
              empty="Protocol Default"
            />
          </div>
        </div>
      </SidebarCard>

      {/* Timelines */}
      <SidebarCard
        title="Timelines"
        icon={<Calendar size={15} />}
        accentColor="var(--accent-amber)"
      >
        <div className="space-y-2 text-xs">
          {deliveryDeadline && (
            <div>
              <div className="flex justify-between mb-0.5">
                <span className="text-[var(--text-muted)]">
                  Delivery Deadline
                </span>
                <span className="font-medium text-[var(--text-primary)]">
                  {deliveryDeadline.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              {isExpiringSoon && (
                <div className="flex items-center gap-1 text-[var(--accent-red)] text-[10px] font-semibold">
                  <Zap size={10} />
                  Expires in{" "}
                  {hoursLeft! > 24
                    ? `${Math.floor(hoursLeft! / 24)}d ${Math.floor(hoursLeft! % 24)}h`
                    : `${Math.floor(hoursLeft!)}h`}
                </div>
              )}
            </div>
          )}
          {deal.createdAt && (
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Created</span>
              <span className="font-medium text-[var(--text-primary)]">
                {new Date(deal.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          )}
          <div className="border-t border-[var(--border)] pt-2 mt-2 space-y-1.5">
            {sellerWindowSecs && (
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">
                  Seller Accept Window
                </span>
                <span className="font-medium text-[var(--text-primary)]">
                  {Math.round(sellerWindowSecs / 86400)}d
                </span>
              </div>
            )}
            {acceptanceWindowSecs && (
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">
                  Buyer Review Window
                </span>
                <span className="font-medium text-[var(--text-primary)]">
                  {Math.round(acceptanceWindowSecs / 86400)}d
                </span>
              </div>
            )}
            {disputeWindowSecs && (
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Dispute Window</span>
                <span className="font-medium text-[var(--text-primary)]">
                  {Math.round(disputeWindowSecs / 86400)}d
                </span>
              </div>
            )}
          </div>
        </div>
      </SidebarCard>

      {/* Terms & Hashes — Collapsible */}
      <SidebarCard
        title="Terms & Verification"
        icon={<Shield size={15} />}
        collapsible
        accentColor="var(--accent-purple)"
      >
        <div className="space-y-3 text-xs">
          {deal.description && (
            <div>
              <p className="text-[var(--text-muted)] mb-1 font-semibold uppercase text-[10px] tracking-wider">
                Description
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed line-clamp-4">
                {deal.description}
              </p>
            </div>
          )}
          <div className="border-t border-[var(--border)] pt-3 space-y-2">
            {deal.termsHash && (
              <div>
                <p className="text-[var(--text-muted)] mb-1 flex items-center gap-1">
                  <Hash size={10} /> Terms Hash
                </p>
                <div className="flex items-center gap-1 bg-[var(--bg-subtle)] rounded px-2 py-1">
                  <p className="font-mono truncate text-[var(--text-secondary)] text-[10px] flex-1">
                    {deal.termsHash}
                  </p>
                  <CopyButton text={deal.termsHash} />
                </div>
              </div>
            )}
            {deal.metadataHash && (
              <div>
                <p className="text-[var(--text-muted)] mb-1 flex items-center gap-1">
                  <Hash size={10} /> Metadata Hash
                </p>
                <div className="flex items-center gap-1 bg-[var(--bg-subtle)] rounded px-2 py-1">
                  <p className="font-mono truncate text-[var(--text-secondary)] text-[10px] flex-1">
                    {deal.metadataHash}
                  </p>
                  <CopyButton text={deal.metadataHash} />
                </div>
              </div>
            )}
            {deal.settlementRulesHash && (
              <div>
                <p className="text-[var(--text-muted)] mb-1 flex items-center gap-1">
                  <Hash size={10} /> Settlement Rules Hash
                </p>
                <div className="flex items-center gap-1 bg-[var(--bg-subtle)] rounded px-2 py-1">
                  <p className="font-mono truncate text-[var(--text-secondary)] text-[10px] flex-1">
                    {deal.settlementRulesHash}
                  </p>
                  <CopyButton text={deal.settlementRulesHash} />
                </div>
              </div>
            )}
          </div>
          {/* Download Terms PDF — if files exist */}
          {deal.files?.some((f: any) => f.context === "terms") && (
            <a
              href={`/api/files/${deal.files.find((f: any) => f.context === "terms")?.id}/download`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--border)] hover:border-[var(--accent-purple)] hover:bg-[var(--accent-purple)]/10 transition-all text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-purple)] mt-2"
            >
              <FileText size={14} />
              Download Original Terms PDF
            </a>
          )}
        </div>
      </SidebarCard>
    </div>
  );
}
