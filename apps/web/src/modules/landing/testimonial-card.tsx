import { Star, StarHalf } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@camaras/ui/src/components/avatar";

interface TestimonialProps {
  id: number;
  name: string;
  rating: number;
  opinion: string;
  date: string;
  location: string;
  event: string;
  avatar: string;
}

export function TestimonialCard({ props }: { props: TestimonialProps }) {
  return (
    <div className="aspect-[5/3] rounded-2xl h-32 md:h-62 shadow-md p-6 bg-white space-y-4">
      <div className="flex items-center gap-4">
        <Avatar className="size-16">
          <AvatarImage
            src={props.avatar}
            alt="@shadcn"
            className="object-cover"
          />
          <AvatarFallback className="bg-gray-200" delayMs={600}>
            {props.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-lg">{props.name}</p>
          <div className="flex text-yellow-400">
            {Array(5)
              .fill(0)
              .map((_, i) =>
                i + 1 <= props.rating ? (
                  <Star
                    key={i}
                    size={28}
                    fill="currentColor"
                    stroke="currentColor"
                  />
                ) : i + 0.5 <= props.rating ? (
                  <StarHalf
                    key={i}
                    size={28}
                    fill="currentColor"
                    stroke="currentColor"
                  />
                ) : (
                  <Star key={i} size={28} fill="none" stroke="currentColor" />
                )
              )}
          </div>
        </div>
      </div>

      <p className="text-gray-600 text-sm italic">{props.opinion}</p>

      <div className="flex items-center justify-between text-sm">
        <div className="text-gray-500">
          <p>{props.date}</p>
          <p className="text-blue-500">{props.location}</p>
        </div>
        <p className="bg-blue-100 text-blue-600 font-medium px-3 py-1 rounded-full hover:bg-blue-200 transition">
          {props.event}
        </p>
      </div>
    </div>
  );
}
