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
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300&text=Design+1",
        "/placeholder.svg?height=200&width=300&text=Design+2",
        "/placeholder.svg?height=200&width=300&text=Design+3",
      ],
    },
    {
      title: "Desarrollo",
      subtitle: "Código limpio y eficiente",
      images: [
        "/placeholder.svg?height=200&width=300&text=Code",
        "/placeholder.svg?height=200&width=300&text=Code+1",
        "/placeholder.svg?height=200&width=300&text=Code+2",
        "/placeholder.svg?height=200&width=300&text=Code+3",
      ],
    },
    {
      title: "Marketing",
      subtitle: "Estrategias que funcionan",
      images: [
        "/placeholder.svg?height=200&width=300&text=Marketing",
        "/placeholder.svg?height=200&width=300&text=Marketing+1",
        "/placeholder.svg?height=200&width=300&text=Marketing+2",
        "/placeholder.svg?height=200&width=300&text=Marketing+3",
      ],
    },
    {
      title: "Consultoría",
      subtitle: "Soluciones personalizadas",
      images: [
        "/placeholder.svg?height=200&width=300&text=Consulting",
        "/placeholder.svg?height=200&width=300&text=Consulting+1",
        "/placeholder.svg?height=200&width=300&text=Consulting+2",
        "/placeholder.svg?height=200&width=300&text=Consulting+3",
      ],
    },
  ];

  const handleTextAnimationComplete = () => {
    setTimeout(() => {
      setShowCards(true);
    }, 500);
  };
 return (
    <>
      {/* Contenedor principal responsivo */}
      <div className="min-h-screen px-4 sm:px-10 lg:px-24 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Texto animado responsivo */}
          <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] mb-16 sm:mb-24">
            <div className="p-8 sm:p-14 md:p-20 w-full max-w-5xl flex items-center justify-center">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                onAnimationComplete={handleTextAnimationComplete}
                className="text-center"
              >
                <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3">
                  {words.map((word, index) => (
                    <motion.span
                      key={`${word}-${index}`}
                      variants={wordVariants}
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-unbounded text-primary-blue inline-block"
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Cards responsivas */}
          {showCards && (
            <motion.div
              variants={cardsVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 sm:gap-10"
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
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % card.images.length);
    }, 300);
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
      className="rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 relative bg-white"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-52 sm:h-64 md:h-72 lg:h-80 overflow-hidden">
        <motion.img
          key={currentImageIndex}
          src={card.images[currentImageIndex]}
          alt={card.title}
          className="w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        />
        {/* Overlay con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Título y subtítulo responsivos */}
        <div className="absolute bottom-5 left-5 right-5">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 drop-shadow-lg leading-tight">
            {card.title}
          </h3>
          <p className="text-white/90 text-base sm:text-lg drop-shadow-md leading-tight">
            {card.subtitle}
          </p>
        </div>
      </div>
    </motion.div>
  );
}