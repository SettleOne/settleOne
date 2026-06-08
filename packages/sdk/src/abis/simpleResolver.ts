export const simpleResolverAbi = [
  {
    type: 'function',
    name: 'resolveDispute',
    inputs: [
      { name: 'dealId', type: 'uint256' },
      { name: 'outcome', type: 'uint8' },
      { name: 'sellerBps', type: 'uint256' },
      { name: 'buyerBps', type: 'uint256' },
      { name: 'resolutionHash', type: 'bytes32' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'isResolver',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    name: 'DisputeResolved',
    inputs: [
      { name: 'dealId', type: 'uint256', indexed: true },
      { name: 'resolver', type: 'address', indexed: true },
      { name: 'outcome', type: 'uint8', indexed: false },
    ],
  },
] as const;
