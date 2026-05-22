import * as React from 'react'
import { Header } from './Header'
import { NotificationToast } from './NotificationToast'
import { useNotifications } from '../hooks/useNotifications'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  useNotifications()

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary">
      <Header />
      <main className="flex-1 pt-16 relative">
        {children}
      </main>
      <footer className="py-12 border-t border-text-muted/10 bg-bg-secondary/30 relative z-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-teal to-brand-gold flex items-center justify-center font-black text-bg-primary text-sm shadow-lg">
              S1
            </div>
            <span className="font-syne font-black text-xl tracking-tighter">
              Settle<span className="text-brand-gold text-glow-gold">One</span>
            </span>
          </div>
          <p className="text-text-slate text-[10px] font-mono uppercase tracking-[0.4em]">
            &copy; 2026 SettleOne Protocol • B2B Payment Commitment Layer
          </p>
          <div className="flex gap-8 text-[10px] font-mono uppercase tracking-widest text-text-slate">
            <a href="#" className="hover:text-brand-teal transition-colors">Documentation</a>
            <a href="#" className="hover:text-brand-teal transition-colors">Terminus</a>
            <a href="#" className="hover:text-brand-teal transition-colors">Privacy Node</a>
          </div>
        </div>
      </footer>
      <NotificationToast />
    </div>
  )
}
