import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAccount, useConnect } from "wagmi";
import { injected } from "wagmi/connectors";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  RefreshCw,
  Lock,
  CheckCircle,
  Gavel,
  Globe,
  Cpu,
} from "lucide-react";

import { NetworkBackground } from "../components/NetworkBackground";
import { Button } from "../components/Button";
import { useAuthStore } from "../stores/useAuthStore";
import { cn } from "../utils/cn";

export function LandingPage() {
  const [scene, setScene] = useState(0);
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  const { connect } = useConnect();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const timeouts = [
      setTimeout(() => setScene(1), 4000),
      setTimeout(() => setScene(2), 9000),
    ];
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-primary">
      <NetworkBackground />

      <AnimatePresence mode="wait">
        {scene === 0 && (
          <motion.div
            key="scene0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            className="z-10 container max-w-4xl px-4 text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-brand-teal/20 bg-brand-teal/5 mb-10"
            >
              <div className="w-2 h-2 rounded-full bg-brand-teal shadow-[0_0_8px_var(--color-brand-teal)] animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-teal">
                Protocol v1.0 Live on Sepolia
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="font-instrument italic text-6xl md:text-9xl mb-10 leading-[0.9] tracking-tighter"
            >
              You deliver first.
              <br />
              Then <span className="opacity-10 italic">wait</span>,{" "}
              <span className="opacity-10 italic">chase</span>,<br />
              <span className="text-brand-teal not-italic font-syne font-black text-glow-teal">
                hope
              </span>{" "}
              to get paid.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="flex justify-center gap-10 font-mono text-[10px] text-text-slate tracking-[0.4em] uppercase"
            >
              <span className="hover:text-white transition-colors cursor-default">
                Delayed
              </span>
              <span className="text-text-muted opacity-30">•</span>
              <span className="text-brand-gold hover:text-brand-gold-dim transition-colors cursor-default">
                Disputed
              </span>
              <span className="text-text-muted opacity-30">•</span>
              <span className="hover:text-white transition-colors cursor-default">
                Uncertain
              </span>
            </motion.div>
          </motion.div>
        )}

        {scene === 1 && (
          <motion.div
            key="scene1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="z-10 container max-w-6xl px-4"
          >
            <div className="text-center mb-16">
              <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-text-muted">
                THE SETTLEONE ARCHITECTURE
              </span>
            </div>

            <div className="grid gap-6">
              {[
                {
                  num: "01",
                  word: "COMMIT",
                  detail:
                    "Capital secured in immutable vault before workflow initiation.",
                  sub: "BUYER → ESCROW",
                  icon: Lock,
                  color: "text-brand-teal",
                },
                {
                  num: "02",
                  word: "VERIFY",
                  detail:
                    "Onchain delivery manifest hashed and validated by network nodes.",
                  sub: "PROOF → CONTRACT",
                  icon: Globe,
                  color: "text-brand-teal",
                },
                {
                  num: "03",
                  word: "SETTLE",
                  detail:
                    "Atomic distribution of assets upon protocol satisfaction.",
                  sub: "CONTRACT → RELEASE",
                  icon: Zap,
                  color: "text-brand-gold",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: i * 0.3 + 0.5,
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group relative flex items-center justify-between p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-700 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                  <div className="flex items-center gap-12 relative z-10">
                    <span className="font-mono text-xs text-text-muted opacity-50">
                      {item.num}
                    </span>
                    <div className="space-y-1">
                      <h2
                        className={cn(
                          "font-syne font-black text-6xl md:text-8xl tracking-tighter leading-none",
                          item.color,
                        )}
                      >
                        {item.word}
                      </h2>
                      <p
                        className={cn(
                          "font-mono text-[10px] tracking-[0.3em] uppercase ml-1 opacity-70",
                          item.color === "text-brand-gold"
                            ? "text-brand-gold"
                            : "text-brand-teal",
                        )}
                      >
                        {item.sub}
                      </p>
                    </div>
                  </div>

                  <div className="text-right max-w-xs relative z-10 hidden md:block">
                    <item.icon
                      className={cn(
                        "w-8 h-8 ml-auto mb-4 opacity-20 group-hover:opacity-100 transition-all duration-700",
                        item.color,
                      )}
                    />
                    <p className="text-sm text-text-slate leading-relaxed font-medium group-hover:text-text-primary transition-colors">
                      {item.detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {scene === 2 && (
          <motion.div
            key="scene2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="z-10 container max-w-5xl px-4 text-center"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 240 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="h-px bg-gradient-to-r from-transparent via-brand-teal to-transparent mx-auto mb-16"
            />

            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="font-syne font-black text-8xl md:text-[12rem] tracking-tighter mb-12 flex justify-center items-baseline gap-1"
            >
              <span className="text-brand-teal text-glow-teal">Settle</span>
              <span className="w-1.5 h-20 md:h-32 bg-brand-teal animate-pulse rounded-full shadow-[0_0_20px_var(--color-brand-teal)]" />
              <span className="text-brand-gold text-glow-gold">One</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-3xl text-text-slate max-w-3xl mx-auto leading-tight font-medium mb-16 tracking-tight"
            >
              The first{" "}
              <span className="text-brand-teal font-bold px-1">onchain</span>{" "}
              payment commitment layer. Secure{" "}
              <span className="text-white">business obligations</span> and
              service settlements before work begins.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Button
                size="lg"
                className="h-20 px-12 text-xl font-syne font-black rounded-2xl group relative overflow-hidden"
                onClick={() => connect({ connector: injected() })}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                GET STARTED
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-500" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-20 px-12 text-xl font-syne font-black rounded-2xl border-white/10 hover:border-brand-teal/50"
              >
                PROTOCOL DOCS
              </Button>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
              onClick={() => setScene(0)}
              className="mt-24 text-[10px] font-mono uppercase tracking-[0.6em] text-text-muted hover:text-brand-teal flex items-center gap-3 mx-auto transition-all"
            >
              <RefreshCw className="w-3 h-3" />
              Reset Sequence
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Network Health Footer */}
      <div className="absolute bottom-10 left-0 right-0 z-10 flex items-center justify-center gap-16 opacity-20 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-1000">
        <div className="flex items-center gap-3">
          <Cpu className="w-4 h-4 text-brand-teal" />
          <span className="font-mono text-[9px] uppercase tracking-[0.3em]">
            Network Active
          </span>
        </div>
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-4 h-4 text-brand-teal" />
          <span className="font-mono text-[9px] uppercase tracking-[0.3em]">
            Audited Vaults
          </span>
        </div>
        <div className="flex items-center gap-3">
          <CheckCircle className="w-4 h-4 text-brand-gold" />
          <span className="font-mono text-[9px] uppercase tracking-[0.3em]">
            100% Settlement Rate
          </span>
        </div>
      </div>
    </div>
  );
}
