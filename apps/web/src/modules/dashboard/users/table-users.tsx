"use cliente";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@camaras/ui/src/components/table";
import { Loader2 } from "lucide-react";

export const TableUsers = () => {

  const { data, isLoading, isError } = useCoupons();
  const coupons = data?.coupons || [];

  return (
    <Table className="w-full rounded-lg overflow-hidden">
      <TableHeader className="bg-sidebar-accent w-full">
        <TableRow className="w-full">
          <TableHead className="min-w-[100px] text-center">
            Nombre
          </TableHead>
          <TableHead className="min-w-[100px] text-center">
            Fecha de creación
          </TableHead>
          <TableHead className="min-w-[100px] text-center">
            Rol
          </TableHead>
          <TableHead className="min-w-[100px] text-center">
            País
          </TableHead>
          <TableHead className="min-w-[100px] text-center">Whatsapp</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-4">
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Cargando usuarios...</span>
              </div>
            </TableCell>
          </TableRow>
        ) : isError ? (
          <TableRow>
            <TableCell colSpan={9} className="text-center py-6">
              <div className="text-red-500">
                Error al cargar los usuarios. Por favor, intente nuevamente.
              </div>
            </TableCell>
          </TableRow>
        ) : coupons.length > 0 ? (
          coupons.map((coupon) => (
            <TableRow key={coupon.id} className="text-center">
              <TableCell>
                {new Date(coupon.createdat).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {coupon.expirationDate
                  ? new Date(coupon.expirationDate).toLocaleDateString()
                  : "N/A"}
              </TableCell>
              <TableCell>{coupon.code}</TableCell>
              <TableCell>{Number(coupon.discountPercentage)}</TableCell>
              <TableCell className="space-x-2">
                {/* Acá debe ir la info de los users */}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={9} className="text-center py-6">
              No hay usuarios disponibles
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
