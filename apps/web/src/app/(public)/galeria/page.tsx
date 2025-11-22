import Jumbotron from "@/modules/landing/jumbotron";
import { GalleryPhotographer } from "@/modules/landing/gallery-photographer";
export default function GalleryPage() {
  return (
    <>
      <Jumbotron title="GALERIA" description="Explora nuestras fotos y descubre el arte de la fotografía de cosplay." />
      
      <section className="max-w-7xl mx-auto  py-12">
        <GalleryPhotographer />
      </section>
    </>
  )
}