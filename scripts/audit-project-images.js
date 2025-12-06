import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const backupDir = path.join(__dirname, '..', 'backup', 'AnsaBrasilFinal-120125-backup', 'files', 'wp-content', 'uploads');
const projectsDir = path.join(__dirname, '..', 'apps', 'web', 'src', 'content', 'projects');

// Get all original images from backup (excluding thumbnails)
function getAllBackupImages() {
  const images = [];
  
  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        walkDir(fullPath);
      } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(file)) {
        // Exclude WordPress thumbnails (files with dimensions like -150x150)
        if (!/\d+x\d+/.test(file)) {
          const relativePath = fullPath.replace(backupDir, '').replace(/\\/g, '/');
          images.push({
            fullPath,
            relativePath: relativePath.startsWith('/') ? relativePath : '/' + relativePath,
            name: file,
            dir: path.dirname(relativePath).replace(/\\/g, '/')
          });
        }
      }
    }
  }
  
  walkDir(backupDir);
  return images;
}

// Get all images currently referenced in projects
function getCurrentProjectImages() {
  const usedImages = new Set();
  const projects = { pt: [], en: [] };
  
  for (const lang of ['pt', 'en']) {
    const langDir = path.join(projectsDir, lang);
    const files = fs.readdirSync(langDir).filter(f => f.endsWith('.md'));
    
    for (const file of files) {
      const content = fs.readFileSync(path.join(langDir, file), 'utf-8');
      const frontmatter = content.match(/^---\n([\s\S]*?)\n---/);
      
      if (frontmatter) {
        const yaml = frontmatter[1];
        const featuredMatch = yaml.match(/featuredImage:\s*["']?([^"'\n]+)/);
        const galleryMatch = yaml.match(/gallery:\s*\n((?:\s+-[^\n]+\n?)+)/);
        
        if (featuredMatch) {
          usedImages.add(featuredMatch[1].trim());
        }
        
        if (galleryMatch) {
          const galleryItems = galleryMatch[1].match(/-\s*["']?([^"'\n]+)/g);
          if (galleryItems) {
            galleryItems.forEach(item => {
              const imgPath = item.replace(/-\s*["']?/, '').trim();
              usedImages.add(imgPath);
            });
          }
        }
      }
      
      projects[lang].push({
        file,
        slug: file.replace('.md', ''),
        content
      });
    }
  }
  
  return { usedImages, projects };
}

// Map images to projects by filename pattern
function mapImagesToProjects(images, projects) {
  const mapping = {};
  
  // Define patterns for known projects
  const patterns = [
    { pattern: /Lar-Sta-Monica/i, project: 'lar-santa-monica' },
    { pattern: /Pequeno-Assis/i, project: 'lar-pequeno-assis' },
    { pattern: /Paulo-VI/i, project: 'associacao-paulo-vi' },
    { pattern: /PROTEGENDO-A-VIDA/i, project: 'maria-mae-vida-quixada' },
    { pattern: /Mae-da-Vida-Juazeiro/i, project: 'maria-mae-vida-juazeiro' },
    { pattern: /Solar-Menino/i, project: 'solar-menino-luz' },
    { pattern: /^APAE/i, project: 'caminho-de-luz-apae' },
    { pattern: /^Lab/i, project: 'centro-educacao-joao-manoel' },
    { pattern: /Biblioteca-Rolador/i, project: 'escola-castro-alves' },
    { pattern: /Geleias/i, project: 'menino-jesus-praga' }, // Also pastoral-da-crianca
    { pattern: /Ascopar/i, project: 'serrinha-minha-infancia' },
    { pattern: /Fundacao-Sao-Jose/i, project: 'fundacao-sao-jose' },
    { pattern: /Foto-Ass-Artistica/i, project: 'associacao-artistica' },
    { pattern: /Papai-Noel/i, project: 'projeto-papai-noel' },
  ];
  
  // Map by pattern
  for (const img of images) {
    let mapped = false;
    for (const { pattern, project } of patterns) {
      if (pattern.test(img.name)) {
        if (!mapping[project]) mapping[project] = [];
        mapping[project].push(img.relativePath);
        mapped = true;
        break;
      }
    }
    
    // Map generic images by date folder to nearby projects
    if (!mapped && /^image\d+\.(jpg|jpeg|png)$/i.test(img.name)) {
      const yearMonth = img.dir.match(/(\d{4})\/(\d{2})/);
      if (yearMonth) {
        // Try to find project from same time period
        // This is a fallback - we'll handle this more carefully
        if (!mapping['_generic']) mapping['_generic'] = [];
        mapping['_generic'].push({ path: img.relativePath, date: yearMonth[0] });
      }
    }
  }
  
  return mapping;
}

// Main audit
const allImages = getAllBackupImages();
const { usedImages, projects } = getCurrentProjectImages();
const mapping = mapImagesToProjects(allImages, projects);

console.log(`Total backup images: ${allImages.length}`);
console.log(`Currently used images: ${usedImages.size}`);
console.log(`Unused images: ${allImages.length - usedImages.size}`);
console.log('\nImage mapping by project:');
Object.keys(mapping).forEach(project => {
  const count = Array.isArray(mapping[project]) ? mapping[project].length : mapping[project].length;
  console.log(`  ${project}: ${count} images`);
});

// Save mapping to JSON for reference
fs.writeFileSync(
  path.join(__dirname, 'image-mapping.json'),
  JSON.stringify({ mapping, allImages: allImages.map(i => i.relativePath), usedImages: Array.from(usedImages) }, null, 2)
);

console.log('\nAudit complete. Results saved to scripts/image-mapping.json');

