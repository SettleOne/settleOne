export const chainlinkVerifierAbi = [
  // =========================
  // VERIFICATION
  // =========================

  {
    type: "function",
    name: "requestVerification",
    inputs: [
      {
        name: "dealId",
        type: "uint256",
      },
      {
        name: "oracleData",
        type: "bytes",
      },
    ],
    outputs: [
      {
        name: "requestId",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
  },

  {
    type: "function",
    name: "submitProof",
    inputs: [
      {
        name: "dealId",
        type: "uint256",
      },
      {
        name: "seller",
        type: "address",
      },
      {
        name: "proofHash",
        type: "bytes32",
      },
      {
        name: "submissionData",
        type: "bytes",
      },
    ],
    outputs: [
      {
        name: "requestId",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
  },

  {
    type: "function",
    name: "fulfillVerification",
    inputs: [
      {
        name: "requestId",
        type: "bytes32",
      },
      {
        name: "response",
        type: "bytes",
      },
      {
        name: "approved",
        type: "bool",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },

  {
    type: "function",
    name: "verify",
    inputs: [
      {
        name: "dealId",
        type: "uint256",
      },
      {
        name: "",
        type: "bytes",
      },
    ],
    outputs: [
      {
        name: "verified",
        type: "bool",
      },
      {
        name: "resultData",
        type: "bytes",
      },
    ],
    stateMutability: "view",
  },

  // =========================
  // VERIFICATION READS
  // =========================

  {
    type: "function",
    name: "getVerificationState",
    inputs: [
      {
        name: "dealId",
        type: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
  },

  {
    type: "function",
    name: "getVerification",
    inputs: [
      {
        name: "dealId",
        type: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          {
            name: "requestId",
            type: "bytes32",
          },
          {
            name: "seller",
            type: "address",
          },
          {
            name: "proofHash",
            type: "bytes32",
          },
          {
            name: "responseHash",
            type: "bytes32",
          },
          {
            name: "submittedAt",
            type: "uint64",
          },
          {
            name: "resolvedAt",
            type: "uint64",
          },
          {
            name: "state",
            type: "uint8",
          },
        ],
      },
    ],
    stateMutability: "view",
  },

  {
    type: "function",
    name: "getProof",
    inputs: [
      {
        name: "dealId",
        type: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
  },

  {
    type: "function",
    name: "getRequestId",
    inputs: [
      {
        name: "dealId",
        type: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
  },

  {
    type: "function",
    name: "getDealIdByRequestId",
    inputs: [
      {
        name: "requestId",
        type: "bytes32",
      },
    ],
    outputs: [
      {
        name: "dealId",
        type: "uint256",
      },
    ],
    stateMutability: "view",
  },

  // =========================
  // EVENTS
  // =========================

  {
    type: "event",
    name: "VerificationRequested",
    inputs: [
      {
        name: "dealId",
        type: "uint256",
        indexed: true,
      },
      {
        name: "requestId",
        type: "bytes32",
        indexed: true,
      },
      {
        name: "seller",
        type: "address",
        indexed: true,
      },
      {
        name: "proofHash",
        type: "bytes32",
        indexed: false,
      },
    ],
  },

  {
    type: "event",
    name: "VerificationFulfilled",
    inputs: [
      {
        name: "dealId",
        type: "uint256",
        indexed: true,
      },
      {
        name: "requestId",
        type: "bytes32",
        indexed: true,
      },
      {
        name: "approved",
        type: "bool",
        indexed: false,
      },
      {
        name: "responseHash",
        type: "bytes32",
        indexed: false,
      },
    ],
  },
] as const;