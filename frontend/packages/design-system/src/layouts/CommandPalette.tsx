import React from 'react';
import { Command } from 'cmdk';
import { Search, Plus, FileText, ShieldAlert, History, Vault, BarChart3, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CommandPaletteProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onAction?: (action: string) => void;
}

export const CommandPalette = ({ open, setOpen, onAction }: CommandPaletteProps) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, setOpen]);

  const runCommand = (command: () => void) => {
    command();
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 pt-[20vh] backdrop-blur-sm" onClick={() => setOpen(false)}>
      <div className="w-full max-w-[640px] overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <Command label="Global Command Palette">
          <div className="flex items-center border-b border-[#E5E7EB] px-4">
            <Search className="h-5 w-5 text-[#6B7280]" />
            <Command.Input
              placeholder="Type a command or search..."
              className="h-14 w-full bg-transparent px-4 text-base outline-none placeholder:text-[#6B7280]"
            />
          </div>
          <Command.List className="max-h-[400px] overflow-y-auto p-2">
            <Command.Empty className="p-4 text-center text-sm text-[#6B7280]">No results found.</Command.Empty>
            
            <Command.Group heading="Actions" className="px-2 py-3 text-[10px] font-bold uppercase tracking-wider text-[#6B7280]/50">
              <CommandItem 
                icon={Plus} 
                label="Create New Deal" 
                shortcut="C" 
                onSelect={() => runCommand(() => {
                  navigate('/deals/create');
                  onAction?.('create-deal');
                })} 
              />
              <CommandItem 
                icon={FileText} 
                label="Upload Evidence" 
                shortcut="U" 
                onSelect={() => runCommand(() => navigate('/evidence'))} 
              />
              <CommandItem 
                icon={ShieldAlert} 
                label="Open Dispute" 
                onSelect={() => runCommand(() => navigate('/disputes'))} 
              />
            </Command.Group>

            <Command.Group heading="Navigation" className="px-2 py-3 text-[10px] font-bold uppercase tracking-wider text-[#6B7280]/50">
              <CommandItem icon={History} label="Go to Dashboard" onSelect={() => runCommand(() => navigate('/dashboard'))} />
              <CommandItem icon={Vault} label="Open Vault" onSelect={() => runCommand(() => navigate('/vault'))} />
              <CommandItem icon={BarChart3} label="View Analytics" onSelect={() => runCommand(() => navigate('/analytics'))} />
              <CommandItem icon={Settings} label="Settings" onSelect={() => runCommand(() => navigate('/settings'))} />
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
};

const CommandItem = ({ icon: Icon, label, shortcut, onSelect }: { icon: any, label: string, shortcut?: string, onSelect: () => void }) => (
  <Command.Item 
    onSelect={onSelect}
    className="flex cursor-pointer items-center gap-3 rounded-[10px] px-3 py-3 text-sm font-medium text-[#111827] aria-selected:bg-[#FAFAFA] transition-colors"
  >
    <Icon className="h-5 w-5 text-[#6B7280]" />
    <span className="flex-1">{label}</span>
    {shortcut && <kbd className="rounded bg-[#E5E7EB] px-2 py-0.5 text-[10px] text-[#6B7280]">{shortcut}</kbd>}
  </Command.Item>
);
