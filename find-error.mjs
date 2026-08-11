import { dealManagerAbi } from "./packages/sdk/src/abis/dealManager.js";
import { toFunctionSelector, toEventSelector } from "viem";

dealManagerAbi.forEach(item => {
  if (item.type === "error") {
    // Manually construct signature for error
    const inputs = item.inputs.map(i => i.type).join(",");
    const signature = `${item.name}(${inputs})`;
    const selector = toFunctionSelector(signature);
    if (selector === "0xb7ee3f83") {
      console.log("MATCH FOUND:", item.name);
    }
    console.log(signature, selector);
  }
});
