import React from "react";
import { Clock, ShieldAlert, Calendar, ArrowRight, UserCheck } from "lucide-react";
import {
  DealStateTag,
  NetworkBadge,
  CountdownTimer,
} from "@settleone/design-system";
import { DealState, DealType } from "@settleone/types";
import {
  getDealStateColor,
  getDealStateLabel,
  formatAmount,
} from "@settleone/utils";
import { Link } from "react-router-dom";

interface DealCardProps {
  id: string | bigint;
  title?: string;
  amount: bigint;
  state: DealState;
  dealType: DealType;
  deliveryDeadline: bigint;
  chainId: number;
  creatorAddress?: string;
  isStagedFunding?: boolean;
  depositedAmount?: bigint;
  tokenSymbol?: string;
  createdAt?: bigint;
}

export function DealCard({
  id,
  title,
  amount,
  state,
  dealType,
  deliveryDeadline,
  chainId,
  creatorAddress = "0x7a2...3f9",
  isStagedFunding = false,
  depositedAmount = amount,
  tokenSymbol = "USDC",
  createdAt = BigInt(Date.now() - 3 * 24 * 60 * 60 * 1000)
}: DealCardProps) {
  const isHardDelivery = dealType === DealType.HardDelivery;
  const isSoftware = !isHardDelivery;
  const isOpen = state === DealState.AwaitingFunding || state === DealState.PendingSellerAcceptance;
  
  const fundingPercentage = isStagedFunding 
    ? Number((depositedAmount * 100n) / amount)
    : 100;

  return (
    <Link to={`/marketplace/${id}`} className="block group relative overflow-hidden rounded-[var(--radius-card)]">
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-card)] p-5 flex flex-col h-full hover:border-[var(--accent-blue)] hover:shadow-[var(--shadow-glow)] transition-all relative z-10 duration-300">
        
        {/* Top row */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-2 py-1 rounded-[var(--radius-pill)] ${
              isSoftware 
                ? "bg-[rgba(59,130,246,0.1)] text-[var(--accent-blue)]" 
                : "bg-[rgba(245,158,11,0.1)] text-[var(--accent-amber)]"
            }`}>
              {isSoftware ? "Software" : "Hardware"}
            </span>
            <span className="text-xs text-[var(--text-secondary)] font-medium hidden sm:inline-block border border-[var(--border)] rounded-full px-2 py-0.5">
              {isSoftware ? "Smart Contract Audit" : "Manufacturing"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--bg-subtle)] border border-[var(--border)]">
              <div 
                className="w-2 h-2 rounded-full animate-pulse" 
                style={{ backgroundColor: getDealStateColor(state), boxShadow: `0 0 8px ${getDealStateColor(state)}` }} 
              />
              <span 
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: getDealStateColor(state) }}
              >
                {getDealStateLabel(state)}
              </span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-[16px] font-semibold text-[var(--text-primary)] mb-1 leading-tight line-clamp-2 group-hover:text-[var(--accent-blue)] transition-colors">
          {title || "Smart Contract Audit for DeFi Protocol"}
        </h3>
        
        {/* Deal ID */}
        <p className="text-xs font-mono text-[var(--text-muted)] mb-4">
          #DL-{String(id).padStart(5, "0")}
        </p>

        {/* Buyer row */}
        <div className="flex items-center gap-2 mb-4 text-sm bg-[var(--bg-subtle)] w-fit px-3 py-1.5 rounded-md border border-[var(--border-light)]">
          <span className="text-[var(--text-secondary)] text-xs">Creator:</span>
          <span className="font-mono text-[var(--accent-blue)] hover:underline text-xs">
            {creatorAddress}
          </span>
          <UserCheck size={14} className="text-[var(--accent-green)] ml-1" />
        </div>

        {/* Amount row */}
        <div className="mb-4">
          <p className="text-[24px] font-bold text-[var(--text-primary)] tracking-tight">
            {formatAmount(amount, 6)} <span className="text-lg text-[var(--text-secondary)]">{tokenSymbol}</span>
          </p>
          {isStagedFunding && (
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Deposited: {formatAmount(depositedAmount, 6)} {tokenSymbol} ({fundingPercentage}%)
            </p>
          )}
        </div>

        {/* Timeline row */}
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
            <Calendar size={14} className="text-[var(--text-muted)]" />
            <span>Deadline: <strong className="text-[var(--text-primary)] font-medium">{deliveryDeadline > 0 ? new Date(Number(deliveryDeadline) * 1000).toLocaleDateString() : "Not set"}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
            <Clock size={14} className="text-[var(--text-muted)]" />
            <span>Created {new Date(Number(createdAt)).toLocaleDateString()}</span>
          </div>
          
          {/* Warning state for approaching deadlines */}
          {deliveryDeadline > 0 && Number(deliveryDeadline) * 1000 - Date.now() < 3 * 24 * 60 * 60 * 1000 && (
            <div className="text-[var(--accent-amber)] text-xs font-semibold flex items-center gap-1 mt-1 bg-[rgba(245,158,11,0.1)] w-fit px-2 py-1 rounded">
              <Clock size={12} />
              Expires soon
            </div>
          )}
        </div>

        {/* Progress bar */}
        {isStagedFunding && (
          <div className="h-1 w-full bg-[var(--bg-base)] rounded-full mb-4 overflow-hidden border border-[var(--border)]">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${fundingPercentage === 100 ? 'bg-[var(--accent-green)]' : fundingPercentage > 0 ? 'bg-[var(--accent-blue)]' : 'bg-[var(--text-muted)]'}`}
              style={{ width: `${fundingPercentage}%`, boxShadow: `0 0 10px ${fundingPercentage === 100 ? 'var(--accent-green)' : 'var(--accent-blue)'}` }}
            />
          </div>
        )}

        {/* Bottom row */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-[var(--border)]">
          <div className="flex items-center gap-2">
            <NetworkBadge chainId={chainId} className="!py-1 !px-2 !bg-[var(--bg-subtle)] !border-[var(--border)] !text-[var(--text-primary)]" />
            <span className="flex items-center gap-1.5 text-xs font-medium bg-[var(--bg-subtle)] text-[var(--text-primary)] px-2 py-1 rounded-[var(--radius-pill)] border border-[var(--border)]">
              <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              {tokenSymbol}
            </span>
          </div>
          <span className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--accent-blue)] flex items-center gap-1 transition-colors">
            View Deal <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
          </span>
        </div>
      </div>
      
      {/* Accept Deal Hover Overlay */}
      {isOpen && (
        <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-[var(--bg-base)] via-[var(--bg-card)] to-transparent translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-end z-20 pb-5">
          <button className="w-full py-2.5 bg-[var(--accent-blue)] hover:bg-[var(--accent-blue-hover)] text-white text-sm font-bold rounded-[var(--radius-input)] shadow-[var(--shadow-glow)] transition-colors flex items-center justify-center gap-2">
            Accept Deal <ArrowRight size={16} />
          </button>
        </div>
      )}
    </Link>
  );
}
