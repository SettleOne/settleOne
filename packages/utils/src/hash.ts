import { keccak256, toBytes } from "viem";

export function hashContent(content: string | Uint8Array): `0x${string}` {
  if (typeof content === "string") {
    return keccak256(toBytes(content));
  }
  return keccak256(content);
}
