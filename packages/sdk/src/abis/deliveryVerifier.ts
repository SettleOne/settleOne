export const deliveryVerifierAbi = [
  // =========================
  // PROOF SUBMISSION
  // =========================

  {
    type: "function",
    name: "submitProof",
    inputs: [
      { name: "dealId", type: "uint256" },
      { name: "seller", type: "address" },
      { name: "proofHash", type: "bytes32" },
      { name: "data", type: "bytes" },
    ],
    outputs: [
      { name: "requestId", type: "bytes32" },
    ],
    stateMutability: "nonpayable",
  },

  // =========================
  // VERIFICATION
  // =========================

  {
    type: "function",
    name: "verify",
    inputs: [
      { name: "dealId", type: "uint256" },
      { name: "verificationData", type: "bytes" },
    ],
    outputs: [
      { name: "verified", type: "bool" },
      { name: "resultData", type: "bytes" },
    ],
    stateMutability: "nonpayable",
  },

  // =========================
  // READ VERIFICATION
  // =========================

  {
    type: "function",
    name: "getVerificationState",
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
    name: "getVerification",
    inputs: [
      { name: "dealId", type: "uint256" },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "requestId", type: "bytes32" },
          { name: "seller", type: "address" },
          { name: "proofHash", type: "bytes32" },
          { name: "responseHash", type: "bytes32" },
          { name: "submittedAt", type: "uint64" },
          { name: "resolvedAt", type: "uint64" },
          { name: "state", type: "uint8" },
        ],
      },
    ],
    stateMutability: "view",
  },

  {
    type: "function",
    name: "getProof",
    inputs: [
      { name: "dealId", type: "uint256" },
    ],
    outputs: [
      { name: "", type: "bytes32" },
    ],
    stateMutability: "view",
  },

  // =========================
  // EIP-712
  // =========================

  {
    type: "function",
    name: "hashDeliveryApproval",
    inputs: [
      { name: "dealId", type: "uint256" },
      { name: "seller", type: "address" },
      { name: "proofHash", type: "bytes32" },
      { name: "validUntil", type: "uint64" },
      { name: "approved", type: "bool" },
    ],
    outputs: [
      { name: "", type: "bytes32" },
    ],
    stateMutability: "view",
  },

  {
    type: "function",
    name: "domainSeparator",
    inputs: [],
    outputs: [
      { name: "", type: "bytes32" },
    ],
    stateMutability: "view",
  },

  {
    type: "function",
    name: "eip712Domain",
    inputs: [],
    outputs: [
      { name: "fields", type: "bytes1" },
      { name: "name", type: "string" },
      { name: "version", type: "string" },
      { name: "chainId", type: "uint256" },
      { name: "verifyingContract", type: "address" },
      { name: "salt", type: "bytes32" },
      { name: "extensions", type: "uint256[]" },
    ],
    stateMutability: "view",
  },

  // =========================
  // EVENTS
  // =========================

  {
    type: "event",
    name: "ProofSubmitted",
    inputs: [
      { name: "dealId", type: "uint256", indexed: true },
      { name: "seller", type: "address", indexed: true },
      { name: "proofHash", type: "bytes32", indexed: true },
      { name: "revision", type: "uint32", indexed: false },
    ],
  },

  {
    type: "event",
    name: "DeliveryApproved",
    inputs: [
      { name: "dealId", type: "uint256", indexed: true },
      { name: "proofHash", type: "bytes32", indexed: true },
      { name: "responseHash", type: "bytes32", indexed: false },
    ],
  },

  {
    type: "event",
    name: "DeliveryRejected",
    inputs: [
      { name: "dealId", type: "uint256", indexed: true },
      { name: "proofHash", type: "bytes32", indexed: true },
    ],
  },

  // =========================
  // VALIDATOR CONFIGURATION
  // =========================

  {
    type: "function",
    name: "setValidator",
    inputs: [
      { name: "validator", type: "address" },
      { name: "allowed", type: "bool" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },

  {
    type: "function",
    name: "hasRole",
    inputs: [
      { name: "role", type: "bytes32" },
      { name: "account", type: "address" },
    ],
    outputs: [
      { name: "", type: "bool" },
    ],
    stateMutability: "view",
  },
] as const;