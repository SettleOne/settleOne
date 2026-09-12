import React, { useState, useEffect } from "react";
import { docsNavigation } from "../content/navigation";
import { Menu, X } from "lucide-react";
import { PageContent } from "../content/pages";

export function DocsLayout() {
  const [activePageId, setActivePageId] = useState("introduction");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMobileMenuOpen(false);
  }, [activePageId]);

  return (
    <div className="min-h-screen bg-[#030303] text-slate-300 font-sans flex flex-col md:flex-row selection:bg-cyan-500/30 relative">
      {/* Global Background Image with Low Opacity */}
      <div
        className="fixed inset-0 z-0 opacity-[0.07] pointer-events-none bg-cover bg-center bg-no-repeat transition-opacity duration-1000 mix-blend-screen"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />

      {/* Ambient Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Mobile Header (Glassmorphic) */}
      <div className="md:hidden sticky top-0 z-50 bg-[#0a0a0a]/70 backdrop-blur-xl border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/whiteLogo.png" alt="SettleOne Logo" className="h-6" />
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-slate-400 hover:text-white transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Navigation (Glassmorphic) */}
      <aside
        className={`${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:sticky top-[57px] md:top-0 left-0 z-40 w-full md:w-[280px] h-[calc(100vh-57px)] md:h-screen bg-[#0a0a0a]/60 backdrop-blur-2xl border-r border-white/10 overflow-y-auto transition-transform duration-500 ease-out hide-scrollbar shadow-2xl shadow-black`}
      >
        <div className="hidden md:flex items-center gap-2 p-6 pb-4">
          <img src="/whiteLogo.png" alt="SettleOne Logo" className="h-6" />
          <span className="text-cyan-400 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 ml-auto">
            Docs
          </span>
        </div>

        <nav className="px-4 py-4 space-y-8 pb-24">
          {docsNavigation.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.id} className="space-y-3">
                <div className="flex items-center gap-2 px-3 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  <Icon size={14} className="text-cyan-500/80" />
                  {section.title}
                </div>
                <ul className="space-y-1">
                  {section.pages.map((page) => {
                    const isActive = activePageId === page.id;
                    return (
                      <li key={page.id}>
                        <button
                          onClick={() => setActivePageId(page.id)}
                          className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-300 ${
                            isActive
                              ? "bg-gradient-to-r from-cyan-500/10 to-transparent text-cyan-400 font-medium border-l-2 border-cyan-500 shadow-inner"
                              : "text-slate-400 hover:bg-white/5 hover:text-slate-200 border-l-2 border-transparent"
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
      <main className="flex-1 min-h-screen relative z-10">
        <div className="max-w-[850px] mx-auto px-6 py-12 md:py-20 relative">
          <PageContent pageId={activePageId} />
        </div>
      </main>
    </div>
  );
}
