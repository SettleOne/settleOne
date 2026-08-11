import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { arbitrumSepolia, sepolia } from "viem/chains";
import { http } from "viem";

export { arbitrumSepolia, sepolia };
export const SUPPORTED_CHAINS = [arbitrumSepolia, sepolia];

export const wagmiConfig = getDefaultConfig({
  appName: "SettleOne",
  projectId:
    (import.meta as any).env?.VITE_WALLETCONNECT_PROJECT_ID ??
    "YOUR_WALLETCONNECT_PROJECT_ID",
  chains: [arbitrumSepolia, sepolia],
  transports: {
    [arbitrumSepolia.id]: http((import.meta as any).env?.VITE_ARBITRUM_SEPOLIA_RPC_URL),
    [sepolia.id]: http((import.meta as any).env?.VITE_SEPOLIA_RPC_URL),
  },
});
