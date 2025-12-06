const fs = require('fs');
const path = require('path');

// Function to recursively find all image files
function findImages(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findImages(filePath, fileList);
    } else if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Find all images
const uploadsDir = path.join(__dirname, 'apps', 'web', 'public', 'uploads');
const images = findImages(uploadsDir);

console.log(`Found ${images.length} images`);

// Filter to get only the original/largest versions (not thumbnails)
const originalImages = images.filter(img => {
  const basename = path.basename(img);
  // Skip obvious thumbnails (150x150, 300x, etc.) and keep originals
  return !/\-\d+x\d+\.(jpg|jpeg|png|gif|webp)$/i.test(basename);
});

console.log(`Found ${originalImages.length} original images (excluding thumbnails)`);

// Generate HTML
const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ANSA Site Images Gallery</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            padding: 20px;
        }
        
        h1 {
            text-align: center;
            margin-bottom: 30px;
            color: #333;
        }
        
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            max-width: 1400px;
            margin: 0 auto;
        }
        
        .image-card {
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transition: transform 0.2s;
        }
        
        .image-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        }
        
        .image-card img {
            width: 100%;
            height: 250px;
            object-fit: cover;
            cursor: pointer;
        }
        
        .image-info {
            padding: 15px;
        }
        
        .image-name {
            font-size: 14px;
            color: #666;
            margin-bottom: 5px;
            word-break: break-all;
        }
        
        .image-path {
            font-size: 11px;
            color: #999;
            word-break: break-all;
        }
        
        .view-full {
            display: inline-block;
            margin-top: 10px;
            padding: 8px 16px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-size: 13px;
        }
        
        .view-full:hover {
            background-color: #0056b3;
        }
        
        .stats {
            text-align: center;
            margin-bottom: 20px;
            color: #666;
        }
    </style>
</head>
<body>
    <h1>ANSA Site Images</h1>
    <div class="stats">
        <p>Total images: ${images.length} | Original images (excluding thumbnails): ${originalImages.length}</p>
    </div>
    
    <div class="gallery">
${images.map(imgPath => {
    const relativePath = path.relative(path.join(__dirname, 'apps', 'web', 'public'), imgPath).replace(/\\/g, '/');
    const fileName = path.basename(imgPath);
    const webPath = '/' + relativePath;
    
    return `        <div class="image-card">
            <a href="${webPath}" target="_blank">
                <img src="${webPath}" alt="${fileName}" loading="lazy">
            </a>
            <div class="image-info">
                <div class="image-name"><strong>${fileName}</strong></div>
                <div class="image-path">${relativePath}</div>
                <a href="${webPath}" target="_blank" class="view-full">View Full Resolution</a>
            </div>
        </div>`;
}).join('\n')}
    </div>
</body>
</html>`;

// Write HTML file
fs.writeFileSync(path.join(__dirname, 'image-gallery.html'), html);
console.log('Generated image-gallery.html');





