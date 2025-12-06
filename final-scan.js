#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Paths
const uploadsDir = path.join(__dirname, 'apps', 'web', 'public', 'uploads');
const publicDir = path.join(__dirname, 'apps', 'web', 'public');
const outputHtml = path.join(publicDir, 'image-gallery-final.html');
const outputJson = path.join(publicDir, 'image-list.json');

console.log('='.repeat(70));
console.log('ANSA FINAL IMAGE SCANNER');
console.log('='.repeat(70));
console.log(`\nUploads directory: ${uploadsDir}`);
console.log(`Output HTML: ${outputHtml}`);
console.log(`Output JSON: ${outputJson}\n`);

// Check if directory exists
if (!fs.existsSync(uploadsDir)) {
    console.error('ERROR: Uploads directory not found!');
    console.error(`Looking for: ${uploadsDir}`);
    console.log('\nThe uploads directory does not exist at the expected location.');
    console.log('Please check the path or create the directory.');
    process.exit(1);
}

console.log('✓ Uploads directory found!\n');

// Recursively find all images
function findAllImages(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            findAllImages(filePath, fileList);
        } else if (/\.(jpg|jpeg|png|gif|webp|svg|bmp)$/i.test(file)) {
            const relativePath = path.relative(publicDir, filePath);
            const webPath = '/' + relativePath.replace(/\\/g, '/');
            fileList.push({
                path: webPath,
                fileName: file,
                size: stat.size,
                modified: stat.mtime.toISOString()
            });
        }
    });
    
    return fileList;
}

const images = findAllImages(uploadsDir);

console.log(`Found ${images.length} images!\n`);

if (images.length === 0) {
    console.log('No images found in the uploads directory.');
    console.log('The directory exists but appears to be empty.');
    process.exit(0);
}

// Show sample
console.log('Sample images:');
images.slice(0, 10).forEach((img, i) => {
    const sizeKB = (img.size / 1024).toFixed(1);
    console.log(`  ${i + 1}. ${img.fileName} (${sizeKB} KB)`);
});
if (images.length > 10) {
    console.log(`  ... and ${images.length - 10} more\n`);
}

// Generate JSON
const jsonData = {
    generated: new Date().toISOString(),
    totalImages: images.length,
    images: images.map(img => img.path)
};

fs.writeFileSync(outputJson, JSON.stringify(jsonData, null, 2));
console.log(`✓ Saved JSON: ${outputJson}`);

// Generate final HTML
const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ANSA Images - ${images.length} Total</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            background: #1a202c;
            color: white;
            padding: 20px;
        }
        
        .header {
            text-align: center;
            margin-bottom: 40px;
            padding: 40px 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        }
        
        h1 { font-size: 48px; margin-bottom: 10px; }
        .subtitle { font-size: 18px; opacity: 0.9; }
        
        .search-container {
            max-width: 800px;
            margin: 0 auto 40px;
        }
        
        #searchInput {
            width: 100%;
            padding: 15px 20px;
            font-size: 16px;
            border: none;
            border-radius: 10px;
            background: #2d3748;
            color: white;
            outline: none;
        }
        
        #searchInput::placeholder { color: #a0aec0; }
        #searchInput:focus { background: #374151; }
        
        .stats {
            text-align: center;
            margin-bottom: 30px;
            font-size: 16px;
            color: #a0aec0;
        }
        
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 25px;
            max-width: 1800px;
            margin: 0 auto;
        }
        
        .card {
            background: #2d3748;
            border-radius: 12px;
            overflow: hidden;
            transition: transform 0.3s, box-shadow 0.3s;
            cursor: pointer;
        }
        
        .card:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
        }
        
        .card.hidden { display: none; }
        
        .img-container {
            width: 100%;
            height: 250px;
            background: #1a202c;
            position: relative;
            overflow: hidden;
        }
        
        .img-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s;
        }
        
        .card:hover .img-container img {
            transform: scale(1.1);
        }
        
        .card-body {
            padding: 20px;
        }
        
        .filename {
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 8px;
            color: #e2e8f0;
        }
        
        .filepath {
            font-size: 11px;
            color: #718096;
            margin-bottom: 15px;
            word-break: break-all;
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
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.5);
        }
        
        @media (max-width: 768px) {
            h1 { font-size: 32px; }
            .gallery { grid-template-columns: 1fr; gap: 20px; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>ANSA Image Gallery</h1>
        <div class="subtitle">All ${images.length} images from the site</div>
    </div>
    
    <div class="search-container">
        <input type="text" id="searchInput" placeholder="Search by filename or path...">
    </div>
    
    <div class="stats">
        <span id="visibleCount">${images.length}</span> of ${images.length} images
    </div>
    
    <div class="gallery" id="gallery">
${images.map((img, index) => `        <div class="card" data-search="${img.fileName.toLowerCase()} ${img.path.toLowerCase()}">
            <a href="${img.path}" target="_blank">
                <div class="img-container">
                    <img src="${img.path}" alt="${img.fileName}" loading="lazy">
                </div>
            </a>
            <div class="card-body">
                <div class="filename">${img.fileName}</div>
                <div class="filepath">${img.path}</div>
                <a href="${img.path}" target="_blank" class="btn">Open Full Size</a>
            </div>
        </div>`).join('\n')}
    </div>
    
    <script>
        const searchInput = document.getElementById('searchInput');
        const cards = document.querySelectorAll('.card');
        const visibleCount = document.getElementById('visibleCount');
        
        searchInput.addEventListener('input', function() {
            const search = this.value.toLowerCase().trim();
            let visible = 0;
            
            cards.forEach(card => {
                const searchData = card.getAttribute('data-search');
                if (search === '' || searchData.includes(search)) {
                    card.classList.remove('hidden');
                    visible++;
                } else {
                    card.classList.add('hidden');
                }
            });
            
            visibleCount.textContent = visible;
        });
    </script>
</body>
</html>`;

fs.writeFileSync(outputHtml, html);
console.log(`✓ Generated HTML: ${outputHtml}`);

console.log('\n' + '='.repeat(70));
console.log('SUCCESS!');
console.log('='.repeat(70));
console.log(`\nYou can now open:`);
console.log(`  file:///${outputHtml}`);
console.log(`\nOr if running dev server:`);
console.log(`  http://localhost:4545/image-gallery-final.html`);
console.log('');




