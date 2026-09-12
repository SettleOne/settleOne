import React, { useState, useEffect } from "react";
import { docsNavigation } from "../content/navigation";
import { Menu, X, Github, Twitter } from "lucide-react";
import { PageContent } from "../content/pages";

export function DocsLayout() {
  const [activePageId, setActivePageId] = useState("introduction");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  }, [activePageId]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-300 font-sans flex flex-col md:flex-row selection:bg-cyan-500/30">
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-50 bg-[#111] border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/whiteLogo.png" alt="SettleOne Logo" className="h-6" />
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-slate-400 hover:text-white"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside 
        className={`${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:sticky top-[57px] md:top-0 left-0 z-40 w-full md:w-[260px] h-[calc(100vh-57px)] md:h-screen bg-[#111] border-r border-white/5 overflow-y-auto transition-transform duration-300 ease-in-out hide-scrollbar`}
      >
        <div className="hidden md:flex items-center gap-2 p-6 pb-4">
          <img src="/whiteLogo.png" alt="SettleOne Logo" className="h-6" />
          <span className="text-white text-xs px-2 py-0.5 rounded-full border border-white/10 bg-white/5 ml-auto">
            Docs
          </span>
        </div>

        <nav className="px-4 py-4 space-y-8 pb-24">
          {docsNavigation.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.id} className="space-y-3">
                <div className="flex items-center gap-2 px-3 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  <Icon size={14} className="text-cyan-500" />
                  {section.title}
                </div>
                <ul className="space-y-1">
                  {section.pages.map((page) => {
                    const isActive = activePageId === page.id;
                    return (
                      <li key={page.id}>
                        <button
                          onClick={() => setActivePageId(page.id)}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                            isActive 
                              ? "bg-cyan-500/10 text-cyan-400 font-medium border border-cyan-500/20" 
                              : "text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent"
                          }`}
                        >
                          {page.title}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-h-screen relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-[800px] mx-auto px-6 py-12 md:py-20 relative z-10">
          <PageContent pageId={activePageId} />
        </div>
      </main>
    </div>
  );
}
