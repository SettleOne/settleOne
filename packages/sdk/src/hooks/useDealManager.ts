import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { dealManagerAbi } from "../abis/dealManager";
import { getContractAddress } from "../addresses";
import type { DealInput } from "@settleone/types";

export function useCreateDeal(chainId: number) {
  const address = getContractAddress(chainId, "DealManager");
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const createDeal = (input: DealInput) => {
    writeContract({
      address,
      abi: dealManagerAbi,
      functionName: "createDeal",
      args: [input],
    });
  };

  return { createDeal, hash, isPending, isConfirming, isSuccess, error };
}

export function useFundDeal(chainId: number) {
  const address = getContractAddress(chainId, "DealManager");
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const fundDeal = (dealId: bigint) => {
    writeContract({
      address,
      abi: dealManagerAbi,
      functionName: "fundDeal",
      args: [dealId],
    });
  };

  return { fundDeal, hash, isPending, isConfirming, isSuccess, error };
}

export function useAcceptDeal(chainId: number) {
  const address = getContractAddress(chainId, "DealManager");
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const acceptDeal = (dealId: bigint) => {
    writeContract({
      address,
      abi: dealManagerAbi,
      functionName: "acceptDeal",
      args: [dealId],
    });
  };

  return { acceptDeal, hash, isPending, isConfirming, isSuccess, error };
}

export function useRejectDeal(chainId: number) {
  const address = getContractAddress(chainId, "DealManager");
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const rejectDeal = (dealId: bigint) => {
    writeContract({
      address,
      abi: dealManagerAbi,
      functionName: "rejectDeal",
      args: [dealId],
    });
  };

  return { rejectDeal, hash, isPending, isConfirming, isSuccess, error };
}

export function useCancelDeal(chainId: number) {
  const address = getContractAddress(chainId, "DealManager");
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const cancelDeal = (dealId: bigint) => {
    writeContract({
      address,
      abi: dealManagerAbi,
      functionName: "cancelDeal",
      args: [dealId],
    });
  };

  return { cancelDeal, hash, isPending, isConfirming, isSuccess, error };
}

export function useExpireSellerAcceptance(chainId: number) {
  const address = getContractAddress(chainId, "DealManager");
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const expireSellerAcceptance = (dealId: bigint) => {
    writeContract({
      address,
      abi: dealManagerAbi,
      functionName: "expireSellerAcceptance",
      args: [dealId],
    });
  };

  return {
    expireSellerAcceptance,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

export function useGetDeal(chainId: number, dealId: bigint | undefined) {
  const address = getContractAddress(chainId, "DealManager");
  return useReadContract({
    address,
    abi: dealManagerAbi,
    functionName: "getDeal",
    args: dealId !== undefined ? [dealId] : undefined,
    query: { enabled: dealId !== undefined },
  });
}

export function useGetDealState(chainId: number, dealId: bigint | undefined) {
  const address = getContractAddress(chainId, "DealManager");
  return useReadContract({
    address,
    abi: dealManagerAbi,
    functionName: "getDealState",
    args: dealId !== undefined ? [dealId] : undefined,
    query: { enabled: dealId !== undefined },
  });
}

export function useGetDealCount(chainId: number) {
  const address = getContractAddress(chainId, "DealManager");
  return useReadContract({
    address,
    abi: dealManagerAbi,
    functionName: "dealCount",
  });
}
