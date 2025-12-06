import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import type { Metadata } from 'next';
import { getProjects, getProjectBySlug } from '@/lib/localProjects';
import ProjectGallery from '@/components/ProjectGallery';

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const projects = getProjects('pt');
  return projects.map((project: any) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug(params.slug, 'pt');
  
  if (!project) {
    return {
      title: 'Projeto não encontrado',
    };
  }
  
  const projectData = project as any;
  return {
    title: `${projectData.title} - ANSA Brasil`,
    description: projectData.description || project.content?.substring(0, 160),
    openGraph: {
      title: projectData.title,
      description: projectData.description || project.content?.substring(0, 160),
      images: projectData.featuredImage ? [projectData.featuredImage] : [],
      type: 'article',
      locale: 'pt_BR',
    },
  };
}

export default function ProjectDetailPt({ params }: Props) {
  const project = getProjectBySlug(params.slug, 'pt');
  
  if (!project) {
    notFound();
  }

  const projectData = project as any;

  return (
    <div className="min-h-screen">
      {/* Hero with featured image */}
      <section className="relative bg-gray-900 text-white">
        {projectData.featuredImage && (
          <div className="absolute inset-0">
            <Image
              src={projectData.featuredImage}
              alt={projectData.title}
              fill
              sizes="100vw"
              className="object-cover opacity-40"
            />
          </div>
        )}
        <div className="relative py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            {projectData.category && (
              <span className="inline-block bg-yellow-500 text-white text-sm font-semibold px-4 py-1 rounded-full mb-4">
                {projectData.category}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{projectData.title}</h1>
            <p className="text-xl opacity-90">{projectData.description}</p>
          </div>
        </div>
      </section>

      {/* Project details */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Quick facts */}
          {(projectData.location || projectData.donation || projectData.year) && (
            <div className="bg-yellow-50 rounded-lg p-6 mb-12">
              <h2 className="text-xl font-bold mb-4">Informações do Projeto</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {projectData.location && (
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">Local</p>
                    <p className="text-lg font-semibold">{projectData.location}</p>
                  </div>
                )}
                {projectData.donation && (
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">Doação</p>
                    <p className="text-lg font-semibold text-yellow-600">{projectData.donation}</p>
                  </div>
                )}
                {projectData.year && (
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">Ano</p>
                    <p className="text-lg font-semibold">{projectData.year}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Main content */}
          <article className="prose prose-lg max-w-none">
            {project.content && (
              <ReactMarkdown className="prose prose-lg max-w-none">
                {project.content}
              </ReactMarkdown>
            )}
          </article>

          {/* Photo Gallery */}
          {projectData.gallery && projectData.gallery.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Galeria de Fotos</h2>
              <ProjectGallery images={projectData.gallery} title={projectData.title} />
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row gap-4 justify-between items-center">
            <Link
              href="/pt/projects"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Voltar para Projetos
            </Link>
            <Link
              href="https://www.paypal.com/US/fundraiser/charity/2006255"
              target="_blank"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-8 py-3 rounded-lg transition-colors"
            >
              Apoiar Este Projeto
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
