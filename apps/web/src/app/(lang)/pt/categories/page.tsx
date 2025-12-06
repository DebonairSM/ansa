import { getCategories } from '@/lib/localCategories';

export default function CategoriesPt() {
  const categories = getCategories('pt');
  return (
    <div className="container-custom py-12">
      <h1 className="text-4xl font-bold mb-8">Categorias</h1>
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
