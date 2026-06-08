import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { arbitrumSepolia, sepolia } from 'viem/chains';
import { http } from 'viem';

export { arbitrumSepolia, sepolia };
export const SUPPORTED_CHAINS = [arbitrumSepolia, sepolia];

export const wagmiConfig = getDefaultConfig({
  appName: 'SettleOne',
  projectId: 'YOUR_PROJECT_ID', // Placeholder for WalletConnect Cloud Project ID
  chains: [arbitrumSepolia, sepolia],
  transports: {
    [arbitrumSepolia.id]: http(),
    [sepolia.id]: http(),
  },
});
