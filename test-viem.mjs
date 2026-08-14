import { toFunctionSelector } from "viem";

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
  "InvalidDisputeResolver()",
  "SellerNotRegistered()",
  "InvalidAcceptanceWindow()",
  "InvalidDisputeWindow()",
];

for (const err of errors) {
  const selector = toFunctionSelector(err);
  console.log(err, selector);
  if (selector === "0xb7ee3f83") {
    console.log("MATCH FOUND:", err);
  }
}
