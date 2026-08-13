export const deliveryManagerAbi = [
  // =========================
  // DELIVERY SUBMISSION
  // =========================

  {
    type: "function",
    name: "submitDeliveryProof",
    inputs: [
      { name: "dealId", type: "uint256" },
      { name: "proofHash", type: "bytes32" },
      { name: "cid", type: "string" },
      { name: "evidenceType", type: "uint8" },
      { name: "submissionData", type: "bytes" },
      { name: "verificationData", type: "bytes" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },

  {
    type: "function",
    name: "submitDeliveryProof",
    inputs: [
      { name: "dealId", type: "uint256" },
      { name: "proofHash", type: "bytes32" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },

  // =========================
  // DELIVERY ACTIONS
  // =========================

  {
    type: "function",
    name: "acceptDelivery",
    inputs: [
      { name: "dealId", type: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },

  {
    type: "function",
    name: "autoAcceptDelivery",
    inputs: [
      { name: "dealId", type: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },

  {
    type: "function",
    name: "finalizeDelivery",
    inputs: [
      { name: "dealId", type: "uint256" },
      { name: "verificationData", type: "bytes" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },

  // =========================
  // REVISION
  // =========================

  {
    type: "function",
    name: "requestRevision",
    inputs: [
      { name: "dealId", type: "uint256" },
      { name: "reasonHash", type: "bytes32" },
      { name: "evidenceHash", type: "bytes32" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },

  // =========================
  // DISPUTES
  // =========================

  {
    type: "function",
    name: "raiseDispute",
    inputs: [
      { name: "dealId", type: "uint256" },
      { name: "reason", type: "string" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },

  {
    type: "function",
    name: "raiseDispute",
    inputs: [
      { name: "dealId", type: "uint256" },
      { name: "reasonHash", type: "bytes32" },
      { name: "evidenceHash", type: "bytes32" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },

  {
    type: "function",
    name: "resolveDispute",
    inputs: [
      { name: "dealId", type: "uint256" },
      { name: "resolverData", type: "bytes" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },

  {
    type: "function",
    name: "cancelDispute",
    inputs: [
      { name: "dealId", type: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },

  // =========================
  // DELIVERY READ
  // =========================

  {
    type: "function",
    name: "getDelivery",
    inputs: [
      { name: "dealId", type: "uint256" },
    ],
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
  // CONTRACT REFERENCES
  // =========================

  {
    type: "function",
    name: "dealManager",
    inputs: [],
    outputs: [
      { name: "", type: "address" },
    ],
    stateMutability: "view",
  },

  {
    type: "function",
    name: "evidenceManager",
    inputs: [],
    outputs: [
      { name: "", type: "address" },
    ],
    stateMutability: "view",
  },

  {
    type: "function",
    name: "disputeManager",
    inputs: [],
    outputs: [
      { name: "", type: "address" },
    ],
    stateMutability: "view",
  },

  {
    type: "function",
    name: "paused",
    inputs: [],
    outputs: [
      { name: "", type: "bool" },
    ],
    stateMutability: "view",
  },

  // =========================
  // EVENTS
  // =========================

  {
    type: "event",
    name: "DeliveryProofSubmitted",
    inputs: [
      { name: "dealId", type: "uint256", indexed: true },
      { name: "seller", type: "address", indexed: true },
      { name: "proofHash", type: "bytes32", indexed: true },
      { name: "cid", type: "string", indexed: false },
      { name: "revision", type: "uint32", indexed: false },
    ],
  },

  {
    type: "event",
    name: "DeliveryAccepted",
    inputs: [
      { name: "dealId", type: "uint256", indexed: true },
      { name: "buyer", type: "address", indexed: true },
      { name: "automatic", type: "bool", indexed: false },
      { name: "acceptedAt", type: "uint64", indexed: false },
      { name: "disputeWindowEndsAt", type: "uint64", indexed: false },
    ],
  },

  {
    type: "event",
    name: "DeliveryVerified",
    inputs: [
      { name: "dealId", type: "uint256", indexed: true },
      { name: "proofHash", type: "bytes32", indexed: true },
      { name: "verifiedAt", type: "uint64", indexed: false },
      { name: "acceptanceWindowEndsAt", type: "uint64", indexed: false },
    ],
  },

  {
    type: "event",
    name: "RevisionRequested",
    inputs: [
      { name: "dealId", type: "uint256", indexed: true },
      { name: "buyer", type: "address", indexed: true },
      { name: "reasonHash", type: "bytes32", indexed: false },
      { name: "evidenceHash", type: "bytes32", indexed: false },
    ],
  },

  {
    type: "event",
    name: "DealDisputed",
    inputs: [
      { name: "dealId", type: "uint256", indexed: true },
      { name: "opener", type: "address", indexed: true },
      { name: "reasonHash", type: "bytes32", indexed: false },
      { name: "evidenceHash", type: "bytes32", indexed: false },
    ],
  },

  {
    type: "event",
    name: "DisputeCancelled",
    inputs: [
      { name: "dealId", type: "uint256", indexed: true },
      { name: "caller", type: "address", indexed: true },
    ],
  },

  {
    type: "event",
    name: "EvidenceSubmitted",
    inputs: [
      { name: "dealId", type: "uint256", indexed: true },
      { name: "evidenceId", type: "uint256", indexed: true },
      { name: "submitter", type: "address", indexed: true },
      { name: "role", type: "uint8", indexed: false },
      { name: "evidenceType", type: "uint8", indexed: false },
      { name: "hash", type: "bytes32", indexed: false },
      { name: "cid", type: "string", indexed: false },
    ],
  },
] as const;