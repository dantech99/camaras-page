"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export function TeamSection() {
  const [showCards, setShowCards] = useState(false);

  const text = "ESTE ES NUESTRO EQUIPO DE FOTOGRAFOS";
  const delay = 0.15;

  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: -30,
      opacity: 0,
      filter: "blur(8px)",
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "tween",
        ease: [0.25, 0.46, 0.45, 0.94],
        duration: 1.2,
      },
    },
  };

  const cardsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      y: -40,
      opacity: 0,
      filter: "blur(8px)",
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "tween",
        ease: [0.25, 0.46, 0.45, 0.94],
        duration: 1.0,
      },
    },
  };

  const cards = [
    {
      title: "Diseño Web",
      subtitle: "Experiencias digitales únicas",
      images: [
        "/images/testimonial/1.webp",
        "/images/testimonial/2.webp",
        "/placeholder.svg?height=200&width=300&text=Design+2",
        "/placeholder.svg?height=200&width=300&text=Design+3",
      ],
    },
    {
      title: "Desarrollo",
      subtitle: "Código limpio y eficiente",
      images: [
        "/images/testimonial/1.webp",
        "/images/testimonial/2.webp",
        "/placeholder.svg?height=200&width=300&text=Code+2",
        "/placeholder.svg?height=200&width=300&text=Code+3",
      ],
    },
    {
      title: "Marketing",
      subtitle: "Estrategias que funcionan",
      images: [
        "/images/testimonial/1.webp",
        "/images/testimonial/2.webp",
        "/placeholder.svg?height=200&width=300&text=Marketing+2",
        "/placeholder.svg?height=200&width=300&text=Marketing+3",
      ],
    },
    {
      title: "Consultoría",
      subtitle: "Soluciones personalizadas",
      images: [
        "/images/testimonial/1.webp",
        "/images/testimonial/2.webp",
        "/placeholder.svg?height=200&width=300&text=Consulting+2",
        "/placeholder.svg?height=200&width=300&text=Consulting+3",
      ],
    },
  ];

  return (
    <>
      <div className="px-4 sm:px-10 lg:px-24 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Texto animado grande y responsivo */}
          <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] mb-16 sm:mb-24">
            <div className="px-4 p-8 sm:p-14 md:p-20 w-full max-w-5xl flex items-center justify-center">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                onViewportEnter={() => setShowCards(true)}
                viewport={{ once: true, amount: 0.3 }}
                className="text-center"
              >
                <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3">
                  {words.map((word, index) => (
                    <motion.span
                      key={`${word}-${index}`}
                      variants={wordVariants}
                      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-unbounded text-primary-blue inline-block"
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Cards responsivas y tipo retrato */}
          {showCards && (
            <motion.div
              variants={cardsVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-16 gap-y-16"
            >
              {cards.map((card, index) => (
                <Card key={index} card={card} variants={cardVariants} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}

function Card({ card, variants }: { card: any; variants: any }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
    let imageIndex = 1;
    setCurrentImageIndex(imageIndex);

    const interval = setInterval(() => {
      imageIndex = imageIndex + 1;
      if (imageIndex >= card.images.length) {
        imageIndex = 1;
      }
      setCurrentImageIndex(imageIndex);
    }, 1000);

    (document.activeElement as any).imageInterval = interval;
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setCurrentImageIndex(0);
    if ((document.activeElement as any).imageInterval) {
      clearInterval((document.activeElement as any).imageInterval);
    }
  };

  return (
    <motion.div
      variants={variants}
      className="rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-72 sm:h-80 md:h-96 lg:h-[24rem] overflow-hidden">
        <motion.img
          key={currentImageIndex}
          src={card.images[currentImageIndex]}
          alt={card.title}
          className="w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-1 drop-shadow-lg leading-tight">
            {card.title}
          </h3>
          <p className="text-white/90 text-sm sm:text-base drop-shadow-md leading-tight">
            {card.subtitle}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
