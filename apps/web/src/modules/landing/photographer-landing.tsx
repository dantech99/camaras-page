"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhotographerCard } from "./photographer-card";

const photographers = [
  {
    name: "Carlos Mendoza",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000",
    role: "Fotógrafo Cosplay",
    description:
      "Hola me llamo Carlos y tomo fotos en Camaras del Dragon.png muchas gracias",
  },
  {
    name: "Carlos Hernandez",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000",
    role: "Fotógrafo Cosplay",
    description:
      "Hola me llamo Carlos y tomo fotos en Camaras del Dragon.png muchas gracias",
  },
  {
    name: "Carlos Pietro",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000",
    role: "Fotógrafo Cosplay",
    description:
      "Hola me llamo Carlos y tomo fotos en Camaras del Dragon.png muchas gracias",
  },
  {
    name: "Carlos Sanchez",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000",
    role: "Fotógrafo Cosplay",
    description:
      "Hola me llamo Carlos y tomo fotos en Camaras del Dragon.png muchas gracias",
  },
];

export function PhotographerGrid() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

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
