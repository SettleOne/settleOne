import { getContract, parseEther, zeroAddress } from "viem";
import { DEAL_MANAGER_ABI } from "../constants/abis";
import { DEAL_MANAGER_ADDRESS } from "../constants/contracts";

export interface DealInput {
  buyer: `0x${string}`;
  seller: `0x${string}`;
  token: `0x${string}`;
  amount: string;
  deliveryDeadline: number;
  disputeWindow: number;
  termsHash: `0x${string}`;
  metadataHash: `0x${string}`;
  verifier: `0x${string}`;
  disputeResolver: `0x${string}`;
}

export const dealsSdk = {
  createDeal: async (
    walletClient: any,
    publicClient: any,
    input: DealInput,
  ) => {
    const { request } = await publicClient.simulateContract({
      address: DEAL_MANAGER_ADDRESS,
      abi: DEAL_MANAGER_ABI,
      functionName: "createDeal",
      args: [
        {
          ...input,
          token: input.token || zeroAddress,
          amount: parseEther(input.amount),
          deliveryDeadline: BigInt(input.deliveryDeadline),
          disputeWindow: BigInt(input.disputeWindow),
          verifier: input.verifier || zeroAddress,
          disputeResolver: input.disputeResolver || zeroAddress,
        },
      ],
      account: walletClient.account,
    });
    const hash = await walletClient.writeContract(request);
    return hash;
  },

  depositFunds: async (
    walletClient: any,
    publicClient: any,
    dealId: bigint,
    amount: string,
  ) => {
    const { request } = await publicClient.simulateContract({
      address: DEAL_MANAGER_ADDRESS,
      abi: DEAL_MANAGER_ABI,
      functionName: "depositFunds",
      args: [dealId],
      value: parseEther(amount),
      account: walletClient.account,
    });
    const hash = await walletClient.writeContract(request);
    return hash;
  },

  submitProof: async (
    walletClient: any,
    publicClient: any,
    dealId: bigint,
    proofHash: `0x${string}`,
  ) => {
    const { request } = await publicClient.simulateContract({
      address: DEAL_MANAGER_ADDRESS,
      abi: DEAL_MANAGER_ABI,
      functionName: "submitDeliveryProof",
      args: [dealId, proofHash],
      account: walletClient.account,
    });
    const hash = await walletClient.writeContract(request);
    return hash;
  },

  confirmDelivery: async (
    walletClient: any,
    publicClient: any,
    dealId: bigint,
  ) => {
    const { request } = await publicClient.simulateContract({
      address: DEAL_MANAGER_ADDRESS,
      abi: DEAL_MANAGER_ABI,
      functionName: "confirmDelivery",
      args: [dealId],
      account: walletClient.account,
    });
    const hash = await walletClient.writeContract(request);
    return hash;
  },

  getDeal: async (publicClient: any, dealId: bigint) => {
    return await publicClient.readContract({
      address: DEAL_MANAGER_ADDRESS,
      abi: DEAL_MANAGER_ABI,
      functionName: "getDeal",
      args: [dealId],
    });
  },
};
