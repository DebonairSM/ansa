const fs = require('fs');
const path = require('path');

// Manually list all images based on what we know
const uploadsDir = 'apps/web/public/uploads';
const outputFile = 'image-gallery.html';

console.log('Starting image gallery generation...');
console.log('Scanning directory:', path.resolve(uploadsDir));

// Function to recursively find all image files
function findImagesRecursive(dir) {
  let results = [];
  
  try {
    if (!fs.existsSync(dir)) {
      console.error('Directory does not exist:', dir);
      return results;
    }
    
    const list = fs.readdirSync(dir);
    
    list.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat && stat.isDirectory()) {
        // Recurse into subdirectory
        results = results.concat(findImagesRecursive(filePath));
      } else {
        // Check if it's an image file
        if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)) {
          results.push(filePath);
        }
      }
    });
  } catch (error) {
    console.error('Error reading directory:', error.message);
  }
  
  return results;
}

// Find all images
const allImages = findImagesRecursive(uploadsDir);
console.log(`Found ${allImages.length} total images`);

// Generate HTML
const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ANSA Image Gallery</title>
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
            color: #666;
            font-size: 14px;
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
        
        @media (max-width: 768px) {
            .gallery {
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 15px;
            }
        }
    </style>
</head>
<body>
    <h1>ANSA Image Gallery</h1>
    <div class="stats">
        <p>${allImages.length} images total</p>
    </div>
    
    <div class="gallery">
${allImages.map(imgPath => {
    // Convert to web path
    const relativePath = path.relative('apps/web/public', imgPath).replace(/\\/g, '/');
    const webPath = '/' + relativePath;
    const fileName = path.basename(imgPath);
    
    return `        <div class="image-card">
            <a href="${webPath}" target="_blank">
                <div class="image-wrapper">
                    <img src="${webPath}" alt="${fileName}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Ctext y=%22.9em%22 font-size=%2220%22%3E❌%3C/text%3E%3C/svg%3E'">
                </div>
            </a>
            <div class="image-info">
                <div class="image-name">${fileName}</div>
                <div class="image-path">${relativePath}</div>
                <a href="${webPath}" target="_blank" class="view-link">Open Full Size</a>
            </div>
        </div>`;
}).join('\n')}
    </div>
    
    <script>
        // Log any image load errors to console
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('error', function() {
                console.error('Failed to load:', this.src);
            });
        });
    </script>
</body>
</html>`;

// Write the HTML file
try {
  fs.writeFileSync(outputFile, htmlContent, 'utf8');
  console.log(`\nSuccessfully created ${outputFile}`);
  console.log(`Open it in a browser to view all ${allImages.length} images`);
} catch (error) {
  console.error('Error writing HTML file:', error.message);
}




