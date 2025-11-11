"use client";

import { Button } from "@camaras/ui/src/components/button";
import { useState } from "react";

interface PhotographerCardProps {
  name: string;
  image: string | null;
  role: string | null;
  description: string | null;
}

export function PhotographerCard({
  name,
  image,
  description,
}: PhotographerCardProps) {
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
        src={
          image ||
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000"
        }
        alt={name}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-6 text-left space-y-4">
        <p className="text-4xl md:text-4xl font-bold text-white">{name}</p>

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
