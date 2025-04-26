import { ResponsiveCreatePaquete } from "@/modules/dashboard/paquetes/responsive-create-paquete";
import { TablePaquetes } from "@/modules/dashboard/paquetes/table-paquetes";

export default function PaquetesPage() {
  return (
    <div className="px-4 py-2 space-y-4">
      <ResponsiveCreatePaquete />
      <div className="flex-1 max-w-[calc(100vw-2rem)] border rounded-lg overflow-hidden">
        <TablePaquetes />
      </div>
    </div>
  );
}
