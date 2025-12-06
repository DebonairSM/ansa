import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quem Somos - ANSA Brasil',
  description: 'Conheça a equipe de voluntários da ANSA Brasil que trabalha para ajudar crianças e mulheres carentes no Brasil.',
};

const teamMembers = [
  {
    name: 'Neusa Maria Medeiros',
    role: 'Presidente',
    image: '/uploads/2021/02/neusapic1.png',
    bio: 'Neusa Maria Medeiros é a presidente da ANSA e trabalha apaixonadamente e não poupa esforços para ajudar o Brasil através da ANSA, um sonho tornado realidade. Ela prioriza transparência, honestidade e serviço. Nascida em Belém do Pará, filha única de pais cearenses, na infância morou no Rio de Janeiro e Fortaleza. Neusa obteve seu diploma de Bacharel em Minas, Brasília e Paraíba. No Mississippi, graduou-se com mestrado e depois doutorado em Washington, DC. Com tantas coisas para estudar e lugares para explorar, ela aprendeu que a vida faz sentido quando o conhecimento é usado para o bem-estar dos outros.',
  },
  {
    name: 'Pe. Charles Hergenroeder',
    role: 'Diretor Espiritual',
    image: '/uploads/2021/02/pecharles.png',
    bio: 'Pe. Charles Hergenroeder nasceu em Baltimore, MD, EUA em 9 de outubro de 1947. Foi ordenado pelo Cardeal Terence Cook em junho de 1973 e foi para o Brasil em 14 de setembro de 1974. Passou vários anos no interior do Mato Grosso do Sul, depois no Paraná. Após 31 anos no Brasil, retornou aos EUA em 2005. Durante este tempo, conheceu o trabalho da Comunidade ANSA e foi convidado a acompanhar este trabalho missionário como Diretor Espiritual.',
  },
  {
    name: 'Nilma Araújo',
    role: 'Tesoureira',
    image: '/uploads/2020/11/Nilma-1.jpg',
    bio: 'Nilma Araújo nasceu em Londrina, PR, Brasil. Trabalhou na International Finance Corporation em Washington, DC por 25 anos como Assistente Sênior. Quando uma amiga a apresentou à ANSA em 2017, ela se apaixonou pelo trabalho. A ANSA tem um grupo entusiasmado e dedicado de voluntários com a missão de ajudar os menos afortunados no Brasil, focando em crianças e mulheres de baixa renda.',
  },
  {
    name: 'Marilza Piana Iriarte',
    role: 'Secretária',
    image: '/uploads/2021/02/Marilza-Ansa-foto-2-2-980x1067.jpg',
    bio: 'Marilza Piana Iriarte nasceu em Ibiam/Tangará, SC, Brasil. É voluntária e membro do conselho da ANSA desde 2014. Marilza acredita que cada pessoa pode fazer a diferença, não importa quão pequena seja sua contribuição, pois ajuda a proporcionar um mundo melhor para os outros. "Toda vez que vejo os resultados dos projetos, nessas áreas mais carentes do meu país, tenho orgulho de fazer parte deste grupo e isso me dá coragem para continuar participando."',
  },
  {
    name: 'Fátima Moghrabi',
    role: 'Voluntária',
    image: '/uploads/2021/02/Fatima-2-1-980x925.jpg',
    bio: 'Fátima nasceu no Rio de Janeiro e vive na região de Washington DC. "Sou Fátima Moghrabi e todo o trabalho social que faço é significativo para mim, mas a ANSA ocupa um lugar especial no meu coração. Sinto uma conexão especial não apenas com as pessoas com quem trabalho, mas também com as comunidades que ajudamos no Brasil. Sinto que tocamos a vida desses jovens dando-lhes a oportunidade de ter um futuro melhor."',
  },
  {
    name: 'Myriam Woods',
    role: 'Voluntária',
    image: '/uploads/2021/02/Myriam-980x757.jpg',
    bio: 'Myriam Quintella Woods nasceu em Ipanema, Rio de Janeiro, Brasil. Mudou-se para os EUA há mais de 30 anos. "Por muitos anos, procurei uma forma de apoiar uma organização sem fins lucrativos que beneficiasse mulheres e crianças no Brasil que precisam. Há três anos, quando me mudei para VA, conheci a ANSA e a cada dia fico mais feliz por fazer parte deste grupo."',
  },
  {
    name: 'Tania Burns',
    role: 'Voluntária',
    image: '/uploads/2021/02/Tania-2-1.jpg',
    bio: 'Tania Burns nasceu nos EUA, mas desenvolveu uma afinidade pelo povo brasileiro e sua cultura após uma viagem de três anos ao Rio de Janeiro com seu marido. Juntou-se à ANSA em 2014 após uma viagem ao Brasil onde sua família passou um dia ensinando beisebol às meninas do Orfanato Santa Rita de Cássia em Jacarepaguá. É formada em Engenharia Mecânica e tem MBA.',
  },
  {
    name: 'Teresinha Garcia',
    role: 'Voluntária',
    image: '/uploads/2021/02/Teresinha.pic1_-1.jpg',
    bio: 'Teresinha nasceu em Muçum, cresceu em São Leopoldo, Rio Grande do Sul, Brasil e mora em Arlington, VA há mais de 30 anos. "Estou muito feliz em poder contribuir para a missão da ANSA de proporcionar um futuro melhor para crianças e mulheres no meu país."',
  },
  {
    name: 'Ines Ulsh',
    role: 'Voluntária',
    image: '/uploads/2021/02/Ines-2-1.jpg',
    bio: 'Ines nasceu na Bahia, cresceu no Rio de Janeiro, Brasil e mora em Falls Church, VA há muitos anos. "Com o espírito de generosidade e ajuda ao próximo, estamos gradualmente ajudando as crianças e mulheres do nosso Brasil."',
  },
];

export default function AboutPt() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-yellow-500 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Quem Somos</h1>
          <p className="text-2xl">Somos um grupo de voluntários na região de Washington, DC, apaixonados pelo Brasil</p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            A <strong>Associação Nossa Senhora Aparecida (ANSA)</strong> é uma associação criada em 1982, 
            mantida por meio de doações e trabalho voluntário, com custo administrativo zero.
          </p>
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            A ANSA auxilia crianças e mulheres brasileiras carentes por meio de instituições como 
            creches, orfanatos, escolas e grupos comunitários.
          </p>
          <p className="text-xl text-gray-700 leading-relaxed">
            Todos os membros da ANSA, sem exceção, são voluntários que generosamente colaboram nesta missão.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 bg-yellow-500 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold mb-2">43+</p>
              <p className="text-lg">Anos de Missão</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">300+</p>
              <p className="text-lg">Famílias/Ano</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">24</p>
              <p className="text-lg">Projetos</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">0</p>
              <p className="text-lg">Custos Administrativos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Nossa Equipe</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-64 w-full bg-gray-200">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-yellow-600 font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Group Photo */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative h-96 w-full mb-8">
            <Image
              src="/uploads/2020/11/Ansa-Volunteers.jpg"
              alt="Voluntários da ANSA"
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover rounded-lg shadow-xl"
            />
          </div>
          <p className="text-xl text-gray-700">
            Juntos, fazemos a diferença na vida de centenas de famílias brasileiras todos os anos.
          </p>
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
            <Link
              href="https://www.paypal.com/US/fundraiser/charity/2006255"
              target="_blank"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-8 py-4 rounded-lg transition-colors"
            >
              Fazer uma Doação
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
