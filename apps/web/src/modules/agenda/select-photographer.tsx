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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.photographers?.map((photographer) => (
            <Card
              key={photographer.id}
              className={`flex flex-col rounded-xl overflow-hidden transition-all hover:shadow-xl cursor-pointer ${photographerId === photographer.id ? "border-2 border-primary-blue" : ""}`}
              onClick={() => {
                setPhotographerId(photographer.id);
                setPhotographerName(photographer.name);
              }}
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden">
                {photographer.image ? (
                  <img
                    src={photographer.image || "/placeholder.svg"}
                    alt={photographer.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-900">
                    <UserIcon className="w-16 h-16 text-gray-600" />
                  </div>
                )}
              </div>

              <div className="p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white truncate">
                    {photographer.name}
                  </h3>
                </div>

                <p className="text-sm text-gray-500 truncate">
                  {photographer.email}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
