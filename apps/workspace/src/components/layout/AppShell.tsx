import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { TopNavigationBar } from "./TopNavigationBar";
import { SidebarNavigation } from "./SidebarNavigation";
import { LayoutGrid, PieChart, Inbox, Activity, User } from "lucide-react";

export function AppShell() {
  const [isCommandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const bottomTabs = [
    { path: "/marketplace", icon: LayoutGrid, label: "Market" },
    { path: "/portfolio", icon: PieChart, label: "Portfolio" },
    { path: "/inbox", icon: Inbox, label: "Inbox", badge: 3 },
    { path: "/deals/active", icon: Activity, label: "Deals" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <div
      className="min-h-screen bg-[var(--bg-base)] flex flex-col"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <TopNavigationBar
        onMenuClick={() => {
          if (window.innerWidth < 640) {
            setMobileSidebarOpen(true);
          } else {
            setSidebarOpen(!isSidebarOpen);
          }
        }}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        {isSidebarOpen && <SidebarNavigation />}

        {/* Mobile sidebar overlay */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 z-50 sm:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <div
              className="absolute left-0 top-0 bottom-0 w-[280px] bg-[var(--bg-card)] border-r border-[var(--border)] shadow-[var(--shadow-modal)] animate-slide-in"
              onClick={(e) => e.stopPropagation()}
            >
              <SidebarNavigation
                mobile
                onClose={() => setMobileSidebarOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Main content */}
        <main
          className="flex-1 flex flex-col h-[calc(100vh-56px)] overflow-y-auto"
          style={{ paddingBottom: "60px" }} // space for mobile bottom tab bar
        >
          {/* Deal room uses full width, others get padding */}
          {location.pathname.startsWith("/marketplace/") &&
          location.pathname !== "/marketplace" ? (
            <Outlet />
          ) : (
            <div className="p-4 md:p-6 max-w-[1280px] mx-auto w-full flex-1">
              <Outlet />
            </div>
          )}
        </main>
      </div>

      {/* Mobile Bottom Tab Bar */}
      <div
        className="sm:hidden fixed bottom-0 left-0 right-0 h-[60px] bg-[var(--bg-card)] border-t border-[var(--border)] z-40 flex"
        style={{ boxShadow: "0 -4px 20px rgba(0,0,0,0.4)" }}
      >
        {bottomTabs.map((tab) => {
          const isActive = location.pathname.startsWith(tab.path);
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex-1 flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors relative ${
                isActive
                  ? "text-[var(--accent-blue)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
              }`}
            >
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[var(--accent-blue)] rounded-full" />
              )}
              <div className="relative">
                <tab.icon size={20} />
                {tab.badge && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[var(--accent-red)] text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Command Palette */}
      {isCommandPaletteOpen && (
        <div
          className="fixed inset-0 bg-black/75 z-50 flex items-start justify-center pt-16 md:pt-24 backdrop-blur-sm"
          onClick={() => setCommandPaletteOpen(false)}
        >
          <div
            className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-modal)] shadow-[var(--shadow-modal)] w-full max-w-xl mx-4 overflow-hidden animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-[var(--border)] flex items-center gap-3">
              <span className="text-[var(--text-secondary)]">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </span>
              <input
                autoFocus
                type="text"
                placeholder="Search deals, users, or transactions…"
                className="flex-1 bg-transparent border-none outline-none text-base text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
              />
              <button
                onClick={() => setCommandPaletteOpen(false)}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                <kbd className="px-1.5 py-0.5 text-xs font-mono bg-[var(--bg-subtle)] border border-[var(--border)] rounded">
                  ESC
                </kbd>
              </button>
            </div>
            <div className="p-2">
              <p className="px-3 py-2 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
                Quick Actions
              </p>
              {[
                { label: "Create a new deal", icon: "+" },
                { label: "View active deals", icon: "⚡" },
                { label: "Go to portfolio", icon: "📊" },
                { label: "Open inbox", icon: "📬" },
              ].map((item) => (
                <button
                  key={item.label}
                  className="w-full text-left px-3 py-2.5 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-hover)] rounded-md transition-colors flex items-center gap-3"
                  onClick={() => setCommandPaletteOpen(false)}
                >
                  <span className="w-6 h-6 flex items-center justify-center bg-[var(--bg-subtle)] rounded text-xs">
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-[var(--border)] flex items-center gap-4 text-xs text-[var(--text-muted)]">
              <span>
                <kbd className="font-mono">↑↓</kbd> navigate
              </span>
              <span>
                <kbd className="font-mono">↵</kbd> select
              </span>
              <span>
                <kbd className="font-mono">ESC</kbd> close
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
