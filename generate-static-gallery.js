const fs = require('fs');
const path = require('path');

console.log('Scanning for images...\n');

const uploadsDir = path.join(__dirname, 'apps', 'web', 'public', 'uploads');
const outputPath = path.join(__dirname, 'apps', 'web', 'public', 'static-gallery.html');

// Recursively find all images
function findImages(dir, baseDir = dir) {
    let images = [];
    
    try {
        const items = fs.readdirSync(dir);
        
        for (const item of items) {
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                images = images.concat(findImages(fullPath, baseDir));
            } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(item)) {
                const relativePath = path.relative(path.join(__dirname, 'apps', 'web', 'public'), fullPath);
                images.push({
                    fileName: item,
                    webPath: '/' + relativePath.replace(/\\/g, '/'),
                    size: stat.size
                });
            }
        }
    } catch (error) {
        console.error(`Error reading ${dir}:`, error.message);
    }
    
    return images;
}

const images = findImages(uploadsDir);

console.log(`Found ${images.length} images\n`);

if (images.length === 0) {
    console.log('No images found!');
    process.exit(1);
}

// Show first 10
images.slice(0, 10).forEach((img, i) => {
    console.log(`${i + 1}. ${img.fileName}`);
});
if (images.length > 10) {
    console.log(`... and ${images.length - 10} more\n`);
}

// Filter to get only full-size originals (not thumbnails) for easier selection
const originals = images.filter(img => 
    !/\-\d+x\d+\.(jpg|jpeg|png|gif|webp)$/i.test(img.fileName)
);

console.log(`\nFiltered to ${originals.length} original images (excluding thumbnails)\n`);

// Generate HTML
const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ANSA Images - ${images.length} Total</title>
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
            padding: 30px;
        }
        
        .container {
            max-width: 1800px;
            margin: 0 auto;
        }
        
        .header {
            background: rgba(255, 255, 255, 0.95);
            padding: 30px;
            border-radius: 15px;
            margin-bottom: 30px;
            text-align: center;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }
        
        h1 {
            color: #667eea;
            margin-bottom: 10px;
        }
        
        .stats {
            color: #666;
            font-size: 16px;
        }
        
        .filter-controls {
            background: rgba(255, 255, 255, 0.95);
            padding: 20px;
            border-radius: 15px;
            margin-bottom: 30px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }
        
        #searchBox {
            width: 100%;
            padding: 12px 20px;
            font-size: 16px;
            border: 2px solid #667eea;
            border-radius: 8px;
            outline: none;
            margin-bottom: 15px;
        }
        
        .filter-buttons {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }
        
        .filter-btn {
            padding: 8px 16px;
            border: 2px solid #667eea;
            background: white;
            color: #667eea;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.3s;
        }
        
        .filter-btn:hover, .filter-btn.active {
            background: #667eea;
            color: white;
        }
        
        .result-count {
            margin-top: 15px;
            text-align: center;
            font-weight: 600;
            color: #667eea;
        }
        
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 25px;
        }
        
        .image-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            transition: all 0.3s;
        }
        
        .image-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 30px rgba(0,0,0,0.3);
        }
        
        .image-card.hidden {
            display: none;
        }
        
        .img-wrapper {
            width: 100%;
            height: 250px;
            background: #f0f0f0;
            position: relative;
            overflow: hidden;
        }
        
        .img-wrapper img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s;
        }
        
        .image-card:hover .img-wrapper img {
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
            margin-bottom: 15px;
            word-break: break-all;
        }
        
        .size {
            font-size: 12px;
            color: #666;
            margin-bottom: 15px;
        }
        
        .view-btn {
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
        
        .view-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.5);
        }
        
        @media (max-width: 768px) {
            .gallery {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>ANSA Image Gallery</h1>
            <div class="stats">
                ${images.length} total images | ${originals.length} originals (excluding thumbnails)
            </div>
        </div>
        
        <div class="filter-controls">
            <input type="text" id="searchBox" placeholder="Search by filename or path...">
            <div class="filter-buttons">
                <button class="filter-btn active" onclick="filterView('all')">All Images (${images.length})</button>
                <button class="filter-btn" onclick="filterView('originals')">Originals Only (${originals.length})</button>
            </div>
            <div class="result-count" id="resultCount">${images.length} images showing</div>
        </div>
        
        <div class="gallery" id="gallery">
${images.map((img, i) => {
    const isOriginal = originals.some(o => o.webPath === img.webPath);
    const sizeKB = (img.size / 1024).toFixed(1);
    return `            <div class="image-card" data-search="${img.fileName.toLowerCase()} ${img.webPath.toLowerCase()}" data-type="${isOriginal ? 'original' : 'thumbnail'}">
                <a href="${img.webPath}" target="_blank">
                    <div class="img-wrapper">
                        <img src="${img.webPath}" alt="${img.fileName}" loading="lazy">
                    </div>
                </a>
                <div class="info">
                    <div class="filename">${img.fileName}</div>
                    <div class="path">${img.webPath}</div>
                    <div class="size">${sizeKB} KB</div>
                    <a href="${img.webPath}" target="_blank" class="view-btn">Open Full Resolution</a>
                </div>
            </div>`;
}).join('\n')}
        </div>
    </div>
    
    <script>
        let currentFilter = 'all';
        
        function filterView(type) {
            currentFilter = type;
            const cards = document.querySelectorAll('.image-card');
            const buttons = document.querySelectorAll('.filter-btn');
            const searchBox = document.getElementById('searchBox');
            
            // Update button states
            buttons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            
            // Clear search
            searchBox.value = '';
            
            // Filter cards
            let visible = 0;
            cards.forEach(card => {
                const cardType = card.getAttribute('data-type');
                if (type === 'all' || (type === 'originals' && cardType === 'original')) {
                    card.classList.remove('hidden');
                    visible++;
                } else {
                    card.classList.add('hidden');
                }
            });
            
            updateCount(visible);
        }
        
        document.getElementById('searchBox').addEventListener('input', function(e) {
            const search = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.image-card');
            let visible = 0;
            
            cards.forEach(card => {
                const searchData = card.getAttribute('data-search');
                const cardType = card.getAttribute('data-type');
                const matchesFilter = currentFilter === 'all' || (currentFilter === 'originals' && cardType === 'original');
                const matchesSearch = search === '' || searchData.includes(search);
                
                if (matchesFilter && matchesSearch) {
                    card.classList.remove('hidden');
                    visible++;
                } else {
                    card.classList.add('hidden');
                }
            });
            
            updateCount(visible);
        });
        
        function updateCount(count) {
            document.getElementById('resultCount').textContent = count + ' images showing';
        }
    </script>
</body>
</html>`;

fs.writeFileSync(outputPath, html);

console.log(`✓ Generated: ${outputPath}`);
console.log(`\nOpen in browser:`);
console.log(`  http://localhost:4545/static-gallery.html`);
console.log(`\nOr directly:`);
console.log(`  file:///${outputPath.replace(/\\/g, '/')}`);



