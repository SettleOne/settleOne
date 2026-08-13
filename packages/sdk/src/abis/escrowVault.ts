export const escrowVaultAbi = [
  {
    type: "function",
    name: "balanceOf",
    inputs: [
      { name: "dealId", type: "uint256" },
    ],
    outputs: [
      { name: "principal", type: "uint256" },
      { name: "assets", type: "uint256" },
    ],
    stateMutability: "view",
  },

  {
    type: "function",
    name: "depositedAmount",
    inputs: [
      { name: "dealId", type: "uint256" },
    ],
    outputs: [
      { name: "", type: "uint256" },
    ],
    stateMutability: "view",
  },

  {
    type: "function",
    name: "isFunded",
    inputs: [
      { name: "dealId", type: "uint256" },
    ],
    outputs: [
      { name: "", type: "bool" },
    ],
    stateMutability: "view",
  },

  {
    type: "function",
    name: "isFullyFunded",
    inputs: [
      { name: "dealId", type: "uint256" },
    ],
    outputs: [
      { name: "", type: "bool" },
    ],
    stateMutability: "view",
  },

  {
    type: "function",
    name: "getPosition",
    inputs: [
      { name: "dealId", type: "uint256" },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "token", type: "address" },
          { name: "principal", type: "uint128" },
          { name: "required", type: "uint128" },
          { name: "shares", type: "uint128" },
          { name: "depositedAt", type: "uint64" },
          { name: "strategyId", type: "uint32" },
          { name: "funded", type: "bool" },
        ],
      },
    ],
    stateMutability: "view",
  },

  {
    type: "function",
    name: "deposit",
    inputs: [
      { name: "dealId", type: "uint256" },
      { name: "token", type: "address" },
      { name: "payer", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "dealAmount", type: "uint256" },
    ],
    outputs: [
      { name: "sharesMinted", type: "uint256" },
    ],
    stateMutability: "payable",
  },

  {
    type: "function",
    name: "release",
    inputs: [
      { name: "dealId", type: "uint256" },
      { name: "to", type: "address" },
      { name: "principalAmount", type: "uint256" },
    ],
    outputs: [
      { name: "assetsReleased", type: "uint256" },
    ],
    stateMutability: "nonpayable",
  },

  {
    type: "function",
    name: "refund",
    inputs: [
      { name: "dealId", type: "uint256" },
      { name: "to", type: "address" },
    ],
    outputs: [
      { name: "assetsReleased", type: "uint256" },
    ],
    stateMutability: "nonpayable",
  },

  {
    type: "event",
    name: "EscrowDeposited",
    inputs: [
      { name: "dealId", type: "uint256", indexed: true },
      { name: "token", type: "address", indexed: true },
      { name: "amount", type: "uint256", indexed: false },
      { name: "sharesMinted", type: "uint256", indexed: false },
    ],
  },

  {
    type: "event",
    name: "EscrowReleased",
    inputs: [
      { name: "dealId", type: "uint256", indexed: true },
      { name: "token", type: "address", indexed: true },
      { name: "recipient", type: "address", indexed: true },
      { name: "principalReleased", type: "uint256", indexed: false },
      { name: "assetsReleased", type: "uint256", indexed: false },
    ],
  },

  {
    type: "event",
    name: "EscrowSettled",
    inputs: [
      { name: "dealId", type: "uint256", indexed: true },
      { name: "token", type: "address", indexed: true },
      { name: "positionAssets", type: "uint256", indexed: false },
      { name: "sellerAssets", type: "uint256", indexed: false },
      { name: "buyerAssets", type: "uint256", indexed: false },
      { name: "platformYield", type: "uint256", indexed: false },
    ],
  },
] as const;