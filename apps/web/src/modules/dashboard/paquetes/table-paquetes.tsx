"use client";

import { usePackages } from "@/hooks/use-packages";
import { Loader2 } from "lucide-react";
import { Card } from "@camaras/ui/src/components/card";
import { PaqueteCard } from "./paquete-card";

export function TablePaquetes() {

  const {
    data: packagesPhotographers,
    isLoading,
    isError,
  } = usePackages();

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
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 auto-rows-fr">
      {packages.map((pack) => (
        <PaqueteCard pack={pack} key={pack.id} />
      ))}
    </div>

  );
}
