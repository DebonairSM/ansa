const fs = require('fs');
const path = require('path');

console.log('=' .repeat(60));
console.log('ANSA Image Scanner');
console.log('=' .repeat(60));

// Directory to scan
const uploadsDir = path.join(__dirname, 'apps', 'web', 'public', 'uploads');
const outputJsonPath = path.join(__dirname, 'apps', 'web', 'public', 'image-list.json');
const outputHtmlPath = path.join(__dirname, 'image-gallery-complete.html');

console.log(`\nScanning directory: ${uploadsDir}`);
console.log(`Checking if directory exists...`);

if (!fs.existsSync(uploadsDir)) {
    console.error(`ERROR: Directory does not exist: ${uploadsDir}`);
    console.log('\nPlease make sure the uploads directory is in the correct location.');
    process.exit(1);
}

console.log('Directory exists! Starting scan...\n');

// Recursively find all image files
function findImagesRecursive(dir, baseDir = dir) {
    let results = [];
    
    try {
        const items = fs.readdirSync(dir);
        
        for (const item of items) {
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                // Recurse into subdirectory
                results = results.concat(findImagesRecursive(fullPath, baseDir));
            } else if (/\.(jpg|jpeg|png|gif|webp|svg|bmp)$/i.test(item)) {
                // Convert to web path
                const relativePath = path.relative(path.join(__dirname, 'apps', 'web', 'public'), fullPath);
                const webPath = '/' + relativePath.replace(/\\/g, '/');
                results.push({
                    path: webPath,
                    fileName: item,
                    fullPath: fullPath,
                    size: stat.size,
                    modified: stat.mtime
                });
            }
        }
    } catch (error) {
        console.error(`Error reading directory ${dir}:`, error.message);
    }
    
    return results;
}

// Find all images
const images = findImagesRecursive(uploadsDir);

console.log(`Found ${images.length} images!\n`);

if (images.length === 0) {
    console.log('No images found. The uploads directory might be empty.');
    process.exit(0);
}

// Show first few images as examples
console.log('First 10 images:');
images.slice(0, 10).forEach((img, index) => {
    console.log(`  ${index + 1}. ${img.fileName} (${(img.size / 1024).toFixed(2)} KB)`);
});

if (images.length > 10) {
    console.log(`  ... and ${images.length - 10} more`);
}

// Save to JSON
const jsonData = {
    generated: new Date().toISOString(),
    totalImages: images.length,
    images: images.map(img => img.path)
};

fs.writeFileSync(outputJsonPath, JSON.stringify(jsonData, null, 2));
console.log(`\nSaved image list to: ${outputJsonPath}`);

// Generate complete HTML gallery
const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ANSA Complete Image Gallery - ${images.length} Images</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            background-color: #f0f0f0;
            padding: 20px;
        }
        
        h1 {
            text-align: center;
            margin-bottom: 10px;
            color: #333;
        }
        
        .stats {
            text-align: center;
            margin-bottom: 30px;
            padding: 15px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 30px;
        }
        
        .stats p {
            color: #666;
            font-size: 14px;
            margin: 5px 0;
        }
        
        .stats .count {
            font-size: 36px;
            font-weight: bold;
            color: #0070f3;
            margin: 10px 0;
        }
        
        .filter-bar {
            max-width: 1600px;
            margin: 0 auto 20px;
            padding: 15px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .filter-bar input {
            width: 100%;
            padding: 10px;
            font-size: 16px;
            border: 2px solid #e0e0e0;
            border-radius: 5px;
            outline: none;
        }
        
        .filter-bar input:focus {
            border-color: #0070f3;
        }
        
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
            max-width: 1600px;
            margin: 0 auto;
        }
        
        .image-card {
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
        }
        
        .image-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }
        
        .image-wrapper {
            position: relative;
            width: 100%;
            height: 220px;
            background: #f5f5f5;
            overflow: hidden;
        }
        
        .image-wrapper img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
        }
        
        .image-card:hover .image-wrapper img {
            transform: scale(1.05);
        }
        
        .image-info {
            padding: 15px;
        }
        
        .image-name {
            font-size: 13px;
            font-weight: 600;
            color: #333;
            margin-bottom: 6px;
            word-break: break-word;
        }
        
        .image-path {
            font-size: 11px;
            color: #999;
            margin-bottom: 12px;
            word-break: break-all;
            line-height: 1.4;
        }
        
        .view-link {
            display: inline-block;
            padding: 8px 16px;
            background-color: #0070f3;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-size: 12px;
            font-weight: 500;
            transition: background-color 0.2s;
        }
        
        .view-link:hover {
            background-color: #0051cc;
        }
        
        .hidden {
            display: none !important;
        }
        
        @media (max-width: 768px) {
            .gallery {
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 15px;
            }
        }
    </style>
</head>
<body>
    <h1>ANSA Complete Image Gallery</h1>
    
    <div class="stats">
        <div class="count">${images.length}</div>
        <p>Total Images</p>
        <p style="font-size: 12px; color: #999; margin-top: 10px;">Generated: ${new Date().toLocaleString()}</p>
    </div>
    
    <div class="filter-bar">
        <input type="text" id="searchBox" placeholder="Search images by filename or path..." 
               oninput="filterImages(this.value)">
    </div>
    
    <div class="gallery" id="gallery">
${images.map(img => `        <div class="image-card" data-search="${img.fileName.toLowerCase()} ${img.path.toLowerCase()}">
            <a href="${img.path}" target="_blank">
                <div class="image-wrapper">
                    <img src="${img.path}" alt="${img.fileName}" loading="lazy">
                </div>
            </a>
            <div class="image-info">
                <div class="image-name">${img.fileName}</div>
                <div class="image-path">${img.path}</div>
                <a href="${img.path}" target="_blank" class="view-link">Open Full Resolution</a>
            </div>
        </div>`).join('\n')}
    </div>
    
    <script>
        function filterImages(searchTerm) {
            const cards = document.querySelectorAll('.image-card');
            const search = searchTerm.toLowerCase();
            
            cards.forEach(card => {
                const searchData = card.getAttribute('data-search');
                if (searchData.includes(search)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        }
    </script>
</body>
</html>`;

fs.writeFileSync(outputHtmlPath, htmlContent);
console.log(`Generated complete HTML gallery: ${outputHtmlPath}`);

console.log('\n' + '=' .repeat(60));
console.log('SUCCESS!');
console.log('=' .repeat(60));
console.log('\nYou can now:');
console.log(`1. Open: ${outputHtmlPath}`);
console.log(`2. Or visit: http://localhost:4545/image-gallery.html (if dev server is running)`);
console.log('\nAll images are linked to their full resolution versions.\n');





