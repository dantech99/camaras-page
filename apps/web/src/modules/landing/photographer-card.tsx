"use client";

import { Badge } from "@camaras/ui/src/components/badge";
import { Button } from "@camaras/ui/src/components/button";
import { Camera } from "lucide-react";
import { useState } from "react";

interface PhotographerCardProps {
  name: string;
  image: string;
  role: string;
  description: string;
}

export function PhotographerCard({ name, image, role, description }: PhotographerCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCardClick = async () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className="relative overflow-hidden rounded-3xl aspect-9/16 w-full cursor-pointer shadow-2xl"
      onClick={handleCardClick}
    >
      <img
        src={image}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent"
      />

      <div className="absolute bottom-0 left-0 right-0 p-6 text-left space-y-4">
        <p className="text-4xl md:text-4xl font-bold text-white">
          {name}
        </p>

        <p className="text-white text-sm">{description}</p>

        <div className="flex gap-2 justify-start">
          <Button variant={"landingSecondary"} className="cursor-pointer">
            Agendar
          </Button>
          <Button variant={"landing"}>Sobre mí</Button>
        </div>
      </div>
    </div>
  );
}
