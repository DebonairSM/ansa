import type { Metadata } from 'next';
import { getCategories } from '@/lib/localCategories';

export const metadata: Metadata = {
  title: 'Categories - ANSA Brasil',
  description: 'Browse content categories from ANSA Brasil to explore our projects, news, and initiatives.',
};

export default function CategoriesEn() {
  const categories = getCategories('en');
  return (
    <div className="container-custom py-12">
      <h1 className="text-4xl font-bold mb-8">Categories</h1>
      <ul className="list-disc ml-6">
        {categories.map((cat: any) => (
          <li key={cat.slug} className="mb-2">
            {cat.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
