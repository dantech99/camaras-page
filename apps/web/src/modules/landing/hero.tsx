"use client"

import { useCountdown } from "@/hooks/use-countdown";

// Calculamos la fecha objetivo una sola vez (8 días y 12 horas desde el 30 de septiembre de 2025)
const TARGET_DATE = new Date('2025-10-08T12:00:00');

export function HeroSection() {
  const timeLeft = useCountdown(TARGET_DATE);
  return (
    <section 
      id="hero" 
      className="h-screen w-full p-8 flex items-center  justify-start bg-[url(/images/hero-bg.jpg)] bg-cover before:absolute before:inset-0 before:bg-black/50 "
    >
      <div className="w-full z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column - Text and Buttons */}
        <div className="space-y-1">
          <h1 className="text-lg md:text-xl font-medium text-[#00FFF0]">
            Las Cámaras del Dragón
          </h1>
          
            <h2
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold  bg-gradient-to-r from-[#FEFFFF] to-[#00C2EE] text-transparent bg-clip-text"
            >
            La Plataforma para Fotógrafos creativos
            </h2>
          <p className="text-lg md:text-xl text-white/90">
            Conecta con los mejores fotógrafos especializados en cosplay y modeling. Encuentra el paquete perfecto para tu próxima sesión creativa.
          </p>

          <div className="flex gap-4 pt-8">
            <button
              type="button"
              className="px-6 py-3 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
            >
              CONTÁCTANOS
            </button>
            <button
              type="button"
              className="px-6 py-3 rounded-lg bg-[#00FFF0] text-black font-medium hover:bg-[#00FFF0]/90 transition-colors"
            >
              AGENDAR
            </button>
          </div>
        </div>

        {/* Right Column - Countdown Card */}
        <div className="flex justify-center md:justify-end h-[500px]  ">
          <div className="bg-black/40 shadow-fuchsia-500/30 overflow-hidden shadow-lg backdrop-blur-sm  rounded-2xl w-full max-w-md flex h-full flex-col items-center">
            {/* Imagen arriba del texto y countdown */}
            <div className="flex justify-center w-full">
            <img
              src="/images/sofa-logo-largue.png"
              alt="SOFA 2025 Logo"
              className="w-full h-full object-cover mb-6"
            />
            </div>
           
            <h3 className="text-2xl font-semibold text-white mb-8">ACERCA DE SOFA 2025</h3>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <span className="text-4xl font-bold text-white block mb-2">{timeLeft.days}</span>
                <p className="text-sm text-white/70">DÍAS</p>
              </div>
              <div>
                <span className="text-4xl font-bold text-white block mb-2">{timeLeft.hours}</span>
                <p className="text-sm text-white/70">HORAS</p>
              </div>
              <div>
                <span className="text-4xl font-bold text-white block mb-2">{timeLeft.minutes}</span>
                <p className="text-sm text-white/70">MIN</p>
              </div>
              <div>
                <span className="text-4xl font-bold text-white block mb-2">{timeLeft.seconds}</span>
                <p className="text-sm text-white/70">SEG</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
