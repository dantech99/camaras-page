"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@camaras/ui/src/components/table";
import { useCoupons } from "../../../hooks/use-cupons";
import { DeleteIcon, Loader2, SwitchCamera } from "lucide-react";
import { Button } from "@camaras/ui/src/components/button";
import { Pencil1Icon } from "@radix-ui/react-icons";

export const TableCoupons = () => {
  const { data, isLoading, isError } = useCoupons();
  const coupons = data?.coupons || [];

  return (
    <Table className="w-full rounded-lg overflow-hidden">
      <TableHeader className="bg-sidebar-accent w-full">
        <TableRow className="w-full">
          <TableHead className="min-w-[100px] text-center">
            Fecha de cración
          </TableHead>
          <TableHead className="min-w-[100px] text-center">
            Fecha de expiración
          </TableHead>
          <TableHead className="min-w-[100px] text-center">
            Código de Descuento
          </TableHead>
          <TableHead className="min-w-[100px] text-center">
            % de descuento
          </TableHead>
          <TableHead className="min-w-[100px] text-center">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-4">
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Cargando cupones...</span>
              </div>
            </TableCell>
          </TableRow>
        ) : isError ? (
          <TableRow>
            <TableCell colSpan={9} className="text-center py-6">
              <div className="text-red-500">
                Error al cargar los cupones. Por favor, intente nuevamente.
              </div>
            </TableCell>
          </TableRow>
        ) : coupons.length > 0 ? (
          coupons.map((coupon) => (
            <TableRow key={coupon.id} className="text-center">
              <TableCell>{coupon.photographerId}</TableCell>
              <TableCell>
                {coupon.expirationDate
                  ? new Date(coupon.expirationDate).toLocaleDateString()
                  : "N/A"}
              </TableCell>
              <TableCell>{coupon.code}</TableCell>
              <TableCell>{Number(coupon.discountPercentage)}</TableCell>
              <TableCell className="space-x-2">
                <Button>
                  <SwitchCamera />
                </Button>
                <Button>
                  <DeleteIcon />
                </Button>
                <Button>
                  <Pencil1Icon />
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={9} className="text-center py-6">
              No hay cupones disponibles
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
