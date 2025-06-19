"use client";

import { useSaleStore } from "./store/sale.store";
import { GlobalStepper } from "./config/stepper.config";
import { getPhotographerPackages } from "@/hooks/use-photographers";
import { Loader2, UserIcon } from "lucide-react";
import { Card } from "@camaras/ui/src/components/card";
import { Badge } from "@camaras/ui/src/components/badge";

export function SelectPackage() {
  const methods = GlobalStepper.useStepper();
  const {
    photographerId,
    setPackageId,
    setPackageName,
    setPackagePrice,
    packageId,
  } = useSaleStore();
  const { data, isLoading, isError } = getPhotographerPackages(photographerId);

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center p-4">
          <Loader2 className="animate-spin" />
        </div>
      ) : isError ? (
        <div className="flex items-center justify-center p-4">
          <p>Error al cargar los paquetes</p>
        </div>
      ) : data?.packages?.length === 0 ? (
        <div className="flex items-center justify-center p-4">
          <p>No hay paquetes disponibles</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {data?.packages?.map((pkg) => (
            <Card
              key={pkg.id}
              className={`aspect-[3/5] p-1 relative ${packageId === pkg.id ? "border-2 border-primary-blue" : "border-2"}`}
              onClick={() => {
                setPackageId(pkg.id);
                setPackageName(pkg.name);
                setPackagePrice(pkg.price);
              }}
            >
              <div className="relative w-full h-full overflow-hidden rounded-lg">
                <img
                  src={pkg.imageUrl || "/placeholder.svg"}
                  alt={pkg.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                  <div className="space-y-2">
                    <div>
                      <h3 className="font-bold text-xl leading-tight">
                        {pkg.name}
                      </h3>
                      <p className="text-sm mt-1">{pkg.description}</p>
                    </div>
                    <div className="flex items-center gap-2 justify-between">
                      <Badge>$ {pkg.price}</Badge>
                      <Badge>{pkg.photoCount} fotos</Badge>
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
