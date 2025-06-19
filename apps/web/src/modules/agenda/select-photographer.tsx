"use client";

import { Loader2, UserIcon } from "lucide-react";
import { usePhotographers } from "@/hooks/use-photographers";
import { useSaleStore } from "./store/sale.store";
import { Card } from "@camaras/ui/src/components/card";

export function SelectPhotographer() {
  const { setPhotographerId, setPhotographerName, photographerId } = useSaleStore();
  const { data, isLoading, isError } = usePhotographers();

  return (
    <div className="flex flex-col flex-1">
      {isLoading ? (
        <div className="flex items-center justify-center p-4">
          <Loader2 className="animate-spin" />
        </div>
      ) : isError ? (
        <div className="flex items-center justify-center p-4">
          <p>Error al cargar los fotógrafos</p>
        </div>
      ) : data?.photographers?.length === 0 ? (
        <div className="flex items-center justify-center p-4">
          <p>No hay fotógrafos disponibles</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {data?.photographers?.map((photographer) => (
            <Card
              key={photographer.id}
              className={`aspect-[3/5] p-1 relative ${photographerId === photographer.id ? "border-2 border-primary-blue" : "border-2"}`}
              onClick={() => {
                setPhotographerId(photographer.id);
                setPhotographerName(photographer.name);
              }}
            >
              <div className="relative w-full h-full overflow-hidden rounded-lg">
                <img
                  src={photographer.image || "/placeholder.svg"}
                  alt={photographer.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                  <div className="space-y-2">
                    <div>
                      <h3 className="font-bold text-xl leading-tight">
                        {photographer.name}
                      </h3>
                      <p className="text-sm mt-1">
                        {photographer.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
