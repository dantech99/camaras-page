"use client";

import { usePhotographersPackages } from "@/utils/use-photographers";
import { Loader2, MoreHorizontal, Pencil, PenLine, Trash } from "lucide-react";
import { Card } from "@camaras/ui/src/components/card";
import Image from "next/image";
import { Badge } from "@camaras/ui/src/components/badge";

interface PhotographersPackages {
  id: string;
  photographerId: string;
  name: string;
  imageUrl: string;
  description: string;
  dotsDescription: string[];
  price: string;
  photoCount: number;
  discountPercentage: string;
  isActive: boolean;
}

export function TablePaquetes() {
  const {
    data: packagesPhotographers,
    isLoading,
    isError,
  } = usePhotographersPackages();

  const packages = packagesPhotographers?.packages || [];

  if (isLoading) {
    return (
      <div className="h-[dvh] flex justify-center items-center">
        <span className="flex gap-2">
          <Loader2 className="animate-spin" />
          <p>Cargando...</p>
        </span>
      </div>
    )
  }

  return (

    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
      {packages.map((pack: PhotographersPackages) => (
        <Card key={pack.id} className="overflow-hidden border rounded-lg shadow-sm py-0">
          <div className="relative aspect-[3/4]">
            <img
              src={pack.imageUrl || "/placeholder.svg?height=600&width=450"}
              alt={pack.name}
              className="object-fit"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="text-xl font-bold">{pack.name}</h3>

              <div className="flex items-center justify-between mt-2">
                <span className="text-2xl font-bold">{pack.price}</span>
                <span className="text-sm">{pack.photoCount} fotos</span>
              </div>
            </div>
          </div>

          <div className="p-4">
            <p className="text-sm text-muted-foreground">{pack.description}</p>

            <ul className="mt-3 space-y-1">
              {pack.dotsDescription.map((dot, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-rose-500">•</span>
                  <span>{dot}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      ))}
    </div>

  );
}
