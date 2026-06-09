import React from "react";
// Note: In a real implementation this would use RainbowKit's ConnectButton
// Since this is a UI scaffold, we'll build a visual placeholder that mimics it

export function WalletConnectButton() {
  const [isConnected, setIsConnected] = React.useState(false);

  if (isConnected) {
    return (
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[var(--border)] rounded-md shadow-sm font-semibold text-sm">
          <span className="w-2 h-2 rounded-full bg-[#2D374B]"></span>
          Arbitrum
        </div>
        <button
          onClick={() => setIsConnected(false)}
          className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[var(--border)] rounded-md shadow-sm font-mono text-sm hover:bg-gray-50 transition-colors"
        >
          <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"></div>
          0x1234...5678
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsConnected(true)}
      className="px-4 py-2 bg-[var(--accent-blue)] text-white font-semibold text-sm rounded-md shadow-sm hover:bg-blue-600 transition-colors"
    >
      Connect Wallet
    </button>
  );
}
