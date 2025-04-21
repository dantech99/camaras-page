import { Marquee } from "@camaras/ui/src/components/magicui/marquee";

const images = [
  {
    img: "/images/testimonial/1.webp",
    username: "user1",
  },
  {
    img: "/images/testimonial/2.webp",
    username: "user2",
  },
  {
    img: "/images/testimonial/3.webp",
    username: "user3",
  },
  {
    img: "/images/testimonial/4.webp",
    username: "user4",
  },
  {
    img: "/images/testimonial/5.webp",
    username: "user5",
  },
  {
    img: "/images/testimonial/6.webp",
    username: "user6",
  },
  {
    img: "/images/testimonial/7.webp",
    username: "user7",
  },
];

const firstRow = images.slice(0, Math.ceil(images.length / 2));
const secondRow = images.slice(Math.ceil(images.length / 2));

export function SliderGallery() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <div key={`firstRow-${review.username}`}>
            <ReviewCard {...review} />
          </div>
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <div key={`secondRow-${review.username}`}>
            <ReviewCard {...review} />
          </div>
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}

const ReviewCard = ({ img, username }: { img: string; username: string }) => {
  return (
    <div>
      <img
        src={img}
        alt={username}
        className="aspect-[4/3] h-32 md:h-64 rounded-md object-cover"
      />
    </div>
  );
};