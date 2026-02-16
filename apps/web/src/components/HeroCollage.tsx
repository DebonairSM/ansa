import Image from 'next/image';

const HERO_COLLAGE_IMAGES = [
  { src: '/uploads/2021/03/Paulo-VI.Foto-4.jpg', alt: 'Associação Paulo VI' },
  { src: '/uploads/2020/11/Fundacao-Sao-Jose-1.jpg', alt: 'Fundação São José' },
  { src: '/uploads/2021/03/Papai-Noel-2.jpg', alt: 'Projeto Papai Noel' },
  { src: '/uploads/2019/01/Lar-Sta-Monica1.jpeg', alt: 'Lar Santa Mônica' },
  { src: '/uploads/2021/03/Pequeno-Assis1.jpeg', alt: 'Lar Pequeno Assis' },
  { src: '/uploads/2021/03/Ascopar1.jpg', alt: 'Serrinha Minha Infância' },
  { src: '/uploads/2021/03/Solar-Menino-da-Luz2.jpg', alt: 'Solar Menino de Luz' },
];

type HeroCollageProps = {
  /** Optional override for screen-reader description of the whole collage */
  ariaLabel?: string;
};

export default function HeroCollage({ ariaLabel }: HeroCollageProps) {
  const label = ariaLabel ?? 'ANSA community projects across Brazil';

  return (
    <div
      className="w-full max-w-5xl mx-auto"
      role="img"
      aria-label={label}
    >
      {/* Frame: outer border, mat, inner content */}
      <div
        className="relative p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl"
        style={{
          background: 'linear-gradient(145deg, #fef3c7 0%, #fde68a 50%, #fcd34d 100%)',
          boxShadow:
            '0 0 0 4px #fef3c7, 0 0 0 8px #eab308, 0 25px 50px -12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.4)',
        }}
      >
        {/* Inner mat */}
        <div
          className="rounded-lg sm:rounded-xl overflow-hidden bg-amber-50/80"
          style={{
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.06)',
          }}
        >
          {/* Collage grid: 1 large left, 4 right in 2x2, 1 bottom full or similar */}
          <div className="grid grid-cols-4 grid-rows-3 gap-1.5 sm:gap-2 aspect-[16/10] min-h-[200px] sm:min-h-[280px]">
            {/* Large left - spans 2 rows */}
            <div className="col-span-2 row-span-2 relative overflow-hidden rounded-tl-lg">
              <Image
                src={HERO_COLLAGE_IMAGES[0].src}
                alt=""
                fill
                sizes="(max-width: 1024px) 50vw, 512px"
                className="object-cover"
                priority
              />
            </div>
            {/* Top right two */}
            <div className="col-span-2 row-span-1 relative overflow-hidden">
              <Image
                src={HERO_COLLAGE_IMAGES[1].src}
                alt=""
                fill
                sizes="(max-width: 1024px) 25vw, 256px"
                className="object-cover"
                priority
              />
            </div>
            <div className="col-span-2 row-span-1 relative overflow-hidden">
              <Image
                src={HERO_COLLAGE_IMAGES[2].src}
                alt=""
                fill
                sizes="(max-width: 1024px) 25vw, 256px"
                className="object-cover"
                priority
              />
            </div>
            {/* Bottom row: two wide cells */}
            <div className="col-span-2 row-span-1 relative overflow-hidden rounded-bl-lg">
              <Image
                src={HERO_COLLAGE_IMAGES[5].src}
                alt=""
                fill
                sizes="(max-width: 1024px) 50vw, 256px"
                className="object-cover"
                priority
              />
            </div>
            <div className="col-span-2 row-span-1 relative overflow-hidden rounded-br-lg">
              <Image
                src={HERO_COLLAGE_IMAGES[6].src}
                alt=""
                fill
                sizes="(max-width: 1024px) 50vw, 256px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
