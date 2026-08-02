const fs = require('fs');
const path = require('path');

const dir = __dirname;
const componentsDir = path.join(dir, 'components');

const files = [
  path.join(dir, '../DealRoomPage.tsx'),
  ...fs.readdirSync(componentsDir).map(file => path.join(componentsDir, file))
];

const replacements = {
  'bg-white': 'bg-[var(--bg-card)]',
  'bg-gray-50': 'bg-[var(--bg-subtle)]',
  'bg-gray-100': 'bg-[var(--bg-subtle)]',
  'bg-gray-200': 'bg-[var(--bg-subtle)]',
  'border-gray-200': 'border-[var(--border)]',
  'border-gray-300': 'border-[var(--border-light)]',
  'text-gray-900': 'text-[var(--text-primary)]',
  'text-gray-800': 'text-[var(--text-primary)]',
  'text-gray-700': 'text-[var(--text-secondary)]',
  'text-gray-600': 'text-[var(--text-secondary)]',
  'text-gray-500': 'text-[var(--text-muted)]',
  'text-gray-400': 'text-[var(--text-muted)]',
  
  // Accents
  'bg-red-50': 'bg-red-900/20',
  'bg-red-100': 'bg-red-900/30',
  'text-red-500': 'text-[var(--accent-red)]',
  'text-red-600': 'text-[var(--accent-red)]',
  
  'bg-blue-50': 'bg-blue-900/20',
  'bg-blue-100': 'bg-blue-900/30',
  'text-blue-500': 'text-[var(--accent-blue)]',
  'text-blue-600': 'text-[var(--accent-blue)]',
  
  'bg-green-50': 'bg-green-900/20',
  'bg-green-100': 'bg-green-900/30',
  'text-green-500': 'text-[var(--accent-green)]',
  'text-green-600': 'text-[var(--accent-green)]',
  
  'bg-amber-50': 'bg-amber-900/20',
  'bg-amber-100': 'bg-amber-900/30',
  'text-amber-500': 'text-[var(--accent-amber)]',
  'text-amber-600': 'text-[var(--accent-amber)]',
  
  'bg-purple-50': 'bg-purple-900/20',
  'bg-purple-100': 'bg-purple-900/30',
  'text-purple-500': 'text-[var(--accent-purple)]',
  'text-purple-600': 'text-[var(--accent-purple)]',

  'bg-sky-50': 'bg-sky-900/20',
  'bg-sky-100': 'bg-sky-900/30',
  'text-sky-500': 'text-[var(--state-awaiting-acceptance)]',
  'text-sky-600': 'text-[var(--state-awaiting-acceptance)]'
};

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  Object.entries(replacements).forEach(([from, to]) => {
    const regex = new RegExp(`\\b${from}\\b`, 'g');
    content = content.replace(regex, to);
  });

  if (originalContent !== content) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${path.basename(file)}`);
  }
});
