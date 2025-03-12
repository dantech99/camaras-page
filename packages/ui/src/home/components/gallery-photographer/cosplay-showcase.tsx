"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User } from "lucide-react"

interface CosplayCard {
  id: number
  backgroundColor: string
  photographer: string
  name: string
}

export default function CosplayShowcase() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const cosplayCards: CosplayCard[] = [
    {
      id: 1,
      backgroundColor: "bg-red-600",
      photographer: "Cosplay Photographer",
      name: "Leslie Alexander",
    },
    {
      id: 2,
      backgroundColor: "bg-purple-600",
      photographer: "Cosplay Photographer",
      name: "Leslie Alexander",
    },
    {
      id: 3,
      backgroundColor: "bg-blue-600",
      photographer: "Cosplay Photographer",
      name: "Leslie Alexander",
    },
  ]

  return (
    <div className="w-full min-h-[100dvh] bg-indigo-950 p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 max-w-[2000px] mx-auto">
        {cosplayCards.map((card) => (
          <motion.div
            key={card.id}
            className={`relative overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer ${card.backgroundColor} w-full aspect-[3/4]`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: card.id * 0.1 }}
            onHoverStart={() => setHoveredCard(card.id)}
            onHoverEnd={() => setHoveredCard(null)}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"
              initial={{ opacity: 0.6 }}
              animate={{
                opacity: hoveredCard === card.id ? 0.8 : 0.6,
              }}
              transition={{ duration: 0.3 }}
            />

            <motion.div
              className="absolute bottom-0 left-0 right-0 z-20 p-3 sm:p-4 md:p-5 flex items-center gap-2 sm:gap-3 md:gap-4"
              initial={{ y: 0 }}
              animate={{
                y: hoveredCard === card.id ? -5 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-white bg-gray-800 flex items-center justify-center flex-shrink-0"
                animate={{
                  scale: hoveredCard === card.id ? 1.1 : 1,
                  rotate: hoveredCard === card.id ? 10 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <User className="text-white w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
              </motion.div>

              <div className="min-w-0">
                <motion.p
                  className="text-white font-medium text-sm sm:text-base md:text-lg truncate"
                  animate={{
                    scale: hoveredCard === card.id ? 1.05 : 1,
                    x: hoveredCard === card.id ? 3 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {card.photographer}
                </motion.p>
                <motion.p
                  className="text-gray-300 text-xs sm:text-sm md:text-base truncate"
                  animate={{
                    scale: hoveredCard === card.id ? 1.05 : 1,
                    x: hoveredCard === card.id ? 3 : 0,
                  }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                >
                  {card.name}
                </motion.p>
              </div>
            </motion.div>

            {hoveredCard === card.id && (
              <motion.div
                className="absolute inset-0 z-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 mix-blend-overlay" />
                <div className="absolute -inset-[100px] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_60%)]" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

