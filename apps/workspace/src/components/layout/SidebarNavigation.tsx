import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutGrid, PieChart, Inbox, Activity, PlusSquare, CheckSquare,
  Paperclip, UploadCloud, Settings, HelpCircle, Plus, X, TrendingUp
} from "lucide-react";
import { Avatar } from "@settleone/design-system";

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
      className={`group flex items-center justify-between px-3 py-2.5 rounded-[var(--radius-input)] transition-all duration-200 ${
        isActive
          ? "bg-[var(--accent-blue)]/15 text-[var(--accent-blue-bright)] border border-[var(--accent-blue)]/25"
          : "text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)] border border-transparent"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className={`transition-colors ${isActive ? "text-[var(--accent-blue)]" : "group-hover:text-[var(--text-primary)]"}`}>
          {icon}
        </span>
        <span className="text-sm font-medium">{label}</span>
      </div>
      {badge !== undefined && badge > 0 && (
        <span className="px-1.5 py-0.5 text-[10px] font-bold bg-[var(--accent-blue)] text-white rounded-full min-w-[18px] text-center">
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
  const navigate = useNavigate();
  const current = location.pathname;

  const navContent = (
    <>
      <div className="flex-1 py-4 px-3 space-y-5">
        {/* MAIN */}
        <div>
          <h3 className="px-3 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">Main</h3>
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
          <h3 className="px-3 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">My Deals</h3>
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
          </div>
        </div>

        {/* TOOLS */}
        <div>
          <h3 className="px-3 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">Tools</h3>
          <div className="space-y-0.5">
            <button
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-input)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)] transition-all border border-transparent text-sm font-medium"
              onClick={onClose}
            >
              <Paperclip size={17} />
              Submit Evidence
            </button>
            <button
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-input)] text-[var(--text-muted)] opacity-50 cursor-not-allowed border border-transparent text-sm font-medium"
              disabled
              title="Available when you have an active deal"
            >
              <UploadCloud size={17} />
              Submit Delivery
            </button>
          </div>
        </div>

        {/* ACCOUNT */}
        <div>
          <h3 className="px-3 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">Account</h3>
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
              className="flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-input)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)] transition-all border border-transparent text-sm font-medium"
              onClick={onClose}
            >
              <HelpCircle size={17} />
              Help & Docs
            </a>
          </div>
        </div>
      </div>

      {/* Bottom: User mini-profile + Create button */}
      <div className="p-3 border-t border-[var(--border)]">
        <div className="flex items-center gap-3 mb-3 p-2.5 rounded-[var(--radius-card)] bg-[var(--bg-subtle)] border border-[var(--border)]">
          <Avatar initials="JD" size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[var(--text-primary)] truncate">John Doe</p>
            <p className="text-[10px] text-[var(--text-muted)]">Buyer / Seller</p>
          </div>
          <div className="px-1.5 py-0.5 text-[9px] font-bold text-[var(--accent-blue-bright)] bg-[var(--accent-blue-glow2)] border border-[var(--accent-blue)]/25 rounded-full uppercase tracking-wide">
            Both
          </div>
        </div>
        <button
          onClick={() => {
            navigate("/create-deal");
            onClose?.();
          }}
          className="w-full py-2 text-sm font-semibold text-white rounded-[var(--radius-input)] transition-all flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(135deg, var(--accent-blue), #06b6d4)",
            boxShadow: "0 0 16px rgba(59,130,246,0.3)",
          }}
        >
          <Plus size={16} />
          Create Deal
        </button>
      </div>
    </>
  );

  if (mobile) {
    return (
      <div className="flex flex-col h-full bg-[var(--bg-card)]">
        <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
          <img src="/whiteLogo.png" alt="SettleOne" className="h-7 object-contain" />
          <button
            onClick={onClose}
            className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] rounded-md transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          {navContent}
        </div>
      </div>
    );
  }

  return (
    <aside className="w-[240px] shrink-0 flex flex-col h-[calc(100vh-56px)] sticky top-[56px] overflow-y-auto hidden md:flex"
      style={{ background: "var(--bg-card)", borderRight: "1px solid var(--border)" }}
    >
      {navContent}
    </aside>
  );
}
