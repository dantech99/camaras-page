"use client"

import { motion } from "framer-motion"
import { Star, StarHalf } from "lucide-react"
import type { Testimonial } from "./animated-testimonial-carousel"

interface TestimonialCardProps {
  testimonial: Testimonial
  isMobile: boolean
}

export function TestimonialCard({ testimonial, isMobile }: TestimonialCardProps) {
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  }

  const starVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -30 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    }),
    hover: {
      scale: [1, 1.2, 1],
      rotate: [0, 15, -15, 0],
      filter: [
        "drop-shadow(0 0 0px rgba(255, 215, 0, 0))",
        "drop-shadow(0 0 3px rgba(255, 215, 0, 0.7))",
        "drop-shadow(0 0 0px rgba(255, 215, 0, 0))",
      ],
      transition: {
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "mirror",
      },
    },
  }

  return (
    <motion.div
      className="bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-md sm:shadow-lg p-4 sm:p-6 flex flex-col relative h-full"
      variants={cardVariants}
      whileHover={!isMobile ? "hover" : undefined}
    >
      <div className="flex items-start mb-3 sm:mb-4">
        <div className="relative">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-purple-100">
            <img
              src={testimonial.avatar || "/placeholder.svg"}
              alt={testimonial.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="ml-3 sm:ml-4 flex-1">
          <h3 className="font-bold text-base sm:text-lg text-gray-800">{testimonial.name}</h3>
          <div className="flex mt-0.5 sm:mt-1 relative">
            {[...Array(5)].map((_, i) => (
              <motion.div key={`${i + 1}_TestimonialCard`} custom={i} variants={starVariants} whileHover="hover" className="relative z-10">
                {i < Math.floor(testimonial.rating) ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{
                      scale: 1,
                      transition: { delay: 0.5 + i * 0.1, type: "spring" },
                    }}
                  >
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0, 0.8, 0],
                        scale: [0.8, 1.2, 1],
                        transition: {
                          delay: 0.7 + i * 0.15,
                          duration: 1,
                          ease: "easeOut",
                        },
                      }}
                    >
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-yellow-200 opacity-50 blur-xs" />
                    </motion.div>
                  </motion.div>
                ) : i < testimonial.rating ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{
                      scale: 1,
                      transition: { delay: 0.5 + i * 0.1, type: "spring" },
                    }}
                  >
                    <StarHalf className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                  </motion.div>
                ) : (
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <blockquote className="text-xs sm:text-sm text-gray-600 italic mb-3 sm:mb-4 grow">
        "{testimonial.quote}"
      </blockquote>

      <div className="mt-auto">
        <div className="flex justify-between items-center text-[11px] sm:text-xs text-gray-500">
          <div>
            <p>{testimonial.date}</p>
            <p className="text-purple-600 font-medium">{testimonial.location}</p>
          </div>
          <motion.span
            className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium"
            whileHover={{
              scale: 1.05,
              backgroundColor: "#dbeafe",
              transition: { duration: 0.2 },
            }}
          >
            {testimonial.event}
          </motion.span>
        </div>
      </div>
    </motion.div>
  )
}

