import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { encodeAbiParameters, parseAbiParameters } from "viem";
import { deliveryManagerAbi } from "../abis/deliveryManager";
import { disputeManagerAbi } from "../abis/disputeManager";
import { getContractAddress } from "../addresses";

export function useSubmitDeliveryProof(chainId: number) {
  const address = getContractAddress(chainId, "DeliveryManager");
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
     timeout: 120_000,
  });

  const submitDeliveryProof = (dealId: bigint, proofHash: `0x${string}`) => {
    writeContract({
      address,
      abi: deliveryManagerAbi,
      functionName: "submitDeliveryProof",
      args: [dealId, proofHash], // Uses the 2-arg ABI overload
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
     timeout: 120_000,
  });

  const finalizeDelivery = (
    dealId: bigint,
    verificationData: `0x${string}`,
  ) => {
    writeContract({
      address,
      abi: deliveryManagerAbi,
      functionName: "finalizeDelivery",
      args: [dealId, verificationData],
    });
  };

  return { finalizeDelivery, hash, isPending, isConfirming, isSuccess, error };
}

export function useAcceptDelivery(chainId: number) {
  const address = getContractAddress(chainId, "DeliveryManager");
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
     timeout: 120_000,
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
     timeout: 120_000,
  });

  const requestRevision = (
    dealId: bigint,
    reasonHash: `0x${string}`,
    evidenceHash: `0x${string}`,
  ) => {
    writeContract({
      address,
      abi: deliveryManagerAbi,
      functionName: "requestRevision",
      args: [dealId, reasonHash, evidenceHash],
    });
  };

  return { requestRevision, hash, isPending, isConfirming, isSuccess, error };
}

export function useRaiseDispute(chainId: number) {
  const address = getContractAddress(chainId, "DeliveryManager");
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
     timeout: 120_000,
  });

  const raiseDispute = (
    dealId: bigint,
    reasonHash: `0x${string}`,
    evidenceHash: `0x${string}`,
  ) => {
    writeContract({
      address,
      abi: deliveryManagerAbi,
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
     timeout: 120_000,
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
     timeout: 120_000,
  });

  const resolveDispute = (
    dealId: bigint,
    outcome: number,
    sellerAward: bigint,
    buyerAward: bigint,
    resolutionHash: `0x${string}`,
  ) => {
    const resolverData = encodeAbiParameters(
      parseAbiParameters(
        "uint8 outcome, uint256 sellerAward, uint256 buyerAward, bytes32 resolutionHash",
      ),
      [outcome, sellerAward, buyerAward, resolutionHash],
    );

    writeContract({
      address,
      abi: disputeManagerAbi,
      functionName: "resolveDispute",
      args: [dealId, resolverData],
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
