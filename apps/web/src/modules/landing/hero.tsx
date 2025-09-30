"use client"

export function HeroSection() {
  return (
    <section 
      id="hero" 
      className="h-screen w-full p-8 flex items-center mt-16 justify-start bg-gradient-to-br from-black to-primary-blue/20"
    >
      <div className="w-full max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column - Text and Buttons */}
        <div className="space-y-1">
          <h1 className="text-lg md:text-xl font-medium text-[#00FFF0]">
            Las Cámaras del Dragón
          </h1>
          
            <h2
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight bg-gradient-to-r from-[#FEFFFF] to-[#00C2EE] text-transparent bg-clip-text"
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
        <div className="flex justify-center md:justify-end">
          <div className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl w-full max-w-md">
            <h3 className="text-2xl font-semibold text-white mb-8">ACERCA DE SOFA 2025</h3>
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <span className="text-5xl font-bold text-white block mb-2">202</span>
                <p className="text-sm text-white/70">DAYS</p>
              </div>
              <div>
                <span className="text-5xl font-bold text-white block mb-2">25</span>
                <p className="text-sm text-white/70">HOURS</p>
              </div>
              <div>
                <span className="text-5xl font-bold text-white block mb-2">56</span>
                <p className="text-sm text-white/70">MINUTES</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
