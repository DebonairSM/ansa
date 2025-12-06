import { notFound } from 'next/navigation';
import { getPageBySlug, getPages } from '@/lib/localContent';
import RichText from '@/components/RichText';
import type { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const pages = getPages('en');
  return pages.map((page: any) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getPageBySlug(params.slug, 'en');
  
  if (!page) {
    return {
      title: 'Page not found',
    };
  }
  
  return {
    title: (page as any).title || 'ANSA Brasil',
    description: page.content?.substring(0, 160),
    openGraph: {
      title: (page as any).title || 'ANSA Brasil',
      description: page.content?.substring(0, 160),
      type: 'website',
      locale: 'en_US',
    },
  };
}

export default function PageDetail({ params }: Props) {
  const page = getPageBySlug(params.slug, 'en');
  
  if (!page) {
    notFound();
  }
  
  const { content } = page;
  const title = (page as any).title;
  return (
    <article className="container-custom py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">{title}</h1>
      {content && <RichText content={content} />}
    </article>
  );
}
