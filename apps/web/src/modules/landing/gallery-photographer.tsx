"use client";

import { Avatar, AvatarFallback } from "@camaras/ui/src/components/avatar";
import { Button } from "@camaras/ui/src/components/button";
import Link from "next/link";

export function GalleryPhotographer() {
  const cosplayCards = [
    {
      id: 1,
      backgroundColor: "bg-gradient-to-tr from-red-500/90 to-red-700",
      photographer: "Cosplay Photographer",
      name: "1",
      rowSpan: 3,
      image: "/images/slider-hero/1.webp",
      gridClasses: "row-span-3",
    },
    {
      id: 2,
      backgroundColor: "bg-gradient-to-tr from-red-500/90 to-red-700",
      photographer: "Cosplay Photographer",
      name: "2",
      rowSpan: 5,
      image: "/images/slider-hero/1.webp",
      gridClasses: "row-span-5",
    },
    {
      id: 3,
      backgroundColor: "bg-gradient-to-tr from-red-500/90 to-red-700",
      photographer: "Cosplay Photographer",
      name: "3",
      rowSpan: 3,
      image: "/images/slider-hero/1.webp",
      gridClasses: "row-span-3",
    },
    {
      id: 4,
      backgroundColor: "bg-gradient-to-tr from-red-500/90 to-red-700",
      photographer: "Cosplay Photographer",
      name: "4",
      rowSpan: 5,
      image: "/images/slider-hero/1.webp",
      gridClasses: "row-span-5 row-start-4",
    },
    {
      id: 5,
      backgroundColor: "bg-gradient-to-tr from-red-500/90 to-red-700",
      photographer: "Cosplay Photographer",
      name: "5",
      rowSpan: 5,
      image: "/images/slider-hero/1.webp",
      gridClasses: "row-span-5 col-start-2 row-start-6",
    },
    {
      id: 6,
      backgroundColor: "bg-gradient-to-tr from-red-500/90 to-red-700",
      photographer: "Cosplay Photographer",
      name: "6",
      rowSpan: 5,
      image: "/images/slider-hero/1.webp",
      gridClasses: "row-span-5 col-start-3 row-start-4",
    },
    {
      id: 7,
      backgroundColor: "bg-gradient-to-tr from-red-500/90 to-red-700",
      photographer: "Cosplay Photographer",
      name: "7",
      rowSpan: 3,
      image: "/images/slider-hero/1.webp",
      gridClasses: "row-span-3 row-start-9",
    },
    {
      id: 8,
      backgroundColor: "bg-gradient-to-tr from-red-500/90 to-red-700",
      photographer: "Cosplay Photographer",
      name: "8",
      rowSpan: 3,
      image: "/images/slider-hero/1.webp",
      gridClasses: "row-span-3 col-start-3 row-start-9",
    },
  ];

  return (
    <div className="relative w-full py-2 sm:py-6 md:py-10 px-2 sm:px-3 md:px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-8 sm:gap-4 md:gap-5 grid-cols-3 grid-rows-11 h-screen">
          {cosplayCards.map((card) => (
            <div
              key={card.id}
              className={`h-full w-full rounded-xl overflow-hidden relative shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group ${card.gridClasses}`}
            >
              <img
                src={card.image}
                alt={`${card.photographer} - ${card.name}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Avatar className="h-8 w-8 sm:h-10 sm:w-10 shadow-lg flex-shrink-0">
                    <AvatarFallback
                      className="bg-gradient-to-br from-pink-500 to-purple-600 text-white font-semibold"
                      title={card.name}
                    >
                      {card.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="text-white font-semibold text-sm sm:text-base mb-1">
                      {card.photographer}
                    </p>
                    <p className="text-gray-300 text-xs sm:text-sm">
                      {card.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Link href="/gallery" className="inline-flex items-center gap-2 mt-20">
        <Button
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          variant={"landing"}
        >
          Ver más fotos en nuestra galería
        </Button>
      </Link>
    </div>
  );
}
