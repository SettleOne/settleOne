import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  Bell,
  User,
  Settings,
  LogOut,
  Plus,
  ChevronRight,
} from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Avatar } from "@settleone/design-system";
import { CreateDealModal } from "../modals/CreateDealModal";

interface TopNavigationBarProps {
  onMenuClick?: () => void;
}

export function TopNavigationBar({ onMenuClick }: TopNavigationBarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfile, setShowProfile] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node))
        setShowProfile(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isOnMarketplace =
    location.pathname === "/marketplace" ||
    location.pathname.startsWith("/marketplace/");

  const navLinks = [
    { label: "MARKETPLACE", path: "/marketplace" },
    { label: "PORTFOLIO", path: "/portfolio" },
  ];

  return (
    <>
      <header
        className="h-[76px] flex items-center justify-between px-6 sticky top-0 z-40 transition-all duration-300"
        style={{
          background: "rgba(5, 10, 20, 0.75)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 10px 40px -10px rgba(0,0,0,0.8)",
        }}
      >
        {/* LEFT: Logo & Sidebar Toggle */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <button
            onClick={onMenuClick}
            className="group relative p-2.5 -ml-2 rounded-xl transition-all duration-300 hover:bg-white/5 cursor-pointer"
          >
            <Menu
              size={24}
              className="text-slate-400 group-hover:text-white transition-colors"
            />
          </button>

          <div
            onClick={onMenuClick}
            className="flex items-center gap-3 cursor-pointer group pr-4"
            title="Toggle Sidebar"
          >
            <img
              src="/whiteLogo.png"
              alt="SettleOne Logo"
              className="h-10 object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            />
            <span className="hidden sm:block text-xl lg:text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
              SettleOne
            </span>
          </div>
        </div>

        {/* MIDDLE: Navigation Links */}
        <div className="hidden lg:flex flex-1 items-center justify-center gap-6 px-4">
          <div className="flex items-center gap-2 bg-white/[0.03] p-2 rounded-full border border-white/5 shadow-inner">
            {navLinks.map((link) => {
              const isActive = location.pathname.startsWith(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-6 xl:px-8 py-2.5 rounded-full text-[11px] xl:text-xs font-bold tracking-[0.1em] transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? "text-white bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Floating Create Deal Button */}
          {!isOnMarketplace && (
            <div className="animate-fade-in pl-4 border-l border-white/10 shrink-0">
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="group flex items-center gap-2 px-5 xl:px-6 py-2.5 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 text-white text-[10px] xl:text-xs font-bold tracking-widest rounded-full hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 border border-white/20 whitespace-nowrap"
              >
                <Plus
                  size={16}
                  strokeWidth={3}
                  className="group-hover:rotate-90 transition-transform duration-300"
                />
                CREATE DEAL
              </button>
            </div>
          )}
        </div>

        {/* RIGHT: Actions */}
        <div className="flex items-center justify-end gap-3 xl:gap-5 flex-shrink-0">
          {/* Notifications */}
          <button
            onClick={() => navigate("/inbox")}
            className="relative p-2.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            title="Notifications"
          >
            <Bell size={20} className="drop-shadow-lg" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-gradient-to-tr from-red-600 to-rose-400 rounded-full border-2 border-[#0a0f18] shadow-[0_0_8px_rgba(225,29,72,0.8)]" />
          </button>

          {/* Custom Premium Connect Wallet */}
          <div className="hidden sm:block">
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
              }) => {
                const ready = mounted && authenticationStatus !== "loading";
                const connected =
                  ready &&
                  account &&
                  chain &&
                  (!authenticationStatus ||
                    authenticationStatus === "authenticated");

                return (
                  <div
                    {...(!ready && {
                      "aria-hidden": true,
                      style: {
                        opacity: 0,
                        pointerEvents: "none",
                        userSelect: "none",
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <button
                            onClick={openConnectModal}
                            type="button"
                            className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-xs font-bold tracking-wide text-white transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                          >
                            Connect Wallet
                          </button>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <button
                            onClick={openChainModal}
                            type="button"
                            className="px-5 py-2.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-full text-xs font-bold tracking-wide text-red-400 transition-all shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.4)]"
                          >
                            Wrong network
                          </button>
                        );
                      }

                      return (
                        <div className="flex items-center gap-3">
                          {/* Chain Button */}
                          <button
                            onClick={openChainModal}
                            className="flex items-center gap-2.5 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all cursor-pointer whitespace-nowrap"
                            type="button"
                          >
                            {chain.hasIcon && (
                              <div
                                style={{
                                  background: chain.iconBackground,
                                  width: 20,
                                  height: 20,
                                  borderRadius: 999,
                                  overflow: "hidden",
                                }}
                              >
                                {chain.iconUrl && (
                                  <img
                                    alt={chain.name ?? "Chain icon"}
                                    src={chain.iconUrl}
                                    style={{ width: 20, height: 20 }}
                                  />
                                )}
                              </div>
                            )}
                            <span className="text-xs font-bold tracking-wide text-white/90">
                              {chain.name}
                            </span>
                          </button>

                          {/* Address/Account Button */}
                          <button
                            onClick={openAccountModal}
                            type="button"
                            className="px-5 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 hover:from-blue-500/20 hover:to-cyan-400/20 border border-blue-500/20 hover:border-cyan-400/40 rounded-full text-xs font-bold tracking-wider text-cyan-50 transition-all shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] whitespace-nowrap"
                          >
                            <span className="drop-shadow-[0_0_5px_rgba(255,255,255,0.4)]">
                              {account.displayName}
                            </span>
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>

          {/* Avatar / Profile Dropdown */}
          <div ref={profileRef} className="relative ml-1">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="focus:outline-none rounded-full p-0.5 bg-gradient-to-tr from-blue-500/20 to-cyan-400/20 hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]"
            >
              <div className="bg-[#050a14] rounded-full p-[2px]">
                <Avatar initials="JD" size="md" />
              </div>
            </button>

            {showProfile && (
              <div className="absolute right-0 top-full mt-4 w-64 bg-[#0a0f1a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] py-2 animate-fade-in z-50 overflow-hidden">
                {/* Header Gradient */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-400"></div>

                <div className="px-5 py-4 border-b border-white/5 bg-white/[0.02]">
                  <p className="font-bold text-sm text-white tracking-wide">
                    John Doe
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    john@example.com
                  </p>
                </div>
                <div className="px-3 py-2 mt-1 flex flex-col gap-1">
                  <Link
                    to="/profile"
                    onClick={() => setShowProfile(false)}
                    className="w-full group text-left px-3 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <User
                        size={16}
                        className="text-slate-400 group-hover:text-blue-400 transition-colors"
                      />
                      <span className="font-medium">My Profile</span>
                    </div>
                    <ChevronRight
                      size={14}
                      className="text-slate-600 group-hover:text-white transition-colors"
                    />
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setShowProfile(false)}
                    className="w-full group text-left px-3 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Settings
                        size={16}
                        className="text-slate-400 group-hover:text-cyan-400 transition-colors"
                      />
                      <span className="font-medium">Settings</span>
                    </div>
                    <ChevronRight
                      size={14}
                      className="text-slate-600 group-hover:text-white transition-colors"
                    />
                  </Link>
                </div>
                <div className="px-3 py-2 mt-1 border-t border-white/5 bg-red-500/[0.02]">
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full group text-left px-3 py-2.5 text-sm text-red-400/90 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-all duration-200 flex items-center gap-3"
                  >
                    <LogOut
                      size={16}
                      className="group-hover:scale-110 transition-transform"
                    />
                    <span className="font-semibold">Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {isCreateModalOpen && (
        <CreateDealModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}
    </>
  );
}
