import React from "react";
import { Search, Bell, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { WalletConnectButton, Avatar } from "@settleone/design-system";

interface TopNavigationBarProps {
  onMenuClick?: () => void;
  onSearchClick?: () => void;
}

export function TopNavigationBar({
  onMenuClick,
  onSearchClick,
}: TopNavigationBarProps) {
  return (
    <header className="h-[56px] flex items-center justify-between px-4 bg-white border-b border-[var(--border)] sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          <Menu size={20} />
        </button>
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] flex items-center justify-center text-white font-bold text-xl">
            S
          </div>
          <span className="font-bold text-lg hidden sm:block">SettleOne</span>
        </Link>
      </div>

      <div className="flex-1 max-w-xl px-4 hidden md:block">
        <button
          onClick={onSearchClick}
          className="w-full flex items-center gap-2 px-3 py-1.5 bg-[var(--bg-subtle)] border border-transparent rounded-md text-sm text-[var(--text-secondary)] hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)] focus:bg-white"
        >
          <Search size={16} />
          <span>Search deals, users, or transactions...</span>
          <div className="ml-auto flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 text-xs font-mono bg-white border border-[var(--border)] rounded">
              ⌘
            </kbd>
            <kbd className="px-1.5 py-0.5 text-xs font-mono bg-white border border-[var(--border)] rounded">
              K
            </kbd>
          </div>
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button className="hidden sm:flex items-center px-3 py-1.5 bg-[var(--accent-blue)] text-white text-sm font-semibold rounded-md shadow-sm hover:bg-blue-600 transition-colors">
          Create Deal
        </button>

        <button className="relative p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors rounded-full hover:bg-[var(--bg-subtle)]">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--accent-red)] rounded-full border border-white"></span>
        </button>

        <div className="hidden sm:block">
          <WalletConnectButton />
        </div>

        <button className="ml-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)] rounded-full">
          <Avatar initials="JD" size="sm" />
        </button>
      </div>
    </header>
  );
}
