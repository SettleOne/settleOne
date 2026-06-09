import React from "react";
import { Link, useLocation } from "react-router-dom";
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
} from "lucide-react";
import { Avatar } from "@settleone/design-system";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
  isActive: boolean;
}

function NavItem({ to, icon, label, badge, isActive }: NavItemProps) {
  return (
    <Link
      to={to}
      className={`flex items-center justify-between px-3 py-2 rounded-md transition-colors ${
        isActive
          ? "bg-[var(--bg-subtle)] text-[var(--text-primary)] font-medium"
          : "text-[var(--text-secondary)] hover:bg-gray-50 hover:text-[var(--text-primary)]"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className={isActive ? "text-[var(--accent-blue)]" : ""}>
          {icon}
        </span>
        <span className="text-sm">{label}</span>
      </div>
      {badge !== undefined && badge > 0 && (
        <span className="px-2 py-0.5 text-xs font-semibold bg-[var(--accent-blue)] text-white rounded-full">
          {badge}
        </span>
      )}
    </Link>
  );
}

export function SidebarNavigation() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-[240px] flex-shrink-0 flex flex-col h-[calc(100vh-56px)] bg-white border-r border-[var(--border)] sticky top-[56px] overflow-y-auto hidden md:flex">
      <div className="flex-1 py-4 px-3 space-y-6">
        {/* MAIN */}
        <div>
          <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Main
          </h3>
          <div className="space-y-1">
            <NavItem
              to="/marketplace"
              icon={<LayoutGrid />}
              label="Marketplace"
              isActive={currentPath.startsWith("/marketplace")}
            />
            <NavItem
              to="/portfolio"
              icon={<PieChart />}
              label="Portfolio"
              isActive={currentPath === "/portfolio"}
            />
            <NavItem
              to="/inbox"
              icon={<Inbox />}
              label="Inbox"
              badge={3}
              isActive={currentPath === "/inbox"}
            />
          </div>
        </div>

        {/* MY DEALS */}
        <div>
          <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            My Deals
          </h3>
          <div className="space-y-1">
            <NavItem
              to="/deals/active"
              icon={<Activity />}
              label="Active Deals"
              badge={2}
              isActive={currentPath === "/deals/active"}
            />
            <NavItem
              to="/deals/created"
              icon={<PlusSquare />}
              label="Created Deals"
              isActive={currentPath === "/deals/created"}
            />
            <NavItem
              to="/deals/accepted"
              icon={<CheckSquare />}
              label="Accepted Deals"
              isActive={currentPath === "/deals/accepted"}
            />
          </div>
        </div>

        {/* TOOLS */}
        <div>
          <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Tools
          </h3>
          <div className="space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-[var(--text-secondary)] hover:bg-gray-50 hover:text-[var(--text-primary)] transition-colors">
              <Paperclip size={18} />
              <span className="text-sm">Submit Evidence</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-[var(--text-secondary)] hover:bg-gray-50 hover:text-[var(--text-primary)] transition-colors opacity-50 cursor-not-allowed">
              <UploadCloud size={18} />
              <span className="text-sm">Submit Delivery</span>
            </button>
          </div>
        </div>

        {/* ACCOUNT */}
        <div>
          <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Account
          </h3>
          <div className="space-y-1">
            <NavItem
              to="/settings"
              icon={<Settings />}
              label="Settings"
              isActive={currentPath === "/settings"}
            />
            <a
              href="https://docs.settleone.xyz"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-[var(--text-secondary)] hover:bg-gray-50 hover:text-[var(--text-primary)] transition-colors"
            >
              <HelpCircle size={18} />
              <span className="text-sm">Help & Docs</span>
            </a>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-[var(--border)]">
        <div className="flex items-center gap-3 mb-4">
          <Avatar initials="JD" size="md" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-[var(--text-primary)]">
              John Doe
            </span>
            <span className="text-xs text-[var(--text-secondary)]">Buyer</span>
          </div>
        </div>
        <button className="w-full py-2 bg-[var(--accent-blue)] text-white text-sm font-semibold rounded-md shadow-sm hover:bg-blue-600 transition-colors">
          Create Deal
        </button>
      </div>
    </aside>
  );
}
