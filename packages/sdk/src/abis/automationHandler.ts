export const automationHandlerAbi = [
  {
    type: "function",
    name: "checkUpkeep",
    inputs: [{ name: "checkData", type: "bytes" }],
    outputs: [
      { name: "upkeepNeeded", type: "bool" },
      { name: "performData", type: "bytes" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "performUpkeep",
    inputs: [{ name: "performData", type: "bytes" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "registerDeal",
    inputs: [
      { name: "dealId", type: "uint256" },
      { name: "action", type: "uint8" },
      { name: "triggerTime", type: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "cancelAutomation",
    inputs: [{ name: "dealId", type: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "AutomationRegistered",
    inputs: [
      { name: "dealId", type: "uint256", indexed: true },
      { name: "action", type: "uint8", indexed: false },
      { name: "triggerTime", type: "uint256", indexed: false },
    ],
  },
  {
    type: "event",
    name: "AutomationExecuted",
    inputs: [
      { name: "dealId", type: "uint256", indexed: true },
      { name: "action", type: "uint8", indexed: false },
    ],
  },
] as const;
