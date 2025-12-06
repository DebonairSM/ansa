const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, 'apps', 'web', 'public', 'uploads');
const jsonFile = path.join(__dirname, 'apps', 'web', 'public', 'images.json');

function findImages(dir) {
    const images = [];
    function walk(d) {
        try {
            fs.readdirSync(d).forEach(item => {
                const p = path.join(d, item);
                const s = fs.statSync(p);
                if (s.isDirectory()) walk(p);
                else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(item)) {
                    const rel = path.relative(path.join(__dirname, 'apps', 'web', 'public'), p);
                    images.push({
                        name: item,
                        path: '/' + rel.replace(/\\/g, '/'),
                        size: (s.size / 1024).toFixed(1)
                    });
                }
            });
        } catch (e) {}
    }
    walk(dir);
    return images;
}

if (!fs.existsSync(uploadsDir)) {
    console.error('Uploads directory not found!');
    process.exit(1);
}

const images = findImages(uploadsDir);
const originals = images.filter(img => !/-\d+x\d+\.(jpg|jpeg|png|gif)$/i.test(img.name));

fs.writeFileSync(jsonFile, JSON.stringify({ images, originals, total: images.length }, null, 2));
console.log(`Found ${images.length} images (${originals.length} originals)`);
console.log(`Saved to: ${jsonFile}`);



