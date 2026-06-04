import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../index';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  badge?: string | number;
}

export const SidebarItem = ({ icon: Icon, label, isActive, onClick, badge }: SidebarItemProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group flex w-full items-center gap-3 rounded-[10px] px-3 py-2 text-sm font-medium transition-colors',
        isActive
          ? 'bg-[#111827] text-white'
          : 'text-[#6B7280] hover:bg-[#FAFAFA] hover:text-[#111827]'
      )}
    >
      <Icon className={cn('h-5 w-5', isActive ? 'text-white' : 'text-[#6B7280] group-hover:text-[#111827]')} />
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <span className={cn(
          'rounded-full px-2 py-0.5 text-[10px] font-bold',
          isActive ? 'bg-white/20 text-white' : 'bg-[#FAFAFA] text-[#6B7280]'
        )}>
          {badge}
        </span>
      )}
    </button>
  );
};

interface SidebarSectionProps {
  title?: string;
  children: React.ReactNode;
}

export const SidebarSection = ({ title, children }: SidebarSectionProps) => {
  return (
    <div className="space-y-1">
      {title && <h3 className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-[#6B7280]/50">{title}</h3>}
      {children}
    </div>
  );
};

export const Sidebar = ({ children, footer }: { children: React.ReactNode; footer?: React.ReactNode }) => {
  return (
    <aside className="flex h-full w-[280px] flex-col border-r border-[#E5E7EB] bg-white p-4">
      <div className="flex items-center gap-2 px-3 pb-8">
        <div className="h-8 w-8 rounded-lg bg-[#111827]" />
        <span className="text-lg font-bold tracking-tight text-[#111827]">SettleOne</span>
      </div>
      <nav className="flex-1 space-y-6 overflow-y-auto">
        {children}
      </nav>
      {footer && <div className="mt-auto border-t border-[#E5E7EB] pt-4">{footer}</div>}
    </aside>
  );
};
