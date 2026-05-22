import { Link } from 'react-router-dom'
import { Button } from './Button'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { Wallet, LogOut, Menu, User as UserIcon } from 'lucide-react'
import { useAuthStore } from '../stores/useAuthStore'
import { useState, useEffect } from 'react'
import { AuthModal } from '../modules/auth/AuthModal'

export function Header() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  const { user, logout } = useAuthStore()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  useEffect(() => {
    if (isConnected && !user && !isAuthModalOpen) {
      setIsAuthModalOpen(true)
    }
  }, [isConnected, user])

  const handleDisconnect = () => {
    disconnect()
    logout()
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-text-muted/20 bg-bg-primary/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-brand-teal to-brand-gold flex items-center justify-center font-bold text-bg-primary group-hover:scale-110 transition-transform">
            S1
          </div>
          <span className="font-syne font-bold text-xl tracking-tight">
            Settle<span className="text-brand-gold">One</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/deals" className="text-sm font-medium hover:text-brand-teal transition-colors">Deals</Link>
          <Link to="/payments" className="text-sm font-medium hover:text-brand-teal transition-colors">Payments</Link>
          <Link to="/disputes" className="text-sm font-medium hover:text-brand-teal transition-colors">Disputes</Link>
        </nav>

        <div className="flex items-center gap-3">
          {isConnected ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex flex-col items-end mr-2">
                <span className="text-sm font-medium">{user?.name || 'New User'}</span>
                <span className="text-[10px] text-text-slate font-mono">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
              </div>
              {user ? (
                <Link to="/profile">
                  <Button variant="ghost" size="icon" className="rounded-full bg-bg-tertiary">
                    <UserIcon className="w-4 h-4" />
                  </Button>
                </Link>
              ) : (
                <Button variant="outline" size="sm" onClick={() => setIsAuthModalOpen(true)}>
                  Register
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleDisconnect}
                className="text-text-slate hover:text-red-500"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button 
              onClick={() => connect({ connector: injected() })}
              className="gap-2"
            >
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </Button>
          )}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </header>
  )
}
