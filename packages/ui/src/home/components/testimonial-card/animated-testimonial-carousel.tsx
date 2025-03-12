"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation, AnimatePresence, type PanInfo } from "framer-motion"
import { useMediaQuery } from "./hooks/use-media-query"
import { TestimonialCard } from "./testimonial-card"

// Movido desde testimonial-data.ts
export interface Testimonial {
  id: number
  name: string
  rating: number
  quote: string
  date: string
  location: string
  event: string
  avatar: string
}

// Datos de testimonios movidos desde testimonial-data.ts
const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 4,
    quote:
      "The conference was absolutely amazing! The speakers were engaging and I learned so much that I can apply to my work immediately. Would definitely recommend to colleagues.",
    date: "May 15, 2025",
    location: "San Francisco",
    event: "Tech Summit 2025",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "David Chen",
    rating: 5,
    quote:
      "This workshop exceeded all my expectations. The hands-on approach and personalized feedback made it an invaluable experience for my professional development.",
    date: "April 3, 2025",
    location: "New York",
    event: "Design Workshop",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    rating: 5,
    quote:
      "The networking opportunities alone were worth attending. I connected with industry leaders and found potential collaborators for upcoming projects.",
    date: "June 22, 2025",
    location: "Chicago",
    event: "Business Expo",
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

export default function AnimatedTestimonialCarousel() {
  const controls = useAnimation()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  // Start animation when component mounts
  useEffect(() => {
    controls.start("visible")
  }, [controls])

  // Handle automatic slider for mobile view
  useEffect(() => {
    if (isMobile) {
      startAutoplay()
    } else {
      stopAutoplay()
    }

    return () => stopAutoplay()
  }, [isMobile, currentIndex])

  const startAutoplay = () => {
    stopAutoplay()
    autoplayRef.current = setTimeout(() => {
      const nextIndex = (currentIndex + 1) % testimonialData.length
      setDirection(1)
      setCurrentIndex(nextIndex)
    }, 5000) // Change slide every 5 seconds
  }

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current)
      autoplayRef.current = null
    }
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false)

    // If the user has dragged more than 100px horizontally
    if (Math.abs(info.offset.x) > 100) {
      stopAutoplay()

      if (info.offset.x > 0) {
        // Dragged right, go to previous
        setDirection(-1)
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonialData.length - 1 : prevIndex - 1))
      } else {
        // Dragged left, go to next
        setDirection(1)
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialData.length)
      }
    }

    // Restart autoplay after user interaction
    startAutoplay()
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const sliderVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -500 : 500,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    }),
  }

  const indicatorVariants = {
    inactive: { scale: 0.7, opacity: 0.5 },
    active: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 10 },
    },
  }

  return (
    <div className="min-h-[50dhv] py-6 sm:py-12 px-3 sm:px-4 flex items-center justify-center">
      {isMobile ? (
        <div className="w-full max-w-md mx-auto">
          <div className="relative overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={sliderVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragStart={() => {
                  setIsDragging(true)
                  stopAutoplay()
                }}
                onDragEnd={handleDragEnd}
                whileTap={{ cursor: "grabbing" }}
              >
                <TestimonialCard testimonial={testimonialData[currentIndex]} isMobile={isMobile} />
              </motion.div>
            </AnimatePresence>

            {/* Swipe instruction hint - shows briefly on first load */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.7, 0], transition: { delay: 1, duration: 2 } }}
            >
              <div className="bg-black/40 text-white px-4 py-2 rounded-full text-sm">Desliza para ver más</div>
            </motion.div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-4 gap-2">
            {testimonialData.map((_, index) => (
              <motion.button
                key={`${index + 1}`}
                className={'w-2.5 h-2.5 rounded-full bg-purple-600'}
                variants={indicatorVariants}
                animate={currentIndex === index ? "active" : "inactive"}
                onClick={() => {
                  stopAutoplay()
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                  startAutoplay()
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 max-w-7xl mx-auto w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {testimonialData.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} isMobile={isMobile} />
          ))}
        </motion.div>
      )}
    </div>
  )
}

