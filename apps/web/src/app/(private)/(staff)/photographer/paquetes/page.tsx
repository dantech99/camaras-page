import { ResponsiveCreatePaquete } from "@/modules/dashboard/paquetes/responsive-create-paquete";
import { TablePaquetes } from "@/modules/dashboard/paquetes/table-paquetes";

export default function PaquetesPage() {
  return (
    <div className="space-y-4">
      <ResponsiveCreatePaquete />
      <TablePaquetes />
    </div>
  );
}
