import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { TopNavigationBar } from './TopNavigationBar';
import { SidebarNavigation } from './SidebarNavigation';

export function AppShell() {
  const [isCommandPaletteOpen, setCommandPaletteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg-base)] flex flex-col font-sans">
      <TopNavigationBar onSearchClick={() => setCommandPaletteOpen(true)} />
      
      <div className="flex flex-1 overflow-hidden">
        <SidebarNavigation />
        
        <main className="flex-1 flex flex-col h-[calc(100vh-56px)] overflow-y-auto">
          <div className="p-4 md:p-6 max-w-[1200px] mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>

      {isCommandPaletteOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20" onClick={() => setCommandPaletteOpen(false)}>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xl mx-4 overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-[var(--border)] flex items-center gap-3">
              <span className="text-gray-400">🔍</span>
              <input 
                autoFocus
                type="text" 
                placeholder="Search deals, users, or transactions..." 
                className="flex-1 bg-transparent border-none outline-none text-lg text-[var(--text-primary)]"
              />
            </div>
            <div className="p-2">
              <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Suggestions</p>
              <button className="w-full text-left px-3 py-2 text-sm text-[var(--text-primary)] hover:bg-gray-100 rounded-md">
                Create a new deal
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-[var(--text-primary)] hover:bg-gray-100 rounded-md">
                View active deals
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
