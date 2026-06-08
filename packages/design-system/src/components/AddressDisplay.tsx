import React, { useState } from 'react';
import { Copy, ExternalLink, Check } from 'lucide-react';

interface AddressDisplayProps {
  address: string;
  length?: number;
  showCopy?: boolean;
  showLink?: boolean;
  chainExplorerUrl?: string;
}

export function AddressDisplay({ 
  address, 
  length = 6, 
  showCopy = true, 
  showLink = true,
  chainExplorerUrl = 'https://sepolia.arbiscan.io'
}: AddressDisplayProps) {
  const [copied, setCopied] = useState(false);
  
  if (!address) return null;
  
  const shortAddress = `${address.slice(0, length + 2)}...${address.slice(-length)}`;
  
  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="inline-flex items-center gap-1.5 font-mono text-sm bg-gray-50 px-2 py-1 rounded-md border border-[var(--border)]">
      <span className="text-[var(--text-primary)]">{shortAddress}</span>
      
      {showCopy && (
        <button 
          onClick={handleCopy}
          className="text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors p-0.5 rounded focus:outline-none"
          title="Copy address"
        >
          {copied ? <Check size={14} className="text-[var(--accent-green)]" /> : <Copy size={14} />}
        </button>
      )}
      
      {showLink && (
        <a 
          href={`${chainExplorerUrl}/address/${address}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors p-0.5 rounded"
          title="View on explorer"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink size={14} />
        </a>
      )}
    </div>
  );
}
