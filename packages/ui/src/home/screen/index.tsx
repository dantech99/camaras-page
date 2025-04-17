import React from "react";
import { HeroSection } from "../components/slider-hero/slider";
import { AboutSection } from "../components/about-us/about-us";
import { PhotographerGrid } from "../components/card-profile/photographer-grid";
import { GalleryGeneral } from "../components/gallery-general/gallery-general";
import { GalleryPhotographer } from "../components/gallery-photographer/gallery-photographer";
import AnimatedTestimonialCarousel from "../components/testimonial-card/animated-testimonial-carousel";

export const HomeScreen = () => {
  return (
    <>
      <div className="max-w-8xl mx-auto">
        <HeroSection />

        <AboutSection />

        <div className="min-h-550 flex items-center justify-center">
          <PhotographerGrid />
        </div>

        <GalleryPhotographer />

        <AnimatedTestimonialCarousel />
      </div>
    </>
  );
};
