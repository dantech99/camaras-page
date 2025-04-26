"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@camaras/ui/src/components/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@camaras/ui/src/components/dropdown-menu";
import { usePhotographersPackages } from "@/utils/use-photographers";
import { Loader2, MoreHorizontal } from "lucide-react";
import { Button } from "@camaras/ui/src/components/button";

interface PhotographersPackages {
  id: string;
  photographerId: string;
  name: string;
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

  return (
    <Table className="w-full rounded-lg overflow-hidden">
      <TableHeader className="bg-sidebar-accent w-full">
        <TableRow className="w-full">
          <TableHead className="min-w-[60px] text-center">Nombre</TableHead>
          <TableHead className="min-w-[150px] text-center">
            Descripción
          </TableHead>
          <TableHead className="min-w-[120px] text-center">Precio</TableHead>
          <TableHead className="min-w-[100px] text-center">
            Total de fotos
          </TableHead>
          <TableHead className="min-w-[120px] text-center">Descuento</TableHead>
          <TableHead className="min-w-[120px] text-center">
            Disponible
          </TableHead>
          <TableHead className="w-[100px] min-w-[100px] text-center">
            Acciones
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-4">
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Cargando paquetes...</span>
              </div>
            </TableCell>
          </TableRow>
        ) : isError ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-6">
              <div className="text-red-500">
                Error al cargar los tickets. Por favor, intente nuevamente.
              </div>
            </TableCell>
          </TableRow>
        ) : packages.length > 0 ? (
          packages.map((photoPackage: PhotographersPackages) => (
            <TableRow key={photoPackage.id}>
              <TableCell className="min-w-[60px] text-left">
                {photoPackage.name}
              </TableCell>
              <TableCell className="min-w-[150px] text-left">
                {photoPackage.description}
              </TableCell>
              <TableCell className="min-w-[120px] text-center">
                {photoPackage.price}
              </TableCell>
              <TableCell className="min-w-[100px] text-center">
                {photoPackage.photoCount}
              </TableCell>
              <TableCell className="min-w-[120px] text-center">
                {photoPackage.discountPercentage}
              </TableCell>
              <TableCell className="min-w-[120px] text-center">
                {photoPackage.isActive ? (
                  <span className="text-green-500">Sí</span>
                ) : (
                  <span className="text-red-500">No</span>
                )}
              </TableCell>
              <TableCell className="w-[100px] min-w-[100px] text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Abrir menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="cursor-pointer items-center">
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer items-center">
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-6">
              No hay paquetes disponibles.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
