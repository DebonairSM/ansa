import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo';
import { getPages } from '@/lib/localContent';
import { getProjects, getMappedSlug } from '@/lib/localProjects';
import { getCategories } from '@/lib/localCategories';

type Entry = MetadataRoute.Sitemap[number];

// One entry per locale, cross-linked via hreflang alternates.
function bilingual(ptPath: string, enPath: string): Entry[] {
  const languages = {
    'pt-BR': absoluteUrl(ptPath),
    'en-US': absoluteUrl(enPath),
    'x-default': absoluteUrl(ptPath),
  };
  return [
    { url: absoluteUrl(ptPath), alternates: { languages } },
    { url: absoluteUrl(enPath), alternates: { languages } },
  ];
}

function contentSlugs(items: ReturnType<typeof getPages>): Set<string> {
  return new Set(items.map((item) => (item as any).slug).filter(Boolean));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: Entry[] = [];

  // Static routes present in both locales.
  for (const path of ['', '/about', '/contact', '/projects', '/categories', '/rules']) {
    entries.push(...bilingual(`/pt${path}`, `/en${path}`));
  }

  // pt-only routes.
  entries.push({ url: absoluteUrl('/pt/donate') });

  // Markdown pages ((lang)/[slug]) — same slug in both locales when paired.
  const ptPages = contentSlugs(getPages('pt'));
  const enPages = contentSlugs(getPages('en'));
  for (const slug of Array.from(ptPages)) {
    if (enPages.has(slug)) {
      entries.push(...bilingual(`/pt/${slug}`, `/en/${slug}`));
    } else {
      entries.push({ url: absoluteUrl(`/pt/${slug}`) });
    }
  }
  for (const slug of Array.from(enPages)) {
    if (!ptPages.has(slug)) entries.push({ url: absoluteUrl(`/en/${slug}`) });
  }

  // Projects — slugs can differ between locales (see slugMap in localProjects).
  const ptProjects = contentSlugs(getProjects('pt'));
  const enProjects = contentSlugs(getProjects('en'));
  const pairedEnSlugs = new Set<string>();
  for (const slug of Array.from(ptProjects)) {
    const enSlug = getMappedSlug(slug, 'en');
    if (enProjects.has(enSlug)) {
      pairedEnSlugs.add(enSlug);
      entries.push(...bilingual(`/pt/projects/${slug}`, `/en/projects/${enSlug}`));
    } else {
      entries.push({ url: absoluteUrl(`/pt/projects/${slug}`) });
    }
  }
  for (const slug of Array.from(enProjects)) {
    if (!pairedEnSlugs.has(slug)) entries.push({ url: absoluteUrl(`/en/projects/${slug}`) });
  }

  // Categories — same slug in both locales when paired.
  const ptCategories = contentSlugs(getCategories('pt'));
  const enCategories = contentSlugs(getCategories('en'));
  for (const slug of Array.from(ptCategories)) {
    if (enCategories.has(slug)) {
      entries.push(...bilingual(`/pt/categories/${slug}`, `/en/categories/${slug}`));
    } else {
      entries.push({ url: absoluteUrl(`/pt/categories/${slug}`) });
    }
  }
  for (const slug of Array.from(enCategories)) {
    if (!ptCategories.has(slug)) entries.push({ url: absoluteUrl(`/en/categories/${slug}`) });
  }

  return entries;
}
