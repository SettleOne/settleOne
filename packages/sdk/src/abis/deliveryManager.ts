export const deliveryManagerAbi = [
  {
    type: "function",
    name: "submitDeliveryProof",
    inputs: [
      { name: "dealId", type: "uint256" },
      { name: "proofHash", type: "bytes32" },
      { name: "cid", type: "string" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "finalizeDelivery",
    inputs: [{ name: "dealId", type: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "acceptDelivery",
    inputs: [{ name: "dealId", type: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "requestRevision",
    inputs: [
      { name: "dealId", type: "uint256" },
      { name: "reasonHash", type: "bytes32" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
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
          { name: "revision", type: "uint8" },
          { name: "submittedAt", type: "uint256" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "DeliverySubmitted",
    inputs: [
      { name: "dealId", type: "uint256", indexed: true },
      { name: "seller", type: "address", indexed: true },
      { name: "proofHash", type: "bytes32", indexed: false },
      { name: "cid", type: "string", indexed: false },
    ],
  },
  {
    type: "event",
    name: "DeliveryAccepted",
    inputs: [
      { name: "dealId", type: "uint256", indexed: true },
      { name: "buyer", type: "address", indexed: true },
    ],
  },
  {
    type: "event",
    name: "DeliveryFinalized",
    inputs: [{ name: "dealId", type: "uint256", indexed: true }],
  },
  {
    type: "event",
    name: "RevisionRequested",
    inputs: [
      { name: "dealId", type: "uint256", indexed: true },
      { name: "buyer", type: "address", indexed: true },
      { name: "reasonHash", type: "bytes32", indexed: false },
    ],
  },
] as const;
