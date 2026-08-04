import { useState } from "react";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Wallet } from "lucide-react";
import { createPortal } from "react-dom";

export function useRequireWallet() {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [showPrompt, setShowPrompt] = useState(false);

  const requireWallet = (callback: () => void) => {
    if (isConnected) {
      callback();
    } else {
      setShowPrompt(true);
      setTimeout(() => {
        setShowPrompt(false);
        if (openConnectModal) openConnectModal();
      }, 3000); // Wait 3 seconds, hide prompt, open RainbowKit
    }
  };

  const WalletPromptModal = () => {
    if (!showPrompt) return null;
    return createPortal(
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 
  backdrop-blur-sm animate-fade-in"
      >
        <div
          className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-8 flex
  flex-col items-center max-w-sm text-center shadow-[0_0_40px_rgba(59,130,246,0.15)]"
        >
          <div
            className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-full flex items-center
  justify-center mb-4"
          >
            <Wallet size={32} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Wallet Required</h3>
          <p className="text-[var(--text-secondary)] text-sm">
            You need to connect your Web3 wallet to perform this smart contract
            action. Opening wallet connection...
          </p>
        </div>
      </div>,
      document.body,
    );
  };

  return { requireWallet, WalletPromptModal };
}
