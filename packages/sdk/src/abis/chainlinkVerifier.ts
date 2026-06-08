export const chainlinkVerifierAbi = [
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
    name: 'getVerificationStatus',
    inputs: [{ name: 'dealId', type: 'uint256' }],
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    name: 'VerificationRequested',
    inputs: [
      { name: 'dealId', type: 'uint256', indexed: true },
      { name: 'requestId', type: 'bytes32', indexed: true },
    ],
  },
  {
    type: 'event',
    name: 'VerificationCompleted',
    inputs: [
      { name: 'dealId', type: 'uint256', indexed: true },
      { name: 'verified', type: 'bool', indexed: false },
    ],
  },
] as const;
