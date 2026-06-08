import { useReadContract } from 'wagmi';
import { escrowVaultAbi } from '../abis/escrowVault';
import { getContractAddress } from '../addresses';

export function useVaultBalanceOf(chainId: number, dealId: bigint | undefined) {
  const address = getContractAddress(chainId, 'EscrowVault');
  return useReadContract({
    address,
    abi: escrowVaultAbi,
    functionName: 'balanceOf',
    args: dealId !== undefined ? [dealId] : undefined,
    query: { enabled: dealId !== undefined },
  });
}

export function useIsFullyFunded(chainId: number, dealId: bigint | undefined) {
  const address = getContractAddress(chainId, 'EscrowVault');
  return useReadContract({
    address,
    abi: escrowVaultAbi,
    functionName: 'isFullyFunded',
    args: dealId !== undefined ? [dealId] : undefined,
    query: { enabled: dealId !== undefined },
  });
}

export function useGetPosition(chainId: number, dealId: bigint | undefined) {
  const address = getContractAddress(chainId, 'EscrowVault');
  return useReadContract({
    address,
    abi: escrowVaultAbi,
    functionName: 'getPosition',
    args: dealId !== undefined ? [dealId] : undefined,
    query: { enabled: dealId !== undefined },
  });
}
