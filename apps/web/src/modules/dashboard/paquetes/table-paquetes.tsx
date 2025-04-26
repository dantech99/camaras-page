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
<<<<<<< HEAD
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
=======
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
>>>>>>> 5ee99d079acc8983c4bc0389a60da3ab0c027502
  );
}
