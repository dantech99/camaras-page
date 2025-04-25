"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { cn } from "@camaras/ui/src/lib/utils";

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const slides = [
    {
      id: 1,
      image: "/images/slider-hero/1.webp",
      title: "Transform Your Digital Experience",
      description: "Create stunning websites with our innovative platform",
    },
    {
      id: 2,
      image: "/images/slider-hero/2.webp",
      title: "Build Without Limits",
      description: "Powerful tools for modern web development",
    },
    {
      id: 3,
      image: "/images/slider-hero/3.webp",
      title: "Design for the Future",
      description: "Stay ahead with cutting-edge technology",
    },
  ];

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, slides.length]);

  const nextSlide = () => {
    setAutoplay(false);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setAutoplay(false);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setAutoplay(false);
    setCurrentSlide(index);
  };

  const dragControls = useDragControls();

  const handleDragEnd = (event: any, info: any) => {
    setAutoplay(false);
    if (info.offset.x > 100) {
      prevSlide();
    } else if (info.offset.x < -100) {
      nextSlide();
    }
  };

  return (
    <div className="relative h-[50vh] w-full overflow-hidden sm:h-[60dvh] md:h-[70dvh] lg:h-[100dvh]">
      {/* Futuristic background grid */}
      <div className="absolute inset-0 z-0 bg-black bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.3)_0,rgba(0,0,0,0.8)_100%)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.4)_3px,transparent_3px),linear-gradient(to_bottom,rgba(0,0,0,0.4)_3px,transparent_3px)] bg-[size:40px_40px]"></div>
      </div>

      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="relative h-full w-full"
          drag="x"
          dragControls={dragControls}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        >
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            fill
            priority
            className="object-cover"
            draggable="false"
          />

          {/* Overlay with futuristic gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>

          {/* Glowing accent lines */}
          <div className="absolute bottom-0 left-0 h-[1px] w-full bg-linear-to-r from-transparent via-cyan-500/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 h-full w-[1px] bg-linear-to-b from-transparent via-cyan-500/30 to-transparent"></div>
          <div className="absolute right-0 top-0 h-full w-[1px] bg-linear-to-b from-transparent via-cyan-500/30 to-transparent"></div>

          {/* Content */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute bottom-0 left-0 z-10 w-full p-6 md:p-10 lg:p-16 max-w-8xl mx-auto"
          >
            <div className="max-w-3xl">
              <h2 className="mb-1 font-mono text-sm uppercase tracking-wider text-cyan-400 md:text-base">
                <span className="mr-2 inline-block">{">"}</span>
                {`0${currentSlide + 1}`}
              </h2>
              <h1 className="mb-2 font-sans text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                {slides[currentSlide].title}
              </h1>
              <p className="max-w-xl text-sm text-gray-300 md:text-base">
                {slides[currentSlide].description}
              </p>

              {/* Futuristic button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 flex items-center gap-2 rounded-full border border-cyan-500/50 bg-black/50 px-4 py-2 font-mono text-sm text-cyan-400 backdrop-blur-xs transition-colors hover:bg-cyan-950/30 md:mt-6 cursor-pointer"
              >
                Explorar
                <span className="ml-1 inline-block h-[1px] w-4 bg-cyan-400"></span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-20 mx-auto flex justify-center gap-2 md:bottom-10 lg:bottom-16">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "group relative h-1 w-6 overflow-hidden rounded-full md:w-8 lg:w-12",
              currentSlide === index ? "bg-cyan-500" : "bg-white/30"
            )}
            aria-label={`Ir al slide ${index + 1}`}
          >
            <span
              className={cn(
                "absolute left-0 top-0 h-full w-full transform bg-cyan-400 transition-transform duration-5000 ease-linear",
                currentSlide === index && autoplay
                  ? "translate-x-0"
                  : "-translate-x-full"
              )}
            />
          </button>
        ))}
      </div>

      {/* Futuristic decorative elements */}
      <div className="pointer-events-none absolute left-6 top-6 z-10 hidden md:block lg:left-16 lg:top-16">
        <div className="flex items-center gap-2">
          <div className="h-[1px] w-6 bg-cyan-500/70"></div>
          <div className="h-2 w-2 rounded-full bg-cyan-500/70"></div>
        </div>
      </div>
      <div className="pointer-events-none absolute right-6 top-6 z-10 hidden md:block lg:right-16 lg:top-16">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-cyan-500/70"></div>
          <div className="h-[1px] w-6 bg-cyan-500/70"></div>
        </div>
      </div>
    </div>
  );
};
