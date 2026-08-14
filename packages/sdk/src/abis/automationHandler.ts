export const automationHandlerAbi = [
  // =========================
  // CHAINLINK AUTOMATION
  // =========================

  {
    type: "function",
    name: "checkUpkeep",
    inputs: [
      {
        name: "checkData",
        type: "bytes",
      },
    ],
    outputs: [
      {
        name: "upkeepNeeded",
        type: "bool",
      },
      {
        name: "performData",
        type: "bytes",
      },
    ],
    stateMutability: "view",
  },

  {
    type: "function",
    name: "performUpkeep",
    inputs: [
      {
        name: "performData",
        type: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },

  // =========================
  // DEAL REGISTRATION
  // =========================

  {
    type: "function",
    name: "registerDeal",
    inputs: [
      {
        name: "dealId",
        type: "uint256",
      },
      {
        name: "earliestDeadline",
        type: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },

  {
    type: "function",
    name: "unregisterDeal",
    inputs: [
      {
        name: "dealId",
        type: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },

  {
    type: "function",
    name: "isDealRegistered",
    inputs: [
      {
        name: "dealId",
        type: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
  },

  // =========================
  // AUTOMATION EXECUTION
  // =========================

  {
    type: "function",
    name: "executeAutoRelease",
    inputs: [
      {
        name: "dealId",
        type: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },

  {
    type: "function",
    name: "handleExpiry",
    inputs: [
      {
        name: "dealId",
        type: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },

  // =========================
  // DEAL INFORMATION
  // =========================

  {
    type: "function",
    name: "getDealDeadline",
    inputs: [
      {
        name: "dealId",
        type: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
  },

  {
    type: "function",
    name: "getRegisteredDealCount",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
  },

  {
    type: "function",
    name: "getRegisteredDeals",
    inputs: [
      {
        name: "start",
        type: "uint256",
      },
      {
        name: "count",
        type: "uint256",
      },
    ],
    outputs: [
      {
        name: "dealIds",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
  },

  {
    type: "function",
    name: "registeredDeadlines",
    inputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
  },

  // =========================
  // CONFIGURATION
  // =========================

  {
    type: "function",
    name: "dealManager",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
  },

  {
    type: "function",
    name: "maxScan",
    inputs: [],
    outputs: [
      {
        name: "",
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
    name: "DealRegistered",
    inputs: [
      {
        name: "dealId",
        type: "uint256",
        indexed: true,
      },
      {
        name: "earliestDeadline",
        type: "uint256",
        indexed: false,
      },
    ],
  },

  {
    type: "event",
    name: "DealUnregistered",
    inputs: [
      {
        name: "dealId",
        type: "uint256",
        indexed: true,
      },
    ],
  },

  {
    type: "event",
    name: "UpkeepPerformed",
    inputs: [
      {
        name: "dealId",
        type: "uint256",
        indexed: true,
      },
      {
        name: "action",
        type: "uint8",
        indexed: false,
      },
    ],
  },

  {
    type: "event",
    name: "DealManagerUpdated",
    inputs: [
      {
        name: "previous",
        type: "address",
        indexed: true,
      },
      {
        name: "updated",
        type: "address",
        indexed: true,
      },
    ],
  },

  {
    type: "event",
    name: "MaxScanUpdated",
    inputs: [
      {
        name: "previous",
        type: "uint256",
        indexed: false,
      },
      {
        name: "updated",
        type: "uint256",
        indexed: false,
      },
    ],
  },
] as const;
