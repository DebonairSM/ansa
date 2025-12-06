import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - ANSA Brasil',
  description: 'Meet the volunteer team of ANSA Brasil working to help underprivileged children and women in Brazil since 1982.',
};

const teamMembers = [
  {
    name: 'Neusa Maria Medeiros',
    role: 'President',
    image: '/uploads/2021/02/neusapic1.png',
    bio: "Neusa Maria Medeiros is ANSA's president and works passionately and spares no effort to help Brazil through ANSA, a dream made real. She prioritizes transparency, honesty and service. Born in Belém do Pará, the only child of cearense parents, she learned that life makes sense when knowledge is used for the welfare of others.",
  },
  {
    name: 'Fr. Charles Hergenroeder',
    role: 'Spiritual Director',
    image: '/uploads/2021/02/pecharles.png',
    bio: 'Fr. Charles Hergenroeder was born in Baltimore, MD, USA. He was ordained in June 1973 and went to Brazil in 1974. After 31 years in Brazil, he returned to the USA in 2005 and was asked to accompany ANSA as Spiritual Director.',
  },
  {
    name: 'Nilma Araújo',
    role: 'Treasurer',
    image: '/uploads/2020/11/Nilma-1.jpg',
    bio: 'Nilma Araújo was born in Londrina, PR, Brazil. She worked at the International Finance Corporation in Washington, DC for 25 years. When a friend introduced her to ANSA in 2017, she fell in love with their work.',
  },
  {
    name: 'Marilza Piana Iriarte',
    role: 'Secretary',
    image: '/uploads/2021/02/Marilza-Ansa-foto-2-2-980x1067.jpg',
    bio: 'Marilza Piana Iriarte was born in Ibiam/Tangará, SC, Brazil. She is a volunteer and board member since 2014. "Every time I see the results of the projects, I\'m proud to be part of this group."',
  },
  {
    name: 'Fátima Moghrabi',
    role: 'Volunteer',
    image: '/uploads/2021/02/Fatima-2-1-980x925.jpg',
    bio: '"ANSA holds a special place in my heart. I feel a special connection with the communities we help in Brazil. We touch these young people\'s lives by giving them an opportunity to have a better future."',
  },
  {
    name: 'Myriam Woods',
    role: 'Volunteer',
    image: '/uploads/2021/02/Myriam-980x757.jpg',
    bio: 'Myriam Quintella Woods was born in Ipanema, Rio de Janeiro. "For many years, I looked for a way to support women and children in Brazil. When I met ANSA, every day I am happier to be part of this group."',
  },
  {
    name: 'Tania Burns',
    role: 'Volunteer',
    image: '/uploads/2021/02/Tania-2-1.jpg',
    bio: "Tania joined ANSA in 2014 after visiting Santa Rita de Cássia Orphanage in Jacarepaguá. She has a BSE in Mechanical Engineering and an MBA. She feels blessed to have found a group dedicated to helping women and children in Brazil.",
  },
  {
    name: 'Teresinha Garcia',
    role: 'Volunteer',
    image: '/uploads/2021/02/Teresinha.pic1_-1.jpg',
    bio: 'Teresinha was born in Muçum, Rio Grande do Sul and lives in Arlington, VA for more than 30 years. "I am very happy to contribute to ANSA\'s mission to provide a better future for children and women in my country."',
  },
  {
    name: 'Ines Ulsh',
    role: 'Volunteer',
    image: '/uploads/2021/02/Ines-2-1.jpg',
    bio: 'Ines was born in Bahia, grew up in Rio de Janeiro and has lived in Falls Church, VA for many years. "With the spirit of generosity, we are gradually helping the children and women of our Brazil."',
  },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-yellow-500 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">About Us</h1>
          <p className="text-2xl">We are a group of volunteers in the Washington, DC region, passionate about Brazil</p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            The <strong>Associação Nossa Senhora Aparecida (ANSA)</strong> is an association created in 1982, 
            maintained through donations and volunteer work, with zero administrative costs.
          </p>
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            ANSA helps Brazilian children and women in need through institutions such as 
            daycare centers, orphanages, schools and community groups.
          </p>
          <p className="text-xl text-gray-700 leading-relaxed">
            All ANSA members, without exception, are volunteers who generously collaborate in this mission.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 bg-yellow-500 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold mb-2">43+</p>
              <p className="text-lg">Years of Mission</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">300+</p>
              <p className="text-lg">Families/Year</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">24</p>
              <p className="text-lg">Projects</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">0</p>
              <p className="text-lg">Admin Costs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Our Team</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-80 w-full bg-gray-200">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-yellow-600 font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
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
              alt="ANSA Volunteers"
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover rounded-lg shadow-xl"
            />
          </div>
          <p className="text-xl text-gray-700">
            Together, we make a difference in the lives of hundreds of Brazilian families every year.
          </p>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl font-serif italic mb-6">
            "Everything we do is a drop in the ocean, but if we don't do it, that drop will be lost forever."
          </blockquote>
          <p className="text-lg">-Mother Teresa of Calcutta</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-yellow-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Want to join our team?</h2>
          <p className="text-xl text-gray-700 mb-8">
            We are always looking for dedicated volunteers who share our passion for helping Brazil.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/en/contact"
              className="inline-block bg-white text-yellow-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg transition-colors border-2 border-yellow-500"
            >
              Get in Touch
            </Link>
            <Link
              href="https://www.paypal.com/US/fundraiser/charity/2006255"
              target="_blank"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-8 py-4 rounded-lg transition-colors"
            >
              Make a Donation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
