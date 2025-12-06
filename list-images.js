const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, 'apps', 'web', 'public', 'uploads');
const outputJson = path.join(__dirname, 'apps', 'web', 'public', 'uploads-list.json');

console.log('==================================================');
console.log('ANSA Image Lister');
console.log('==================================================\n');
console.log('Uploads directory:', uploadsDir);
console.log('Output file:', outputJson, '\n');

if (!fs.existsSync(uploadsDir)) {
    console.error('ERROR: Uploads directory not found!');
    process.exit(1);
}

function findImages(dir, images = []) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            findImages(fullPath, images);
        } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(item)) {
            const relativePath = path.relative(path.join(__dirname, 'apps', 'web', 'public'), fullPath);
            images.push({
                name: item,
                path: '/' + relativePath.replace(/\\/g, '/'),
                size: stat.size
            });
        }
    }
    
    return images;
}

const images = findImages(uploadsDir);

console.log(`Found ${images.length} images\n`);

images.slice(0, 10).forEach((img, i) => {
    console.log(`${i+1}. ${img.name}`);
});

if (images.length > 10) {
    console.log(`... and ${images.length - 10} more`);
}

const data = {
    generated: new Date().toISOString(),
    count: images.length,
    images: images
};

fs.writeFileSync(outputJson, JSON.stringify(data, null, 2));

console.log(`\n✓ Saved to: ${outputJson}`);
console.log(`\nNow visit: http://localhost:4545/simple-gallery.html`);


