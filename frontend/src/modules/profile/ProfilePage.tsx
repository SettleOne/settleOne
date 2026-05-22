import { useAuthStore } from '../../stores/useAuthStore'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/Card'
import { Button } from '../../components/Button'
import { useAccount } from 'wagmi'
import { User, Mail, Building, Shield, ExternalLink, Settings } from 'lucide-react'

export function ProfilePage() {
  const { user } = useAuthStore()
  const { address } = useAccount()

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-10">
        <h1 className="font-syne font-bold text-3xl md:text-4xl">User Profile</h1>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings className="w-4 h-4" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <Card className="text-center pt-8">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-brand-teal to-brand-gold flex items-center justify-center font-bold text-bg-primary text-3xl mx-auto mb-4">
              {user?.name?.[0]}
            </div>
            <CardHeader className="pt-0">
              <CardTitle>{user?.name}</CardTitle>
              <CardDescription>{user?.role}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-text-slate bg-bg-tertiary py-1.5 rounded">
                  <span>Reputation Score: 98/100</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Account Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-brand-teal" />
                <span className="text-xs">Identity Verified</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-brand-teal" />
                <span className="text-xs">Wallet Linked</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>Primary details for your deals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-mono text-text-slate uppercase tracking-widest flex items-center gap-2">
                    <User className="w-3 h-3" /> Full Name
                  </p>
                  <p className="font-medium">{user?.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-mono text-text-slate uppercase tracking-widest flex items-center gap-2">
                    <Building className="w-3 h-3" /> Business
                  </p>
                  <p className="font-medium">{user?.businessName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-mono text-text-slate uppercase tracking-widest flex items-center gap-2">
                    <Mail className="w-3 h-3" /> Email
                  </p>
                  <p className="font-medium">{user?.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-mono text-text-slate uppercase tracking-widest flex items-center gap-2">
                    <Shield className="w-3 h-3" /> Wallet
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-sm truncate max-w-[120px]">{address}</p>
                    <ExternalLink className="w-3 h-3 text-text-slate" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security & Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-bg-tertiary/30 border border-text-muted/5">
                <div>
                  <p className="text-sm font-medium">Email Notifications</p>
                  <p className="text-xs text-text-slate">Receive updates on deal status</p>
                </div>
                <div className="w-10 h-6 bg-brand-teal rounded-full relative">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-bg-tertiary/30 border border-text-muted/5">
                <div>
                  <p className="text-sm font-medium">Auto-Release</p>
                  <p className="text-xs text-text-slate">Enable Chainlink automation for your deals</p>
                </div>
                <div className="w-10 h-6 bg-brand-teal rounded-full relative">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
