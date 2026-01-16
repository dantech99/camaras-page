"use client";

import { TableCell, TableRow } from "@camaras/ui/src/components/table";
import { Badge } from "@camaras/ui/src/components/badge";
import { Button } from "@camaras/ui/src/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@camaras/ui/src/components/dropdown-menu";
import {
  MoreHorizontal,
  Camera,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { ResponsiveUpdatePaquete } from "./responsive-update-paquete";
import { AlertDetelePaquete } from "./alert-delete-paquete";
import { formatCurrency } from "@/utils/format-currency";

interface PhotographersPackages {
  price: number;
  discountPercentage: number;
  name: string;
  id: string;
  description: string;
  photographerName: string;
  imageUrl: string;
  photoCount: number;
  isActive: boolean;
}

interface PaquetesTableRowProps {
  pack: PhotographersPackages;
}

export function PaquetesTableRow({ pack }: PaquetesTableRowProps) {
  return (
    <TableRow>
      {/* Nombre e imagen */}
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
            <img
              src={pack.imageUrl}
              alt={pack.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="font-medium truncate">{pack.name}</p>
            <div className="flex items-center gap-2 mt-1">
              {pack.isActive ? (
                <Badge variant="default" className="text-xs h-5">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Activo
                </Badge>
              ) : (
                <Badge variant="secondary" className="text-xs h-5">
                  <XCircle className="w-3 h-3 mr-1" />
                  Inactivo
                </Badge>
              )}
            </div>
          </div>
        </div>
      </TableCell>

      {/* Descripción */}
      <TableCell className="max-w-[300px]">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {pack.description}
        </p>
      </TableCell>

      {/* Cantidad de fotos */}
      <TableCell className="text-center">
        <div className="flex items-center justify-center gap-1.5">
          <Camera className="w-4 h-4 text-primary-blue" />
          <span className="font-medium">{pack.photoCount}</span>
        </div>
      </TableCell>

      {/* Precio */}
      <TableCell className="text-center">
        <span className="font-semibold text-primary-blue">
          {formatCurrency(pack.price)}
        </span>
      </TableCell>

      {/* Acciones */}
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <ResponsiveUpdatePaquete pack={pack} />
            <AlertDetelePaquete id={pack.id} name={pack.name} />
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
