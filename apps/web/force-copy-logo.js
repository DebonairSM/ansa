const fs = require('fs');
const path = require('path');

console.log('=== Logo Copy Script ===');

const source = 'C:\\git\\ansa\\backup\\ANSA-logo.png';
const dest = 'C:\\git\\ansa\\apps\\web\\public\\ansa-logo.png';

console.log('Source:', source);
console.log('Destination:', dest);

// Check source exists
if (!fs.existsSync(source)) {
  console.error('ERROR: Source file does not exist!');
  process.exit(1);
}

const sourceStats = fs.statSync(source);
console.log('Source file size:', sourceStats.size, 'bytes');

// Ensure public directory exists
const publicDir = path.dirname(dest);
if (!fs.existsSync(publicDir)) {
  console.log('Creating public directory...');
  fs.mkdirSync(publicDir, { recursive: true });
}

// Read source file as buffer
console.log('Reading source file...');
const buffer = fs.readFileSync(source);
console.log('Read', buffer.length, 'bytes');

// Write to destination
console.log('Writing to destination...');
fs.writeFileSync(dest, buffer);

// Verify
if (fs.existsSync(dest)) {
  const destStats = fs.statSync(dest);
  console.log('SUCCESS: File copied!');
  console.log('Destination file size:', destStats.size, 'bytes');
  console.log('Verification: Sizes match =', sourceStats.size === destStats.size);
} else {
  console.error('ERROR: Destination file not created!');
  process.exit(1);
}







