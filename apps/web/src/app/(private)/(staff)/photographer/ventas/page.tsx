import { VentasHeader } from "@/modules/dashboard/ventas/ventas-header";
import { VentasTable } from "@/modules/dashboard/ventas/ventas-table";

export default function VentasPage() {
  return (
    <div className="space-y-4">
      <VentasHeader />
      <VentasTable />
    </div>
  );
}
