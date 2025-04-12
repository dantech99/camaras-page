"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronsRight } from "lucide-react"
import { AnimatedButton } from "../../../shared/components/button/animated-button"

// Imágenes de ejemplo - puedes reemplazarlas con tus propias URLs
const images = [
  "/placeholder.svg?height=600&width=500",
  "/placeholder.svg?height=600&width=500",
  "/placeholder.svg?height=600&width=500",
  "/placeholder.svg?height=600&width=500",
]

export function AboutSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Cambiar imagen aleatoriamente cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      let newIndex: number
      do {
        newIndex = Math.floor(Math.random() * images.length)
      } while (newIndex === currentImageIndex && images.length > 1)
      setCurrentImageIndex(newIndex)
    }, 5000)

    return () => clearInterval(interval)
  }, [currentImageIndex])

  return (
    <div className="w-full bg-gradient-to-br from-indigo-950 to-purple-900 py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start gap-6 sm:gap-8 md:gap-12 lg:gap-16">
          {/* Contenedor de imagen simplificado - ajustado para responsividad */}
          <div className="w-full md:w-2/5 mb-6 md:mb-0 mx-auto md:mx-0 max-w-sm md:max-w-none">
            <div className="overflow-hidden rounded-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="aspect-[3/4] w-full"
                >
                  <img
                    src={images[currentImageIndex] || "/placeholder.svg"}
                    alt="Cosplay photography"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Contenido de texto - ajustado para responsividad */}
          <motion.div
            className="w-full md:w-3/5 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 flex flex-wrap items-center">
              <span>¿Quienes </span>
              <motion.span
                className="text-yellow-300 mx-2 relative"
                animate={{
                  scale: [1, 1.05, 1],
                  textShadow: [
                    "0 0 8px rgba(250, 204, 21, 0.3)",
                    "0 0 16px rgba(250, 204, 21, 0.6)",
                    "0 0 8px rgba(250, 204, 21, 0.3)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                somos
                {/* Pequeñas estrellas alrededor de "We" */}
                <motion.span
                  className="absolute -top-1 -right-1 text-xs text-yellow-200"
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5],
                    rotate: 360,
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
                >
                  ✦
                </motion.span>
                <motion.span
                  className="absolute -bottom-1 -left-1 text-xs text-yellow-200"
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5],
                    rotate: 360,
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.5 }}
                >
                  ✦
                </motion.span>
              </motion.span>
              <span>?</span>
            </motion.h2>

            <p className="mb-3 sm:mb-4 text-base sm:text-lg">
              At Las Cámaras del Dragón, we are a passionate team of professional photographers dedicated to capturing
              the unforgettable moments at SOFA, one of the most vibrant and exciting geek culture events in Latin
              America. Our mission is simple – to immortalize the energy, creativity, and excitement of every cosplayer,
              fan.
            </p>

            <p className="mb-3 sm:mb-4 text-base sm:text-lg">
              Whether you're showcasing an intricate cosplay, posing with friends, or simply soaking in the electric
              atmosphere of the event, we strive to capture your essence in every shot.
            </p>

            <p className="mb-6 sm:mb-8 text-base sm:text-lg">
              With years of experience in event and cosplay photography, our team combines technical expertise, artistic
              vision, and an eye for detail to deliver high-quality, carefully edited photographs that not only reflect
              the special moments but also highlight the personality and creativity of each individual.
            </p>

            {/* Botón "Saber Más" */}
            <AnimatedButton tag={()=> <ChevronsRight size={28} />} >
              Saber más
            </AnimatedButton>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

