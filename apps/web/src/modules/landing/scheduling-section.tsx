"use client"

import { motion } from "framer-motion"
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@camaras/ui/src/components/button"
import { CalendarFold } from "lucide-react";

export function SchedulingSection() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-8">
      <div className="text-center mb-8 md:mb-12 space-y-2 md:space-y-4 w-full max-w-7xl">
        {/* First line: YOU WISH TO */}
        <div className="flex justify-center">
          <div className="relative overflow-hidden inline-block">
            <motion.h1
              className="font-medium font-unbounded text-primary-blue text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-wide"
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.35 }}
            >
              ¿QUIERES AGENDAR
            </motion.h1>

            {/* Animated stripe for first line */}
            <motion.div
              className="absolute inset-0 bg-primary-blue"
              initial={{ x: "0%" }}
              whileInView={{
                x: ["0%", "-100%", "-100%"],
                opacity: [1, 1, 0],
              }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                delay: 0,
                duration: 1.2,
                times: [0, 0.95, 1],
                ease: [0.25, 0.1, 0.25, 1],
              }}
            />
          </div>
        </div>

        {/* Second line: BECOME */}
        <div className="flex justify-center">
          <div className="relative overflow-hidden inline-block">
            <motion.h1
              className="font-medium font-unbounded text-primary-blue text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-wide"
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.35 }}
            >
              TU SESIÓN CON 
            </motion.h1>

            {/* Animated stripe for second line */}
            <motion.div
              className="absolute inset-0 bg-primary-blue"
              initial={{ x: "0%" }}
              whileInView={{
                x: ["0%", "-100%", "-100%"],
                opacity: [1, 1, 0],
              }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                delay: 0.8,
                duration: 1.2,
                times: [0, 0.95, 1],
                ease: [0.25, 0.1, 0.25, 1],
              }}
            />
          </div>
        </div>

        {/* Third line: PARTNER? */}
        <div className="flex justify-center mt-4 md:mt-8">
          <div className="relative overflow-hidden inline-block">
            <motion.h1
              className="font-bold font-unbounded text-primary-blue text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl tracking-wider"
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.35 }}
            >
              NOSOTROS?
            </motion.h1>

            {/* Animated stripe for NOSOTROS? */}
            <motion.div
              className="absolute inset-0 bg-primary-blue"
              initial={{ x: "0%" }}
              whileInView={{
                x: ["0%", "-100%", "-100%"],
                opacity: [1, 1, 0],
              }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                delay: 1.5,
                duration: 1,
                times: [0, 0.95, 1],
                ease: [0.25, 0.1, 0.25, 1],
              }}
            />
          </div>
        </div>
      </div>

      <motion.div
        className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <Button
          variant="outline"
          size="lg"
          className="bg-transparent border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-black px-4 md:px-8 py-3 text-xs sm:text-sm font-medium tracking-wide focus:outline-none focus:ring-0 focus:border-primary-blue"
        >
          <FaWhatsapp />

          CONTACTANOS
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="bg-transparent border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-black px-4 md:px-8 py-3 text-xs sm:text-sm font-medium tracking-wide focus:outline-none focus:ring-0 focus:border-primary-blue"
        >
          <CalendarFold />
          AGENDAR
        </Button>
      </motion.div>
    </div>
  )
}
