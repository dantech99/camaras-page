"use client";

import { Badge } from "@camaras/ui/src/components/badge";
import { Button } from "@camaras/ui/src/components/button";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Camera } from "lucide-react";
import { useState } from "react";

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
      transition: { duration: 0.3, ease: "easeOut" },
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    expanded: {
      scale: 1.03,
      transition: { duration: 0.5, type: "spring", bounce: 0.4 },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 1.2 },
    },
    initial: {
      scale: 1.2,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const contentVariants = {
    hidden: {
      y: 60,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeOut",
        yoyo: Number.POSITIVE_INFINITY,
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
      },
    },
  };

  const roleContainerVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 25px rgba(255,255,255,0.2)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const handleCardClick = async () => {
    setIsExpanded(!isExpanded);
    await controls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 0.4, ease: "easeInOut" },
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
          className="text-2xl md:text-xl font-bold text-white mb-2 font-mono"
          variants={contentVariants}
          layout
        >
          {name}
        </motion.h3>

        <Badge
          variant="outline"
          className="mb-4 mx-auto flex items-center justify-center gap-2 px-4 py-2"
        >
          <Camera />
          {role}
        </Badge>

        <AnimatePresence>
          <motion.div
            className="flex gap-3 justify-center"
            variants={contentVariants}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button variant={"landingSecondary"} className="cursor-pointer">
              Agendar
            </Button>
            <Button variant={"landing"}>Sobre mí</Button>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
