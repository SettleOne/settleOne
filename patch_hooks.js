const fs = require("fs");
const path = require("path");

const files = [
  {
    path: "apps/workspace/src/pages/DealRoom/components/ActionCenter.tsx",
    importPath: "../../../hooks/useRequireWallet",
    replacements: [
      {
        match:
          /const \{ acceptDeal, isPending: isAccepting \} = useAcceptDeal\(chainId\);/,
        replace: `const { acceptDeal, isPending: isAccepting } = useAcceptDeal(chainId);\n  const { requireWallet, WalletPromptModal } = useRequireWallet();`,
      },
      {
        match: /onClick=\{\(\) => acceptDeal\(/,
        replace: `onClick={() => requireWallet(() => acceptDeal(`,
      },
      {
        match: /onClick=\{\(\) => rejectDeal\(/,
        replace: `onClick={() => requireWallet(() => rejectDeal(`,
      },
      {
        match: /onClick=\{\(\) => cancelDeal\(/,
        replace: `onClick={() => requireWallet(() => cancelDeal(`,
      },
      {
        match: /return \(/,
        replace: `return (\n    <>\n      <WalletPromptModal />`,
      },
      {
        match: /;\n\}/,
        replace: `;\n  </>\n  );\n}`,
      },
    ],
  },
];
// I will just read them using grep to get the exact lines to replace safely.
