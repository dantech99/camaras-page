"use client";

import { Loader2, UserIcon } from "lucide-react";
import { usePhotographers } from "@/hooks/use-photographers";

export function SelectPhotographer() {
  const { data, isLoading, isError } = usePhotographers();

  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <p className="text-2xl font-bold">Seleccionar Fotógrafo</p>
        <p>Selecciona el fotógrafo que deseas contratar para tu evento.</p>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center p-4 h-screen">
          <Loader2 className="animate-spin" />
        </div>
      ) : isError ? (
        <div className="flex items-center justify-center p-4 h-screen">
          <p>Error al cargar los fotógrafos</p>
        </div>
      ) : data?.photographers?.length === 0 ? (
        <div className="flex items-center justify-center p-4 h-screen">
          <p>No hay fotógrafos disponibles</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.photographers?.map((photographer) => (
            <div
              key={photographer.id}
              className="flex flex-col rounded-xl overflow-hidden bg-black border border-gray-800 shadow-lg transition-all hover:shadow-xl"
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
