"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { PhotographerCard } from "./photographer-card";
import { usePhotographers } from "@/hooks/use-photographers";
import { Skeleton } from "@camaras/ui/src/components/skeleton";

export function PhotographerGrid() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const { data, isLoading } = usePhotographers();
  const photographers = data?.photographers || [];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % photographers.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isMobile]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8 w-full">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            className="rounded-3xl aspect-9/16 w-full cursor-pointer shadow-2xl"
            key={index}
          />
        ))}
      </div>
    );
  }

  if (!photographers.length) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <p className="text-lg text-gray-500">No hay fotógrafos disponibles</p>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="w-full px-4 py-8">
        <AnimatePresence mode="wait">
          <PhotographerCard {...photographers[currentIndex]} />
        </AnimatePresence>

        <div className="flex justify-center mt-6 gap-2">
          {photographers.map((_, index) => (
            <button
              key={`${index + 1}`}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? "bg-white" : "bg-gray-500"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8 w-full">
      {photographers.map((photographer, index) => (
        <div key={photographer.name}>
          <PhotographerCard {...photographer} />
        </div>
      ))}
    </div>
  );
}
