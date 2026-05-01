import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import DonateLink from '@/components/DonateLink';
import { getTeamMembers } from '@/lib/localTeam';
import TeamGrid from '@/components/TeamGrid';

export const metadata: Metadata = {
  title: 'About Us - ANSA Brasil',
  description: 'Meet the volunteer team of ANSA Brasil working to help underprivileged children and women in Brazil since 1982.',
};

export default function AboutUs() {
  const teamMembers = getTeamMembers('en');
  return (
    <div className="min-h-screen">
      {/* Hero with Group Photo */}
      <section className="bg-gray-900">
        {/* Title */}
        <div className="bg-yellow-500 text-white py-16 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">About Us</h1>
            <p className="text-lg md:text-2xl max-w-3xl mx-auto opacity-95">
              Associação Nossa Senhora Aparecida (ANSA) brings together volunteers in the Washington, DC area who support children, women, and underserved communities in Brazil through partner institutions across the country.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <DonateLink
                cta="about-hero"
                className="inline-block bg-white text-yellow-700 hover:bg-yellow-50 font-bold px-8 py-4 rounded-lg transition-colors"
              >
                Make a Donation
              </DonateLink>
            </div>
          </div>
        </div>
        
        {/* Group Photo - Contained width, no cropping */}
        <div className="bg-gray-100 py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <Image
              src="/uploads/2020/11/Ansa-Volunteers.jpg"
              alt="ANSA Volunteers"
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <div className="space-y-5 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  The <strong className="text-gray-900">Associação Nossa Senhora Aparecida (ANSA)</strong> is an association created in 1982, 
                  maintained through donations and volunteer work, with zero administrative costs.
                </p>
                <p className="text-lg">
                  ANSA helps Brazilian children and women in need through institutions such as 
                  daycare centers, orphanages, schools and community groups.
                </p>
                <p className="text-lg">
                  All ANSA members, without exception, are volunteers who generously collaborate in this mission.
                </p>
              </div>
            </div>
            
            <div className="bg-yellow-500 rounded-2xl p-8 md:p-10 shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Our Impact</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <p className="text-5xl md:text-6xl font-bold text-white mb-2">43+</p>
                  <p className="text-white/90 text-sm md:text-base">Years of Mission</p>
                </div>
                <div className="text-center">
                  <p className="text-5xl md:text-6xl font-bold text-white mb-2">300+</p>
                  <p className="text-white/90 text-sm md:text-base">Families/Year</p>
                </div>
                <div className="text-center">
                  <p className="text-5xl md:text-6xl font-bold text-white mb-2">24</p>
                  <p className="text-white/90 text-sm md:text-base">Projects</p>
                </div>
                <div className="text-center">
                  <p className="text-5xl md:text-6xl font-bold text-white mb-2">0</p>
                  <p className="text-white/90 text-sm md:text-base">Admin Costs</p>
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
              <span className="text-yellow-500 font-semibold text-sm uppercase tracking-wider">Meet the Team</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dedicated volunteers who make our mission possible
            </p>
          </div>
          
          <TeamGrid members={teamMembers} />
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
            <DonateLink
              cta="about-final"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-8 py-4 rounded-lg transition-colors"
            >
              Make a Donation
            </DonateLink>
          </div>
        </div>
      </section>
    </div>
  );
}
