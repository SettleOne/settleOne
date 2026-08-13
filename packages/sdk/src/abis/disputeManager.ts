export const disputeManagerAbi = [
  {
    type: "function",
    name: "cancelDispute",
    inputs: [
      { name: "dealId", type: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },

  {
    type: "function",
    name: "getDispute",
    inputs: [
      { name: "dealId", type: "uint256" },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "dealId", type: "uint256" },
          { name: "opener", type: "address" },
          { name: "buyer", type: "address" },
          { name: "seller", type: "address" },
          { name: "token", type: "address" },
          { name: "resolver", type: "address" },
          { name: "amount", type: "uint128" },
          { name: "openedAt", type: "uint64" },
          { name: "resolvedAt", type: "uint64" },
          { name: "status", type: "uint8" },
          { name: "outcome", type: "uint8" },
          { name: "active", type: "bool" },
          { name: "reasonHash", type: "bytes32" },
          { name: "evidenceHash", type: "bytes32" },
          { name: "resolutionHash", type: "bytes32" },
          { name: "proofHash", type: "bytes32" },
          { name: "termsHash", type: "bytes32" },
          { name: "sellerAward", type: "uint128" },
          { name: "buyerAward", type: "uint128" },
        ],
      },
    ],
    stateMutability: "view",
  },

  {
    type: "function",
    name: "getDisputeStatus",
    inputs: [
      { name: "dealId", type: "uint256" },
    ],
    outputs: [
      { name: "", type: "uint8" },
    ],
    stateMutability: "view",
  },

  {
    type: "function",
    name: "isDisputed",
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
    name: "resolveDispute",
    inputs: [
      { name: "dealId", type: "uint256" },
      { name: "resolverData", type: "bytes" },
    ],
    outputs: [
      {
        name: "decision",
        type: "tuple",
        components: [
          { name: "outcome", type: "uint8" },
          { name: "sellerAward", type: "uint256" },
          { name: "buyerAward", type: "uint256" },
          { name: "resolutionHash", type: "bytes32" },
        ],
      },
    ],
    stateMutability: "nonpayable",
  },

  {
    type: "event",
    name: "DisputeOpened",
    inputs: [
      { name: "dealId", type: "uint256", indexed: true },
      { name: "opener", type: "address", indexed: true },
      { name: "resolver", type: "address", indexed: true },
      { name: "reasonHash", type: "bytes32", indexed: false },
      { name: "evidenceHash", type: "bytes32", indexed: false },
    ],
  },

  {
    type: "event",
    name: "DisputeCancelled",
    inputs: [
      { name: "dealId", type: "uint256", indexed: true },
    ],
  },

  {
    type: "event",
    name: "DisputeResolved",
    inputs: [
      { name: "dealId", type: "uint256", indexed: true },
      { name: "outcome", type: "uint8", indexed: false },
      { name: "sellerAward", type: "uint256", indexed: false },
      { name: "buyerAward", type: "uint256", indexed: false },
      { name: "resolutionHash", type: "bytes32", indexed: false },
    ],
  },
] as const;