const fs = require('fs');
const path = require('path');

const source = path.join('C:', 'git', 'ansa', 'backup', 'ANSA-logo.png');
const dest = path.join('C:', 'git', 'ansa', 'apps', 'web', 'public', 'ansa-logo.png');

// Ensure public directory exists
const publicDir = path.dirname(dest);
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
  console.log('Created public directory');
}

// Copy file
try {
  fs.copyFileSync(source, dest);
  console.log(`Logo copied successfully from ${source} to ${dest}`);
  console.log('File size:', fs.statSync(dest).size, 'bytes');
} catch (err) {
  console.error('Error copying file:', err);
  process.exit(1);
}




