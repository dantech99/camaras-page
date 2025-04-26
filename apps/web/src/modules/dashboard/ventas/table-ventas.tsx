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
import { Button } from "@camaras/ui/src/components/button";
import { Loader2, MoreHorizontal } from "lucide-react";

export const TableVentas = () => {
  return (

    <Table className="w-full rounded-lg overflow-hidden">
      <TableHeader className="bg-sidebar-accent w-full">
        <TableRow className="w-full">
          <TableHead className="min-w-[60px] text-center">Ticket</TableHead>
          <TableHead className="min-w-[100px] text-center">Nombre</TableHead>
          <TableHead className="min-w-[100px] text-center">Estado</TableHead>
          <TableHead className="min-w-[100px] text-center">Paquete</TableHead>
          <TableHead className="min-w-[100px] text-center">
            Cantidad de fotos
          </TableHead>
          <TableHead className="min-w-[100px] text-center">Precio</TableHead>
          <TableHead className="min-w-[100px] text-center">Descuento</TableHead>
          <TableHead className="min-w-[100px] text-center">
            % de descuento
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody></TableBody>
    </Table>
    
  );
};
