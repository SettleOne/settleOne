import React, { useState, useRef, useEffect } from "react";
import { Search, Bell, Menu, X, ChevronDown, Copy, ExternalLink, LogOut, User, Settings, Plus, Check, Wifi } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { WalletConnectButton, Avatar } from "@settleone/design-system";
import { useAccount, useChainId, useDisconnect } from "wagmi";
import { CreateDealModal } from "../modals/CreateDealModal";

interface TopNavigationBarProps {
  onMenuClick?: () => void;
  onSearchClick?: () => void;
}

const CHAIN_NAMES: Record<number, string> = {
  1: "Ethereum",
  137: "Polygon",
  42161: "Arbitrum",
  8453: "Base",
};

function formatAddress(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export function TopNavigationBar({ onMenuClick, onSearchClick }: TopNavigationBarProps) {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { disconnect } = useDisconnect();

  const [showProfile, setShowProfile] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [showInbox, setShowInbox] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const walletRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setShowProfile(false);
      if (walletRef.current && !walletRef.current.contains(e.target as Node)) setShowWallet(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const chainName = chainId ? CHAIN_NAMES[chainId] ?? `Chain ${chainId}` : "Unknown";

  return (
    <>
      <header
        className="h-[56px] flex items-center justify-between px-4 sticky top-0 z-40"
        style={{
          background: "rgba(12, 21, 36, 0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
          boxShadow: "0 1px 0 rgba(59,130,246,0.08)",
        }}
      >
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="sm:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] rounded-md transition-colors"
          >
            <Menu size={20} />
          </button>
          <Link to="/marketplace" className="flex items-center gap-2 hover:opacity-85 transition-opacity">
            <img src="/whiteLogo.png" alt="SettleOne" className="h-7 object-contain" />
          </Link>
        </div>

        {/* CENTER: Search */}
        <div className="flex-1 max-w-lg px-4 hidden md:block">
          <button
            onClick={onSearchClick}
            className="w-full flex items-center gap-2 px-3 py-1.5 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-[var(--radius-input)] text-sm text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:border-[var(--border-light)] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)]"
          >
            <Search size={15} className="text-[var(--text-muted)]" />
            <span>Search deals, users, or transactions…</span>
            <div className="ml-auto flex items-center gap-0.5">
              <kbd className="px-1.5 py-0.5 text-xs font-mono bg-[var(--bg-card)] border border-[var(--border)] rounded text-[var(--text-muted)]">⌘</kbd>
              <kbd className="px-1.5 py-0.5 text-xs font-mono bg-[var(--bg-card)] border border-[var(--border)] rounded text-[var(--text-muted)]">K</kbd>
            </div>
          </button>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-1.5">
          {/* Create Deal button */}
          <button
            onClick={() => setShowCreateModal(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[var(--accent-blue)] text-white text-sm font-semibold rounded-[var(--radius-input)] hover:bg-[var(--accent-blue-hover)] transition-all shadow-[var(--shadow-glow)]"
          >
            <Plus size={15} />
            Create Deal
          </button>

          {/* Inbox / Bell */}
          <button
            onClick={() => navigate("/inbox")}
            className="relative p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] rounded-md transition-colors"
            title="Inbox"
          >
            <Bell size={19} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--accent-red)] rounded-full border-2 border-[var(--bg-card)]" />
          </button>

          {/* Wallet */}
          <div ref={walletRef} className="relative hidden sm:block">
            {isConnected && address ? (
              <button
                onClick={() => setShowWallet(!showWallet)}
                className="flex items-center gap-2 px-3 py-1.5 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-[var(--radius-input)] text-sm hover:border-[var(--border-light)] hover:bg-[var(--bg-hover)] transition-all"
              >
                <div className="w-2 h-2 rounded-full bg-[var(--accent-green)] animate-pulse-dot" />
                <span className="font-mono text-[var(--text-primary)] text-xs">{formatAddress(address)}</span>
                <span className="text-[10px] font-medium text-[var(--accent-blue-bright)] bg-[var(--accent-blue-glow2)] px-1.5 py-0.5 rounded-full border border-[var(--accent-blue)]/20">
                  {chainName}
                </span>
                <ChevronDown size={14} className="text-[var(--text-muted)]" />
              </button>
            ) : (
              <WalletConnectButton />
            )}

            {showWallet && isConnected && address && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-card)] shadow-[var(--shadow-modal)] py-2 animate-fade-in z-50">
                <div className="px-4 py-3 border-b border-[var(--border)]">
                  <div className="flex items-center gap-2 mb-2">
                    <Wifi size={14} className="text-[var(--accent-green)]" />
                    <span className="text-xs text-[var(--accent-green)] font-semibold">Connected · {chainName}</span>
                  </div>
                  <div className="flex items-center justify-between bg-[var(--bg-base)] px-3 py-2 rounded-[var(--radius-input)] border border-[var(--border)]">
                    <span className="font-mono text-xs text-[var(--text-primary)] truncate">{address}</span>
                    <button
                      onClick={handleCopyAddress}
                      className="ml-2 p-1 text-[var(--text-muted)] hover:text-[var(--accent-blue)] transition-colors shrink-0"
                      title="Copy address"
                    >
                      {copied ? <Check size={14} className="text-[var(--accent-green)]" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
                <div className="px-2 py-1">
                  <button
                    className="w-full text-left px-3 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)] rounded-md transition-colors flex items-center gap-2"
                    onClick={() => { window.open(`https://etherscan.io/address/${address}`, "_blank"); setShowWallet(false); }}
                  >
                    <ExternalLink size={14} />
                    View on Etherscan
                  </button>
                  <button
                    className="w-full text-left px-3 py-2 text-sm text-[var(--accent-red)] hover:bg-red-900/20 rounded-md transition-colors flex items-center gap-2"
                    onClick={() => { disconnect(); setShowWallet(false); }}
                  >
                    <X size={14} />
                    Disconnect Wallet
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile avatar */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)] rounded-full border-2 border-transparent hover:border-[var(--accent-blue)] transition-all"
            >
              <Avatar initials="JD" size="sm" />
            </button>

            {showProfile && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-card)] shadow-[var(--shadow-modal)] py-2 animate-fade-in z-50">
                <div className="px-4 py-3 border-b border-[var(--border)]">
                  <p className="font-semibold text-sm text-[var(--text-primary)]">John Doe</p>
                  <p className="text-xs text-[var(--text-muted)]">john@example.com</p>
                </div>
                <div className="px-2 py-1">
                  <Link
                    to="/profile"
                    onClick={() => setShowProfile(false)}
                    className="w-full text-left px-3 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)] rounded-md transition-colors flex items-center gap-2"
                  >
                    <User size={14} />
                    My Profile
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setShowProfile(false)}
                    className="w-full text-left px-3 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)] rounded-md transition-colors flex items-center gap-2"
                  >
                    <Settings size={14} />
                    Settings
                  </Link>
                </div>
                <div className="px-2 py-1 border-t border-[var(--border)]">
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full text-left px-3 py-2 text-sm text-[var(--accent-red)] hover:bg-red-900/20 rounded-md transition-colors flex items-center gap-2"
                  >
                    <LogOut size={14} />
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Create Deal Modal */}
      <CreateDealModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />
    </>
  );
}
