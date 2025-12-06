const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, 'apps', 'web', 'public', 'uploads');
const outputFile = path.join(__dirname, 'apps', 'web', 'public', 'gallery.html');

console.log('Starting gallery generation...');
console.log('Uploads:', uploadsDir);
console.log('Output:', outputFile);

if (!fs.existsSync(uploadsDir)) {
    console.error('ERROR: Uploads directory not found!');
    process.exit(1);
}

function findImages(dir) {
    const images = [];
    
    function walk(currentDir) {
        try {
            const items = fs.readdirSync(currentDir);
            for (const item of items) {
                const fullPath = path.join(currentDir, item);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory()) {
                    walk(fullPath);
                } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(item)) {
                    const relPath = path.relative(path.join(__dirname, 'apps', 'web', 'public'), fullPath);
                    images.push({
                        name: item,
                        path: '/' + relPath.replace(/\\/g, '/'),
                        size: (stat.size / 1024).toFixed(1)
                    });
                }
            }
        } catch (err) {
            console.error('Error reading directory:', err.message);
        }
    }
    
    walk(dir);
    return images;
}

const images = findImages(uploadsDir);
console.log(`\nFound ${images.length} images`);

if (images.length === 0) {
    console.log('No images found!');
    process.exit(1);
}

const originals = images.filter(img => !/-\d+x\d+\.(jpg|jpeg|png|gif)$/i.test(img.name));

const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ANSA Image Gallery - ${images.length} Images</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container { max-width: 1800px; margin: 0 auto; }
        .header {
            background: white;
            padding: 30px;
            border-radius: 15px;
            margin-bottom: 30px;
            text-align: center;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }
        h1 { color: #667eea; font-size: 36px; margin-bottom: 10px; }
        .stats { color: #666; font-size: 16px; }
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
        .filter-btn:hover, .filter-btn.active {
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
        .card.hidden { display: none; }
        .img-box {
            width: 100%;
            height: 250px;
            background: #f5f5f5;
            overflow: hidden;
        }
        .img-box img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s;
        }
        .card:hover .img-box img { transform: scale(1.1); }
        .info { padding: 20px; }
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
                ${images.length} total images | ${originals.length} originals | ${images.length - originals.length} thumbnails
            </div>
        </div>
        <div class="controls">
            <input type="text" id="search" placeholder="Search by filename or path...">
            <div class="filter-buttons">
                <button class="filter-btn active" onclick="setFilter('all')">All Images (${images.length})</button>
                <button class="filter-btn" onclick="setFilter('originals')">Originals Only (${originals.length})</button>
                <button class="filter-btn" onclick="setFilter('thumbnails')">Thumbnails Only (${images.length - originals.length})</button>
            </div>
            <div class="count" id="count">${images.length} images showing</div>
        </div>
        <div class="gallery" id="gallery">
${images.map(img => {
    const isOriginal = originals.some(o => o.path === img.path);
    const type = isOriginal ? 'original' : 'thumbnail';
    return `            <div class="card" data-name="${img.name.toLowerCase()}" data-path="${img.path.toLowerCase()}" data-type="${type}">
                <a href="${img.path}" target="_blank">
                    <div class="img-box">
                        <img src="${img.path}" alt="${img.name}" loading="lazy">
                    </div>
                </a>
                <div class="info">
                    <div class="filename">${img.name}</div>
                    <div class="path">${img.path}</div>
                    <div class="size">${img.size} KB</div>
                    <a href="${img.path}" target="_blank" class="btn">Open Full Resolution</a>
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
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
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
                const matchesFilter = currentFilter === 'all' ||
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

try {
    fs.writeFileSync(outputFile, html, 'utf8');
    console.log(`\n✓ SUCCESS! Gallery generated with ${images.length} images`);
    console.log(`✓ File saved to: ${outputFile}`);
    console.log(`\nOpen in browser: http://localhost:4545/gallery.html`);
} catch (err) {
    console.error('ERROR writing file:', err.message);
    process.exit(1);
}


