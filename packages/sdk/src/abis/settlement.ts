export const settlementAbi = [
  {
    type: 'function',
    name: 'releaseFunds',
    inputs: [{ name: 'dealId', type: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'refundBuyer',
    inputs: [{ name: 'dealId', type: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'settleWithSplit',
    inputs: [
      { name: 'dealId', type: 'uint256' },
      { name: 'sellerBps', type: 'uint256' },
      { name: 'buyerBps', type: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'getSettlementPayout',
    inputs: [{ name: 'dealId', type: 'uint256' }],
    outputs: [
      {
        name: '',
        type: 'tuple',
        components: [
          { name: 'sellerAmount', type: 'uint256' },
          { name: 'buyerAmount', type: 'uint256' },
          { name: 'treasuryAmount', type: 'uint256' },
          { name: 'yieldAmount', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'event',
    name: 'FundsReleased',
    inputs: [
      { name: 'dealId', type: 'uint256', indexed: true },
      { name: 'seller', type: 'address', indexed: true },
      { name: 'amount', type: 'uint256', indexed: false },
    ],
  },
  {
    type: 'event',
    name: 'BuyerRefunded',
    inputs: [
      { name: 'dealId', type: 'uint256', indexed: true },
      { name: 'buyer', type: 'address', indexed: true },
      { name: 'amount', type: 'uint256', indexed: false },
    ],
  },
  {
    type: 'event',
    name: 'DealSettled',
    inputs: [
      { name: 'dealId', type: 'uint256', indexed: true },
      { name: 'sellerAmount', type: 'uint256', indexed: false },
      { name: 'buyerAmount', type: 'uint256', indexed: false },
    ],
  },
] as const;
