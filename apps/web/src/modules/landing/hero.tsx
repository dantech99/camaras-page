"use client"

import { motion } from "framer-motion";

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      filter: "blur(4px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] // Curva de ease personalizada suave
      }
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: "blur(2px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const paragraphVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: "blur(2px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <motion.section 
      id="hero" 
      className="h-screen w-full p-8 flex items-end justify-start"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        id="hero-container" 
        className="xl:w-2/3 space-y-4"
        variants={containerVariants}
      >
        <motion.h1 
          className="text-lg font-bold lg:text-2xl font-unbounded"
          variants={titleVariants}
        >
          Las Cámaras del Dragón
        </motion.h1>
        
        <motion.h2 
          className="text-4xl font-black lg:text-6xl font-unbounded text-primary-blue"
          variants={itemVariants}
        >
          CONOCE A NUESTRO GRAN EQUIPO DE TRABAJO
        </motion.h2>
        
        <motion.div 
          className="flex flex-col gap-4 lg:flex-row xl:gap-16"
          variants={containerVariants}
        >
          <motion.p 
            className="lg:text-lg font-bold font-unbounded text-primary-blue/80"
            variants={paragraphVariants}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam, maxime laboriosam. Rem in reiciendis molestiae! Ratione voluptas minima amet placeat.
          </motion.p>
          
          <motion.p 
            className="lg:text-lg font-bold"
            variants={paragraphVariants}
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur fuga libero voluptatibus nihil dicta neque dolor quas impedit asperiores mollitia?
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}