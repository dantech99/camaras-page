import { ResponsiveCreatePaquete } from "@/modules/dashboard/paquetes/responsive-create-paquete";
import { TablePaquetes } from "@/modules/dashboard/paquetes/table-paquetes";

export default function PaquetesPage() {
  return (
    <div className="px-4 py-2 space-y-4">
      <ResponsiveCreatePaquete />
      <TablePaquetes />
    </div>
  );
}
