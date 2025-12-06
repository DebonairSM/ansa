import { notFound } from 'next/navigation';
import { getCategoryBySlug, getCategories } from '@/lib/localCategories';

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const categories = getCategories('pt');
  return categories.map((cat: any) => ({
    slug: cat.slug,
  }));
}

export default function CategoryDetailPt({ params }: Props) {
  const category = getCategoryBySlug(params.slug, 'pt');
  if (!category) return notFound();
  
  const categoryData = category as any;
  return (
    <article className="container-custom py-12">
      <h1 className="text-4xl font-bold mb-8">{categoryData.name}</h1>
      <p className="text-gray-600">Slug: {categoryData.slug}</p>
    </article>
  );
}
