import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { deliveryManagerAbi } from "../abis/deliveryManager";
import { disputeManagerAbi } from "../abis/disputeManager";
import { getContractAddress } from "../addresses";

export function useSubmitDeliveryProof(chainId: number) {
  const address = getContractAddress(chainId, "DeliveryManager");
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const submitDeliveryProof = (
    dealId: bigint,
    proofHash: `0x${string}`,
    cid: string,
  ) => {
    writeContract({
      address,
      abi: deliveryManagerAbi,
      functionName: "submitDeliveryProof",
      args: [dealId, proofHash, cid],
    });
  };

  return {
    submitDeliveryProof,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

export function useFinalizeDelivery(chainId: number) {
  const address = getContractAddress(chainId, "DeliveryManager");
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const finalizeDelivery = (dealId: bigint) => {
    writeContract({
      address,
      abi: deliveryManagerAbi,
      functionName: "finalizeDelivery",
      args: [dealId],
    });
  };

  return { finalizeDelivery, hash, isPending, isConfirming, isSuccess, error };
}

export function useAcceptDelivery(chainId: number) {
  const address = getContractAddress(chainId, "DeliveryManager");
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const acceptDelivery = (dealId: bigint) => {
    writeContract({
      address,
      abi: deliveryManagerAbi,
      functionName: "acceptDelivery",
      args: [dealId],
    });
  };

  return { acceptDelivery, hash, isPending, isConfirming, isSuccess, error };
}

export function useRequestRevision(chainId: number) {
  const address = getContractAddress(chainId, "DeliveryManager");
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const requestRevision = (dealId: bigint, reasonHash: `0x${string}`) => {
    writeContract({
      address,
      abi: deliveryManagerAbi,
      functionName: "requestRevision",
      args: [dealId, reasonHash],
    });
  };

  return { requestRevision, hash, isPending, isConfirming, isSuccess, error };
}

export function useRaiseDispute(chainId: number) {
  const address = getContractAddress(chainId, "DisputeManager");
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const raiseDispute = (
    dealId: bigint,
    reasonHash: `0x${string}`,
    evidenceHash: `0x${string}`,
  ) => {
    writeContract({
      address,
      abi: disputeManagerAbi,
      functionName: "raiseDispute",
      args: [dealId, reasonHash, evidenceHash],
    });
  };

  return { raiseDispute, hash, isPending, isConfirming, isSuccess, error };
}

export function useCancelDispute(chainId: number) {
  const address = getContractAddress(chainId, "DisputeManager");
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const cancelDispute = (dealId: bigint) => {
    writeContract({
      address,
      abi: disputeManagerAbi,
      functionName: "cancelDispute",
      args: [dealId],
    });
  };

  return { cancelDispute, hash, isPending, isConfirming, isSuccess, error };
}

export function useResolveDispute(chainId: number) {
  const address = getContractAddress(chainId, "DisputeManager");
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const resolveDispute = (
    dealId: bigint,
    outcome: number,
    sellerBps: bigint,
    buyerBps: bigint,
    resolutionHash: `0x${string}`,
  ) => {
    writeContract({
      address,
      abi: disputeManagerAbi,
      functionName: "resolveDispute",
      args: [dealId, outcome, sellerBps, buyerBps, resolutionHash],
    });
  };

  return { resolveDispute, hash, isPending, isConfirming, isSuccess, error };
}

export function useGetDelivery(chainId: number, dealId: bigint | undefined) {
  const address = getContractAddress(chainId, "DeliveryManager");
  return useReadContract({
    address,
    abi: deliveryManagerAbi,
    functionName: "getDelivery",
    args: dealId !== undefined ? [dealId] : undefined,
    query: { enabled: dealId !== undefined },
  });
}

export function useGetDispute(chainId: number, dealId: bigint | undefined) {
  const address = getContractAddress(chainId, "DisputeManager");
  return useReadContract({
    address,
    abi: disputeManagerAbi,
    functionName: "getDispute",
    args: dealId !== undefined ? [dealId] : undefined,
    query: { enabled: dealId !== undefined },
  });
}
