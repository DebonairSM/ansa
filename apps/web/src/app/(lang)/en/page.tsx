import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { FaMapMarkerAlt } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'ANSA Brasil - Home',
  description: 'Associação Nossa Senhora Aparecida - Helping Brazilian communities in need since 1982 through donations and volunteer work.',
  openGraph: {
    title: 'ANSA Brasil',
    description: 'Helping Brazilian communities in need since 1982',
    type: 'website',
    locale: 'en_US',
  },
};

export default function EnHome() {
  return (
    <div className="min-h-screen">
      {/* TODO: New hero section will be implemented here based on hero-mockup.html */}

      {/* Progress & Impact Section */}
      <section className="py-16 px-4 bg-white border-b-4 border-yellow-500">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Measurable Progress. Real Impact.</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-600">What we've achieved</h3>
              <ul className="space-y-3 text-lg text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span>Multidimensional child poverty fell from <strong>62.5% (2017)</strong> to <strong>55.9% (2023)</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span>More than <strong>6 percentage points</strong> reduction confirmed by UNICEF</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span><strong>24 projects</strong> supported by ANSA in <strong>10+ Brazilian states</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span><strong>43 years</strong> of continuous mission, <strong>100% volunteer-run</strong></span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-600">What we still need to do</h3>
              <ul className="space-y-3 text-lg text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-yellow-600 font-bold mt-1">→</span>
                  <span>More than <strong>30 million children</strong> still live in multidimensional poverty</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-600 font-bold mt-1">→</span>
                  <span>Access to <strong>water, sanitation, and education</strong> remain critical challenges</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-600 font-bold mt-1">→</span>
                  <span>Daycare centers, schools, and community programs need <strong>ongoing resources</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-600 font-bold mt-1">→</span>
                  <span>Each donation keeps this <strong>progress moving forward</strong></span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 text-center">
            <p className="text-xl text-gray-700 mb-6">
              <strong>You're not just helping.</strong> You're accelerating change that data already proves.
            </p>
            <Link
              href="https://www.paypal.com/US/fundraiser/charity/2006255"
              target="_blank"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white text-xl font-bold px-10 py-4 rounded-lg transition-colors"
            >
              Be Part of This Change
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Who We Are</h2>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              The Associação Nossa Senhora Aparecida (ANSA) is an association, created in 1982,
              maintained through donations and volunteer work, with zero costs (everything is donated).
            </p>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              ANSA helps Brazilian children and women in need, through institutions that
              need resources such as daycare centers, orphanages, schools and community groups.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              All ANSA members, without exception, are volunteers who generously
              collaborate in this mission.
            </p>
          </div>

          {/* Supported Institutions Grid */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-center mb-8">24 Supported Institutions Across Brazil</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/en/projects/associacao-paulo-vi" className="group bg-gray-50 rounded-lg p-6 hover:bg-yellow-50 transition-colors">
                <h4 className="text-lg font-bold mb-2 group-hover:text-yellow-600">Paulo VI Association</h4>
                <p className="text-sm text-gray-500 mb-2 flex items-center gap-1"><FaMapMarkerAlt className="text-yellow-600" /> Guaratuba, Paraná</p>
                <p className="text-sm text-gray-600 mb-4">
                  Serves vulnerable children and adolescents with artistic activities, dance, theater and sports.
                </p>
                <span className="text-yellow-600 text-sm font-semibold">LEARN MORE →</span>
              </Link>
              <Link href="/en/projects/solar-menino-luz" className="group bg-gray-50 rounded-lg p-6 hover:bg-yellow-50 transition-colors">
                <h4 className="text-lg font-bold mb-2 group-hover:text-yellow-600">Solar Menino de Luz</h4>
                <p className="text-sm text-gray-500 mb-2 flex items-center gap-1"><FaMapMarkerAlt className="text-yellow-600" /> Rio de Janeiro, RJ</p>
                <p className="text-sm text-gray-600 mb-4">
                  Promotes comprehensive education for families in the Pavão-Pavãozinho and Cantagalo communities.
                </p>
                <span className="text-yellow-600 text-sm font-semibold">LEARN MORE →</span>
              </Link>
              <Link href="/en/projects/comunidade-ilha-maruim" className="group bg-gray-50 rounded-lg p-6 hover:bg-yellow-50 transition-colors">
                <h4 className="text-lg font-bold mb-2 group-hover:text-yellow-600">Ilha do Maruim Community</h4>
                <p className="text-sm text-gray-500 mb-2 flex items-center gap-1"><FaMapMarkerAlt className="text-yellow-600" /> Olinda, Pernambuco</p>
                <p className="text-sm text-gray-600 mb-4">
                  Construction of community parish hall for professional training programs.
                </p>
                <span className="text-yellow-600 text-sm font-semibold">LEARN MORE →</span>
              </Link>
              <Link href="/en/projects/lar-santa-monica" className="group bg-gray-50 rounded-lg p-6 hover:bg-yellow-50 transition-colors">
                <h4 className="text-lg font-bold mb-2 group-hover:text-yellow-600">Santa Mônica Home</h4>
                <p className="text-sm text-gray-500 mb-2 flex items-center gap-1"><FaMapMarkerAlt className="text-yellow-600" /> Fortaleza, Ceará</p>
                <p className="text-sm text-gray-600 mb-4">
                  Shelters girls who are victims of sexual abuse and exploitation, providing protection and care.
                </p>
                <span className="text-yellow-600 text-sm font-semibold">LEARN MORE →</span>
              </Link>
            </div>
            <div className="text-center mt-8">
              <Link
                href="/en/projects"
                className="inline-block text-yellow-600 hover:text-yellow-700 font-semibold"
              >
                View all 24 projects →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 px-4 bg-yellow-500">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <p className="text-5xl font-bold mb-2 text-white drop-shadow-md">24</p>
              <p className="text-lg text-white font-semibold">Projects Supported</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <p className="text-5xl font-bold mb-2 text-white drop-shadow-md">10+</p>
              <p className="text-lg text-white font-semibold">States Reached</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <p className="text-5xl font-bold mb-2 text-white drop-shadow-md">43+</p>
              <p className="text-lg text-white font-semibold">Years of Mission</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <p className="text-5xl font-bold mb-2 text-white drop-shadow-md">100%</p>
              <p className="text-lg text-white font-semibold">Volunteer-Run</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section with Image */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96">
            <Image
              src="/uploads/2015/12/image2.png"
              alt="Brazilian children"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-lg shadow-xl"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Even from afar, we work for a better Brazil!
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Discover more about our community projects here!
            </p>
            <Link
              href="https://www.paypal.com/US/fundraiser/charity/2006255"
              target="_blank"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white text-xl font-bold px-10 py-4 rounded-lg transition-colors"
            >
              DONATE
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Mission</h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            Our mission is to improve the quality of life of our children, whether by benefiting
            entities they belong to, or by increasing their family income through
            community programs.
          </p>
        </div>
      </section>

      {/* How to Participate */}
      <section className="py-20 px-4 bg-yellow-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">How can you participate?</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Spreading the Word</h3>
              <p className="text-lg text-gray-700">
                Help us spread ANSA's message and continue supporting children in
                Brazil. Telling a friend makes a big impact.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Staying in Touch</h3>
              <p className="text-lg text-gray-700">
                Join our email list and we will keep you informed about the projects and
                communities we work with.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Donating</h3>
              <p className="text-lg text-gray-700 mb-6">
                Donations help us promote our mission and continue to impact lives. Your
                financial support helps keep ANSA running.
              </p>
              <Link
                href="https://www.paypal.com/US/fundraiser/charity/2006255"
                target="_blank"
                className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-8 py-3 rounded-lg transition-colors"
              >
                DONATE
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-3xl md:text-4xl font-serif italic mb-6">
            "Everything we do is a drop in the ocean, but if we don't do it, that drop will be lost forever."
          </blockquote>
          <p className="text-xl">-Mother Teresa of Calcutta</p>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <Link href="/en/projects/santa-claus-project" className="group block">
              <div className="relative h-80 mb-6">
                <Image
                  src="/uploads/2015/12/image20.png"
                  alt="Santa Claus Project"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-yellow-600 transition-colors">Santa Claus Project</h3>
              <p className="text-gray-700 leading-relaxed">
                ANSA launched an extraordinary project at Christmas 2020! Sent Santa Claus
                to 150 children, children of small farmers, sugarcane planters
                from Serra de Redenção, CE.
              </p>
            </Link>
            <Link href="/en/projects/artistic-association" className="group block">
              <div className="relative h-80 mb-6">
                <Image
                  src="/uploads/2015/12/image2.png"
                  alt="Artistic Association"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-yellow-600 transition-colors">Artistic Educational Cultural Association</h3>
              <p className="text-gray-700 leading-relaxed">
                Redemption through music! The school serves 140 students aged 6 to 17
                with the goal of promoting musical culture and bringing the community together.
              </p>
            </Link>
          </div>
          <div className="text-center">
            <Link
              href="/en/projects"
              className="inline-block border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white font-bold px-8 py-3 rounded-lg transition-colors"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Get in Touch. Participate!</h2>
          <div className="space-y-4 mb-8 text-lg">
            <p className="font-semibold">Address: University Dr. Fairfax, 3586, Virginia - ZIP: 22030 - USA</p>
            <p className="font-semibold">(703) 785-5159</p>
          </div>
          <Link
            href="https://www.paypal.com/US/fundraiser/charity/2006255"
            target="_blank"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white text-xl font-bold px-10 py-4 rounded-lg transition-colors"
          >
            DONATE
          </Link>
        </div>
      </section>
    </div>
  );
}
