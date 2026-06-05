import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  Shell, 
  SidebarItem, 
  SidebarSection, 
  CommandPalette,
  MobileNavItem
} from '@settleone/design-system';
import { 
  Inbox as InboxIcon,
  LayoutDashboard, 
  Handshake, 
  Vault, 
  FileStack, 
  ShieldAlert, 
  BarChart3, 
  Settings,
  CircleUser,
  Search,
  Bell,
  Globe,
  UserPlus,
  ShoppingBag,
  Briefcase
} from 'lucide-react';
import { useRealtime } from '../providers/RealtimeProvider';

export const WorkspaceShell = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [commandOpen, setCommandOpen] = React.useState(false);
  const { emit } = useRealtime();

  const handleCommandAction = (action: string) => {
    if (action === 'create-deal') {
      emit('DealCreated', { timestamp: Date.now(), user: 'Sourav' });
    }
  };

  const sidebarContent = (
    <>
      <SidebarSection>
        <SidebarItem 
          icon={InboxIcon} 
          label="Inbox" 
          isActive={location.pathname === '/inbox'}
          onClick={() => navigate('/inbox')}
          badge={5}
        />
        <SidebarItem 
          icon={ShoppingBag} 
          label="Marketplace" 
          isActive={location.pathname === '/marketplace'}
          onClick={() => navigate('/marketplace')}
        />
        <SidebarItem 
          icon={Briefcase} 
          label="Seller Workspace" 
          isActive={location.pathname === '/seller'}
          onClick={() => navigate('/seller')}
        />
        <SidebarItem 
          icon={UserPlus} 
          label="Invitations" 
          isActive={location.pathname === '/invitations'}
          onClick={() => navigate('/invitations')}
        />
        <SidebarItem 
          icon={LayoutDashboard} 
          label="Dashboard" 
          isActive={location.pathname === '/dashboard'}
          onClick={() => navigate('/dashboard')}
        />
        <SidebarItem 
          icon={Handshake} 
          label="Deals" 
          isActive={location.pathname.startsWith('/deals')}
          onClick={() => navigate('/deals')}
          badge={3}
        />
        <SidebarItem 
          icon={Vault} 
          label="Vault" 
          isActive={location.pathname === '/vault'}
          onClick={() => navigate('/vault')}
        />
        <SidebarItem 
          icon={Globe} 
          label="Network" 
          isActive={location.pathname === '/network'}
          onClick={() => navigate('/network')}
        />
      </SidebarSection>

      <SidebarSection title="Operations">
        <SidebarItem 
          icon={FileStack} 
          label="Evidence" 
          isActive={location.pathname === '/evidence'}
          onClick={() => navigate('/evidence')}
        />
        <SidebarItem 
          icon={ShieldAlert} 
          label="Disputes" 
          isActive={location.pathname === '/disputes'}
          onClick={() => navigate('/disputes')}
          badge="1 Alert"
        />
      </SidebarSection>

      <SidebarSection title="Insights">
        <SidebarItem 
          icon={BarChart3} 
          label="Analytics" 
          isActive={location.pathname === '/analytics'}
          onClick={() => navigate('/analytics')}
        />
      </SidebarSection>

      <SidebarSection title="System">
        <SidebarItem 
          icon={Settings} 
          label="Settings" 
          isActive={location.pathname === '/settings'}
          onClick={() => navigate('/settings')}
        />
      </SidebarSection>
    </>
  );

  const mobileNavContent = (
    <>
      <MobileNavItem 
        icon={InboxIcon} 
        label="Inbox" 
        isActive={location.pathname === '/inbox'}
        onClick={() => navigate('/inbox')}
      />
      <MobileNavItem 
        icon={Handshake} 
        label="Deals" 
        isActive={location.pathname.startsWith('/deals')}
        onClick={() => navigate('/deals')}
      />
      <MobileNavItem 
        icon={Search} 
        label="Search" 
        onClick={() => setCommandOpen(true)}
      />
      <MobileNavItem 
        icon={ShieldAlert} 
        label="Alerts" 
        isActive={location.pathname === '/disputes'}
        onClick={() => navigate('/disputes')}
      />
      <MobileNavItem 
        icon={CircleUser} 
        label="Profile" 
        isActive={location.pathname === '/settings'}
        onClick={() => navigate('/settings')}
      />
    </>
  );

  const userProfile = (
    <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
      <div className="hidden flex-col items-end mr-1 lg:flex">
        <span className="text-xs font-bold text-[#111827]">Sourav</span>
        <span className="text-[10px] text-[#6B7280]">Buyer</span>
      </div>
      <div className="h-8 w-8 rounded-full bg-[#111827] flex items-center justify-center text-white text-xs font-bold">
        S
      </div>
    </div>
  );

  return (
    <>
      <Shell 
        sidebarContent={sidebarContent} 
        mobileNavContent={mobileNavContent}
        userProfile={userProfile}
      >
        <Outlet />
      </Shell>
      <CommandPalette 
        open={commandOpen} 
        setOpen={setCommandOpen} 
        onAction={handleCommandAction}
      />
    </>
  );
};
