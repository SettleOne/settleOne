export const evidenceManagerAbi = [
  {
    type: "function",
    name: "recordEvidence",
    inputs: [
      { name: "dealId", type: "uint256" },
      { name: "submitter", type: "address" },
      { name: "role", type: "uint8" },
      { name: "evidenceType", type: "uint8" },
      { name: "hash", type: "bytes32" },
      { name: "cid", type: "string" },
    ],
    outputs: [{ name: "evidenceId", type: "uint256" }],
    stateMutability: "nonpayable",
  },

  {
    type: "function",
    name: "getEvidence",
    inputs: [{ name: "evidenceId", type: "uint256" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "id", type: "uint256" },
          { name: "dealId", type: "uint256" },
          { name: "submitter", type: "address" },
          { name: "role", type: "uint8" },
          { name: "evidenceType", type: "uint8" },
          { name: "hash", type: "bytes32" },
          { name: "cid", type: "string" },
          { name: "submittedAt", type: "uint64" },
        ],
      },
    ],
    stateMutability: "view",
  },

  {
    type: "function",
    name: "getDealEvidenceCount",
    inputs: [{ name: "dealId", type: "uint256" }],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },

  {
    type: "function",
    name: "getDealEvidenceIds",
    inputs: [{ name: "dealId", type: "uint256" }],
    outputs: [{ name: "", type: "uint256[]" }],
    stateMutability: "view",
  },

  {
    type: "function",
    name: "getDealEvidenceIdsPaginated",
    inputs: [
      { name: "dealId", type: "uint256" },
      { name: "offset", type: "uint256" },
      { name: "limit", type: "uint256" },
    ],
    outputs: [
      { name: "ids", type: "uint256[]" },
      { name: "total", type: "uint256" },
    ],
    stateMutability: "view",
  },

  {
    type: "event",
    name: "EvidenceRecorded",
    inputs: [
      { name: "evidenceId", type: "uint256", indexed: true },
      { name: "dealId", type: "uint256", indexed: true },
      { name: "submitter", type: "address", indexed: true },
      { name: "role", type: "uint8", indexed: false },
      { name: "evidenceType", type: "uint8", indexed: false },
      { name: "hash", type: "bytes32", indexed: false },
      { name: "cid", type: "string", indexed: false },
    ],
  },
] as const;
