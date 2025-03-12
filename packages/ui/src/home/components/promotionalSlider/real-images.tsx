"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, useAnimationControls } from "framer-motion"

// Using the actual images from the provided example
const topRowImages = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-flKkvbC5FGNKguqy2iwUtkCTwmP7Cn.png#xywh=22,28,178,118",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-flKkvbC5FGNKguqy2iwUtkCTwmP7Cn.png#xywh=195,28,178,118",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-flKkvbC5FGNKguqy2iwUtkCTwmP7Cn.png#xywh=417,28,178,118",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-flKkvbC5FGNKguqy2iwUtkCTwmP7Cn.png#xywh=639,28,178,118",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-flKkvbC5FGNKguqy2iwUtkCTwmP7Cn.png#xywh=861,28,178,118",
]

const bottomRowImages = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-flKkvbC5FGNKguqy2iwUtkCTwmP7Cn.png#xywh=22,186,178,118",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-flKkvbC5FGNKguqy2iwUtkCTwmP7Cn.png#xywh=195,186,178,118",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-flKkvbC5FGNKguqy2iwUtkCTwmP7Cn.png#xywh=417,186,178,118",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-flKkvbC5FGNKguqy2iwUtkCTwmP7Cn.png#xywh=639,186,178,118",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-flKkvbC5FGNKguqy2iwUtkCTwmP7Cn.png#xywh=861,186,178,118",
]

export default function CosplayGalleryWithRealImages() {
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
            x: [0, -width * 2],
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
              className="relative min-w-[120px] w-[120px] h-[80px] sm:min-w-[180px] sm:w-[180px] sm:h-[120px] md:min-w-[240px] md:w-[240px] md:h-[160px] rounded-md overflow-hidden flex-shrink-0"
            >
              <Image src={src || "/placeholder.svg"} alt={`Cosplay image ${index + 1}`} fill className="object-cover" />
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
              className="relative min-w-[120px] w-[120px] h-[80px] sm:min-w-[180px] sm:w-[180px] sm:h-[120px] md:min-w-[240px] md:w-[240px] md:h-[160px] rounded-md overflow-hidden flex-shrink-0"
            >
              <Image src={src || "/placeholder.svg"} alt={`Cosplay image ${index + 6}`} fill className="object-cover" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

