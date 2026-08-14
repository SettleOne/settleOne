import { useReadContract } from "wagmi";
import { settlementAbi } from "../abis/settlement";
import { getContractAddress } from "../addresses";

export function useGetSettlementBalance(
  chainId: number,
  dealId: bigint | undefined,
) {
  const address = getContractAddress(chainId, "Settlement");
  return useReadContract({
    address,
    abi: settlementAbi,
    functionName: "getBalance",
    args: dealId !== undefined ? [dealId] : undefined,
    query: { enabled: dealId !== undefined },
  });
}

export function useGetPayout(chainId: number, dealId: bigint | undefined) {
  const address = getContractAddress(chainId, "Settlement");
  return useReadContract({
    address,
    abi: settlementAbi,
    functionName: "getPayout",
    args: dealId !== undefined ? [dealId] : undefined,
    query: { enabled: dealId !== undefined },
  });
}

export function useIsSettled(chainId: number, dealId: bigint | undefined) {
  const address = getContractAddress(chainId, "Settlement");
  return useReadContract({
    address,
    abi: settlementAbi,
    functionName: "isSettled",
    args: dealId !== undefined ? [dealId] : undefined,
    query: { enabled: dealId !== undefined },
  });
}
