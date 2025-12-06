const fs = require('fs');
const path = require('path');

const source = 'C:\\git\\ansa\\backup\\ANSA-logo.png';
const dest = 'C:\\git\\ansa\\apps\\web\\public\\ansa-logo.png';

console.log('Source:', source);
console.log('Destination:', dest);

if (!fs.existsSync(source)) {
  console.error('ERROR: Source file does not exist!');
  process.exit(1);
}

try {
  fs.copyFileSync(source, dest);
  const stats = fs.statSync(dest);
  console.log('SUCCESS: Logo copied!');
  console.log('File size:', stats.size, 'bytes');
} catch (err) {
  console.error('ERROR:', err.message);
  process.exit(1);
}





