import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/Card";
import { Button } from "../../components/Button";
import { Gavel, AlertCircle, FileText, Scale, Loader2, CheckCircle2 } from "lucide-react";
import { useDisputeStore } from "../../stores/useDisputeStore";
import { useEffect } from "react";
import { StatusBadge } from "../../components/StatusBadge";

export function DisputesPage() {
  const { disputes, loading, fetchDisputes } = useDisputeStore();

  useEffect(() => {
    fetchDisputes();
  }, [fetchDisputes]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-10">
        <h1 className="font-syne font-bold text-3xl md:text-4xl">
          Dispute Resolution
        </h1>
        <p className="text-text-slate mt-1 font-mono text-xs uppercase tracking-widest">
          Fair and transparent resolution for your deals
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-brand-gold/20 bg-brand-gold/[0.02]">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Active Disputes</CardTitle>
                <CardDescription>Deals currently under review</CardDescription>
              </div>
              <Gavel className="w-5 h-5 text-brand-gold" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-brand-gold" />
                </div>
              ) : disputes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-bg-tertiary flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-brand-teal" />
                  </div>
                  <h3 className="font-bold text-lg">No active disputes</h3>
                  <p className="text-sm text-text-slate max-w-xs mt-1">
                    Everything looks good! Your deals are proceeding according to
                    the agreed terms.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {disputes.map((dispute) => (
                    <div
                      key={dispute.id}
                      className="flex items-center justify-between p-5 rounded-xl bg-bg-tertiary/50 border border-text-muted/10"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                          <AlertCircle className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold">{dispute.reason}</p>
                          <p className="text-xs text-text-slate mt-0.5">
                            Deal ID: {dispute.dealId}
                          </p>
                        </div>
                      </div>
                      <StatusBadge status="disputed" />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dispute Process</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: AlertCircle,
                    title: "Raise Issue",
                    desc: "Buyer initiates a dispute during the review window.",
                  },
                  {
                    icon: FileText,
                    title: "Evidence",
                    desc: "Both parties submit proof, logs, and communication.",
                  },
                  {
                    icon: Scale,
                    title: "Resolution",
                    desc: "An impartial resolver decides the fund distribution.",
                  },
                ].map((step, i) => (
                  <div key={i} className="space-y-3">
                    <div className="w-10 h-10 rounded bg-bg-tertiary flex items-center justify-center text-brand-teal">
                      <step.icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-sm">{step.title}</h4>
                    <p className="text-xs text-text-slate leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-text-slate leading-relaxed">
                If you encounter an issue with a deal, we recommend first
                communicating with the counterparty. Most issues are resolved
                through direct coordination.
              </p>
              <Button
                variant="outline"
                className="w-full text-xs font-mono uppercase tracking-widest"
              >
                Contact Support
              </Button>
              <Button
                variant="outline"
                className="w-full text-xs font-mono uppercase tracking-widest"
              >
                Read Dispute Rules
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
