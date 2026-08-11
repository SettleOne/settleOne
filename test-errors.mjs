import { keccak256 } from "ethers";
import { toUtf8Bytes } from "ethers";

const errors = [
  "InvalidSeller()",
  "InvalidBuyer()",
  "InvalidToken()",
  "InvalidAmount()",
  "InvalidDeadline()",
  "ZeroAddress()",
  "InvalidAddress()",
  "DealAlreadyExists()",
  "InvalidDealType()",
  "Unauthorized()",
  "NotBuyer()",
  "NotSeller()",
  "InvalidVerifier()",
  "InvalidDisputeResolver()"
];

for (const err of errors) {
  const hash = keccak256(toUtf8Bytes(err));
  const selector = hash.substring(0, 10);
  console.log(err, selector);
  if (selector === "0xb7ee3f83") {
    console.log("FOUND!");
  }
}
