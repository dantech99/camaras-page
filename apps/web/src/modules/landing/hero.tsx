"use client"

import { useCountdown } from "@/hooks/use-countdown";
import { useHeroSlider } from "@/hooks/use-hero-slider";

// Calculamos la fecha objetivo una sola vez (8 días y 12 horas desde el 30 de septiembre de 2025)
const TARGET_DATE = new Date('2026-12-08T10:00:00');

export function HeroSection() {
  const timeLeft = useCountdown(TARGET_DATE);
  const { currentImage } = useHeroSlider();

  return (
    <section
      id="hero"
      className="min-h-screen w-full p-4 sm:p-6 md:p-8 flex items-center justify-start relative overflow-hidden"
    >
      {/* Slider de imágenes de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${currentImage})`,
        }}
      />

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/70" />
      <div className="w-full z-10 max-w-7xl mx-auto mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Column - Text and Buttons */}
        <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
          <h1 className="text-lg sm:text-xl font-medium text-[#00FFF0]">
            Las Cámaras del Dragón
          </h1>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight bg-gradient-to-r from-[#FEFFFF] to-[#00C2EE] text-transparent bg-clip-text">
            La Plataforma para Fotógrafos creativos
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto lg:mx-0">
            Conecta con los mejores fotógrafos especializados en cosplay y modeling. Encuentra el paquete perfecto para tu próxima sesión creativa.
          </p>

          {/* Input de consulta de ticket */}
          <div className="pt-4 sm:pt-6 lg:pt-8 justify-center lg:justify-start  mx-auto lg:mx-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Ingresa tu número de ticket"
                className="w-full px-4 py-3 pr-24 rounded-lg bg-white/10 text-white placeholder-white/60 border border-white/20 focus:border-[#00FFF0] focus:ring-2 focus:ring-[#00FFF0]/20 transition-all duration-200 backdrop-blur-sm"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-1 top-1 bottom-1 px-4 py-1 rounded-md bg-[#00FFF0] text-black font-medium hover:bg-[#00FFF0]/90 transition-colors text-sm"
              >
                CONSULTAR
              </button>
            </div>
          </div>

          <div className="flex flex-row gap-4 pt-4 justify-center lg:justify-start border">
            <button
              type="button"
              className="px-4 sm:px-6 py-3 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-colors flex-1"
            >
              CONTÁCTANOS
            </button>
            <button
              type="button"
              className="px-4 sm:px-6 py-3 rounded-lg bg-[#00FFF0] text-black font-medium hover:bg-[#00FFF0]/90 transition-colors flex-1"
            >
              AGENDAR
            </button>
          </div>
        </div>

        {/* Right Column - Countdown Card */}
        <div className="flex justify-center lg:justify-end h-[400px] sm:h-[500px] lg:h-[600px] mt-8 lg:mt-0">
          <div className="bg-black/40 shadow-fuchsia-500/30 overflow-hidden shadow-lg backdrop-blur-sm rounded-2xl w-full max-w-sm flex h-full flex-col items-center justify-between pb-8">
            {/* Imagen arriba del texto y countdown */}
            <div className="flex justify-center w-full flex-shrink-0 h-3/5 sm:h-4/5">
              <img
                src="/images/sofa-logo-largue.png"
                alt="SOFA 2026 Logo"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col items-center space-y-3 sm:space-y-4 h-2/5 sm:h-1/5 justify-center p-3 sm:p-4">
              <h3 className="text-base sm:text-lg font-semibold text-white">SOFA 2026</h3>

              {/* Grid del countdown */}
              <div className="grid grid-cols-4 gap-1 sm:gap-2 lg:gap-3 text-center w-full max-w-[240px] sm:max-w-[260px]">
                <div>
                  <span className="text-lg sm:text-xl font-bold text-white block mb-1">{timeLeft.days}</span>
                  <p className="text-xs text-white/70">DÍAS</p>
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-bold text-white block mb-1">{timeLeft.hours}</span>
                  <p className="text-xs text-white/70">HORAS</p>
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-bold text-white block mb-1">{timeLeft.minutes}</span>
                  <p className="text-xs text-white/70">MIN</p>
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-bold text-white block mb-1">{timeLeft.seconds}</span>
                  <p className="text-xs text-white/70">SEG</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
