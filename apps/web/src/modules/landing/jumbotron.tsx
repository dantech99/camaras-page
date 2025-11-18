import Image from "next/image";

const BACKGROUND_IMAGE = "/images/hero-bg.jpg";

type JumbotronProps = {
  title: string;
  description: string;
  backgroundImage?: string;
}

export default function Jumbotron({ title, description, backgroundImage }: JumbotronProps) {
  return (
    <section className="relative isolate flex min-h-[260px] w-full overflow-hidden border border-white/10 bg-black text-white sm:min-h-[320px] lg:min-h-[360px]">
      <Image
        src={BACKGROUND_IMAGE || backgroundImage}
        alt={title}
        fill
        priority
        className="absolute inset-0 h-full w-full object-cover"
        sizes="(max-width: 768px) 100vw, 70vw"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#03030A]/95 via-[#09041A]/70 to-transparent" />

      <div className="relative z-10 flex w-full flex-col justify-center gap-4 px-6 py-14 sm:px-12 sm:py-16 lg:px-20 lg:py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300 sm:text-base">
          Las Cámaras del Dragón
        </p>

        <div>
          <h1 className="font-unbounded text-4xl font-black uppercase leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <span className="mt-4 inline-flex h-1 w-24 rounded-full bg-cyan-300 sm:w-32" />
        </div>

        <p className="max-w-xl text-base text-white/80 sm:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}