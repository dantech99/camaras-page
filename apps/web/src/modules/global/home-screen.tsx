import { AboutLanding } from "../landing/about-landing";
import { FAQSection } from "../landing/faq";
import { GalleryPhotographer } from "../landing/gallery-photographer";
import { HeroSection } from "../landing/hero";
import { PhotographerGrid } from "../landing/photographer-landing";
import { SliderGallery } from "../landing/slider-gallery";
import { TestimonialCarousel } from "../landing/testimonial-carousel";

export const HomeScreen = () => {
  return (
    <>
      <HeroSection />
      <SliderGallery />
      <AboutLanding />
      <PhotographerGrid />
      <GalleryPhotographer />
      <TestimonialCarousel />
      <FAQSection />
    </>
  );
};
