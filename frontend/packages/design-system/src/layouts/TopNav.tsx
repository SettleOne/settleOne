import React from 'react';
import { Search, Bell, Wallet } from 'lucide-react';
import { cn } from '../index';

interface TopNavProps {
  children?: React.ReactNode;
  userProfile?: React.ReactNode;
}

export const TopNav = ({ children, userProfile }: TopNavProps) => {
  return (
    <header className="flex h-[72px] items-center justify-between border-b border-[#E5E7EB] bg-white px-4 md:px-8">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative hidden w-full max-w-[480px] sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
          <input
            type="text"
            placeholder="Search deals, evidence, or documents... (⌘K)"
            className="h-10 w-full rounded-[10px] border border-[#E5E7EB] bg-[#FAFAFA] pl-10 pr-4 text-sm outline-none transition-all focus:border-[#111827] focus:bg-white"
          />
        </div>
        <div className="sm:hidden">
          <div className="h-8 w-8 rounded-lg bg-[#111827]" />
        </div>
        {children}
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <button className="relative rounded-[10px] p-2 text-[#6B7280] hover:bg-[#FAFAFA] hover:text-[#111827]">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#EF4444]" />
        </button>
        <div className="hidden items-center gap-2 rounded-[10px] border border-[#E5E7EB] bg-[#FAFAFA] px-3 py-1.5 text-sm font-medium text-[#111827] md:flex">
          <Wallet className="h-4 w-4 text-[#6B7280]" />
          <span>0x1234...5678</span>
        </div>
        {userProfile || (
          <div className="h-8 w-8 rounded-full bg-[#E5E7EB] border border-[#E5E7EB]" />
        )}
      </div>
    </header>
  );
};
