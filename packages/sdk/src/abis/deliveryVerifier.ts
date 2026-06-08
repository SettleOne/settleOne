export const deliveryVerifierAbi = [
  {
    type: 'function',
    name: 'verifyDelivery',
    inputs: [
      { name: 'dealId', type: 'uint256' },
      { name: 'proofHash', type: 'bytes32' },
    ],
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'isVerified',
    inputs: [{ name: 'dealId', type: 'uint256' }],
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    name: 'DeliveryVerified',
    inputs: [
      { name: 'dealId', type: 'uint256', indexed: true },
      { name: 'verifier', type: 'address', indexed: true },
      { name: 'proofHash', type: 'bytes32', indexed: false },
    ],
  },
] as const;
