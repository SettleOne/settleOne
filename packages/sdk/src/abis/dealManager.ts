export const dealManagerAbi = [
  // =========================
  // CREATE DEAL
  // =========================
  {
    type: "function",
    name: "createDeal",
    inputs: [
      {
        name: "input",
        type: "tuple",
        components: [
          { name: "buyer", type: "address" },
          { name: "seller", type: "address" },
          { name: "token", type: "address" },
          { name: "amount", type: "uint256" },
          { name: "sellerAcceptanceWindow", type: "uint256" },
          { name: "deliveryDeadline", type: "uint256" },
          { name: "acceptanceWindow", type: "uint256" },
          { name: "disputeWindow", type: "uint256" },
          { name: "dealType", type: "uint8" },
          { name: "partialSettlementAllowed", type: "bool" },
          { name: "termsHash", type: "bytes32" },
          { name: "metadataHash", type: "bytes32" },
          { name: "evidenceRequirementsHash", type: "bytes32" },
          { name: "settlementRulesHash", type: "bytes32" },
          { name: "verifier", type: "address" },
          { name: "disputeResolver", type: "address" },
        ],
      },
    ],
    outputs: [
      {
        name: "dealId",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },

  // Convenience overload
  {
    type: "function",
    name: "createDeal",
    inputs: [
      { name: "seller", type: "address" },
      { name: "token", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "sellerAcceptanceWindow", type: "uint256" },
      { name: "deliveryDeadline", type: "uint256" },
      { name: "acceptanceWindow", type: "uint256" },
      { name: "disputeWindow", type: "uint256" },
      { name: "dealType", type: "uint8" },
    ],
    outputs: [
      {
        name: "dealId",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },

  // =========================
  // FUND DEAL
  // =========================
  {
    type: "function",
    name: "fundDeal",
    inputs: [
      { name: "dealId", type: "uint256" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [],
    stateMutability: "payable",
  },

  // =========================
  // ACCEPT DEAL
  // =========================
  {
    type: "function",
    name: "acceptDeal",
    inputs: [{ name: "dealId", type: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },

  // =========================
  // REJECT DEAL
  // =========================
  {
    type: "function",
    name: "rejectDeal",
    inputs: [
      { name: "dealId", type: "uint256" },
      { name: "reasonHash", type: "bytes32" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },

  // =========================
  // CANCEL DEAL
  // =========================
  {
    type: "function",
    name: "cancelDeal",
    inputs: [{ name: "dealId", type: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },

  // =========================
  // EXPIRE SELLER ACCEPTANCE
  // =========================
  {
    type: "function",
    name: "expireSellerAcceptance",
    inputs: [
      { name: "dealId", type: "uint256" },
      { name: "extendDeadline", type: "bool" },
      { name: "newSellerAcceptanceWindow", type: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },

  // =========================
  // REFUND EXPIRED
  // =========================
  {
    type: "function",
    name: "refundExpired",
    inputs: [{ name: "dealId", type: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },

  // =========================
  // GET DEAL
  // =========================
  {
    type: "function",
    name: "getDeal",
    inputs: [{ name: "dealId", type: "uint256" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "buyer", type: "address" },
          { name: "seller", type: "address" },
          { name: "token", type: "address" },
          { name: "verifier", type: "address" },
          { name: "disputeResolver", type: "address" },

          { name: "amount", type: "uint128" },
          { name: "depositedFunds", type: "uint128" },

          { name: "fundingStage", type: "uint8" },

          { name: "createdAt", type: "uint64" },
          { name: "sellerAcceptanceDeadline", type: "uint64" },
          { name: "sellerAcceptedAt", type: "uint64" },
          { name: "fundedAt", type: "uint64" },
          { name: "deliverySubmittedAt", type: "uint64" },
          { name: "deliveryVerifiedAt", type: "uint64" },
          { name: "acceptedAt", type: "uint64" },
          { name: "finalizedAt", type: "uint64" },
          { name: "deliveryDeadline", type: "uint64" },
          { name: "acceptanceWindowEndsAt", type: "uint64" },
          { name: "disputeWindowEndsAt", type: "uint64" },

          { name: "acceptanceWindow", type: "uint32" },
          { name: "disputeWindow", type: "uint32" },
          { name: "sellerAcceptanceWindowSecs", type: "uint32" },

          { name: "dealType", type: "uint8" },
          { name: "state", type: "uint8" },

          { name: "partialSettlementAllowed", type: "bool" },

          { name: "termsHash", type: "bytes32" },
          { name: "metadataHash", type: "bytes32" },
          { name: "evidenceRequirementsHash", type: "bytes32" },
          { name: "settlementRulesHash", type: "bytes32" },
          { name: "proofHash", type: "bytes32" },
        ],
      },
    ],
    stateMutability: "view",
  },

  // =========================
  // GET DEAL STATE
  // =========================
  {
    type: "function",
    name: "getDealState",
    inputs: [{ name: "dealId", type: "uint256" }],
    outputs: [{ name: "", type: "uint8" }],
    stateMutability: "view",
  },

  // =========================
  // GET DEAL COUNT
  // =========================
  {
    type: "function",
    name: "getDealCount",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },

  // =========================
  // GET DELIVERY
  // =========================
  {
    type: "function",
    name: "getDelivery",
    inputs: [{ name: "dealId", type: "uint256" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "dealId", type: "uint256" },
          { name: "seller", type: "address" },
          { name: "proofHash", type: "bytes32" },
          { name: "cid", type: "string" },
          { name: "submittedAt", type: "uint64" },
          { name: "verifiedAt", type: "uint64" },
          { name: "revision", type: "uint32" },
          { name: "status", type: "uint8" },
        ],
      },
    ],
    stateMutability: "view",
  },

  // =========================
  // AUTOMATION
  // =========================
  {
    type: "function",
    name: "getAutomationAction",
    inputs: [{ name: "dealId", type: "uint256" }],
    outputs: [{ name: "", type: "uint8" }],
    stateMutability: "view",
  },

  {
    type: "function",
    name: "isSellerAcceptanceActionRequired",
    inputs: [{ name: "dealId", type: "uint256" }],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
  },

  // =========================
  // EVENTS
  // =========================
  {
    type: "event",
    name: "DealCreated",
    inputs: [
      { name: "dealId", type: "uint256", indexed: true },
      { name: "buyer", type: "address", indexed: true },
      { name: "seller", type: "address", indexed: true },
      { name: "token", type: "address", indexed: false },
      { name: "amount", type: "uint256", indexed: false },
      { name: "dealType", type: "uint8", indexed: false },
      { name: "deliveryDeadline", type: "uint64", indexed: false },
      { name: "sellerAcceptanceDeadline", type: "uint64", indexed: false },
      { name: "verifier", type: "address", indexed: false },
      { name: "disputeResolver", type: "address", indexed: false },
    ],
  },

  {
    type: "event",
    name: "DealFunded",
    inputs: [
      { name: "dealId", type: "uint256", indexed: true },
      { name: "buyer", type: "address", indexed: true },
      { name: "amount", type: "uint256", indexed: false },
      { name: "fundedAt", type: "uint64", indexed: false },
    ],
  },

  {
    type: "event",
    name: "DealAcceptedBySeller",
    inputs: [
      { name: "dealId", type: "uint256", indexed: true },
      { name: "seller", type: "address", indexed: true },
      { name: "acceptedAt", type: "uint64", indexed: false },
    ],
  },

  {
    type: "event",
    name: "DealRejectedBySeller",
    inputs: [
      { name: "dealId", type: "uint256", indexed: true },
      { name: "seller", type: "address", indexed: true },
      { name: "reasonHash", type: "bytes32", indexed: false },
    ],
  },

  {
    type: "event",
    name: "DealCancelled",
    inputs: [
      { name: "dealId", type: "uint256", indexed: true },
      { name: "caller", type: "address", indexed: true },
      { name: "previousState", type: "uint8", indexed: false },
    ],
  },

  {
    type: "event",
    name: "DealReleased",
    inputs: [
      { name: "dealId", type: "uint256", indexed: true },
      { name: "seller", type: "address", indexed: true },
      { name: "buyer", type: "address", indexed: true },
      { name: "sellerAssets", type: "uint256", indexed: false },
      { name: "buyerYield", type: "uint256", indexed: false },
      { name: "platformYield", type: "uint256", indexed: false },
    ],
  },

  {
    type: "event",
    name: "DealRefunded",
    inputs: [
      { name: "dealId", type: "uint256", indexed: true },
      { name: "buyer", type: "address", indexed: true },
      { name: "buyerAssets", type: "uint256", indexed: false },
      { name: "platformYield", type: "uint256", indexed: false },
    ],
  },

  {
    type: "event",
    name: "SellerAcceptanceExpired",
    inputs: [{ name: "dealId", type: "uint256", indexed: true }],
  },

  {
    type: "event",
    name: "SellerAcceptanceWindowExtended",
    inputs: [
      { name: "dealId", type: "uint256", indexed: true },
      { name: "newDeadline", type: "uint64", indexed: false },
    ],
  },
] as const;
