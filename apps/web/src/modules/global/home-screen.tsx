
import { FAQSection } from "../landing/faq";
import { GalleryPhotographer } from "../landing/gallery-photographer";
import { HeroSection } from "../landing/hero";
import { PhotographerGrid } from "../landing/photographer-landing";
import { SliderGallery } from "../landing/slider-gallery";
import { TestimonialCarousel } from "../landing/testimonial-carousel";
import { Line } from "../landing/line";
import { AboutSection } from "../landing/about-section";
import { BrandsCarousel } from "../landing/brand-carousel";
import { SchedulingSection } from "../landing/scheduling-section";

export const HomeScreen = () => {
  return (
    <>
      <HeroSection />
      <Line />
      <SliderGallery />
      <AboutSection />
      <SchedulingSection />
      
      {/* <PhotographerGrid /> */}
      <GalleryPhotographer />
      <TestimonialCarousel />
      <FAQSection />
      {/* <BrandsCarousel /> */}
    </>
  );
};
