import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useAccount, useSignMessage } from "wagmi";
import {
  Loader2,
  ShieldCheck,
  Wallet,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { Modal } from "../../components/Modal";
import { Button } from "../../components/Button";
import { useAuthStore } from "../../stores/useAuthStore";
import { apiClient } from "../../api/apiClient";
import { cn } from "../../utils/cn";

const registerSchema = z.object({
  displayName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["buyer", "seller"]),
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { setAuth } = useAuthStore();

  const [step, setStep] = useState<"login" | "register" | "loading">("login");
  const [error, setError] = useState<string | null>(null);
  const [loadingMsg, setLoadingMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "buyer" },
  });

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep("login");
      setError(null);
    }
  }, [isOpen]);

  const handleLogin = async () => {
    if (!address) return;

    setStep("loading");
    setError(null);
    setLoadingMsg("Requesting secure nonce...");

    try {
      // 1. Get nonce
      const { data: nonceData } = await apiClient.post("/users/nonce", {
        walletAddress: address,
      });
      const nonce = nonceData.data.nonce;

      setLoadingMsg("Please sign the message in your wallet...");

      // 2. Sign message
      const message = `Welcome to SettleOne!\n\nNonce: ${nonce}`;
      const signature = await signMessageAsync({ message });

      setLoadingMsg("Authenticating...");

      // 3. Login
      const { data: loginData } = await apiClient.post("/users/login", {
        walletAddress: address,
        signature,
      });

      if (loginData.data.token) {
        setAuth(loginData.data.user, loginData.data.token);
        onClose();
      } else {
        // This shouldn't happen if backend is consistent, but handle it
        throw new Error("Login failed: No token received");
      }
    } catch (err: any) {
      console.error("Auth error:", err);

      // Handle "user not found" -> switch to registration
      if (err.response?.status === 404 || err.message?.includes("not found")) {
        setStep("register");
      } else {
        setStep("login");
        setError(
          err.response?.data?.message ||
            err.message ||
            "Authentication failed. Please try again.",
        );
      }
    }
  };

  const handleRegister = async (data: RegisterFormData) => {
    if (!address) return;

    setStep("loading");
    setError(null);
    setLoadingMsg("Creating your profile...");

    try {
      await apiClient.post("/users/register", {
        walletAddress: address,
        ...data,
      });

      // After registration, proceed to login
      await handleLogin();
    } catch (err: any) {
      setStep("register");
      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={step === "register" ? "Create Account" : "Authenticate"}
      className="max-w-md"
    >
      <AnimatePresence mode="wait">
        {step === "loading" ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <Loader2 className="w-12 h-12 text-brand-teal animate-spin mb-6" />
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-slate animate-pulse">
              {loadingMsg}
            </p>
          </motion.div>
        ) : step === "login" ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="p-4 rounded-xl bg-brand-teal/5 border border-brand-teal/10 flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-brand-teal shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-bold text-text-primary">
                  Secure Authentication
                </p>
                <p className="text-text-slate mt-1 leading-relaxed">
                  We use Sign-In with Ethereum to securely verify your identity
                  without passwords.
                </p>
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-bg-tertiary border border-text-muted/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Wallet className="w-5 h-5 text-text-slate" />
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-text-slate">
                      Connected Wallet
                    </p>
                    <p className="font-mono text-sm">
                      {address?.slice(0, 6)}...{address?.slice(-4)}
                    </p>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-brand-teal shadow-[0_0_8px_var(--color-brand-teal)]" />
              </div>

              <Button
                onClick={handleLogin}
                className="w-full h-14 text-base font-syne font-bold group"
              >
                Sign In to SettleOne
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <p className="text-center text-[10px] font-mono text-text-slate uppercase tracking-widest">
                By signing in, you agree to our Terms of Service
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="register"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
              <p className="text-sm text-text-slate mb-6">
                It looks like this is your first time here. Let's get your
                profile set up.
              </p>

              {error && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-widest text-text-slate ml-1">
                  Display Name
                </label>
                <input
                  {...register("displayName")}
                  className={cn(
                    "w-full bg-bg-tertiary border rounded-lg px-4 py-3 focus:outline-none focus:border-brand-teal transition-all",
                    errors.displayName
                      ? "border-red-500/50"
                      : "border-text-muted/20",
                  )}
                  placeholder="How should we call you?"
                />
                {errors.displayName && (
                  <p className="text-red-500 text-[10px] mt-1 ml-1">
                    {errors.displayName.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-widest text-text-slate ml-1">
                  Email Address
                </label>
                <input
                  {...register("email")}
                  type="email"
                  className={cn(
                    "w-full bg-bg-tertiary border rounded-lg px-4 py-3 focus:outline-none focus:border-brand-teal transition-all",
                    errors.email ? "border-red-500/50" : "border-text-muted/20",
                  )}
                  placeholder="For notifications and updates"
                />
                {errors.email && (
                  <p className="text-red-500 text-[10px] mt-1 ml-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-widest text-text-slate ml-1">
                  Preferred Role
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {["buyer", "seller"].map((role) => (
                    <label
                      key={role}
                      className={cn(
                        "flex items-center justify-center py-3 rounded-lg border cursor-pointer transition-all font-syne font-bold capitalize",
                        // @ts-ignore
                        errors.role ? "border-red-500/20" : "",
                        // @ts-ignore
                        register("role").value === role
                          ? "bg-brand-teal/10 border-brand-teal text-brand-teal"
                          : "bg-bg-tertiary border-text-muted/10 text-text-slate hover:border-text-muted/30",
                      )}
                    >
                      <input
                        type="radio"
                        {...register("role")}
                        value={role}
                        className="hidden"
                      />
                      {role}
                    </label>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-14 text-base font-syne font-bold mt-4"
              >
                Create Profile & Sign In
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
}
