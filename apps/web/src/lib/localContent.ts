import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getPages(locale: 'pt' | 'en') {
  const dir = path.join(process.cwd(), 'src/content/pages', locale);
  const files = fs.readdirSync(dir).filter(file => file.endsWith('.md'));
  return files.map((file) => {
    const fileContents = fs.readFileSync(path.join(dir, file), 'utf-8');
    const { data, content } = matter(fileContents);
    return { ...data, content };
  });
}

export function getPageBySlug(slug: string, locale: 'pt' | 'en') {
  const filePath = path.join(process.cwd(), 'src/content/pages', locale, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContents);
  return { ...data, content };
}
