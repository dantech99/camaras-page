'use client'

import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Camera } from 'lucide-react';
import { useState } from 'react';

interface PhotographerCardProps {
  name: string;
  image: string;
  role: string;
}

export function PhotographerCard({ name, image, role }: PhotographerCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const controls = useAnimation();

  const cardVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    expanded: {
      scale: 1.03,
      transition: { duration: 0.5, type: "spring", bounce: 0.4 }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 1.2 }
    },
    initial: {
      scale: 1.2,
      opacity: 0
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const contentVariants = {
    hidden: {
      y: 60,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeOut",
        yoyo: Number.POSITIVE_INFINITY
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  const roleContainerVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 25px rgba(255,255,255,0.2)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const handleCardClick = async () => {
    setIsExpanded(!isExpanded);
    await controls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 0.4, ease: "easeInOut" }
    });
  };

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl bg-linear-to-b from-gray-900/80 to-gray-900 aspect-3/4 w-full cursor-pointer"
      variants={cardVariants}
      whileHover="hover"
      whileTap="tap"
      animate={controls}
      onClick={handleCardClick}
      layout
    >
      <motion.img
        src={image}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover"
        variants={imageVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
      />
      <motion.div
        className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-6 text-center"
        variants={contentVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h3
          className="text-2xl md:text-xl font-bold text-white mb-2"
          variants={contentVariants}
          layout
        >
          {name}
        </motion.h3>
        
        <motion.div
          className="flex items-center justify-center gap-2 text-gray-300 mb-4"
          variants={contentVariants}
        >
          <motion.div
            className="flex items-center gap-2 px-4 py-1 rounded-full border border-white/20 bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)] backdrop-blur-xs"
            variants={roleContainerVariants}
            whileHover="hover"
            initial="initial"
            animate="animate"
          >
            <motion.div
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Camera size={16} className="text-white/70" />
            </motion.div>
            <motion.span
              className="text-sm"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {role}
            </motion.span>
          </motion.div>
        </motion.div>
        
        <AnimatePresence>
          <motion.div
            className="flex gap-3 justify-center"
            variants={contentVariants}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              className="px-4 py-1.5 md:px-6 md:py-2 bg-white text-gray-900 rounded-full font-medium text-sm"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Agendar
            </motion.button>
            <motion.button
              className="px-4 py-1.5 md:px-6 md:py-2 border border-white text-white rounded-full font-medium text-sm"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Sobre mí
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}