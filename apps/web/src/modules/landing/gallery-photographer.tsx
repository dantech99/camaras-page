"use client";

import { Avatar, AvatarFallback } from "@camaras/ui/src/components/avatar";

export function GalleryPhotographer() {
  const cosplayCards = [
    {
      id: 1,
      backgroundColor: "bg-gradient-to-tr from-red-500/90 to-red-700",
      photographer: "Cosplay Photographer",
      name: "Leslie Alexander",
      height: "aspect-[3/4]",
      image: "/images/slider-hero/1.webp",
    },
    {
      id: 2,
      backgroundColor: "bg-gradient-to-tr from-purple-500/90 to-purple-700",
      photographer: "Cosplay Event",
      name: "Mark Johnson",
      height: "aspect-[1/1]",
      image: "/images/slider-hero/1.webp",
    },
    {
      id: 3,
      backgroundColor: "bg-gradient-to-tr from-blue-500/90 to-blue-700",
      photographer: "Comic Con",
      name: "Sarah Davis",
      height: "aspect-[2/3]",
      image: "/images/slider-hero/1.webp",
    },
    {
      id: 4,
      backgroundColor: "bg-gradient-to-tr from-green-500/90 to-green-700",
      photographer: "Anime Expo",
      name: "James Wilson",
      height: "aspect-[3/4]",
      image: "/images/slider-hero/1.webp",
    },
    {
      id: 5,
      backgroundColor: "bg-gradient-to-tr from-yellow-500/90 to-yellow-700",
      photographer: "Fantasy Session",
      name: "Emma Rodriguez",
      height: "aspect-[4/5]",
      image: "/images/slider-hero/1.webp",
    },
    {
      id: 6,
      backgroundColor: "bg-gradient-to-tr from-pink-500/90 to-pink-700",
      photographer: "Gaming Event",
      name: "Michael Brown",
      height: "aspect-[3/4]",
      image: "/images/slider-hero/1.webp",
    },
    {
      id: 7,
      backgroundColor: "bg-gradient-to-tr from-indigo-500/90 to-indigo-700",
      photographer: "Heroes Convention",
      name: "Olivia Garcia",
      height: "aspect-[1/1]",
      image: "/images/slider-hero/1.webp",
    },
    {
      id: 8,
      backgroundColor: "bg-gradient-to-tr from-teal-500/90 to-teal-700",
      photographer: "Fantasy Photoshoot",
      name: "Daniel Martinez",
      height: "aspect-[3/4]",
      image: "/images/slider-hero/1.webp",
    },
  ];

  return (
    <div className="w-full py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Layout tipo Pinterest para todas las pantallas */}
        <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4 md:gap-5 space-y-3 sm:space-y-4 md:space-y-5">
          {cosplayCards.map((card) => (
            <div
              key={card.id}
              className={`${card.height} break-inside-avoid mb-3 sm:mb-4 md:mb-5 rounded-xl overflow-hidden relative shadow-md hover:shadow-lg transition-shadow duration-300`}
            >
              <div
                className={`w-full h-full ${card.backgroundColor} transition-transform duration-500 hover:scale-[1.02]`}
              >
                {/* Imagen con overlay de gradiente */}
                <img
                  src={card.image}
                  alt={`${card.photographer} - ${card.name}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Información del fotógrafo siempre visible */}
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 flex items-center gap-2 sm:gap-3">
                  <Avatar className="h-8 w-8 sm:h-10 sm:w-10 shadow-md flex-shrink-0">
                    <AvatarFallback
                      className="bg-cyan-500 text-white"
                      title={card.name}
                    >
                      {card.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-white font-medium text-xs sm:text-sm truncate">
                      {card.photographer}
                    </p>
                    <p className="text-gray-300 text-xs truncate">
                      {card.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
