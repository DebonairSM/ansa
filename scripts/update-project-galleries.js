import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectsDir = path.join(__dirname, '..', 'apps', 'web', 'src', 'content', 'projects');
const mappingFile = path.join(__dirname, 'image-mapping.json');

// Load the image mapping
const mappingData = JSON.parse(fs.readFileSync(mappingFile, 'utf-8'));
const mapping = mappingData.mapping;

// Build project image map from mapping data
const projectImageMap = {};

// Helper to add /uploads prefix if missing
function addUploadsPrefix(path) {
  if (typeof path === 'object' && path.path) {
    path = path.path;
  }
  if (path.startsWith('/uploads/')) return path;
  if (path.startsWith('/')) return '/uploads' + path;
  return '/uploads/' + path;
}

// Process mapped images
for (const [projectKey, images] of Object.entries(mapping)) {
  if (projectKey === '_generic') continue;
  
  projectImageMap[projectKey] = (images || []).map(addUploadsPrefix);
}

// Add additional images based on date/context
// Lar Santa Monica - add images from 2019/01 folder
if (projectImageMap['lar-santa-monica']) {
  projectImageMap['lar-santa-monica'].push(
    '/uploads/2019/01/image46.png',
    '/uploads/2019/01/image47.png',
    '/uploads/2019/01/image48.jpg',
    '/uploads/2019/01/image49.jpg',
    '/uploads/2019/01/image50.jpg'
  );
}

// Maria Mae da Vida Juazeiro - add PHOTO series from 2021/04
if (projectImageMap['maria-mae-vida-juazeiro']) {
  projectImageMap['maria-mae-vida-juazeiro'].push(
    '/uploads/2021/04/PHOTO-2021-04-01-11-29-55.jpg',
    '/uploads/2021/04/PHOTO-2021-04-01-11-29-55-1.jpg',
    '/uploads/2021/04/PHOTO-2021-04-01-11-29-55-2.jpg',
    '/uploads/2021/04/PHOTO-2021-04-01-11-29-55-3.jpg',
    '/uploads/2021/04/PHOTO-2021-04-01-11-29-55-4.jpg',
    '/uploads/2021/04/PHOTO-2021-04-01-11-29-55-5.jpg',
    '/uploads/2021/04/PHOTO-2021-04-01-11-29-55-7.jpg',
    '/uploads/2021/04/PHOTO-2021-04-01-11-34-59-1.jpg',
    '/uploads/2021/04/PHOTO-2021-04-01-11-40-50.jpg',
    '/uploads/2021/04/PHOTO-2021-04-01-11-40-50-1.jpg',
    '/uploads/2021/04/Juazeiro-5.jpg',
    '/uploads/2021/04/Juazeiro-5-1.jpg'
  );
}

// Caminho de Luz APAE - add image12.png
if (projectImageMap['caminho-de-luz-apae']) {
  projectImageMap['caminho-de-luz-apae'].push('/uploads/2017/04/image12.png');
}

// Centro Educacao - add generic images from 2016/11
if (projectImageMap['centro-educacao-joao-manoel']) {
  projectImageMap['centro-educacao-joao-manoel'].push(
    '/uploads/2016/11/image15.jpg',
    '/uploads/2016/11/image16.jpg'
  );
}

// Escola Castro Alves - add generic images from 2016/02
if (projectImageMap['escola-castro-alves']) {
  projectImageMap['escola-castro-alves'].push(
    '/uploads/2016/02/image17.jpg',
    '/uploads/2016/02/image18.jpg'
  );
}

// Projects that don't have pattern-based mapping but have known images
projectImageMap['banco-de-leite'] = [
  '/uploads/2015/12/image19.png',
  '/uploads/2017/04/image13.png',
  '/uploads/2017/04/image14.png'
];

projectImageMap['escola-filhos-misericordia'] = [
  '/uploads/2015/12/image1.jpg',
  '/uploads/2015/12/image3.jpg',
  '/uploads/2015/12/image4.jpg'
];

projectImageMap['casa-sopa-joanna-angelis'] = [
  '/uploads/2017/12/image24.jpg',
  '/uploads/2017/12/image25.jpg',
  '/uploads/2017/12/image26.jpg',
  '/uploads/2017/12/image27.jpg',
  '/uploads/2017/12/image28.jpg',
  '/uploads/2017/12/image29.jpg'
];

projectImageMap['comunidade-ilha-maruim'] = [
  '/uploads/2018/02/image22.jpg',
  '/uploads/2018/02/image23.jpg'
];

projectImageMap['instituto-pobres-irmas-capuchinhas'] = [
  '/uploads/2018/02/image22.jpg',
  '/uploads/2018/02/image23.jpg',
  '/uploads/2018/04/image21.jpg',
  '/uploads/2018/04/image53.jpg'
];

projectImageMap['associacao-boa-agua'] = [
  '/uploads/2015/08/image8.jpg',
  '/uploads/2015/08/image9.jpg',
  '/uploads/2015/08/image10.jpg',
  '/uploads/2015/08/image5.jpg',
  '/uploads/2015/08/image6.jpg'
];

projectImageMap['sitio-paraiso'] = [
  '/uploads/2015/08/image7.jpg',
  '/uploads/2015/08/image5.jpg',
  '/uploads/2015/08/image6.jpg',
  '/uploads/2015/08/image39.jpg',
  '/uploads/2015/08/image40.jpg'
];

projectImageMap['educacao-infantil-os-pias'] = [
  '/uploads/2015/12/image1.jpg',
  '/uploads/2015/12/image2.png',
  '/uploads/2015/12/image3.jpg'
];

projectImageMap['orfanato-santa-rita-cassia'] = [
  '/uploads/2015/12/image4.jpg',
  '/uploads/2015/12/image1.jpg',
  '/uploads/2015/12/image3.jpg'
];

// Pastoral da Crianca shares Geleias images with menino-jesus-praga
projectImageMap['pastoral-da-crianca'] = projectImageMap['menino-jesus-praga'] || [];

// Normalize image paths (ensure they start with /uploads/)
function normalizePath(imgPath) {
  if (typeof imgPath === 'object' && imgPath.path) {
    imgPath = imgPath.path;
  }
  if (!imgPath.startsWith('/uploads/')) {
    return '/uploads' + (imgPath.startsWith('/') ? '' : '/') + imgPath;
  }
  return imgPath;
}

// Remove duplicates and sort
function dedupeAndSort(images) {
  const seen = new Set();
  const result = [];
  for (const img of images) {
    const normalized = normalizePath(img);
    if (!seen.has(normalized)) {
      seen.add(normalized);
      result.push(normalized);
    }
  }
  return result.sort();
}

// Update a project file
function updateProjectFile(lang, filename, images) {
  const filePath = path.join(projectsDir, lang, filename);
  if (!fs.existsSync(filePath)) {
    console.log(`  ⚠️  File not found: ${filePath}`);
    return false;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const { data, content: body } = matter(content);

  // Update gallery
  const uniqueImages = dedupeAndSort(images);
  data.gallery = uniqueImages;

  // Update featuredImage if not set or if first gallery image is better
  if (!data.featuredImage || !uniqueImages.includes(data.featuredImage)) {
    data.featuredImage = uniqueImages[0] || data.featuredImage;
  }

  // Write back
  const newContent = matter.stringify(body, data, {
    lineWidth: 1000,
    forceQuotes: false,
  });

  fs.writeFileSync(filePath, newContent, 'utf-8');
  return true;
}

// Map project slugs between languages
const slugMap = {
  'lar-santa-monica': { pt: 'lar-santa-monica', en: 'lar-santa-monica' },
  'lar-pequeno-assis': { pt: 'lar-pequeno-assis', en: 'lar-pequeno-assis' },
  'associacao-paulo-vi': { pt: 'associacao-paulo-vi', en: 'associacao-paulo-vi' },
  'maria-mae-vida-quixada': { pt: 'maria-mae-vida-quixada', en: 'maria-mae-vida-quixada' },
  'maria-mae-vida-juazeiro': { pt: 'maria-mae-vida-juazeiro', en: 'maria-mae-vida-juazeiro' },
  'solar-menino-luz': { pt: 'solar-menino-luz', en: 'solar-menino-luz' },
  'caminho-de-luz-apae': { pt: 'caminho-de-luz-apae', en: 'caminho-de-luz-apae' },
  'centro-educacao-joao-manoel': { pt: 'centro-educacao-joao-manoel', en: 'centro-educacao-joao-manoel' },
  'escola-castro-alves': { pt: 'escola-castro-alves', en: 'escola-castro-alves' },
  'menino-jesus-praga': { pt: 'menino-jesus-praga', en: 'menino-jesus-praga' },
  'serrinha-minha-infancia': { pt: 'serrinha-minha-infancia', en: 'serrinha-minha-infancia' },
  'fundacao-sao-jose': { pt: 'fundacao-sao-jose', en: 'sao-jose-foundation' },
  'associacao-artistica': { pt: 'associacao-artistica', en: 'artistic-association' },
  'projeto-papai-noel': { pt: 'projeto-papai-noel', en: 'santa-claus-project' },
  'pastoral-da-crianca': { pt: 'pastoral-da-crianca', en: 'pastoral-da-crianca' },
  'banco-de-leite': { pt: 'banco-de-leite', en: 'milk-bank' },
  'escola-filhos-misericordia': { pt: 'escola-filhos-misericordia', en: 'mercy-children-school' },
  'casa-sopa-joanna-angelis': { pt: 'casa-sopa-joanna-angelis', en: 'casa-sopa-joanna-angelis' },
  'comunidade-ilha-maruim': { pt: 'comunidade-ilha-maruim', en: 'comunidade-ilha-maruim' },
  'instituto-pobres-irmas-capuchinhas': { pt: 'instituto-pobres-irmas-capuchinhas', en: 'instituto-pobres-irmas-capuchinhas' },
  'associacao-boa-agua': { pt: 'associacao-boa-agua', en: 'associacao-boa-agua' },
  'sitio-paraiso': { pt: 'sitio-paraiso', en: 'sitio-paraiso' },
  'educacao-infantil-os-pias': { pt: 'educacao-infantil-os-pias', en: 'educacao-infantil-os-pias' },
  'orfanato-santa-rita-cassia': { pt: 'orfanato-santa-rita-cassia', en: 'orfanato-santa-rita-cassia' },
};

// Main update process
console.log('Updating project galleries...\n');

let updated = 0;
let skipped = 0;

for (const [projectKey, images] of Object.entries(projectImageMap)) {
  if (!images || images.length === 0) continue;

  const slugs = slugMap[projectKey];
  if (!slugs) {
    console.log(`⚠️  No slug mapping for: ${projectKey}`);
    continue;
  }

  const normalizedImages = dedupeAndSort(images);

  // Update PT version
  const ptFile = `${slugs.pt}.md`;
  if (updateProjectFile('pt', ptFile, normalizedImages)) {
    console.log(`✓ PT: ${ptFile} (${normalizedImages.length} images)`);
    updated++;
  } else {
    skipped++;
  }

  // Update EN version
  const enFile = `${slugs.en}.md`;
  if (updateProjectFile('en', enFile, normalizedImages)) {
    console.log(`✓ EN: ${enFile} (${normalizedImages.length} images)`);
    updated++;
  } else {
    skipped++;
  }
}

console.log(`\n✅ Updated ${updated} files, skipped ${skipped} files`);

