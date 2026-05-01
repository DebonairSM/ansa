import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import DonateLink from '@/components/DonateLink';
import { getTeamMembers } from '@/lib/localTeam';
import TeamGrid from '@/components/TeamGrid';

export const metadata: Metadata = {
  title: 'Quem Somos - ANSA Brasil',
  description: 'Conheça a equipe de voluntários da ANSA Brasil que trabalha para ajudar crianças e mulheres carentes no Brasil.',
};

export default function AboutPt() {
  const teamMembers = getTeamMembers('pt');
  return (
    <div className="min-h-screen">
      {/* Hero with Group Photo */}
      <section className="bg-gray-900">
        {/* Title */}
        <div className="bg-yellow-500 text-white py-16 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Quem Somos</h1>
            <p className="text-lg md:text-2xl max-w-3xl mx-auto opacity-95">
              A Associação Nossa Senhora Aparecida reúne voluntários na região de Washington, DC, dedicados ao apoio a crianças, mulheres e comunidades carentes no Brasil, por meio de instituições parceiras em todo o país.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <DonateLink
                cta="about-hero"
                className="inline-block bg-white text-yellow-700 hover:bg-yellow-50 font-bold px-8 py-4 rounded-lg transition-colors"
              >
                Fazer uma Doação
              </DonateLink>
            </div>
          </div>
        </div>
        
        {/* Group Photo - Contained width, no cropping */}
        <div className="bg-gray-100 py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <Image
              src="/uploads/2020/11/Ansa-Volunteers.jpg"
              alt="Voluntários da ANSA"
              width={1920}
              height={1080}
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Intro & Stats Combined Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Nossa Missão</h2>
              <div className="space-y-5 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  A <strong className="text-gray-900">Associação Nossa Senhora Aparecida (ANSA)</strong> é uma associação criada em 1982, 
                  mantida por meio de doações e trabalho voluntário, com custo administrativo zero.
                </p>
                <p className="text-lg">
                  A ANSA auxilia crianças e mulheres brasileiras carentes por meio de instituições como 
                  creches, orfanatos, escolas e grupos comunitários.
                </p>
                <p className="text-lg">
                  Todos os membros da ANSA, sem exceção, são voluntários que generosamente colaboram nesta missão.
                </p>
              </div>
            </div>
            
            <div className="bg-yellow-500 rounded-2xl p-8 md:p-10 shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Nosso Impacto</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <p className="text-5xl md:text-6xl font-bold text-white mb-2">43+</p>
                  <p className="text-white/90 text-sm md:text-base">Anos de Missão</p>
                </div>
                <div className="text-center">
                  <p className="text-5xl md:text-6xl font-bold text-white mb-2">300+</p>
                  <p className="text-white/90 text-sm md:text-base">Famílias/Ano</p>
                </div>
                <div className="text-center">
                  <p className="text-5xl md:text-6xl font-bold text-white mb-2">24</p>
                  <p className="text-white/90 text-sm md:text-base">Projetos</p>
                </div>
                <div className="text-center">
                  <p className="text-5xl md:text-6xl font-bold text-white mb-2">0</p>
                  <p className="text-white/90 text-sm md:text-base">Custos Administrativos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-yellow-500 font-semibold text-sm uppercase tracking-wider">Conheça a Equipe</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Nossa Equipe</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Voluntários dedicados que tornam nossa missão possível
            </p>
          </div>
          
          <TeamGrid members={teamMembers} />
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl font-serif italic mb-6">
            "Tudo que fazemos é uma gota d'água no oceano, mas se não o fizermos essa gota se perderá para sempre."
          </blockquote>
          <p className="text-lg">-Madre Teresa de Calcuta</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-yellow-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Quer fazer parte da nossa equipe?</h2>
          <p className="text-xl text-gray-700 mb-8">
            Estamos sempre em busca de voluntários dedicados que compartilham nossa paixão por ajudar o Brasil.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pt/contact"
              className="inline-block bg-white text-yellow-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg transition-colors border-2 border-yellow-500"
            >
              Entre em Contato
            </Link>
            <DonateLink
              cta="about-final"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-8 py-4 rounded-lg transition-colors"
            >
              Fazer uma Doação
            </DonateLink>
          </div>
        </div>
      </section>
    </div>
  );
}
