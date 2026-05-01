import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  image: string;
  order: number;
  bio: string;
};

export function getTeamMembers(locale: 'pt' | 'en'): TeamMember[] {
  const dir = path.join(process.cwd(), 'src/content/team', locale);
  const files = fs.readdirSync(dir).filter((file) => file.endsWith('.md'));
  const members = files.map((file) => {
    const fileContents = fs.readFileSync(path.join(dir, file), 'utf-8');
    const { data, content } = matter(fileContents);
    return {
      slug: data.slug as string,
      name: data.name as string,
      role: data.role as string,
      image: data.image as string,
      order: typeof data.order === 'number' ? data.order : Number.MAX_SAFE_INTEGER,
      bio: content.trim(),
    } satisfies TeamMember;
  });
  return members.sort((a, b) => a.order - b.order);
}
