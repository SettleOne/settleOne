import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Plus,
  ArrowUpRight,
  Clock,
  ShieldAlert,
  CheckCircle2,
  TrendingUp,
  Zap,
  Activity,
  ArrowRight,
  ShieldCheck,
  PieChart,
  Loader2,
} from "lucide-react";
import { formatEther } from "viem";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/Card";
import { Button } from "../../components/Button";
import { StatusBadge } from "../../components/StatusBadge";
import { useAuthStore } from "../../stores/useAuthStore";
import { useDealStore } from "../../stores/useDealStore";
import { cn } from "../../utils/cn";

export function DashboardPage() {
  const { user } = useAuthStore();
  const { deals, loading, fetchDeals } = useDealStore();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetchDeals();
  }, [fetchDeals]);

  useEffect(() => {
    if (deals.length > 0) {
      const totalVolume = deals.reduce(
        (acc: bigint, deal: any) => acc + BigInt(deal.amountWei),
        0n,
      );
      const activeCount = deals.filter(
        (d: any) => d.status !== "settled" && d.status !== "cancelled",
      ).length;

      setStats({
        activeDeals: activeCount,
        totalVolume: formatEther(totalVolume),
        pendingVerif: deals.filter(
          (d: any) => d.status === "delivery_submitted",
        ).length,
        settled: deals.filter((d: any) => d.status === "settled")
          .length,
      });
    }
  }, [deals]);

  const recentDeals = deals.slice(0, 5);

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-2"
        >
          <h1 className="font-syne font-black text-4xl md:text-6xl tracking-tighter">
            System{" "}
            <span className="text-brand-teal text-glow-teal">Overview</span>
          </h1>
          <div className="flex items-center gap-3">
            <div className="h-1.5 w-1.5 rounded-full bg-brand-teal animate-pulse shadow-[0_0_8px_var(--color-brand-teal)]" />
            <p className="text-text-slate font-mono text-[10px] uppercase tracking-[0.3em]">
              Node: {user?.name || "Anonymous"} • {user?.role || "Guest"}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Link to="/deals/create">
            <Button
              size="lg"
              className="h-16 px-10 gap-3 font-syne font-bold text-lg shadow-2xl group"
            >
              <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
              Initialize Protocol
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {[
          {
            title: "Active Protocols",
            value: stats?.activeDeals || "0",
            icon: Activity,
            color: "text-brand-teal",
          },
          {
            title: "Capital Volume",
            value: `${stats?.totalVolume || "0.00"} ETH`,
            icon: TrendingUp,
            color: "text-brand-teal",
          },
          {
            title: "In Verification",
            value: stats?.pendingVerif || "0",
            icon: ShieldAlert,
            color: "text-brand-gold",
          },
          {
            title: "Successful Settlements",
            value: stats?.settled || "0",
            icon: CheckCircle2,
            color: "text-brand-teal",
          },
        ].map((item, i) => (
          <Card
            key={item.title}
            className="p-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription className="tracking-[0.2em]">
                {item.title}
              </CardDescription>
              <item.icon className={cn("w-4 h-4", item.color)} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-syne font-black tracking-tighter">
                {item.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Feed */}
        <div className="lg:col-span-8 space-y-10">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between border-b border-text-muted/5 pb-6">
              <div>
                <CardTitle className="text-2xl tracking-tight">
                  Recent Protocol Transmissions
                </CardTitle>
                <CardDescription>Real-time network activity</CardDescription>
              </div>
              <Link to="/deals">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-brand-teal font-mono text-[10px] tracking-widest group"
                >
                  EXPLORE ALL{" "}
                  <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="pt-6">
              {loading ? (
                <div className="flex justify-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-brand-teal opacity-50" />
                </div>
              ) : recentDeals.length === 0 ? (
                <div className="py-20 text-center space-y-4">
                  <PieChart className="w-12 h-12 text-text-muted mx-auto opacity-20" />
                  <p className="text-text-slate font-mono text-[10px] uppercase tracking-widest">
                    No transmissions detected on current node
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentDeals.map((deal, i) => (
                    <motion.div
                      key={deal.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center justify-between p-5 rounded-2xl bg-bg-tertiary/30 border border-text-muted/5 group hover:border-brand-teal/20 transition-all hover:bg-bg-tertiary/50"
                    >
                      <div className="flex items-center gap-5">
                        <div
                          className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center border transition-all",
                            deal.status === "settled"
                              ? "bg-brand-teal/10 border-brand-teal/20 text-brand-teal"
                              : "bg-brand-gold/10 border-brand-gold/20 text-brand-gold",
                          )}
                        >
                          {deal.status === "settled" ? (
                            <CheckCircle2 className="w-6 h-6" />
                          ) : (
                            <Clock className="w-6 h-6" />
                          )}
                        </div>
                        <div>
                          <p className="font-syne font-bold text-lg group-hover:text-brand-teal transition-colors">
                            {deal.title}
                          </p>
                          <div className="flex items-center gap-3 mt-1 text-[10px] font-mono text-text-slate uppercase tracking-tighter">
                            <span className="text-brand-teal">
                              {formatEther(BigInt(deal.amountWei))} ETH
                            </span>
                            <span>•</span>
                            <span className="truncate max-w-[120px]">
                              {deal.buyerWallet}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-mono text-text-slate mb-1">
                          {new Date(deal.createdAt).toLocaleDateString()}
                        </p>
                        <StatusBadge status={deal.status} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Actions */}
        <div className="lg:col-span-4 space-y-10">
          <Card className="bg-gradient-to-br from-brand-teal/[0.03] to-transparent border-brand-teal/10">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-3">
                <Zap className="w-5 h-5 text-brand-teal fill-brand-teal/20" />
                Node Operations
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Button
                variant="outline"
                className="justify-between h-14 w-full group hover:border-brand-teal/40"
              >
                <span className="font-mono text-xs uppercase tracking-widest">
                  Awaiting Deposit
                </span>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-brand-gold/20 text-brand-gold text-[10px] flex items-center justify-center font-bold">
                    2
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-brand-teal transition-all" />
                </div>
              </Button>
              <Button
                variant="outline"
                className="justify-between h-14 w-full group hover:border-brand-teal/40"
              >
                <span className="font-mono text-xs uppercase tracking-widest">
                  Verification Pending
                </span>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-brand-teal/20 text-brand-teal text-[10px] flex items-center justify-center font-bold">
                    0
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-brand-teal transition-all" />
                </div>
              </Button>
              <Button
                variant="outline"
                className="justify-between h-14 w-full group hover:border-brand-teal/40 text-red-400"
              >
                <span className="font-mono text-xs uppercase tracking-widest">
                  Dispute Alerts
                </span>
                <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-red-400 transition-all" />
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-bg-tertiary/10 border-white/5">
            <CardHeader>
              <CardTitle className="text-sm font-mono tracking-[0.2em] text-text-slate flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-teal" />
                SECURITY AUDIT
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-text-slate leading-relaxed uppercase tracking-wider">
                All protocol transmissions are encrypted and hashed before
                network broadcast. SettleOne vault contracts have been audited
                for zero-trust integrity.
              </p>
              <div className="pt-2">
                <div className="flex items-center justify-between py-2 border-b border-white/5 text-[10px] font-mono">
                  <span className="text-text-slate">Wallet Integrity</span>
                  <span className="text-brand-teal">VERIFIED</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-white/5 text-[10px] font-mono">
                  <span className="text-text-slate">Contract Sync</span>
                  <span className="text-brand-teal">CONNECTED</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
