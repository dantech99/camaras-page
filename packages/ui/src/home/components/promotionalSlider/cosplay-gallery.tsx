"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, useAnimationControls } from "framer-motion"

// Sample image data - you can replace these with your actual images
const topRowImages = [
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1920",
]

const bottomRowImages = [
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1920",
]

export function CosplayGallery() {
  const [width, setWidth] = useState(0)
  const topRowControls = useAnimationControls()
  const bottomRowControls = useAnimationControls()

  // Calculate the total width of the images for animation
  useEffect(() => {
    // Get the width of the window
    const handleResize = () => {
      const galleryWidth = window.innerWidth
      setWidth(galleryWidth)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Start both animations simultaneously when width is available
  useEffect(() => {
    if (width > 0) {
      const duration = getDuration()

      // Start both animations at the same time
      const startAnimations = async () => {
        await Promise.all([
          topRowControls.start({
            x: [-0, -width * 2],
            transition: {
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              duration: duration,
              ease: "linear",
            },
          }),
          bottomRowControls.start({
            x: [-width * 2, 0],
            transition: {
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              duration: duration,
              ease: "linear",
            },
          }),
        ])
      }

      startAnimations()
    }
  }, [width, topRowControls, bottomRowControls])

  // Calculate animation duration based on screen size
  const getDuration = () => {
    if (width < 640) return 15 // Mobile
    if (width < 1024) return 20 // Tablet
    return 25 // Desktop
  }

  return (
    <div className="w-full py-6 overflow-hidden">
      {/* Top row - slides from right to left infinitely */}
      <div className="mb-4 overflow-hidden">
        <motion.div
          className="flex gap-2 sm:gap-4"
          initial={{ x: 0 }}
          animate={topRowControls}
          style={{
            width: `${width * 3}px`, // Make sure we have enough width for the animation
          }}
        >
          {/* Duplicate the images to create a seamless loop */}
          {[...topRowImages, ...topRowImages, ...topRowImages].map((src, index) => (
            <div
              key={`top-${index + 1}`}
              className="relative min-w-[120px] w-[120px] h-[80px] sm:min-w-[180px] sm:w-[180px] sm:h-[120px] md:min-w-[240px] md:w-[240px] md:h-[160px] rounded-md overflow-hidden shrink-0"
            >
              <img src={src || "/placeholder.svg"} alt={`Cosplay ${index + 1}`} className="object-cover" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom row - slides from left to right infinitely */}
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-2 sm:gap-4"
          initial={{ x: -width * 2 }}
          animate={bottomRowControls}
          style={{
            width: `${width * 3}px`, // Make sure we have enough width for the animation
          }}
        >
          {/* Duplicate the images to create a seamless loop */}
          {[...bottomRowImages, ...bottomRowImages, ...bottomRowImages].map((src, index) => (
            <div
              key={`bottom-${index + 1}`}
              className="relative min-w-[120px] w-[120px] h-[80px] sm:min-w-[180px] sm:w-[180px] sm:h-[120px] md:min-w-[240px] md:w-[240px] md:h-[160px] rounded-md overflow-hidden shrink-0"
            >
              <img src={src || "/placeholder.svg"} alt={`Cosplay ${index + 6}`} className="object-cover" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

