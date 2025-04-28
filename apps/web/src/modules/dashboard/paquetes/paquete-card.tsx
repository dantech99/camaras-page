import { Button } from "@camaras/ui/src/components/button";
import {
  Card,
} from "@camaras/ui/src/components/card";
import { Pencil, Trash } from "lucide-react";
import { ResponsiveUpdatePaquete } from "./responsive-update-paquete";
import Image from "next/image";
import { AlertDetelePaquete } from "./alert-delete-paquete";

interface PhotographersPackages {
  name: string;
  id: string;
  photographerId: string;
  description: string | null;
  imageUrl: string;
  dotsDescription: string[];
  price: number;
  photoCount: number;
  discountPercentage: number;
  isActive: boolean;
}

export function PaqueteCard({ pack }: { pack: PhotographersPackages }) {
  return (
    <div className="relative w-full h-full">
      <Card key={pack.id} className="h-full overflow-hidden border rounded-lg shadow-sm flex flex-col py-0">
        <div className="relative w-full aspect-[3/4]">
          <img
            src={pack.imageUrl || "/placeholder.svg?height=600&width=450"}
            alt={pack.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute top-0 right-0 p-4 space-x-2">
            <ResponsiveUpdatePaquete pack={pack} />
            <AlertDetelePaquete id={pack.id} name={pack.name} />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="text-xl font-bold">{pack.name}</h3>

            <div className="flex items-center justify-between mt-2">
              <span className="text-2xl font-bold">${Number(pack.price).toLocaleString()}</span>
              <span className="text-sm">{pack.photoCount} fotos</span>
            </div>
          </div>
        </div>

        <div className="p-4 flex-grow">
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
    </div>
  );
}