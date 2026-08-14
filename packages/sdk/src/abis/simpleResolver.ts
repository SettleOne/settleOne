export const simpleResolverAbi = [
  {
    type: "function",
    name: "resolve",
    inputs: [
      {
        name: "context",
        type: "tuple",
        components: [
          { name: "dealId", type: "uint256" },
          { name: "buyer", type: "address" },
          { name: "seller", type: "address" },
          { name: "token", type: "address" },
          { name: "amount", type: "uint256" },
          { name: "reasonHash", type: "bytes32" },
          { name: "evidenceHash", type: "bytes32" },
          { name: "proofHash", type: "bytes32" },
          { name: "termsHash", type: "bytes32" },
        ],
      },
      { name: "response", type: "bytes" },
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
    type: "function",
    name: "decide",
    inputs: [
      { name: "dealId", type: "uint256" },
      { name: "outcome", type: "uint8" },
      { name: "sellerAward", type: "uint256" },
      { name: "resolutionHash", type: "bytes32" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },

  {
    type: "function",
    name: "getDecision",
    inputs: [{ name: "dealId", type: "uint256" }],
    outputs: [
      { name: "outcome", type: "uint8" },
      { name: "sellerAward", type: "uint256" },
      { name: "resolutionHash", type: "bytes32" },
      { name: "expiresAt", type: "uint64" },
      { name: "ready", type: "bool" },
    ],
    stateMutability: "view",
  },

  {
    type: "function",
    name: "hasDecisionReady",
    inputs: [{ name: "dealId", type: "uint256" }],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
  },

  {
    type: "function",
    name: "decisionTtl",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },

  {
    type: "function",
    name: "revokeDecision",
    inputs: [{ name: "dealId", type: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },

  {
    type: "event",
    name: "DecisionRecorded",
    inputs: [
      { name: "dealId", type: "uint256", indexed: true },
      { name: "outcome", type: "uint8", indexed: false },
      { name: "sellerAward", type: "uint256", indexed: false },
      { name: "resolutionHash", type: "bytes32", indexed: false },
      { name: "expiresAt", type: "uint64", indexed: false },
    ],
  },

  {
    type: "event",
    name: "DecisionConsumed",
    inputs: [{ name: "dealId", type: "uint256", indexed: true }],
  },

  {
    type: "event",
    name: "DecisionRevoked",
    inputs: [{ name: "dealId", type: "uint256", indexed: true }],
  },
] as const;
