export function AboutSection() {
  return (
    <div className="min-h-screen w-full">
      <div className="p-8 lg:py-24">
        <div className="space-y-4">
          <h2 className="text-4xl lg:text-6xl font-black leading-tight mb-2">
            <span className="text-primary-blue font-unbounded">
              LAS MEJORES FOTOS
            </span>{" "}
            <span className="text-primary-blue/80 font-unbounded">&</span>
            <br />
            <span className="text-primary-blue font-unbounded">
              LOS MEJORES FOTÓGRAFOS
            </span>
          </h2>
          <h2 className="text-2xl lg:text-4xl font-semibold text-white font-unbounded tracking-wide pb-8">
            EN UN SOLO LUGAR
          </h2>
        </div>

        <div className="w-full h-px bg-primary mb-16"></div>

        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-1">
            <div className="">
              <div className="flex items-start justify-between">
                <p className="text-lg md:text-xl leading-relaxed text-muted-foreground font-light flex-1 font-unbounded">
                  <strong className="text-primary-blue font-unbounded text-2xl">
                    "
                  </strong>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Facere iste aperiam est. Corporis, nostrum. Nobis quidem sed
                  iste rem incidunt, minima ab molestiae tenetur beatae, officia
                  harum, sapiente hic voluptatum.
                  <strong className="text-primary-blue font-unbounded text-2xl">
                    "
                  </strong>
                  <br />
                  -Dalai Lama
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-primary-blue font-unbounded pb-2 tracking-wide">
                TAILORED EXPERTS
                <br />
                MENTORING
              </h3>
              <p className="text-muted-foreground leading-relaxed font-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
                minus expedita consectetur, temporibus totam, inventore aut
                nobis dicta laudantium dolor omnis recusandae similique quo
                cupiditate cumque! Excepturi ad quo ipsa?
              </p>
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-bold text-primary-blue font-unbounded pb-2 tracking-wide">
                CREATIVE INDUSTRY
                <br />
                TALENT POOL
              </h3>
              <p className="muted-foreground leading-relaxed font-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consectetur voluptas ut maxime iste nobis enim quidem dolorum
                suscipit impedit eos, ipsum, quam natus fugit minima? Quidem
                distinctio earum rem magni!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
