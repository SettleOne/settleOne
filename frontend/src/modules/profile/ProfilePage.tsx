import { useAuthStore } from "../../stores/useAuthStore";
import { useAccount } from "wagmi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/Card";
import { Button } from "../../components/Button";
import { 
  User, 
  Mail, 
  Wallet, 
  Award, 
  Activity, 
  ShieldCheck,
  Settings,
  Bell,
  TrendingUp,
  CheckCircle2
} from "lucide-react";
import { cn } from "../../utils/cn";

export function ProfilePage() {
  const { user } = useAuthStore();
  const { address } = useAccount();

  if (!user) return null;

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-brand-teal to-brand-gold p-1 shadow-2xl">
            <div className="w-full h-full rounded-[22px] bg-bg-primary flex items-center justify-center">
              <User className="w-12 h-12 text-brand-teal" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="font-syne font-black text-4xl md:text-5xl tracking-tighter">
              {user.name || "Anonymous User"}
            </h1>
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-brand-teal animate-pulse" />
              <p className="text-text-slate font-mono text-[10px] uppercase tracking-[0.3em]">
                {user.role} NODE • TRUSTED SENDER
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" className="gap-2">
            <Settings className="w-4 h-4" />
            Edit Profile
          </Button>
          <Button className="gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column */}
        <div className="lg:col-span-4 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Node Identity</CardTitle>
              <CardDescription>Verified account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-bg-tertiary/50 border border-text-muted/5">
                  <Wallet className="w-5 h-5 text-text-slate" />
                  <div className="overflow-hidden">
                    <p className="text-[10px] font-mono text-text-slate uppercase tracking-widest">
                      Primary Wallet
                    </p>
                    <p className="font-mono text-xs truncate">
                      {address || user.walletAddress}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-bg-tertiary/50 border border-text-muted/5">
                  <Mail className="w-5 h-5 text-text-slate" />
                  <div>
                    <p className="text-[10px] font-mono text-text-slate uppercase tracking-widest">
                      Email Address
                    </p>
                    <p className="text-sm font-medium">{user.email || "Not provided"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-bg-tertiary/50 border border-text-muted/5">
                  <Award className="w-5 h-5 text-brand-gold" />
                  <div>
                    <p className="text-[10px] font-mono text-text-slate uppercase tracking-widest">
                      Reputation Score
                    </p>
                    <p className="text-sm font-bold text-brand-gold">
                      {user.reputationScore} / 1000
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className="text-[10px] font-mono uppercase text-text-slate">Member Since</span>
                  <span className="text-[10px] font-mono">MAY 2026</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className="text-[10px] font-mono uppercase text-text-slate">KYC Status</span>
                  <span className="text-[10px] font-mono text-brand-teal">VERIFIED</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-brand-gold/[0.03] to-transparent border-brand-gold/10">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-brand-gold" />
                Trust Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-2 w-full bg-bg-tertiary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-brand-gold" 
                  style={{ width: `${(user.reputationScore / 1000) * 100}%` }}
                />
              </div>
              <p className="text-xs text-text-slate leading-relaxed">
                Your reputation score is calculated based on successful settlements, 
                dispute outcomes, and protocol adherence.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Active Deals", value: "12", icon: Activity },
              { label: "Total Volume", value: "45.2 ETH", icon: TrendingUp },
              { label: "Success Rate", value: "98%", icon: CheckCircle2 },
            ].map((stat, i) => (
              <Card key={i} className="bg-bg-tertiary/20">
                <CardHeader className="pb-2">
                  <stat.icon className="w-5 h-5 text-brand-teal mb-2" />
                  <CardDescription className="text-[10px] tracking-[0.2em]">{stat.label}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-syne font-black tracking-tighter">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your node's safety</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { 
                  title: "Two-Factor Auth", 
                  desc: "Add an extra layer of security to your account.", 
                  enabled: true 
                },
                { 
                  title: "Wallet Notifications", 
                  desc: "Receive alerts for all on-chain deal activity.", 
                  enabled: true 
                },
                { 
                  title: "Public Profile", 
                  desc: "Allow others to view your reputation and deal history.", 
                  enabled: false 
                },
              ].map((setting, i) => (
                <div key={i} className="flex items-center justify-between p-6 rounded-2xl bg-bg-tertiary/30 border border-text-muted/5">
                  <div className="space-y-1">
                    <p className="font-bold text-text-primary">{setting.title}</p>
                    <p className="text-xs text-text-slate">{setting.desc}</p>
                  </div>
                  <div 
                    className={cn(
                      "w-12 h-6 rounded-full relative transition-all cursor-pointer",
                      setting.enabled ? "bg-brand-teal" : "bg-text-muted/20"
                    )}
                  >
                    <div 
                      className={cn(
                        "w-4 h-4 rounded-full bg-white absolute top-1 transition-all",
                        setting.enabled ? "right-1" : "left-1"
                      )}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
