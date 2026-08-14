import { CONTRACT_ADDRESSES } from "@settleone/sdk";

export const UI_CHAIN_MAPPING: Record<string, number> = {
  Sepolia: 11155111,
  "Arbitrum Sepolia": 421614,
};

export const CHAIN_CONFIG: Record<string, any> = {
  Sepolia: {
    chainId: 11155111,

    tokens: {
      USDC: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
      USDT: "0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0",
      DAI: "0x3e622317f8C93f7328350cF0B56d9eD4C620C5d6",
      ETH: "0x0000000000000000000000000000000000000000",
      SETL: CONTRACT_ADDRESSES[11155111].SettleOneToken,
    },

    decimals: {
      USDC: 6,
      USDT: 6,
      DAI: 18,
      ETH: 18,
      SETL: 18,
    },

    dealManager: CONTRACT_ADDRESSES[11155111].DealManager,
    verifier: CONTRACT_ADDRESSES[11155111].DeliveryVerifier,
    chainlinkVerifier: CONTRACT_ADDRESSES[11155111].ChainlinkVerifier,
    resolver: CONTRACT_ADDRESSES[11155111].SimpleResolver,
  },

  "Arbitrum Sepolia": {
    chainId: 421614,

    tokens: {
      USDC: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d",
      USDT: "0xEf54C221Fc94517877F0F40eCd71E0A3866D66C2",
      DAI: "0x3e622317f8C93f7328350cF0B56d9eD4C620C5d6",
      ETH: "0x0000000000000000000000000000000000000000",
      SETL: CONTRACT_ADDRESSES[421614].SettleOneToken,
    },

    decimals: {
      USDC: 6,
      USDT: 6,
      DAI: 18,
      ETH: 18,
      SETL: 18,
    },

    dealManager: CONTRACT_ADDRESSES[421614].DealManager,
    verifier: CONTRACT_ADDRESSES[421614].DeliveryVerifier,
    chainlinkVerifier: CONTRACT_ADDRESSES[421614].ChainlinkVerifier,
    resolver: CONTRACT_ADDRESSES[421614].SimpleResolver,
  },
};
