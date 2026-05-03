import Image from 'next/image';
import type { TeamMember } from '@/lib/localTeam';

type Props = {
  members: TeamMember[];
};

export default function TeamGrid({ members }: Props) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
      {members.map((member) => (
        <div
          key={member.slug}
          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 group"
        >
          <div
            className="relative w-full bg-gradient-to-br from-gray-50 to-gray-100 px-8 pt-8 pb-6 flex items-center justify-center"
            style={{ minHeight: '320px' }}
          >
            <Image
              src={member.image}
              alt={member.name}
              width={300}
              height={400}
              className="object-contain w-full h-auto max-h-[320px] transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          <div className="p-6 lg:p-7">
            <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-yellow-600 transition-colors">
              {member.name}
            </h3>
            <p className="text-yellow-600 font-semibold mb-4 text-sm uppercase tracking-wide">
              {member.role}
            </p>
            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
              {member.bio}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
