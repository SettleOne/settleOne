import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../index';

interface MobileNavItemProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const MobileNavItem = ({ icon: Icon, label, isActive, onClick }: MobileNavItemProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col items-center justify-center gap-1 flex-1 py-2 transition-colors',
        isActive ? 'text-[#111827]' : 'text-[#6B7280]'
      )}
    >
      <Icon className="h-6 w-6" />
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
};

export const MobileNav = ({ children }: { children: React.ReactNode }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-[#E5E7EB] bg-white px-2 pb-safe md:hidden">
      {children}
    </nav>
  );
};
