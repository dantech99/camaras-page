"use client";

import { motion } from "framer-motion";
import { ChevronsLeft } from "lucide-react";

const images = [
  {
    src: "/images/foto1.jpg",
    alt: "Fotografía profesional 1",
  },
  {
    src: "/images/foto2.jpg",
    alt: "Fotografía profesional 2",
  },
  {
    src: "/images/foto3.jpg",
    alt: "Fotografía profesional 3",
  },
  {
    src: "/images/foto4.jpg",
    alt: "Fotografía profesional 4",
  },
  {
    src: "/images/foto5.jpg",
    alt: "Fotografía profesional 5",
  },
  {
    src: "/images/foto6.jpg",
    alt: "Fotografía profesional 6",
  },
    {
        src: "/images/foto7.jpg",
        alt: "Fotografía profesional 7",
    },
    {
        src: "/images/foto8.jpg",
        alt: "Fotografía profesional 8",
    },
    {
        src: "/images/foto9.jpg",
        alt: "Fotografía profesional 9",
    },
    {
        src: "/images/foto10.jpg",
        alt: "Fotografía profesional 10",
    },
];

export function BrandsCarousel() {
  return (
    <div className="w-full overflow-hidden bg-primary-blue py-8">
      <motion.div
        className="flex whitespace-nowrap items-center"
        animate={{
          x: [0, "-50%"],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="flex items-center">
            {images.map((image, imageIndex) => (
              <div key={imageIndex} className="flex items-center">
                <div className="mx-4">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-24 w-32 object-cover rounded-lg shadow-lg"
                    style={{
                      minWidth: "128px", // Previene que se comprima
                    }}
                  />
                </div>
                <ChevronsLeft className="mx-4 text-white" size={32} />
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
