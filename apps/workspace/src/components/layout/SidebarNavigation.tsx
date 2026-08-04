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
  ExternalLink,
} from "lucide-react";

interface NavItemProps {
  to?: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
  isActive: boolean;
  onClick?: () => void;
  danger?: boolean;
  asButton?: boolean;
}

function NavItem({
  to,
  icon,
  label,
  badge,
  isActive,
  onClick,
  danger,
  asButton,
}: NavItemProps) {
  const cls = `
    group relative flex items-center justify-between px-3.5 py-2.5 rounded-xl
    transition-all duration-200 cursor-pointer select-none
    ${
      isActive
        ? "text-white"
        : danger
          ? "text-rose-400/80 hover:text-rose-300"
          : "text-[var(--text-secondary)] hover:text-white"
    }
  `;

  const activeStyle = isActive
    ? {
        background:
          "linear-gradient(135deg, rgba(59,130,246,0.18) 0%, rgba(6,182,212,0.08) 100%)",
        border: "1px solid rgba(59,130,246,0.2)",
        boxShadow:
          "0 2px 12px rgba(59,130,246,0.1), inset 0 1px 0 rgba(255,255,255,0.04)",
      }
    : danger
      ? {
          background: "transparent",
          border: "1px solid transparent",
        }
      : {
          background: "transparent",
          border: "1px solid transparent",
        };

  const hoverStyle = {
    style: activeStyle,
  };

  const inner = (
    <>
      {isActive && (
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full"
          style={{
            background: "linear-gradient(180deg, #3b82f6, #06b6d4)",
            boxShadow: "0 0 8px rgba(59,130,246,0.8)",
          }}
        />
      )}
      <div className="flex items-center gap-3 pl-1">
        <span
          className="transition-all duration-200 flex-shrink-0"
          style={{
            color: isActive
              ? "#93c5fd"
              : danger
                ? "rgba(251,113,133,0.7)"
                : undefined,
            filter: isActive
              ? "drop-shadow(0 0 6px rgba(96,165,250,0.5))"
              : "none",
          }}
        >
          {icon}
        </span>
        <span className="text-sm font-semibold tracking-wide">{label}</span>
      </div>
      {badge !== undefined && badge > 0 && (
        <span
          className="px-2 py-0.5 text-[10px] font-black text-white rounded-full min-w-[20px] text-center flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #2563eb, #06b6d4)",
            boxShadow: "0 0 10px rgba(6,182,212,0.4)",
          }}
        >
          {badge}
        </span>
      )}
    </>
  );

  if (asButton) {
    return (
      <button className={cls} style={hoverStyle.style} onClick={onClick}>
        {inner}
      </button>
    );
  }

  return (
    <Link to={to!} onClick={onClick} className={cls} style={hoverStyle.style}>
      {inner}
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
    <div className="flex-1 py-5 px-3 space-y-7">
      {/* MAIN */}
      <div>
        <p className="px-3.5 text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.15em] mb-2 opacity-70">
          Main
        </p>
        <div className="space-y-0.5">
          <NavItem
            to="/marketplace"
            icon={<LayoutGrid size={17} />}
            label="Marketplace"
            isActive={current.startsWith("/marketplace")}
            onClick={onClose}
          />
          <NavItem
            to="/portfolio"
            icon={<PieChart size={17} />}
            label="Portfolio"
            isActive={current === "/portfolio"}
            onClick={onClose}
          />
          <NavItem
            to="/inbox"
            icon={<Inbox size={17} />}
            label="Inbox"
            badge={3}
            isActive={current === "/inbox"}
            onClick={onClose}
          />
        </div>
      </div>

      {/* MY DEALS */}
      <div>
        <p className="px-3.5 text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.15em] mb-2 opacity-70">
          My Deals
        </p>
        <div className="space-y-0.5">
          <NavItem
            to="/deals/active"
            icon={<Activity size={17} />}
            label="Active Deals"
            badge={2}
            isActive={current === "/deals/active"}
            onClick={onClose}
          />
          <NavItem
            to="/deals/created"
            icon={<PlusSquare size={17} />}
            label="Created Deals"
            isActive={current === "/deals/created"}
            onClick={onClose}
          />
          <NavItem
            to="/deals/accepted"
            icon={<CheckSquare size={17} />}
            label="Accepted Deals"
            isActive={current === "/deals/accepted"}
            onClick={onClose}
          />
          <NavItem
            to="/deals/disputed"
            icon={<AlertCircle size={17} />}
            label="Disputed Deals"
            isActive={current === "/deals/disputed"}
            onClick={onClose}
          />
        </div>
      </div>

      {/* TOOLS */}
      <div>
        <p className="px-3.5 text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.15em] mb-2 opacity-70">
          Tools
        </p>
        <div className="space-y-0.5">
          <NavItem
            asButton
            icon={<Paperclip size={17} />}
            label="Submit Evidence"
            isActive={false}
            onClick={onClose}
          />
          <NavItem
            asButton
            icon={<UploadCloud size={17} />}
            label="Submit Delivery"
            isActive={false}
            onClick={onClose}
          />
          <NavItem
            asButton
            icon={<ShieldAlert size={17} />}
            label="Raise Dispute"
            isActive={false}
            danger
            onClick={onClose}
          />
        </div>
      </div>

      {/* ACCOUNT */}
      <div>
        <p className="px-3.5 text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.15em] mb-2 opacity-70">
          Account
        </p>
        <div className="space-y-0.5">
          <NavItem
            to="/settings"
            icon={<Settings size={17} />}
            label="Settings"
            isActive={current === "/settings"}
            onClick={onClose}
          />
          <a
            href="https://docs.settleone.xyz"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[var(--text-secondary)] hover:text-white transition-all duration-200"
            style={{ border: "1px solid transparent" }}
            onClick={onClose}
          >
            <div className="flex items-center gap-3 pl-1">
              <span className="transition-all duration-200">
                <HelpCircle size={17} />
              </span>
              <span className="text-sm font-semibold tracking-wide">
                Help & Docs
              </span>
            </div>
            <ExternalLink
              size={12}
              className="opacity-40 group-hover:opacity-70"
            />
          </a>
        </div>
      </div>
    </div>
  );

  if (mobile) {
    return (
      <div
        className="flex flex-col h-full"
        style={{
          background: "rgba(4, 8, 16, 0.97)",
          backdropFilter: "blur(24px)",
        }}
      >
        <div
          className="flex items-center justify-between p-5"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
        >
          <img
            src="/whiteLogo.png"
            alt="SettleOne"
            className="h-7 object-contain"
            style={{ filter: "drop-shadow(0 0 12px rgba(96,165,250,0.3))" }}
          />
          <button
            onClick={onClose}
            className="p-2 text-[var(--text-muted)] hover:text-white rounded-xl transition-all hover:bg-white/5"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <X size={18} />
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
      className="w-[260px] shrink-0 flex flex-col h-[calc(100vh-56px)] sticky top-[56px] overflow-y-auto hidden lg:flex glass-sidebar"
      style={{ transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)" }}
    >
      {/* Subtle top glow inside sidebar */}
      <div
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.06) 0%, transparent 70%)",
        }}
      />
      {navContent}
    </aside>
  );
}
