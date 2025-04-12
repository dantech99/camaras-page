"use client";

import { motion } from "framer-motion";

interface DisabledButtonProps {
  tag: React.ReactNode;
  children: React.ReactNode;
  statusAlert: string;
}

export function DisabledButton({ children, tag, statusAlert }: DisabledButtonProps) {
  return (
    <div className="flex items-center justify-center min-h-[300px] bg-black p-6">
      <div className="relative">
        {/* Disabled button - Similar appearance but muted */}
        <motion.div
          className="relative overflow-hidden rounded-full bg-black/80 px-6 py-3 text-white cursor-not-allowed border-2 border-[#0070f3]/30 opacity-70 z-10"
          initial={{
            boxShadow: "0 0 10px 1px rgba(0, 112, 243, 0.15)",
          }}
        >
          {/* Subtle shimmer effect - much less pronounced */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
            animate={{
              x: ["0%", "100%"],
              opacity: [0, 0.1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 3,
            }}
            style={{ width: "200%", left: "-50%" }}
          />

          {/* Button content - Muted colors */}
          <div className="flex items-center space-x-2 relative z-10">
            <span className="font-bold text-[#0070f3]/50">{tag}</span>
            <span className="text-gray-400">{children}</span>
          </div>

          {/* Disabled overlay with subtle pattern */}
          <div
            className="absolute inset-0 bg-black/10 z-20"
            style={{
              backgroundImage:
                "radial-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px)",
              backgroundSize: "4px 4px",
            }}
          />
        </motion.div>

        {/* Disabled message that appears on hover */}
        <motion.div
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 pointer-events-none"
          whileHover={{ opacity: 1, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          {statusAlert}
        </motion.div>
      </div>
    </div>
  );
}
