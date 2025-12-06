import { getProjects } from '@/lib/localProjects';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projetos - ANSA Brasil',
  description: 'Conheça os projetos apoiados pela ANSA Brasil que transformam vidas de crianças e famílias carentes.',
};

export default function ProjectsPt() {
  const projects = getProjects('pt');
  
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-yellow-500 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Nossos Projetos</h1>
          <p className="text-2xl">Conheça as iniciativas que transformam vidas e comunidades</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project: any) => (
          <Link
            key={project.slug}
            href={`/pt/projects/${project.slug}`}
            className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
          >
            {project.featuredImage && (
              <div className="relative h-48 w-full">
                <Image
                  src={project.featuredImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <div className="p-6">
              {project.category && (
                <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {project.category}
                </span>
              )}
              <h2 className="text-xl font-bold mb-2 group-hover:text-yellow-600 transition-colors">
                {project.title}
              </h2>
              {project.location && (
                <p className="text-sm text-gray-500 mb-2">📍 {project.location}</p>
              )}
              <p className="text-gray-600 mb-4">{project.description}</p>
              {project.year && (
                <p className="text-sm text-gray-500">Ano: {project.year}</p>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Quer Ajudar?</h2>
        <p className="text-xl text-gray-700 mb-6">
          Sua doação ajuda a manter esses projetos funcionando e impactando vidas.
        </p>
        <Link
          href="https://www.paypal.com/US/fundraiser/charity/2006255"
          target="_blank"
          className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white text-xl font-bold px-10 py-4 rounded-lg transition-colors"
        >
          DOAR AGORA
        </Link>
      </div>
    </div>
    </div>
  );
}
