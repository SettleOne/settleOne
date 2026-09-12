const fs = require('fs');
let content = fs.readFileSync('apps/marketing/src/docs/content/navigation.ts', 'utf8');
content = content.replace(
  '{ id: "how-it-works", title: "How It Works" },',
  '{ id: "how-it-works", title: "How It Works" },\n      { id: "demo", title: "Platform Demo" },'
);
fs.writeFileSync('apps/marketing/src/docs/content/navigation.ts', content);

let pages = fs.readFileSync('apps/marketing/src/docs/content/pages.tsx', 'utf8');
pages = pages.replace(
  '"how-it-works": Overview.HowItWorks,',
  '"how-it-works": Overview.HowItWorks,\n  "demo": Overview.PlatformDemo,'
);
fs.writeFileSync('apps/marketing/src/docs/content/pages.tsx', pages);
