import { CONTRACT_ADDRESSES } from "@settleone/sdk";

export const UI_CHAIN_MAPPING: Record<string, number> = {
    "Sepolia": 11155111,
    "Arbitrum Sepolia": 421614,
};

export const CHAIN_CONFIG: Record<string, any> = {
    "Sepolia": {
        chainId: 11155111,
        tokens: {
            USDC: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
            ETH: "0x0000000000000000000000000000000000000000",
            SETL: CONTRACT_ADDRESSES[11155111].SettleOneToken,
        },
        decimals: { USDC: 6, ETH: 18, SETL: 18 },
        verifier: CONTRACT_ADDRESSES[11155111].SimpleResolver,
        resolver: CONTRACT_ADDRESSES[11155111].SimpleResolver,
    },
    "Arbitrum Sepolia": {
        chainId: 421614,
        tokens: {
            USDC: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d",
            ETH: "0x0000000000000000000000000000000000000000",
            SETL: CONTRACT_ADDRESSES[421614].SettleOneToken,
        },
        decimals: { USDC: 6, ETH: 18, SETL: 18 },
        verifier: CONTRACT_ADDRESSES[421614].SimpleResolver,
        resolver: CONTRACT_ADDRESSES[421614].SimpleResolver,
    }
};