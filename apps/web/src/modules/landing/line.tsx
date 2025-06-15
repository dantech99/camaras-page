"use client"

import { motion } from "framer-motion";
import { ChevronsLeft } from "lucide-react";

const phrases = [
    "UNA CALIDAD INIGUALABLE EN CADA TRABAJO",
    "CONOCE LA MEJOR CALIDAD",
    "LOS MEJORES FOTOGRAFÓS DE LA CIUDAD",
    "SATISFACCIÓN GARANTIZADA"
]

export function Line() {
    return (
        <div className="w-full overflow-hidden bg-primary-blue py-8">
            <motion.div
                className="flex whitespace-nowrap items-center"
                animate={{
                    x: [0, "-50%"]
                }}
                transition={{
                    duration: 20,
                    ease: "linear",
                    repeat: Infinity
                }}
                style={{
                    fontSize: "clamp(1rem, 4vw, 3rem)",
                    fontWeight: "bold",
                    letterSpacing: "0.1em"
                }}
            >
                {Array.from({ length: 2 }).map((_, index) => (
                    <div key={index} className="flex items-center">
                        {phrases.map((phrase, phraseIndex) => (
                            <div key={phraseIndex} className="flex items-center">
                                <span className="px-4 font-unbounded tracking-tighter">{phrase}</span>
                                <ChevronsLeft className="mx-4" size={32} />
                            </div>
                        ))}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}