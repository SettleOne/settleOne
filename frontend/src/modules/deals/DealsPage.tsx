import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  ArrowRight,
  Loader2,
  Wallet,
  TrendingUp,
  Inbox,
  ExternalLink,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { formatEther } from "viem";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../../components/Card";
import { Button } from "../../components/Button";
import { StatusBadge } from "../../components/StatusBadge";
import { useDealStore } from "../../stores/useDealStore";
import { cn } from "../../utils/cn";

export function DealsPage() {
  const { deals, loading, fetchDeals } = useDealStore();
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDeals();
  }, [fetchDeals]);

  const filteredDeals = deals.filter((deal) => {
    const matchesSearch =
      deal.title.toLowerCase().includes(search.toLowerCase()) ||
      deal.buyerWallet.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "ALL" || deal.status.toUpperCase() === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
        <div className="space-y-2">
          <h1 className="font-syne font-extrabold text-4xl md:text-5xl tracking-tight">
            Protocol{" "}
            <span className="text-brand-teal text-glow-teal">Inventory</span>
          </h1>
          <p className="text-text-slate font-mono text-xs uppercase tracking-[0.3em]">
            Monitor and manage active payment commitments
          </p>
        </div>
        <Link to="/deals/create">
          <Button
            size="lg"
            className="h-14 px-8 gap-3 font-syne font-bold shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Initialize New Protocol
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-10">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-brand-teal transition-colors" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-bg-secondary/50 backdrop-blur-md border border-text-muted/10 rounded-xl pl-12 pr-5 h-14 focus:outline-none focus:border-brand-teal transition-all font-mono text-sm"
            placeholder="Filter by title, address, or ID..."
          />
        </div>
        <div className="flex gap-2 p-1.5 bg-bg-secondary/50 backdrop-blur-md border border-text-muted/10 rounded-xl overflow-x-auto no-scrollbar">
          {["ALL", "FUNDED", "DISPUTED", "SETTLED"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-5 py-2 rounded-lg font-mono text-[10px] tracking-[0.2em] uppercase transition-all whitespace-nowrap",
                filter === f
                  ? "bg-brand-teal text-bg-primary font-bold shadow-md"
                  : "text-text-slate hover:text-text-primary hover:bg-white/5",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-6">
          <Loader2 className="w-10 h-10 animate-spin text-brand-teal" />
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-text-slate animate-pulse">
            Syncing with Mainnet
          </p>
        </div>
      ) : filteredDeals.length === 0 ? (
        <Card className="py-24 text-center">
          <div className="w-20 h-20 rounded-full bg-bg-tertiary flex items-center justify-center mx-auto mb-6 border border-text-muted/5">
            <Inbox className="w-10 h-10 text-text-muted" />
          </div>
          <h3 className="text-xl font-syne font-bold mb-2">
            No Protocols Detected
          </h3>
          <p className="text-text-slate max-w-sm mx-auto text-sm">
            We couldn't find any protocol instances matching your current
            filter. Initialize a new commitment to get started.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredDeals.map((deal, i) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="h-full flex flex-col hover:border-brand-teal/30 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-teal/5 group">
                  <CardHeader className="space-y-4">
                    <div className="flex justify-between items-start">
                      <StatusBadge status={deal.status} />
                      <div className="flex items-center gap-1.5 text-text-slate">
                        <Clock className="w-3 h-3" />
                        <span className="text-[9px] font-mono uppercase tracking-widest">
                          {new Date(deal.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div>
                      <CardTitle className="line-clamp-1 group-hover:text-brand-teal transition-colors">
                        {deal.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Wallet className="w-3 h-3 text-text-slate" />
                        <CardDescription className="normal-case tracking-tight truncate max-w-[200px]">
                          {deal.buyerWallet}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 space-y-6">
                    <div className="p-4 rounded-xl bg-bg-tertiary/50 border border-text-muted/5 group-hover:border-brand-teal/10 transition-all">
                      <p className="text-[9px] font-mono text-text-slate uppercase tracking-[0.2em] mb-1">
                        Obligation
                      </p>
                      <p className="text-2xl font-syne font-black text-brand-teal tracking-tighter">
                        {formatEther(BigInt(deal.amountWei))}{" "}
                        <span className="text-xs font-normal opacity-50">
                          ETH
                        </span>
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-[9px] font-mono uppercase tracking-[0.2em] text-text-slate">
                        <span>Execution Stage</span>
                        <span>{deal.status === "settled" ? "100" : "45"}%</span>
                      </div>
                      <div className="h-1 w-full bg-bg-tertiary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand-teal transition-all duration-1000 shadow-[0_0_10px_rgba(0,229,160,0.5)]"
                          style={{
                            width: `${deal.status === "settled" ? "100" : "45"}%`,
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-2">
                    <Link
                      to={`/deals/${deal.onchainDealId || deal.id}`}
                      className="w-full"
                    >
                      <Button
                        variant="outline"
                        className="w-full justify-between h-12 hover:bg-brand-teal/10 group-hover:border-brand-teal/30"
                      >
                        View Manifest
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Mini Stats Footer */}
      <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 p-8 glass-card border-brand-teal/5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-teal/10 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-brand-teal" />
          </div>
          <div>
            <p className="text-[10px] font-mono text-text-slate uppercase tracking-widest">
              Protocol Throughput
            </p>
            <p className="text-xl font-bold font-syne">142.50 ETH</p>
          </div>
        </div>
        <div className="flex items-center gap-4 border-l border-text-muted/10 pl-8">
          <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-brand-gold" />
          </div>
          <div>
            <p className="text-[10px] font-mono text-text-slate uppercase tracking-widest">
              Trust Integrity
            </p>
            <p className="text-xl font-bold font-syne">100% Verified</p>
          </div>
        </div>
        <div className="flex items-center gap-4 border-l border-text-muted/10 pl-8">
          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
            <ExternalLink className="w-6 h-6 text-text-slate" />
          </div>
          <div>
            <p className="text-[10px] font-mono text-text-slate uppercase tracking-widest">
              Network Nodes
            </p>
            <p className="text-xl font-bold font-syne">1,204 Active</p>
          </div>
        </div>
      </div>
    </div>
  );
}
