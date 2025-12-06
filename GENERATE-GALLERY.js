const fs = require('fs');
const path = require('path');

// Configuration
const UPLOADS_DIR = path.join(__dirname, 'apps', 'web', 'public', 'uploads');
const OUTPUT_FILE = path.join(__dirname, 'apps', 'web', 'public', 'gallery.html');

console.log('\n========================================');
console.log('ANSA IMAGE GALLERY GENERATOR');
console.log('========================================\n');

// Check if uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
    console.error('ERROR: Uploads directory not found!');
    console.error('Expected:', UPLOADS_DIR);
    process.exit(1);
}

console.log('✓ Found uploads directory');
console.log('Scanning for images...\n');

// Find all images recursively
function findAllImages(dir) {
    const results = [];
    
    function scan(currentDir) {
        const items = fs.readdirSync(currentDir);
        
        for (const item of items) {
            const fullPath = path.join(currentDir, item);
            const stats = fs.statSync(fullPath);
            
            if (stats.isDirectory()) {
                scan(fullPath);
            } else if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(item)) {
                const relativePath = path.relative(path.join(__dirname, 'apps', 'web', 'public'), fullPath);
                const webPath = '/' + relativePath.replace(/\\/g, '/');
                results.push({
                    fileName: item,
                    webPath: webPath,
                    sizeBytes: stats.size,
                    sizeKB: (stats.size / 1024).toFixed(1)
                });
            }
        }
    }
    
    scan(dir);
    return results;
}

const allImages = findAllImages(UPLOADS_DIR);

console.log(`Found ${allImages.length} images!\n`);

if (allImages.length === 0) {
    console.log('No images found in the uploads directory.');
    process.exit(1);
}

// Show first 15 as sample
console.log('Sample images:');
allImages.slice(0, 15).forEach((img, i) => {
    console.log(`  ${(i + 1).toString().padStart(2)}. ${img.fileName} (${img.sizeKB} KB)`);
});

if (allImages.length > 15) {
    console.log(`  ... and ${allImages.length - 15} more\n`);
}

// Separate originals from thumbnails
const originals = allImages.filter(img => !/-\d+x\d+\.(jpg|jpeg|png|gif)$/i.test(img.fileName));

console.log(`\n✓ ${allImages.length} total images`);
console.log(`✓ ${originals.length} original/full-size images`);
console.log(`✓ ${allImages.length - originals.length} thumbnails/resized versions\n`);

// Generate the HTML
const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ANSA Image Gallery - ${allImages.length} Images</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 1800px;
            margin: 0 auto;
        }
        
        .header {
            background: white;
            padding: 30px;
            border-radius: 15px;
            margin-bottom: 30px;
            text-align: center;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }
        
        h1 {
            color: #667eea;
            font-size: 36px;
            margin-bottom: 10px;
        }
        
        .stats {
            color: #666;
            font-size: 16px;
        }
        
        .controls {
            background: white;
            padding: 20px;
            border-radius: 15px;
            margin-bottom: 30px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }
        
        #search {
            width: 100%;
            padding: 12px 20px;
            font-size: 16px;
            border: 2px solid #667eea;
            border-radius: 8px;
            margin-bottom: 15px;
            outline: none;
        }
        
        .filter-buttons {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            margin-bottom: 15px;
        }
        
        .filter-btn {
            padding: 10px 20px;
            border: 2px solid #667eea;
            background: white;
            color: #667eea;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s;
        }
        
        .filter-btn:hover,
        .filter-btn.active {
            background: #667eea;
            color: white;
        }
        
        .count {
            text-align: center;
            font-weight: 600;
            color: #667eea;
        }
        
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 25px;
        }
        
        .card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            transition: all 0.3s;
        }
        
        .card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 30px rgba(0,0,0,0.3);
        }
        
        .card.hidden {
            display: none;
        }
        
        .img-box {
            width: 100%;
            height: 250px;
            background: #f5f5f5;
            overflow: hidden;
            position: relative;
        }
        
        .img-box img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s;
        }
        
        .card:hover .img-box img {
            transform: scale(1.1);
        }
        
        .info {
            padding: 20px;
        }
        
        .filename {
            font-size: 14px;
            font-weight: 600;
            color: #333;
            margin-bottom: 8px;
            word-break: break-word;
        }
        
        .path {
            font-size: 11px;
            color: #999;
            margin-bottom: 10px;
            word-break: break-all;
        }
        
        .size {
            font-size: 12px;
            color: #666;
            margin-bottom: 15px;
        }
        
        .btn {
            display: inline-block;
            padding: 10px 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 600;
            transition: all 0.3s;
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
        }
        
        @media (max-width: 768px) {
            h1 { font-size: 28px; }
            .gallery { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>ANSA Image Gallery</h1>
            <div class="stats">
                ${allImages.length} total images | ${originals.length} originals | ${allImages.length - originals.length} thumbnails
            </div>
        </div>
        
        <div class="controls">
            <input type="text" id="search" placeholder="Search by filename or path...">
            <div class="filter-buttons">
                <button class="filter-btn active" onclick="setFilter('all')">All Images (${allImages.length})</button>
                <button class="filter-btn" onclick="setFilter('originals')">Originals Only (${originals.length})</button>
                <button class="filter-btn" onclick="setFilter('thumbnails')">Thumbnails Only (${allImages.length - originals.length})</button>
            </div>
            <div class="count" id="count">${allImages.length} images showing</div>
        </div>
        
        <div class="gallery" id="gallery">
${allImages.map(img => {
    const isOriginal = originals.some(o => o.webPath === img.webPath);
    const type = isOriginal ? 'original' : 'thumbnail';
    return `            <div class="card" data-name="${img.fileName.toLowerCase()}" data-path="${img.webPath.toLowerCase()}" data-type="${type}">
                <a href="${img.webPath}" target="_blank">
                    <div class="img-box">
                        <img src="${img.webPath}" alt="${img.fileName}" loading="lazy">
                    </div>
                </a>
                <div class="info">
                    <div class="filename">${img.fileName}</div>
                    <div class="path">${img.webPath}</div>
                    <div class="size">${img.sizeKB} KB</div>
                    <a href="${img.webPath}" target="_blank" class="btn">Open Full Resolution</a>
                </div>
            </div>`;
}).join('\n')}
        </div>
    </div>
    
    <script>
        let currentFilter = 'all';
        
        const searchInput = document.getElementById('search');
        const cards = document.querySelectorAll('.card');
        const countEl = document.getElementById('count');
        
        function setFilter(filter) {
            currentFilter = filter;
            
            // Update button states
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
            
            // Clear search
            searchInput.value = '';
            
            updateDisplay();
        }
        
        searchInput.addEventListener('input', updateDisplay);
        
        function updateDisplay() {
            const searchTerm = searchInput.value.toLowerCase();
            let visible = 0;
            
            cards.forEach(card => {
                const name = card.getAttribute('data-name');
                const path = card.getAttribute('data-path');
                const type = card.getAttribute('data-type');
                
                const matchesSearch = searchTerm === '' || name.includes(searchTerm) || path.includes(searchTerm);
                const matchesFilter = 
                    currentFilter === 'all' ||
                    (currentFilter === 'originals' && type === 'original') ||
                    (currentFilter === 'thumbnails' && type === 'thumbnail');
                
                if (matchesSearch && matchesFilter) {
                    card.classList.remove('hidden');
                    visible++;
                } else {
                    card.classList.add('hidden');
                }
            });
            
            countEl.textContent = visible + ' images showing';
        }
    </script>
</body>
</html>`;

// Write the HTML file
fs.writeFileSync(OUTPUT_FILE, htmlContent, 'utf8');

console.log('✓ Gallery generated successfully!');
console.log('✓ Output file:', OUTPUT_FILE);
console.log('\n========================================');
console.log('DONE! Open in your browser:');
console.log('  http://localhost:4545/gallery.html');
console.log('========================================\n');


