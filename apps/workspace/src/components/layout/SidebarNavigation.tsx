import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  PieChart,
  Inbox,
  Activity,
  PlusSquare,
  CheckSquare,
  Paperclip,
  UploadCloud,
  Settings,
  HelpCircle,
  AlertCircle,
  ShieldAlert,
  X,
} from "lucide-react";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
  isActive: boolean;
  onClick?: () => void;
}

function NavItem({ to, icon, label, badge, isActive, onClick }: NavItemProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
        isActive
          ? "bg-gradient-to-r from-blue-500/15 to-cyan-400/5 text-cyan-300 border border-blue-500/20 shadow-[inset_0_0_20px_rgba(59,130,246,0.05)]"
          : "text-[var(--text-secondary)] hover:bg-white/5 hover:text-white border border-transparent hover:border-white/10"
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`transition-all duration-300 ${isActive ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" : "text-slate-500 group-hover:text-cyan-200 group-hover:scale-110"}`}
        >
          {icon}
        </span>
        <span className="text-sm font-bold tracking-wide">{label}</span>
      </div>
      {badge !== undefined && badge > 0 && (
        <span className="px-2 py-0.5 text-[10px] font-black bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full min-w-[20px] text-center shadow-[0_0_10px_rgba(6,182,212,0.5)]">
          {badge}
        </span>
      )}
    </Link>
  );
}

interface SidebarNavigationProps {
  mobile?: boolean;
  onClose?: () => void;
}

export function SidebarNavigation({ mobile, onClose }: SidebarNavigationProps) {
  const location = useLocation();
  const current = location.pathname;

  const navContent = (
    <div className="flex-1 py-6 px-4 space-y-8">
      {/* MAIN */}
      <div>
        <h3 className="px-4 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-3 opacity-60">
          Main
        </h3>
        <div className="space-y-1">
          <NavItem
            to="/marketplace"
            icon={<LayoutGrid size={18} />}
            label="Marketplace"
            isActive={current.startsWith("/marketplace")}
            onClick={onClose}
          />
          <NavItem
            to="/portfolio"
            icon={<PieChart size={18} />}
            label="Portfolio"
            isActive={current === "/portfolio"}
            onClick={onClose}
          />
          <NavItem
            to="/inbox"
            icon={<Inbox size={18} />}
            label="Inbox"
            badge={3}
            isActive={current === "/inbox"}
            onClick={onClose}
          />
        </div>
      </div>

      {/* MY DEALS */}
      <div>
        <h3 className="px-4 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-3 opacity-60">
          My Deals
        </h3>
        <div className="space-y-1">
          <NavItem
            to="/deals/active"
            icon={<Activity size={18} />}
            label="Active Deals"
            badge={2}
            isActive={current === "/deals/active"}
            onClick={onClose}
          />
          <NavItem
            to="/deals/created"
            icon={<PlusSquare size={18} />}
            label="Created Deals"
            isActive={current === "/deals/created"}
            onClick={onClose}
          />
          <NavItem
            to="/deals/accepted"
            icon={<CheckSquare size={18} />}
            label="Accepted Deals"
            isActive={current === "/deals/accepted"}
            onClick={onClose}
          />
          <NavItem
            to="/deals/disputed"
            icon={<AlertCircle size={18} />}
            label="Disputed Deals"
            isActive={current === "/deals/disputed"}
            onClick={onClose}
          />
        </div>
      </div>

      {/* TOOLS */}
      <div>
        <h3 className="px-4 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-3 opacity-60">
          Tools
        </h3>
        <div className="space-y-1">
          <button
            className="w-full group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 text-[var(--text-secondary)] hover:bg-white/5 hover:text-white border border-transparent hover:border-white/10"
            onClick={onClose}
          >
            <div className="flex items-center gap-3">
              <span className="text-slate-500 group-hover:text-cyan-200 group-hover:scale-110 transition-all duration-300">
                <Paperclip size={18} />
              </span>
              <span className="text-sm font-bold tracking-wide">
                Submit Evidence
              </span>
            </div>
          </button>

          <button
            className="w-full group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 text-[var(--text-secondary)] hover:bg-white/5 hover:text-white border border-transparent hover:border-white/10"
            onClick={onClose}
          >
            <div className="flex items-center gap-3">
              <span className="text-slate-500 group-hover:text-cyan-200 group-hover:scale-110 transition-all duration-300">
                <UploadCloud size={18} />
              </span>
              <span className="text-sm font-bold tracking-wide">
                Submit Delivery
              </span>
            </div>
          </button>

          <button
            className="w-full group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 text-rose-400/80 hover:bg-rose-500/10 hover:text-rose-400 border border-transparent hover:border-rose-500/20"
            onClick={onClose}
          >
            <div className="flex items-center gap-3">
              <span className="text-rose-500/70 group-hover:text-rose-400 group-hover:scale-110 transition-all duration-300">
                <ShieldAlert size={18} />
              </span>
              <span className="text-sm font-bold tracking-wide">
                Raise Dispute
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* ACCOUNT */}
      <div>
        <h3 className="px-4 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-3 opacity-60">
          Account
        </h3>
        <div className="space-y-1">
          <NavItem
            to="/settings"
            icon={<Settings size={18} />}
            label="Settings"
            isActive={current === "/settings"}
            onClick={onClose}
          />
          <a
            href="https://docs.settleone.xyz"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 text-[var(--text-secondary)] hover:bg-white/5 hover:text-white border border-transparent hover:border-white/10"
            onClick={onClose}
          >
            <div className="flex items-center gap-3">
              <span className="text-slate-500 group-hover:text-cyan-200 group-hover:scale-110 transition-all duration-300">
                <HelpCircle size={18} />
              </span>
              <span className="text-sm font-bold tracking-wide">
                Help & Docs
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );

  if (mobile) {
    return (
      <div
        className="flex flex-col h-full backdrop-blur-xl border-r border-white/5"
        style={{ background: "rgba(5, 10, 20, 0.95)" }}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <img
            src="/whiteLogo.png"
            alt="SettleOne"
            className="h-8 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          />
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto hide-scrollbar">
          {navContent}
        </div>
      </div>
    );
  }

  return (
    <aside
      className="w-[260px] shrink-0 flex flex-col h-[calc(100vh-76px)] sticky top-[76px] overflow-y-auto hidden lg:flex backdrop-blur-2xl transition-all duration-300"
      style={{
        background: "rgba(10, 15, 30, 0.4)",
        borderRight: "1px solid rgba(255,255,255,0.05)",
        boxShadow: "10px 0 30px -10px rgba(0,0,0,0.5)",
      }}
    >
      {navContent}
    </aside>
  );
}
