import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/Card";
import { Button } from "../../components/Button";
import { Wallet, TrendingUp, History, ArrowUpRight } from "lucide-react";

export function PaymentsPage() {
  const activeEscrows = [
    {
      id: "1",
      deal: "Website Redesign",
      amount: "2.5 ETH",
      yield: "0.012 ETH",
      release: "In 4 days",
      status: "LOCKED",
    },
    {
      id: "3",
      deal: "Smart Contract Audit",
      amount: "1.2 ETH",
      yield: "0.005 ETH",
      release: "Pending Verification",
      status: "VERIFYING",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-10">
        <h1 className="font-syne font-bold text-3xl md:text-4xl">
          Payments & Escrow
        </h1>
        <p className="text-text-slate mt-1 font-mono text-xs uppercase tracking-widest">
          Manage your locked assets and yield
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="bg-brand-teal/5 border-brand-teal/10">
          <CardHeader>
            <CardDescription>Total Value Locked</CardDescription>
            <CardTitle className="text-3xl text-brand-teal">3.70 ETH</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-xs text-brand-teal">
              <TrendingUp className="w-3 h-3" />
              <span>+0.2% yield this week</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Accrued Yield</CardDescription>
            <CardTitle className="text-3xl">0.017 ETH</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              variant="link"
              className="p-0 h-auto text-[10px] font-mono uppercase tracking-widest text-brand-teal"
            >
              Withdraw Yield
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Wallet Balance</CardDescription>
            <CardTitle className="text-3xl">12.45 ETH</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-xs text-text-slate">
              <Wallet className="w-3 h-3" />
              <span>Mainnet Wallet</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Active Escrows</CardTitle>
            <CardDescription>
              Funds currently held in SettleOne Vault
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeEscrows.map((escrow) => (
                <div
                  key={escrow.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-bg-tertiary/50 border border-text-muted/5"
                >
                  <div>
                    <p className="font-medium text-sm">{escrow.deal}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] font-mono text-brand-teal">
                        {escrow.amount}
                      </span>
                      <span className="text-[10px] font-mono text-text-slate">
                        •
                      </span>
                      <span className="text-[10px] font-mono text-text-slate">
                        {escrow.release}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-mono text-text-slate uppercase tracking-widest mb-1">
                      Yield
                    </p>
                    <p className="text-xs font-bold text-brand-teal">
                      +{escrow.yield}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>
                Your past settlements and refunds
              </CardDescription>
            </div>
            <History className="w-4 h-4 text-text-slate" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  deal: "API Integration",
                  amount: "0.8 ETH",
                  type: "RECEIVED",
                  date: "2d ago",
                },
                {
                  deal: "Design Assets",
                  amount: "0.3 ETH",
                  type: "REFUNDED",
                  date: "1w ago",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-lg bg-bg-tertiary/30 border border-text-muted/5"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded flex items-center justify-center ${item.type === "RECEIVED" ? "bg-brand-teal/10 text-brand-teal" : "bg-brand-gold/10 text-brand-gold"}`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.deal}</p>
                      <p className="text-[10px] font-mono text-text-slate">
                        {item.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-bold ${item.type === "RECEIVED" ? "text-brand-teal" : "text-brand-gold"}`}
                    >
                      {item.type === "RECEIVED" ? "+" : ""}
                      {item.amount}
                    </p>
                    <p className="text-[10px] font-mono text-text-slate uppercase">
                      {item.type}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
