import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@camaras/ui/src/components/table";

export const TableCoupons = () => {
  
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
      <TableBody></TableBody>
    </Table>
  );
};
