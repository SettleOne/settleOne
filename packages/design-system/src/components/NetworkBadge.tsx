import React from 'react';

interface NetworkBadgeProps {
  chainId?: number;
  chainName?: string;
  className?: string;
}

export function NetworkBadge({ chainId, chainName, className = '' }: NetworkBadgeProps) {
  // Simple mapping for common networks
  const getNetworkDetails = () => {
    if (chainName) {
      if (chainName.toLowerCase().includes('arbitrum')) return { color: '#2D374B', name: chainName };
      if (chainName.toLowerCase().includes('ethereum') || chainName.toLowerCase().includes('mainnet')) return { color: '#627EEA', name: chainName };
      if (chainName.toLowerCase().includes('polygon')) return { color: '#8247E5', name: chainName };
      if (chainName.toLowerCase().includes('base')) return { color: '#0052FF', name: chainName };
      return { color: '#6B7280', name: chainName };
    }
    
    switch (chainId) {
      case 1: return { color: '#627EEA', name: 'Ethereum' };
      case 11155111: return { color: '#627EEA', name: 'Sepolia' };
      case 42161: return { color: '#2D374B', name: 'Arbitrum' };
      case 421614: return { color: '#2D374B', name: 'Arbitrum Sepolia' };
      case 137: return { color: '#8247E5', name: 'Polygon' };
      case 8453: return { color: '#0052FF', name: 'Base' };
      default: return { color: '#6B7280', name: 'Unknown Network' };
    }
  };

  const details = getNetworkDetails();

  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white border border-[var(--border)] shadow-sm ${className}`}>
      <span 
        className="w-2 h-2 rounded-full" 
        style={{ backgroundColor: details.color }}
      />
      <span className="text-xs font-semibold text-[var(--text-primary)]">{details.name}</span>
    </div>
  );
}
