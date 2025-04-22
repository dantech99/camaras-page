"use client"

import { useState, useEffect } from "react"
import { Button } from "@camaras/ui/src/components/button"
// Imágenes de ejemplo - puedes reemplazarlas con tus propias URLs
const images = [
    "/images/about-us/1.webp",
    "/images/about-us/2.webp",
    "/images/about-us/3.webp",
]

export function AboutLanding() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false)

    // Cambiar imagen con una transición suave cada 5 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true)
            setTimeout(() => {
                let newIndex: number
                do {
                    newIndex = Math.floor(Math.random() * images.length)
                } while (newIndex === currentImageIndex && images.length > 1)
                setCurrentImageIndex(newIndex)
                setTimeout(() => setIsTransitioning(false), 50)
            }, 500)
        }, 5000)

        return () => clearInterval(interval)
    }, [currentImageIndex])

    return (
        <section className="flex items-center justify-center w-full py-16 px-6 sm:px-8 md:px-12">
            <div className="container max-w-8xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 lg:gap-20">
                    {/* Contenedor de imagen con mejor transición usando solo Tailwind */}
                    <div className="w-full md:w-2/5 mb-8 md:mb-0 mx-auto md:mx-0 max-w-sm">
                        <div className="overflow-hidden rounded-2xl aspect-square shadow-lg shadow-primary/20 border border-primary/10">
                            <div className="relative w-full h-full">
                                <img
                                    src={images[currentImageIndex] || "/placeholder.svg"}
                                    alt="Cosplay photography"
                                    className={`w-full h-full object-cover transition-all duration-1000 ease-in-out ${isTransitioning ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contenido de texto con mejor espaciado */}
                    <div className="w-full md:w-3/5 text-white space-y-5">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold flex flex-wrap items-center">
                            <span>¿Quienes </span>
                            <span className="text-primary mx-2 relative inline-block animate-pulse">
                                somos
                                <span className="absolute -top-1 -right-1 text-xs text-primary animate-spin">✦</span>
                                <span className="absolute -bottom-1 -left-2 text-xs text-primary animate-bounce">✦</span>
                            </span>
                            <span>?</span>
                        </h2>

                        <p className="text-base sm:text-lg opacity-90">
                            At Las Cámaras del Dragón, we are a passionate team of professional photographers dedicated to capturing
                            the unforgettable moments at SOFA, one of the most vibrant and exciting geek culture events in Latin
                            America. Our mission is simple – to immortalize the energy, creativity, and excitement of every cosplayer,
                            fan.
                        </p>

                        <p className="text-base sm:text-lg opacity-90">
                            Whether you're showcasing an intricate cosplay, posing with friends, or simply soaking in the electric
                            atmosphere of the event, we strive to capture your essence in every shot.
                        </p>

                        {/* Botón "Saber Más" con animación en Tailwind */}
                        <Button className="mt-4 cursor-pointer">
                            Saber más
                            <span className="inline-block transition-transform duration-300 animate-bounce-x">
                                →
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

