"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimationControls, AnimatePresence } from "framer-motion";

interface AnimatedButtonProps {
  children: React.ReactNode;
  tag: (()=>React.ReactElement) | string;
}

export function AnimatedButton({ children, tag }: AnimatedButtonProps ) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const particleControls = useAnimationControls();
  const rippleControls = useAnimationControls();

  // Trigger a pulse animation periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered && !isPressed) {
        controls.start({
          scale: [1, 1.02, 1],
          borderColor: [
            "rgba(0, 112, 243, 0.6)",
            "rgba(0, 112, 243, 1)",
            "rgba(0, 112, 243, 0.6)",
          ],
          transition: {
            duration: 2,
            ease: "easeInOut",
          },
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [controls, isHovered, isPressed]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    controls.start({
      scale: 1.03,
      boxShadow: "0 0 20px 5px rgba(0, 112, 243, 0.5)",
      borderColor: "rgba(0, 112, 243, 1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    });

    // Trigger particle animation
    particleControls.start({
      opacity: 1,
      transition: { duration: 0.2 },
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    controls.start({
      scale: 1,
      boxShadow: "0 0 15px 2px rgba(0, 112, 243, 0.3)",
      borderColor: "rgba(0, 112, 243, 0.6)",
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25,
      },
    });

    // Hide particles
    particleControls.start({
      opacity: 0,
      transition: { duration: 0.5 },
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      // Calculate click position relative to the button
      setClickPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }

    setIsPressed(true);
    controls.start({
      scale: 0.97,
      boxShadow: "0 0 25px 5px rgba(0, 112, 243, 0.6)",
      transition: {
        type: "spring",
        stiffness: 700,
        damping: 15,
      },
    });

    // Start ripple effect
    rippleControls.set({
      opacity: 1,
      scale: 0,
    });
    rippleControls.start({
      scale: 4,
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    });

    // Create click burst effect
    particleControls.set({
      opacity: 1,
    });
    particleControls.start({
      opacity: 1,
      transition: { duration: 0.1 },
    });
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    if (isHovered) {
      controls.start({
        scale: 1.03,
        boxShadow: "0 0 20px 5px rgba(0, 112, 243, 0.5)",
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 10,
        },
      });
    } else {
      controls.start({
        scale: 1,
        boxShadow: "0 0 15px 2px rgba(0, 112, 243, 0.3)",
        transition: {
          type: "spring",
          stiffness: 500,
          damping: 25,
        },
      });
    }
  };

  // Generate random particles for hover effect
  const hoverParticles = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    x: Math.random() * 150 - 75,
    y: Math.random() * 150 - 75,
    scale: Math.random() * 0.4 + 0.3,
    duration: Math.random() * 0.8 + 0.5,
  }));

  // Generate burst particles for click effect
  const burstParticles = Array.from({ length: 12 }).map((_, i) => {
    const angle = (i / 12) * Math.PI * 2;
    const distance = Math.random() * 80 + 40;
    return {
      id: i + 100, // Different IDs from hover particles
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      scale: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 0.5 + 0.3,
      rotation: Math.random() * 360,
    };
  });

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        {/* Main button - Keeping it very similar to the original */}
        <motion.div
          ref={buttonRef}
          className="relative overflow-hidden rounded-full bg-black px-6 py-3 text-white cursor-pointer border-2 border-[#0070f3] z-10"
          animate={controls}
          initial={{
            boxShadow: "0 0 15px 2px rgba(0, 112, 243, 0.3)",
            borderColor: "rgba(0, 112, 243, 0.6)",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
            animate={{
              x: ["0%", "100%"],
              opacity: [0, 0.2, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 1.5,
            }}
            style={{ width: "200%", left: "-50%" }}
          />

          {/* Ripple effect on click */}
          <motion.div
            className="absolute rounded-full bg-[#0070f3]/30"
            style={{
              width: 20,
              height: 20,
              top: clickPosition.y - 10,
              left: clickPosition.x - 10,
              transformOrigin: "center center",
            }}
            animate={rippleControls}
            initial={{ opacity: 0, scale: 0 }}
          />

          {/* Button content - Keeping the original layout */}
          <div className="flex items-center space-x-2 relative z-10">
            <motion.span
              className="font-bold text-[#0070f3]"
              animate={{
                textShadow: isHovered
                  ? [
                      "0 0 5px rgba(0, 112, 243, 0.5)",
                      "0 0 10px rgba(0, 112, 243, 0.8)",
                      "0 0 5px rgba(0, 112, 243, 0.5)",
                    ]
                  : "0 0 5px rgba(0, 112, 243, 0.3)",
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              {typeof tag === "string" ? tag : tag()}
            </motion.span>
            <motion.span
              className="text-gray-300"
              animate={{
                y: isPressed ? 1 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 10,
              }}
            >
              {children}
            </motion.span>
          </div>
        </motion.div>

        {/* Hover particles */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={particleControls}
          initial={{ opacity: 0 }}
        >
          <AnimatePresence>
            {isHovered &&
              hoverParticles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute w-2 h-2 rounded-full bg-blue-400"
                  initial={{
                    x: 0,
                    y: 0,
                    scale: 0,
                    opacity: 0.7,
                  }}
                  animate={{
                    x: particle.x,
                    y: particle.y,
                    scale: particle.scale,
                    opacity: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{
                    duration: particle.duration,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                  style={{
                    left: "50%",
                    top: "50%",
                  }}
                />
              ))}
          </AnimatePresence>

          {/* Click burst particles */}
          <AnimatePresence>
            {isPressed &&
              burstParticles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute bg-blue-400"
                  initial={{
                    x: 0,
                    y: 0,
                    scale: 0,
                    opacity: 1,
                    width: Math.random() * 6 + 2,
                    height: Math.random() * 6 + 2,
                    borderRadius: Math.random() > 0.5 ? "50%" : "0%",
                  }}
                  animate={{
                    x: particle.x,
                    y: particle.y,
                    scale: particle.scale,
                    opacity: 0,
                    rotate: particle.rotation,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{
                    duration: particle.duration,
                    ease: "easeOut",
                  }}
                  style={{
                    left: clickPosition.x,
                    top: clickPosition.y,
                    boxShadow: "0 0 4px rgba(0, 112, 243, 0.8)",
                  }}
                />
              ))}
          </AnimatePresence>
        </motion.div>

        {/* Flash effect on click */}
        <AnimatePresence>
          {isPressed && (
            <motion.div
              className="absolute inset-0 bg-[#0070f3]/20 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
