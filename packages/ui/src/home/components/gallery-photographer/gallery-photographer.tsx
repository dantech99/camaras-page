"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { User } from "lucide-react"

export function GalleryPhotographer() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>(0)

  const cosplayCards = [
    {
      id: 1,
      backgroundColor: "bg-linear-to-r from-red-500 to-red-700",
      photographer: "Cosplay Photographer",
      name: "Leslie Alexander",
    },
    {
      id: 2,
      backgroundColor: "bg-linear-to-r from-purple-500 to-purple-700",
      photographer: "Cosplay Photographer",
      name: "Leslie Alexander",
    },
    {
      id: 3,
      backgroundColor: "bg-linear-to-r from-blue-500 to-blue-700",
      photographer: "Cosplay Photographer",
      name: "Leslie Alexander",
    },
    {
      id: 4,
      backgroundColor: "bg-linear-to-r from-green-500 to-green-700",
      photographer: "Cosplay Photographer",
      name: "Leslie Alexander",
    },
    {
      id: 5,
      backgroundColor: "bg-linear-to-r from-yellow-500 to-yellow-700",
      photographer: "Cosplay Photographer",
      name: "Leslie Alexander",
    },
    {
      id: 6,
      backgroundColor: "bg-linear-to-r from-pink-500 to-pink-700",
      photographer: "Cosplay Photographer",
      name: "Leslie Alexander",
    },
  ]

  // Cambiar al siguiente slide
  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % cosplayCards.length)
  }

  // Cambiar al slide anterior
  const prevSlide = () => {
    setActiveIndex((current) => (current === 0 ? cosplayCards.length - 1 : current - 1))
  }

  // Efecto para el slider automático
  useEffect(() => {
    if (isPaused || isDragging) return

    const interval = setInterval(() => {
      nextSlide()
    }, 3000)

    return () => clearInterval(interval)
  }, [isPaused, isDragging, cosplayCards.length])

  // Función para animar el arrastre con requestAnimationFrame
  const animateDrag = () => {
    if (!carouselRef.current) return

    const x = -activeIndex * 100 + dragOffset
    carouselRef.current.style.transform = `translateX(${x}%)`

    animationRef.current = requestAnimationFrame(animateDrag)
  }

  // Funciones para el arrastre (swipe) con mejor rendimiento
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true)
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
    setCurrentX(e.touches[0].clientX)
    setDragOffset(0)

    // Iniciar animación fluida
    cancelAnimationFrame(animationRef.current)
    animationRef.current = requestAnimationFrame(animateDrag)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return

    const touchX = e.touches[0].clientX
    setCurrentX(touchX)

    // Calcular el desplazamiento con resistencia en los extremos
    const containerWidth = carouselRef.current?.offsetWidth || 1
    const rawOffset = ((touchX - startX) / containerWidth) * 100

    // Añadir resistencia en los extremos
    if ((activeIndex === 0 && rawOffset > 0) || (activeIndex === cosplayCards.length - 1 && rawOffset < 0)) {
      setDragOffset(rawOffset * 0.3) // Resistencia
    } else {
      setDragOffset(rawOffset)
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    cancelAnimationFrame(animationRef.current)

    // Determinar si cambiar de slide basado en la distancia arrastrada
    const threshold = 15 // 15% del ancho

    if (dragOffset > threshold && activeIndex > 0) {
      // Arrastrado hacia la derecha (mostrar slide anterior)
      setActiveIndex(activeIndex - 1)
    } else if (dragOffset < -threshold && activeIndex < cosplayCards.length - 1) {
      // Arrastrado hacia la izquierda (mostrar slide siguiente)
      setActiveIndex(activeIndex + 1)
    }

    // Resetear el offset
    setDragOffset(0)

    // Reanudar el carrusel automático después de un momento
    setTimeout(() => {
      setIsPaused(false)
    }, 1000)
  }

  // Asegurar que la transición se aplique correctamente
  useEffect(() => {
    if (!carouselRef.current || isDragging) return

    carouselRef.current.style.transition = "transform 500ms cubic-bezier(0.25, 1, 0.5, 1)"
    carouselRef.current.style.transform = `translateX(-${activeIndex * 100}%)`

    // Quitar la transición después de completarse
    const onTransitionEnd = () => {
      if (!isDragging && carouselRef.current) {
        carouselRef.current.style.transition = ""
      }
    }

    carouselRef.current.addEventListener("transitionend", onTransitionEnd)

    return () => {
      carouselRef.current?.removeEventListener("transitionend", onTransitionEnd)
    }
  }, [activeIndex, isDragging])

  // Limpiar animación al desmontar
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className="w-full bg-slate-900 p-4 sm:p-6 md:p-8">
      <div className="max-w-[2000px] mx-auto">
        {/* Móvil: Carrusel con arrastre mejorado */}
        <div className="sm:hidden">
          {/* Contenedor del carrusel */}
          <div
            className="relative overflow-hidden rounded-lg touch-pan-y"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              ref={carouselRef}
              className="flex will-change-transform"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {cosplayCards.map((card, index) => (
                <div
                  key={card.id}
                  className="w-full shrink-0 px-1"
                  style={{
                    opacity: isDragging ? 1 : index === activeIndex ? 1 : 0.8,
                    scale: isDragging ? 1 : index === activeIndex ? 1 : 0.95,
                    transition: "opacity 500ms, scale 500ms",
                  }}
                >
                  <div
                    className={`${card.backgroundColor} w-full aspect-16/7 rounded-lg relative overflow-hidden`}
                    style={{
                      boxShadow: index === activeIndex ? "0 10px 25px -5px rgba(0, 0, 0, 0.3)" : "none",
                      transition: "box-shadow 500ms",
                    }}
                  >
                    {/* Efecto de paralaje en el fondo */}
                    <div
                      className="absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-transparent"
                      style={{
                        transform: isDragging ? `translateX(${dragOffset * -0.1}%)` : "translateX(0%)",
                        transition: isDragging ? "none" : "transform 500ms",
                      }}
                    />

                    <div
                      className="absolute bottom-0 left-0 right-0 p-3 flex items-center gap-2"
                      style={{
                        transform: isDragging ? `translateX(${dragOffset * 0.05}%)` : "translateX(0%)",
                        transition: isDragging ? "none" : "transform 500ms",
                      }}
                    >
                      <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center border-2 border-white">
                        <User className="text-white w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{card.photographer}</p>
                        <p className="text-gray-300 text-xs">{card.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicadores mejorados */}
          <div className="flex justify-center gap-2 mt-4">
            {cosplayCards.map((_, index) => (
              <button
                type="button"
                key={`${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className="relative group"
                aria-label={`Ir al slide ${index + 1}`}
              >
                <span
                  className={`block w-3 h-3 rounded-full transition-all duration-300 ${
                    activeIndex === index ? "bg-white scale-100" : "bg-white/40 scale-75 group-hover:bg-white/60"
                  }`}
                />
                {activeIndex === index && (
                  <span className="absolute inset-0 bg-white/30 rounded-full animate-ping"/>
                )}
              </button>
            ))}
          </div>

          {/* Instrucción de arrastre */}
          {/* <p className="text-white/70 text-xs text-center mt-2 animate-pulse">Desliza para explorar</p> */}
        </div>

        {/* Tablet y Desktop: Grid original */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {cosplayCards.map((card) => (
            <div
              key={card.id}
              className={`${card.backgroundColor} aspect-16/7 rounded-lg relative overflow-hidden hover:scale-[1.02] transition-transform duration-300`}
            >
              <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-transparent"/>
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
                <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-white bg-gray-800 flex items-center justify-center shrink-0">
                  <User className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                <div className="min-w-0">
                  <p className="text-white font-medium text-sm sm:text-base truncate">{card.photographer}</p>
                  <p className="text-gray-300 text-xs sm:text-sm truncate">{card.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

