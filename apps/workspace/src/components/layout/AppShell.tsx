import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { TopNavigationBar } from "./TopNavigationBar";
import { SidebarNavigation } from "./SidebarNavigation";
import { LayoutGrid, PieChart, Inbox, Activity, User } from "lucide-react";

export function AppShell() {
  const [isCommandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDealRoom =
    location.pathname.startsWith("/deal/") ||
    (location.pathname.startsWith("/marketplace/") &&
      location.pathname !== "/marketplace");

  const bottomTabs = [
    { path: "/marketplace", icon: LayoutGrid, label: "Market" },
    { path: "/portfolio", icon: PieChart, label: "Portfolio" },
    { path: "/inbox", icon: Inbox, label: "Inbox", badge: 3 },
    { path: "/deals/active", icon: Activity, label: "Deals" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        fontFamily: "var(--font-sans)",
        background: "var(--bg-base)",
        backgroundImage: `
          radial-gradient(ellipse 90% 45% at 50% -5%, rgba(59,130,246,0.08) 0%, transparent 65%),
          radial-gradient(ellipse 55% 35% at 85% 105%, rgba(6,182,212,0.06) 0%, transparent 60%),
          radial-gradient(ellipse 40% 25% at 5% 50%, rgba(139,92,246,0.04) 0%, transparent 60%)
        `,
        backgroundAttachment: "fixed",
      }}
    >
      {/* Floating ambient orbs (decorative) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "15%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)",
            animation: "drift 20s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            right: "10%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(6,182,212,0.035) 0%, transparent 70%)",
            animation: "drift 25s ease-in-out infinite reverse",
          }}
        />
        {/* Subtle dot grid overlay */}
        <div className="absolute inset-0 line-grid" style={{ opacity: 0.4 }} />
      </div>

      {/* Top Nav */}
      <TopNavigationBar
        onMenuClick={() => {
          if (window.innerWidth < 640) {
            setMobileSidebarOpen(true);
          } else {
            setSidebarOpen(!isSidebarOpen);
          }
        }}
      />

      <div className="flex flex-1 overflow-hidden relative z-10">
        {/* Desktop Sidebar with animation */}
        <div
          style={{
            width: isSidebarOpen ? "260px" : "0px",
            overflow: "hidden",
            transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            flexShrink: 0,
          }}
        >
          {isSidebarOpen && <SidebarNavigation />}
        </div>

        {/* Mobile sidebar overlay */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 z-50 sm:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md animate-fade-in" />
            <div
              className="absolute left-0 top-0 bottom-0 w-[280px] animate-slide-in"
              style={{
                background: "rgba(4, 8, 16, 0.95)",
                backdropFilter: "blur(24px)",
                borderRight: "1px solid rgba(255,255,255,0.05)",
                boxShadow: "20px 0 60px rgba(0,0,0,0.8)",
              }}
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
          style={{ paddingBottom: "60px" }}
        >
          {isDealRoom ? (
            <div className={mounted ? "animate-fade-in" : ""}>
              <Outlet />
            </div>
          ) : (
            <div className="p-4 md:p-6 max-w-[1360px] mx-auto w-full flex-1">
              <div className={mounted ? "animate-fade-in" : ""}>
                <Outlet />
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Bottom Tab Bar */}
      <div
        className="sm:hidden fixed bottom-0 left-0 right-0 h-[60px] z-40 flex"
        style={{
          background: "rgba(4, 8, 16, 0.92)",
          backdropFilter: "blur(24px)",
          borderTop: "1px solid rgba(255, 255, 255, 0.05)",
          boxShadow: "0 -8px 32px rgba(0,0,0,0.6)",
        }}
      >
        {bottomTabs.map((tab) => {
          const isActive = location.pathname.startsWith(tab.path);
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold relative transition-all duration-200 ${
                isActive
                  ? "text-[var(--accent-blue-bright)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
              }`}
            >
              {isActive && (
                <>
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-0.5 rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
                      boxShadow: "0 0 8px rgba(59,130,246,0.8)",
                    }}
                  />
                  <div
                    className="absolute inset-0 rounded-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.08) 0%, transparent 70%)",
                    }}
                  />
                </>
              )}
              <div className="relative">
                <tab.icon size={19} />
                {tab.badge && (
                  <span
                    className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 text-white text-[8px] font-black rounded-full flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #ef4444, #dc2626)",
                      boxShadow: "0 0 8px rgba(239,68,68,0.6)",
                    }}
                  >
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="tracking-wide">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Command Palette */}
      {isCommandPaletteOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center pt-16 md:pt-24 backdrop-blur-md"
          onClick={() => setCommandPaletteOpen(false)}
        >
          <div
            className="w-full max-w-xl mx-4 overflow-hidden animate-scale-in"
            style={{
              background: "rgba(10, 18, 32, 0.95)",
              backdropFilter: "blur(32px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "var(--radius-modal)",
              boxShadow: "var(--shadow-modal)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="p-4 flex items-center gap-3"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
            >
              <span className="text-[var(--text-muted)]">
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
                <kbd
                  className="px-1.5 py-0.5 text-xs font-mono rounded"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
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
              ].map((item, i) => (
                <button
                  key={item.label}
                  className="w-full text-left px-3 py-2.5 text-sm text-[var(--text-primary)] rounded-lg transition-all flex items-center gap-3 list-item-hover"
                  style={{ animationDelay: `${i * 40}ms` }}
                  onClick={() => setCommandPaletteOpen(false)}
                >
                  <span
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-sm"
                    style={{
                      background: "rgba(59,130,246,0.08)",
                      border: "1px solid rgba(59,130,246,0.15)",
                    }}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              ))}
            </div>
            <div
              className="px-4 py-3 flex items-center gap-4 text-xs text-[var(--text-muted)]"
              style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
            >
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
