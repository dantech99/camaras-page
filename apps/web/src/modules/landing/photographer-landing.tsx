"use client";


import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhotographerCard } from './photographer-card';
import { usePhotographers } from '@/utils/use-photographers';

const photographers = [
  {
    name: "Carlos Mendoza",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000",
    role: "Fotógrafo Cosplay",
  },
  {
    name: "Carlos Hernandez",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000",
    role: "Fotógrafo Cosplay",
  },
  {
    name: "Carlos Pietro",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000",
    role: "Fotógrafo Cosplay",
  },
  {
    name: "Carlos Sanchez",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000",
    role: "Fotógrafo Cosplay",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export function PhotographerGrid() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { data: photographersData } = usePhotographers();

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
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-sm mx-auto"
          >
            <PhotographerCard {...photographers[currentIndex]} />
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="flex justify-center mt-6 gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {photographers.map((_, index) => (
            <motion.button
              key={`${index + 1}`}
              className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-white" : "bg-gray-500"
                }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => setCurrentIndex(index)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            />
          ))}
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {photographers.map((photographer, index) => (
        <motion.div key={photographer.name} variants={itemVariants} layout>
          <PhotographerCard {...photographer} />
        </motion.div>
      ))}
    </motion.div>
  );
}
