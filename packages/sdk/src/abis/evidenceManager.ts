export const evidenceManagerAbi = [
  {
    type: "function",
    name: "submitEvidence",
    inputs: [
      { name: "dealId", type: "uint256" },
      { name: "role", type: "uint8" },
      { name: "evidenceType", type: "uint8" },
      { name: "contentHash", type: "bytes32" },
      { name: "cid", type: "string" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getEvidence",
    inputs: [
      { name: "dealId", type: "uint256" },
      { name: "index", type: "uint256" },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "dealId", type: "uint256" },
          { name: "submitter", type: "address" },
          { name: "role", type: "uint8" },
          { name: "evidenceType", type: "uint8" },
          { name: "contentHash", type: "bytes32" },
          { name: "cid", type: "string" },
          { name: "submittedAt", type: "uint256" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getEvidenceCount",
    inputs: [{ name: "dealId", type: "uint256" }],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "EvidenceSubmitted",
    inputs: [
      { name: "dealId", type: "uint256", indexed: true },
      { name: "submitter", type: "address", indexed: true },
      { name: "role", type: "uint8", indexed: false },
      { name: "evidenceType", type: "uint8", indexed: false },
      { name: "contentHash", type: "bytes32", indexed: false },
    ],
  },
] as const;
