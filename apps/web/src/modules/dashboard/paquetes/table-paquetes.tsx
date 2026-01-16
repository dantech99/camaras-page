"use client";

import * as React from "react";
import { usePackages } from "@/hooks/use-packages";
import { Loader2, LayoutGrid, Table as TableIcon } from "lucide-react";
import { Button } from "@camaras/ui/src/components/button";
import { PaqueteCard } from "./paquete-card";
import { PaquetesTableView } from "./paquetes-table-view";

type ViewMode = "grid" | "table";

export function TablePaquetes() {
  const [viewMode, setViewMode] = React.useState<ViewMode>("table");

  const {
    data: packagesPhotographers,
    isLoading,
    isError,
  } = usePackages();

  const packages = packagesPhotographers?.packages || [];

  if (isLoading) {
    return (
      <div className="h-52 flex justify-center items-center">
        <span className="flex gap-2">
          <Loader2 className="animate-spin" />
          <p>Cargando...</p>
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Toggle de vista */}
      <div className="flex justify-end">
        <div className="inline-flex rounded-lg border p-1 bg-muted/50">
          <Button
            variant={viewMode === "table" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("table")}
            className="gap-2"
          >
            <TableIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Tabla</span>
          </Button>
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="gap-2"
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="hidden sm:inline">Tarjetas</span>
          </Button>
        </div>
      </div>

      {/* Contenido según el modo de vista */}
      {viewMode === "table" ? (
        <PaquetesTableView packages={packages} />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 auto-rows-fr">
          {packages.map((pack) => (
            <PaqueteCard pack={pack} key={pack.id} />
          ))}
        </div>
      )}
    </div>
  );
}
