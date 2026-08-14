export const settlementAbi = [
  {
    type: "function",
    name: "getBalance",
    inputs: [{ name: "dealId", type: "uint256" }],
    outputs: [
      { name: "principal", type: "uint256" },
      { name: "assets", type: "uint256" },
    ],
    stateMutability: "view",
  },

  {
    type: "function",
    name: "getPayout",
    inputs: [{ name: "dealId", type: "uint256" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "sellerPrincipal", type: "uint256" },
          { name: "buyerPrincipal", type: "uint256" },
          { name: "sellerAssets", type: "uint256" },
          { name: "buyerAssets", type: "uint256" },
          { name: "buyerYield", type: "uint256" },
          { name: "platformYield", type: "uint256" },
        ],
      },
    ],
    stateMutability: "view",
  },

  {
    type: "function",
    name: "isSettled",
    inputs: [{ name: "dealId", type: "uint256" }],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
  },

  {
    type: "function",
    name: "releaseFundsToSeller",
    inputs: [
      { name: "dealId", type: "uint256" },
      { name: "seller", type: "address" },
      { name: "buyer", type: "address" },
      { name: "principalAmount", type: "uint256" },
    ],
    outputs: [
      {
        name: "payout",
        type: "tuple",
        components: [
          { name: "sellerPrincipal", type: "uint256" },
          { name: "buyerPrincipal", type: "uint256" },
          { name: "sellerAssets", type: "uint256" },
          { name: "buyerAssets", type: "uint256" },
          { name: "buyerYield", type: "uint256" },
          { name: "platformYield", type: "uint256" },
        ],
      },
    ],
    stateMutability: "nonpayable",
  },

  {
    type: "function",
    name: "refundBuyer",
    inputs: [
      { name: "dealId", type: "uint256" },
      { name: "buyer", type: "address" },
    ],
    outputs: [
      {
        name: "payout",
        type: "tuple",
        components: [
          { name: "sellerPrincipal", type: "uint256" },
          { name: "buyerPrincipal", type: "uint256" },
          { name: "sellerAssets", type: "uint256" },
          { name: "buyerAssets", type: "uint256" },
          { name: "buyerYield", type: "uint256" },
          { name: "platformYield", type: "uint256" },
        ],
      },
    ],
    stateMutability: "nonpayable",
  },

  {
    type: "function",
    name: "partialSettlement",
    inputs: [
      { name: "dealId", type: "uint256" },
      { name: "seller", type: "address" },
      { name: "buyer", type: "address" },
      { name: "sellerPrincipal", type: "uint256" },
      { name: "buyerPrincipal", type: "uint256" },
    ],
    outputs: [
      {
        name: "payout",
        type: "tuple",
        components: [
          { name: "sellerPrincipal", type: "uint256" },
          { name: "buyerPrincipal", type: "uint256" },
          { name: "sellerAssets", type: "uint256" },
          { name: "buyerAssets", type: "uint256" },
          { name: "buyerYield", type: "uint256" },
          { name: "platformYield", type: "uint256" },
        ],
      },
    ],
    stateMutability: "nonpayable",
  },

  {
    type: "event",
    name: "SellerReleased",
    inputs: [
      { name: "dealId", type: "uint256", indexed: true },
      { name: "seller", type: "address", indexed: true },
      { name: "buyer", type: "address", indexed: true },
      { name: "sellerPrincipal", type: "uint256", indexed: false },
      { name: "sellerAssets", type: "uint256", indexed: false },
      { name: "buyerYield", type: "uint256", indexed: false },
      { name: "platformYield", type: "uint256", indexed: false },
    ],
  },

  {
    type: "event",
    name: "BuyerRefunded",
    inputs: [
      { name: "dealId", type: "uint256", indexed: true },
      { name: "buyer", type: "address", indexed: true },
      { name: "principalRefunded", type: "uint256", indexed: false },
      { name: "buyerAssets", type: "uint256", indexed: false },
      { name: "platformYield", type: "uint256", indexed: false },
    ],
  },

  {
    type: "event",
    name: "PartialSettlementExecuted",
    inputs: [
      { name: "dealId", type: "uint256", indexed: true },
      { name: "sellerPrincipal", type: "uint256", indexed: false },
      { name: "buyerPrincipal", type: "uint256", indexed: false },
      { name: "sellerAssets", type: "uint256", indexed: false },
      { name: "buyerAssets", type: "uint256", indexed: false },
      { name: "platformYield", type: "uint256", indexed: false },
    ],
  },
] as const;
