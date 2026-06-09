export function formatAddress(addr: string, length: number = 6): string {
  if (!addr || addr.length < 10) return addr || "";
  return `${addr.slice(0, length + 2)}...${addr.slice(-length)}`;
}

export function formatAmount(
  amount: bigint,
  decimals: number,
  symbol: string,
): string {
  const divisor = BigInt(10 ** decimals);
  const whole = amount / divisor;
  const fraction = amount % divisor;
  const fractionStr = fraction.toString().padStart(decimals, "0").slice(0, 2);
  const formatted = whole.toLocaleString("en-US");
  return `${formatted}.${fractionStr} ${symbol}`;
}

export function formatTimestamp(ts: bigint | number): string {
  const date = new Date(Number(ts) * 1000);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

export function formatRelativeTime(ts: bigint | number): string {
  const now = Date.now();
  const then = Number(ts) * 1000;
  const diff = now - then;
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return formatTimestamp(ts);
}

export function formatCountdown(deadline: bigint | number): string {
  const now = Math.floor(Date.now() / 1000);
  const remaining = Number(deadline) - now;
  if (remaining <= 0) return "Expired";
  const days = Math.floor(remaining / 86400);
  const hours = Math.floor((remaining % 86400) / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export function isExpired(deadline: bigint): boolean {
  return BigInt(Math.floor(Date.now() / 1000)) > deadline;
}

export function parseOnChainAmount(amount: bigint, decimals: number): string {
  const divisor = BigInt(10 ** decimals);
  const whole = amount / divisor;
  const fraction = amount % divisor;
  const fractionStr = fraction
    .toString()
    .padStart(decimals, "0")
    .slice(0, decimals);
  return `${whole}.${fractionStr}`;
}

export function toOnChainAmount(amount: string, decimals: number): bigint {
  const [whole, frac = ""] = amount.split(".");
  const paddedFrac = frac.padEnd(decimals, "0").slice(0, decimals);
  return BigInt(whole + paddedFrac);
}
