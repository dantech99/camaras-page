import { cn } from "@camaras/ui/src/lib/utils";
import { Marquee } from "@camaras/ui/src/components/magicui/marquee";
import { TestimonialCard } from "./testimonial-card";

const TestimonialData = [
  {
    id: 1,
    name: "David Chen",
    rating: 5,
    opinion:
      "This workshop exceeded all my expectations. The hands-on approach and personalized feedback made it an invaluable experience for my professional development.",
    date: "April 3, 2025",
    location: "Bogotá",
    event: "SOFA",
    avatar: "/images/testimonial/1.webp",
  },
  {
    id: 2,
    name: "David Chen",
    rating: 3.5,
    opinion:
      "This workshop exceeded all my expectations. The hands-on approach and personalized feedback made it an invaluable experience for my professional development.",
    date: "April 3, 2025",
    location: "Bogotá",
    event: "Comic Con Colombia",
    avatar: "/images/testimonial/2.webp",
  },
  {
    id: 3,
    name: "David Chen",
    rating: 4,
    opinion:
      "This workshop exceeded all my expectations. The hands-on approach and personalized feedback made it an invaluable experience for my professional development.",
    date: "April 3, 2025",
    location: "Medellín",
    event: "Comic Con Medellín",
    avatar: "/images/testimonial/3.webp",
  },
  {
    id: 4,
    name: "David Chen",
    rating: 4,
    opinion:
      "This workshop exceeded all my expectations. The hands-on approach and personalized feedback made it an invaluable experience for my professional development.",
    date: "April 3, 2025",
    location: "Medellín",
    event: "Comic Con Medellín",
    avatar: "/images/testimonial/3.webp",
  },
  {
    id: 5,
    name: "David Chen",
    rating: 4,
    opinion:
      "This workshop exceeded all my expectations. The hands-on approach and personalized feedback made it an invaluable experience for my professional development.",
    date: "April 3, 2025",
    location: "Medellín",
    event: "Comic Con Medellín",
    avatar: "/images/testimonial/3.webp",
  },
  {
    id: 6,
    name: "David Chen",
    rating: 4,
    opinion:
      "This workshop exceeded all my expectations. The hands-on approach and personalized feedback made it an invaluable experience for my professional development.",
    date: "April 3, 2025",
    location: "Medellín",
    event: "Comic Con Medellín",
    avatar: "/images/testimonial/3.webp",
  },
];

const firstRow = TestimonialData.slice(0, TestimonialData.length / 2);
const secondRow = TestimonialData.slice(TestimonialData.length / 2);

export function TestimonialCarousel() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-8 md:py-32">
      <div className="w-full">
        <Marquee pauseOnHover className="[--duration:25s]">
          {firstRow.map((review) => (
            <div key={review.id}>
              <TestimonialCard props={review} />
            </div>
          ))}
        </Marquee>
      </div>

      <div className="w-full">
        <Marquee reverse pauseOnHover className="[--duration:25s]">
          {secondRow.map((review) => (
            <div key={review.id}>
              <TestimonialCard props={review} />
            </div>
          ))}
        </Marquee>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
