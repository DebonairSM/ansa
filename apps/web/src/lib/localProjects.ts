import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Map project slugs between languages
const slugMap: Record<string, { pt: string; en: string }> = {
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
  'artistic-association': { pt: 'associacao-artistica', en: 'artistic-association' },
  'projeto-papai-noel': { pt: 'projeto-papai-noel', en: 'santa-claus-project' },
  'santa-claus-project': { pt: 'projeto-papai-noel', en: 'santa-claus-project' },
  'pastoral-da-crianca': { pt: 'pastoral-da-crianca', en: 'pastoral-da-crianca' },
  'banco-de-leite': { pt: 'banco-de-leite', en: 'milk-bank' },
  'milk-bank': { pt: 'banco-de-leite', en: 'milk-bank' },
  'escola-filhos-misericordia': { pt: 'escola-filhos-misericordia', en: 'mercy-children-school' },
  'mercy-children-school': { pt: 'escola-filhos-misericordia', en: 'mercy-children-school' },
  'casa-sopa-joanna-angelis': { pt: 'casa-sopa-joanna-angelis', en: 'casa-sopa-joanna-angelis' },
  'comunidade-ilha-maruim': { pt: 'comunidade-ilha-maruim', en: 'comunidade-ilha-maruim' },
  'instituto-pobres-irmas-capuchinhas': { pt: 'instituto-pobres-irmas-capuchinhas', en: 'instituto-pobres-irmas-capuchinhas' },
  'associacao-boa-agua': { pt: 'associacao-boa-agua', en: 'associacao-boa-agua' },
  'sitio-paraiso': { pt: 'sitio-paraiso', en: 'sitio-paraiso' },
  'educacao-infantil-os-pias': { pt: 'educacao-infantil-os-pias', en: 'educacao-infantil-os-pias' },
  'orfanato-santa-rita-cassia': { pt: 'orfanato-santa-rita-cassia', en: 'orfanato-santa-rita-cassia' },
  'sao-jose-foundation': { pt: 'fundacao-sao-jose', en: 'sao-jose-foundation' },
};

function getMappedSlug(slug: string, locale: 'pt' | 'en'): string {
  // First, try to find the slug in the map
  const mapping = slugMap[slug];
  if (mapping) {
    return mapping[locale];
  }
  // If not found, return the original slug
  return slug;
}

export function getProjects(locale: 'pt' | 'en') {
  const dir = path.join(process.cwd(), 'src/content/projects', locale);
  const files = fs.readdirSync(dir).filter(file => file.endsWith('.md'));
  return files.map((file) => {
    const fileContents = fs.readFileSync(path.join(dir, file), 'utf-8');
    const { data, content } = matter(fileContents);
    return { ...data, content };
  });
}

export function getAllProjectSlugs(locale: 'pt' | 'en'): string[] {
  const projects = getProjects(locale);
  const slugs = new Set<string>();
  
  projects.forEach((project: any) => {
    const slug = project.slug;
    slugs.add(slug);
    
    // Add alternative slugs from the mapping
    Object.entries(slugMap).forEach(([key, mapping]) => {
      if (mapping[locale] === slug) {
        slugs.add(key);
      }
    });
  });
  
  return Array.from(slugs);
}

export function getProjectBySlug(slug: string, locale: 'pt' | 'en') {
  // Try direct lookup first
  let filePath = path.join(process.cwd(), 'src/content/projects', locale, `${slug}.md`);
  if (fs.existsSync(filePath)) {
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContents);
    return { ...data, content };
  }
  
  // If not found, try mapped slug
  const mappedSlug = getMappedSlug(slug, locale);
  if (mappedSlug !== slug) {
    filePath = path.join(process.cwd(), 'src/content/projects', locale, `${mappedSlug}.md`);
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContents);
      return { ...data, content };
    }
  }
  
  return null;
}
