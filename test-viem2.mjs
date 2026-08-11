import { toFunctionSelector } from "viem";

const errors = [
  "InvalidSeller(address)",
  "InvalidBuyer(address)",
  "ZeroAddress(address)",
  "ZeroAddress()",
  "InvalidSellerWindow()",
  "InvalidSellerAcceptanceWindow()"
];

for (const err of errors) {
  const selector = toFunctionSelector(err);
  console.log(err, selector);
}
