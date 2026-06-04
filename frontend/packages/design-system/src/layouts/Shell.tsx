import React from 'react';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { MobileNav } from './MobileNav';

interface ShellProps {
  sidebarContent: React.ReactNode;
  mobileNavContent?: React.ReactNode;
  children: React.ReactNode;
  userProfile?: React.ReactNode;
}

export const Shell = ({ sidebarContent, mobileNavContent, children, userProfile }: ShellProps) => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#FAFAFA]">
      {/* Desktop/Tablet Sidebar */}
      <div className="hidden md:block">
        <Sidebar>{sidebarContent}</Sidebar>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNav userProfile={userProfile} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
          <div className="mx-auto max-w-[1280px]">
            {children}
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        {mobileNavContent && (
          <MobileNav>
            {mobileNavContent}
          </MobileNav>
        )}
      </div>
    </div>
  );
};
