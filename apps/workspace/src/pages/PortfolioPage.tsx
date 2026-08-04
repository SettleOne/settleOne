import React, { useMemo, useState } from "react";
import { useAccount } from "wagmi";
import {
  Wallet,
  PieChart,
  History,
  Activity,
  Briefcase,
  TrendingUp,
  Eye,
  CheckCircle,
} from "lucide-react";
import { Button, Spinner } from "@settleone/design-system";
import { useMyDeals } from "@settleone/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const yieldData = [
  { date: "Jan 01", yield: 0 },
  { date: "Jan 05", yield: 12 },
  { date: "Jan 10", yield: 35 },
  { date: "Jan 15", yield: 64 },
  { date: "Jan 20", yield: 92 },
  { date: "Jan 25", yield: 120 },
  { date: "Jan 30", yield: 142.3 },
];

export function PortfolioPage() {
  const { address } = useAccount();
  const { data, isLoading } = useMyDeals({});
  const [chartFilter, setChartFilter] = useState("30d");

  const deals = data?.deals || [];

  const stats = useMemo(() => {
    const activeDeals = deals.filter((d) =>
      [1, 2, 3, 4, 5, 7].includes(d.state),
    );
    const tvl = activeDeals.reduce(
      (sum, d) => sum + BigInt(d.depositedFunds || 0),
      0n,
    );
    const totalYield = 142.3;

    return {
      tvl,
      activeCount: activeDeals.length,
      totalYield,
      buyerDeals: 8,
      sellerDeals: 4,
    };
  }, [deals]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-[var(--text-primary)]">
        <Spinner size="lg" />
        <p className="mt-4 text-[var(--text-secondary)] font-medium">
          Calculating Portfolio...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto text-[var(--text-primary)] font-[var(--font-sans)]">
      {/* Background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(/blockchain-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          opacity: 0.05,
          zIndex: 0,
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 30% 0%, rgba(59,130,246,0.06) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div className="relative z-10 space-y-8">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-black tracking-tight">
            <span className="gradient-text">Your Portfolio</span>
          </h1>
          <p className="text-[var(--text-secondary)] mt-2">
            Track your capital, yield earnings, and deal history.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 stagger-children">
          {/* Total Capital */}
          <div
            className="animate-card-enter rounded-[var(--radius-card)] p-6 card-hover"
            style={{
              background:
                "linear-gradient(135deg, rgba(14,25,45,0.8), rgba(10,18,32,0.7))",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow:
                "0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            <div className="flex items-center gap-2 text-[var(--text-secondary)] text-xs font-semibold mb-3 uppercase tracking-wider">
              <Wallet size={14} className="text-blue-400" /> Total Active
              Capital
            </div>
            <div className="text-3xl font-black tracking-tight">
              <span
                style={{
                  background: "linear-gradient(135deg, white, #60a5fa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                $12,500
              </span>{" "}
              <span className="text-sm font-normal text-[var(--text-muted)]">
                USDC
              </span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] mt-2">
              Across {Math.max(stats.activeCount, 3)} active deals
            </p>
          </div>

          {/* Yield Card */}
          <div
            className="animate-card-enter rounded-[var(--radius-card)] p-6 relative overflow-hidden card-hover"
            style={{
              background:
                "linear-gradient(135deg, rgba(6,40,20,0.7), rgba(4,20,14,0.8))",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(34,197,94,0.2)",
              boxShadow:
                "0 4px 24px rgba(0,0,0,0.5), 0 0 30px rgba(34,197,94,0.06), inset 0 1px 0 rgba(34,197,94,0.06)",
              animationDelay: "60ms",
            }}
          >
            <div className="absolute top-0 right-0 p-4 opacity-8 pointer-events-none">
              <TrendingUp size={64} style={{ color: "rgba(34,197,94,0.15)" }} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-[var(--text-secondary)] text-xs font-semibold mb-3 uppercase tracking-wider">
                <PieChart size={14} className="text-green-400" /> Total Yield
                Earned
              </div>
              <div className="text-3xl font-black tracking-tight text-[var(--accent-green)]">
                +${stats.totalYield.toFixed(2)}{" "}
                <span className="text-sm font-normal text-[var(--text-muted)]">
                  USDC
                </span>
              </div>
              <p className="text-sm text-[var(--text-secondary)] mt-2">
                This month: +$42.10
              </p>
            </div>
          </div>

          {/* Buyer Deals */}
          <div
            className="animate-card-enter rounded-[var(--radius-card)] p-6 card-hover"
            style={{
              background:
                "linear-gradient(135deg, rgba(14,25,45,0.8), rgba(10,18,32,0.7))",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow:
                "0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
              animationDelay: "120ms",
            }}
          >
            <div className="flex items-center gap-2 text-[var(--text-secondary)] text-xs font-semibold mb-3 uppercase tracking-wider">
              <Briefcase size={14} className="text-cyan-400" /> Deals as Buyer
            </div>
            <div className="text-3xl font-black tracking-tight">
              <span
                style={{
                  background: "linear-gradient(135deg, white, #22d3ee)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {stats.buyerDeals}
              </span>
              <span className="text-base font-normal text-[var(--text-muted)] ml-1">
                total
              </span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] mt-2">
              5 completed, 2 active, 1 disputed
            </p>
          </div>

          {/* Seller Deals */}
          <div
            className="animate-card-enter rounded-[var(--radius-card)] p-6 card-hover"
            style={{
              background:
                "linear-gradient(135deg, rgba(14,25,45,0.8), rgba(10,18,32,0.7))",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow:
                "0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
              animationDelay: "180ms",
            }}
          >
            <div className="flex items-center gap-2 text-[var(--text-secondary)] text-xs font-semibold mb-3 uppercase tracking-wider">
              <Activity size={14} className="text-purple-400" /> Deals as Seller
            </div>
            <div className="text-3xl font-black tracking-tight">
              <span
                style={{
                  background: "linear-gradient(135deg, white, #a78bfa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {stats.sellerDeals}
              </span>
              <span className="text-base font-normal text-[var(--text-muted)] ml-1">
                total
              </span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] mt-2">
              3 completed, 1 active
            </p>
          </div>
        </div>

        {/* Active Positions Table */}
        <div>
          <h2 className="text-xl font-bold mb-4 gradient-text inline-block">
            Active Escrow Positions
          </h2>
          <div
            className="rounded-[var(--radius-card)] overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(12,20,36,0.85), rgba(8,14,26,0.8))",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.05)",
              boxShadow:
                "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)",
            }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-[var(--bg-base)] border-b border-[var(--border)] text-xs text-[var(--text-secondary)] uppercase">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Deal</th>
                    <th className="px-6 py-4 font-semibold">Role</th>
                    <th className="px-6 py-4 font-semibold">Principal</th>
                    <th className="px-6 py-4 font-semibold">Current Value</th>
                    <th className="px-6 py-4 font-semibold">Yield So Far</th>
                    <th className="px-6 py-4 font-semibold">State</th>
                    <th className="px-6 py-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  <tr className="hover:bg-[var(--bg-subtle)] transition-colors">
                    <td className="px-6 py-4 font-medium">#DL-00143</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-900/30 text-blue-400 border border-blue-800/40">
                        Buyer
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono">3,000 USDC</td>
                    <td className="px-6 py-4 font-mono">3,006.20 USDC</td>
                    <td className="px-6 py-4 text-[var(--accent-green)]">
                      +$6.20
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[var(--state-active)] flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[var(--state-active)] animate-pulse"></span>
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        variant="secondary"
                        className="flex gap-2 items-center text-xs py-1 px-3"
                      >
                        <Eye size={14} /> View
                      </Button>
                    </td>
                  </tr>
                  <tr className="hover:bg-[var(--bg-subtle)] transition-colors">
                    <td className="px-6 py-4 font-medium">#DL-00129</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-purple-900/30 text-purple-400 border border-purple-800/40">
                        Seller
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[var(--text-muted)]">—</td>
                    <td className="px-6 py-4 text-[var(--text-muted)]">—</td>
                    <td className="px-6 py-4 text-[var(--text-muted)]">—</td>
                    <td className="px-6 py-4">
                      <span className="text-[var(--state-active)] flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[var(--state-active)] animate-pulse"></span>
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        variant="secondary"
                        className="flex gap-2 items-center text-xs py-1 px-3"
                      >
                        <Eye size={14} /> View
                      </Button>
                    </td>
                  </tr>
                  <tr className="hover:bg-[var(--bg-subtle)] transition-colors">
                    <td className="px-6 py-4 font-medium">#DL-00118</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-900/30 text-blue-400 border border-blue-800/40">
                        Buyer
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono">15,000 USDC</td>
                    <td className="px-6 py-4 font-mono">15,042.80 USDC</td>
                    <td className="px-6 py-4 text-[var(--accent-green)]">
                      +$42.80
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="flex items-center gap-2"
                        style={{ color: "var(--state-awaiting-acceptance)" }}
                      >
                        <span
                          className="w-2 h-2 rounded-full animate-pulse"
                          style={{
                            background: "var(--state-awaiting-acceptance)",
                          }}
                        ></span>
                        Awaiting Acceptance
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        variant="secondary"
                        className="flex gap-2 items-center text-xs py-1 px-3"
                      >
                        <Eye size={14} /> View
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Yield Chart */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Yield Accumulated Over Time</h2>
            <div className="flex gap-2 bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-pill)] p-1">
              {["30d", "90d", "1y", "All"].map((f) => (
                <button
                  key={f}
                  onClick={() => setChartFilter(f)}
                  className={`px-3 py-1 text-xs rounded-[var(--radius-pill)] transition-colors ${
                    chartFilter === f
                      ? "bg-[var(--accent-blue)] text-white"
                      : "text-[var(--text-secondary)] hover:text-white"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-card)] p-6 shadow-[var(--shadow-card)] h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={yieldData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  stroke="var(--text-secondary)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--text-secondary)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--bg-card)",
                    borderColor: "var(--border)",
                    borderRadius: "var(--radius-card)",
                    color: "var(--text-primary)",
                  }}
                  itemStyle={{ color: "var(--accent-blue)" }}
                />
                <Line
                  type="monotone"
                  dataKey="yield"
                  stroke="var(--accent-blue)"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "var(--bg-card)", strokeWidth: 2 }}
                  activeDot={{
                    r: 6,
                    stroke: "var(--accent-blue)",
                    strokeWidth: 2,
                    fill: "var(--bg-card)",
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transaction History Table */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <History size={20} /> All Transactions
            </h2>
            <Button variant="secondary" className="text-xs">
              Filter
            </Button>
          </div>
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-card)] shadow-[var(--shadow-card)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-[var(--bg-base)] border-b border-[var(--border)] text-xs text-[var(--text-secondary)] uppercase">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Date</th>
                    <th className="px-6 py-4 font-semibold">Deal</th>
                    <th className="px-6 py-4 font-semibold">Type</th>
                    <th className="px-6 py-4 font-semibold">Amount</th>
                    <th className="px-6 py-4 font-semibold">Token</th>
                    <th className="px-6 py-4 font-semibold">Tx Hash</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  <tr className="hover:bg-[var(--bg-subtle)] transition-colors">
                    <td className="px-6 py-4 text-[var(--text-secondary)]">
                      Jan 28, 2026
                    </td>
                    <td className="px-6 py-4 font-medium">#DL-00143</td>
                    <td className="px-6 py-4">Funded (60%)</td>
                    <td className="px-6 py-4 font-mono text-[var(--text-primary)]">
                      3,000
                    </td>
                    <td className="px-6 py-4">USDC</td>
                    <td className="px-6 py-4 font-mono text-[var(--accent-blue)] cursor-pointer hover:underline">
                      0x7a...9f2b
                    </td>
                    <td className="px-6 py-4 text-[var(--accent-green)] flex items-center gap-1">
                      <CheckCircle size={14} /> Success
                    </td>
                  </tr>
                  <tr className="hover:bg-[var(--bg-subtle)] transition-colors">
                    <td className="px-6 py-4 text-[var(--text-secondary)]">
                      Jan 25, 2026
                    </td>
                    <td className="px-6 py-4 font-medium">#DL-00129</td>
                    <td className="px-6 py-4">Funded (100%)</td>
                    <td className="px-6 py-4 font-mono text-[var(--text-primary)]">
                      2,500
                    </td>
                    <td className="px-6 py-4">USDT</td>
                    <td className="px-6 py-4 font-mono text-[var(--accent-blue)] cursor-pointer hover:underline">
                      0x4c...7a19
                    </td>
                    <td className="px-6 py-4 text-[var(--accent-green)] flex items-center gap-1">
                      <CheckCircle size={14} /> Success
                    </td>
                  </tr>
                  <tr className="hover:bg-[var(--bg-subtle)] transition-colors">
                    <td className="px-6 py-4 text-[var(--text-secondary)]">
                      Jan 20, 2026
                    </td>
                    <td className="px-6 py-4 font-medium">#DL-00118</td>
                    <td className="px-6 py-4">Funded (60%)</td>
                    <td className="px-6 py-4 font-mono text-[var(--text-primary)]">
                      9,000
                    </td>
                    <td className="px-6 py-4">USDC</td>
                    <td className="px-6 py-4 font-mono text-[var(--accent-blue)] cursor-pointer hover:underline">
                      0x9b...2e44
                    </td>
                    <td className="px-6 py-4 text-[var(--accent-green)] flex items-center gap-1">
                      <CheckCircle size={14} /> Success
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-[var(--border)] flex justify-between items-center bg-[var(--bg-base)] text-sm text-[var(--text-secondary)]">
              <span>Showing 1 to 3 of 12 entries</span>
              <div className="flex gap-2">
                <Button variant="secondary" className="px-3 py-1" disabled>
                  Prev
                </Button>
                <Button variant="secondary" className="px-3 py-1">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
