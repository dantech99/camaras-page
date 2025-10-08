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
      name: "Leslie Alexander",
      rowSpan: "5",
      columStart: 2,
      rowStart: 1,
      image: "/images/slider-hero/1.webp",
    },
    {
      id: 2,
      backgroundColor: "bg-gradient-to-tr from-purple-500/90 to-purple-700",
      photographer: "Cosplay Event",
      name: "Mark Johnson",
      rowSpan: "3",
      columStart: 1,
      rowStart: 1,
      image: "/images/slider-hero/1.webp",
    },
    {
      id: 3,
      backgroundColor: "bg-gradient-to-tr from-blue-500/90 to-blue-700",
      photographer: "Comic Con",
      name: "Sarah Davis",
      rowSpan: "3",
      columStart: 3,
      rowStart: 1,
      image: "/images/slider-hero/1.webp",
    },
    {
      id: 4,
      backgroundColor: "bg-gradient-to-tr from-blue-500/90 to-blue-700",
      photographer: "Comic Con",
      name: "Sarah Davis",
      rowSpan: "5",
      columStart: 1,
      rowStart: 4,
      image: "/images/slider-hero/1.webp",
    },
    {
      id: 5,
      backgroundColor: "bg-gradient-to-tr from-blue-500/90 to-blue-700",
      photographer: "Comic Con",
      name: "Sarah Davis",
      rowSpan: "5",
      columStart: 3,
      rowStart: 4,
      image: "/images/slider-hero/1.webp",
    },
    {
      id: 6,
      backgroundColor: "bg-gradient-to-tr from-blue-500/90 to-blue-700",
      photographer: "Comic Con",
      name: "Sarah Davis",
      rowSpan: "5",
      columStart:2,
      rowStart: 6,
      image: "/images/slider-hero/1.webp",
    },
    {
      id: 7,
      backgroundColor: "bg-gradient-to-tr from-blue-500/90 to-blue-700",
      photographer: "Comic Con",
      name: "Sarah Davis",
      rowSpan: "3",
      columStart:1,
      rowStart: 9,
      image: "/images/slider-hero/1.webp",
    },
    {
      id: 8,
      backgroundColor: "bg-gradient-to-tr from-blue-500/90 to-blue-700",
      photographer: "Comic Con",
      name: "Sarah Davis",
      rowSpan: "3",
      columStart:3,
      rowStart: 9,
      image: "/images/slider-hero/1.webp",
    },

  ];

  return (
    <div className="relative w-full py-2 sm:py-6 md:py-10 px-2 sm:px-3 md:px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-8 sm:gap-4 md:gap-5 auto-rows-fr grid-cols-3 grid-rows-5 h-screen">
          {cosplayCards.map((card) => (
            <div
              key={card.id}
              className={` h-full row-span-${card.rowSpan} w-full  rounded-xl overflow-hidden relative shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group col-start-${card.columStart} row-start-${card.rowStart}`}
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
