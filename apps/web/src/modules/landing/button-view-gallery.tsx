import Link from "next/link";
import { Button } from "@camaras/ui/src/components/button";

export function ButtonViewGallery() {

  return (
    <Link href="/galeria" className="flex justify-center items-center pb-5 gap-2 mt-20">
      <Button
        className="rounded-none p-3 text-base hover:scale-105 transition-all duration-300 ease-in-out"
        variant={"landing"}
      >
        Ver más fotos en nuestra galería
      </Button>
    </Link>
  )
}