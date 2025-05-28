import { SalesSearch } from "@/modules/dashboard/ventas/sales-search-bar";
import { TableVentas } from "@/modules/dashboard/ventas/table-ventas";

export default function VentasPage() {
  return (
    <div className="px-4 py-2 space-y-4">
      <SalesSearch />
      <div className="flex-1 max-w-[calc(100vw-2rem)] border rounded-lg overflow-hidden">
        <TableVentas />
      </div>
    </div>
  );
}
