import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount, useSignMessage } from "wagmi";
import { Mail, Lock, ShieldCheck } from "lucide-react";
import { Button, Input, Spinner } from "@settleone/design-system";
import { useLogin, useNonce } from "@settleone/api";

export function LoginPage() {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState("");

  const { mutateAsync: getNonce } = useNonce();
  const { mutateAsync: login } = useLogin();

  const handleWeb3Login = async () => {
    if (!address) return;

    try {
      setIsLoggingIn(true);
      setError("");

      // 1. Get nonce from server
      const { nonce, message } = await getNonce(address);

      // 2. Sign message
      const signature = await signMessageAsync({ message });

      // 3. Login with signature
      const { user } = await login({
        walletAddress: address,
        signature,
        message,
      });

      // 4. Redirect based on role
      if (
        [
          "admin",
          "arbitrator",
          "vault_manager",
          "upgrader",
          "verifier",
        ].includes(user.role)
      ) {
        window.location.href = "/operations/dashboard"; // Cross-app redirect
      } else {
        window.location.href = "/workspace/marketplace";
      }
    } catch (err: any) {
      console.error("Login failed", err);
      setError(err.message || "Authentication failed. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="mx-auto w-12 h-12 rounded bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-lg">
          S
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Welcome to SettleOne
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          The transaction commitment layer for MSME commerce.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-[var(--border)]">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider text-center">
                Authentication
              </h3>

              <div className="bg-blue-50 border border-blue-100 p-4 rounded-md mb-6">
                <p className="text-xs text-blue-700 leading-relaxed text-center">
                  Securely access your workspace using your Ethereum wallet. No
                  password required.
                </p>
              </div>

              {!isConnected ? (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500 mb-4">
                    Please connect your wallet to continue.
                  </p>
                  {/* WalletConnectButton would go here */}
                  <Button
                    variant="primary"
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                  >
                    Connect Wallet
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-mono text-gray-600">
                        {address.slice(0, 6)}...{address.slice(-4)}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">
                      Connected
                    </span>
                  </div>

                  <Button
                    variant="primary"
                    className="w-full h-12 text-lg font-bold shadow-md"
                    onClick={handleWeb3Login}
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? (
                      <span className="flex items-center gap-2">
                        <Spinner size="sm" /> Authenticating...
                      </span>
                    ) : (
                      "Sign In to Workspace"
                    )}
                  </Button>
                </div>
              )}
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-xs flex gap-2">
                <ShieldCheck size={14} className="shrink-0" /> {error}
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or use email
                </span>
              </div>
            </div>

            <div className="space-y-4 opacity-50 pointer-events-none">
              <Input type="email" placeholder="Email address" disabled />
              <Input type="password" placeholder="Password" disabled />
              <Button
                variant="ghost"
                className="w-full h-10 border border-gray-200"
              >
                Sign in with Email
              </Button>
            </div>

            <p className="text-center text-xs text-gray-400">
              By signing in, you agree to our{" "}
              <a href="#" className="underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
