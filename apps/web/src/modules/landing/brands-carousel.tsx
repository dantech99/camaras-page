import { cn } from "@camaras/ui/src/lib/utils";
import { Marquee } from "@camaras/ui/src/components/magicui/marquee";
import { BrandCard } from "./brand-card";

const brandsInfo = [
  {
    id: 1,
    name: "David Chen",
    logo: "/images/brands/1.webp",
    website: "https://www.camaras.com",
  },
  {
    id: 2,
    name: "David Chen",
    logo: "/images/brands/1.webp",
    website: "https://www.camaras.com",
  },
  {
    id: 3,
    name: "David Chen",
    logo: "/images/brands/1.webp",
    website: "https://www.camaras.com",
  },
  {
    id: 4,
    name: "David Chen",
    logo: "/images/brands/1.webp",
    website: "https://www.camaras.com",
  },
  {
    id: 5,
    name: "David Chen",
    logo: "/images/brands/1.webp",
    website: "https://www.camaras.com",
  },
  {
    id: 6,
    name: "David Chen",
    logo: "/images/brands/1.webp",
    website: "https://www.camaras.com",
  },
  {
    id: 7,
    name: "David Chen",
    logo: "/images/brands/1.webp",
    website: "https://www.camaras.com",
  },
  {
    id: 8,
    name: "David Chen",
    logo: "/images/brands/1.webp",
    website: "https://www.camaras.com",
  },
];

const firstRow = brandsInfo.slice(0, brandsInfo.length / 2);

export function BrandsCarousel() {
  return (
    <>
      <div className="bg-black w-full">
        <div className="text-center py-4">
          <h2 className="text-3xl font-bold tracking-tight py-3 text-white">
            Marcas que confían en nosotros
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Descubre las marcas líderes que han elegido Camaras para potenciar
            su presencia en línea y conectar con su audiencia de manera
            efectiva.
          </p>
        </div>
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:40s]">
            {firstRow.map((review) => (
              <BrandCard key={review.id} props={review} />
            ))}
          </Marquee>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
        </div>
      </div>
    </>
  );
}
