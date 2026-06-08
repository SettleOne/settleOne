import React from 'react';

// Hardcoding since we don't have direct access to the types package enum values in this isolated builder phase
interface DealStateTagProps {
  state: number; // Will map to DealState enum
  label: string; // The human readable label
  colorHex: string; // The hex color
  showDot?: boolean;
}

export function DealStateTag({ label, colorHex, showDot = true }: DealStateTagProps) {
  // Use inline style for dynamic background/border colors based on the state color
  // We make it semi-transparent for the background
  const rgbaBg = colorHex.replace('#', '').match(/.{1,2}/g)?.map(x => parseInt(x, 16)).join(', ');
  
  return (
    <span 
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap"
      style={{ 
        backgroundColor: rgbaBg ? `rgba(${rgbaBg}, 0.1)` : '#F3F4F6',
        color: colorHex,
        border: `1px solid rgba(${rgbaBg}, 0.2)`
      }}
    >
      {showDot && (
        <span 
          className="w-1.5 h-1.5 rounded-full" 
          style={{ backgroundColor: colorHex }}
        />
      )}
      {label}
    </span>
  );
}
