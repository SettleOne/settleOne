import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  Shell, 
  SidebarItem, 
  SidebarSection,
  MobileNavItem
} from '@settleone/design-system/layouts';
import { 
  LayoutDashboard, 
  Gavel, 
  Activity, 
  Users, 
  ShieldCheck,
  Settings,
  Shield
} from 'lucide-react';

export const OperationsShell = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarContent = (
    <>
      <SidebarSection>
        <SidebarItem 
          icon={LayoutDashboard} 
          label="Admin Overview" 
          isActive={location.pathname === '/dashboard'}
          onClick={() => navigate('/dashboard')}
        />
      </SidebarSection>

      <SidebarSection title="Arbitration">
        <SidebarItem 
          icon={Gavel} 
          label="Dispute Queue" 
          isActive={location.pathname.startsWith('/disputes')}
          onClick={() => navigate('/disputes')}
          badge={5}
        />
        <SidebarItem 
          icon={ShieldCheck} 
          label="Arbitrators" 
          isActive={location.pathname === '/arbitrators'}
          onClick={() => navigate('/arbitrators')}
        />
      </SidebarSection>

      <SidebarSection title="Monitoring">
        <SidebarItem 
          icon={Activity} 
          label="Vault Health" 
          isActive={location.pathname === '/vault-health'}
          onClick={() => navigate('/vault-health')}
        />
        <SidebarItem 
          icon={Users} 
          label="User Management" 
          isActive={location.pathname === '/users'}
          onClick={() => navigate('/users')}
        />
      </SidebarSection>

      <SidebarSection title="System">
        <SidebarItem 
          icon={Settings} 
          label="Global Settings" 
          isActive={location.pathname === '/settings'}
          onClick={() => navigate('/settings')}
        />
      </SidebarSection>
    </>
  );

  const mobileNavContent = (
    <>
      <MobileNavItem 
        icon={LayoutDashboard} 
        label="Admin" 
        isActive={location.pathname === '/dashboard'}
        onClick={() => navigate('/dashboard')}
      />
      <MobileNavItem 
        icon={Gavel} 
        label="Disputes" 
        isActive={location.pathname.startsWith('/disputes')}
        onClick={() => navigate('/disputes')}
      />
      <MobileNavItem 
        icon={Shield} 
        label="Security" 
        isActive={location.pathname === '/arbitrators'}
        onClick={() => navigate('/arbitrators')}
      />
      <MobileNavItem 
        icon={Activity} 
        label="Health" 
        isActive={location.pathname === '/vault-health'}
        onClick={() => navigate('/vault-health')}
      />
      <MobileNavItem 
        icon={Settings} 
        label="Settings" 
        isActive={location.pathname === '/settings'}
        onClick={() => navigate('/settings')}
      />
    </>
  );

  const userProfile = (
    <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
      <div className="hidden flex-col items-end mr-1 lg:flex">
        <span className="text-xs font-bold text-[#111827]">Admin</span>
        <span className="text-[10px] text-[#6B7280]">Superuser</span>
      </div>
      <div className="h-8 w-8 rounded-full bg-[#EF4444] flex items-center justify-center text-white text-xs font-bold">
        A
      </div>
    </div>
  );

  return (
    <Shell 
      sidebarContent={sidebarContent} 
      mobileNavContent={mobileNavContent}
      userProfile={userProfile}
    >
      <Outlet />
    </Shell>
  );
};
