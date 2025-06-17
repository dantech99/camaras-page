import { CuponesHeader } from "@/modules/dashboard/cupones/cupones-header";
import { CuponesTable } from "@/modules/dashboard/cupones/cupones-table";

export default function CuponesPage() {
    return (
      <div className="space-y-4">
        <CuponesHeader />
        <CuponesTable />
      </div>
  );
}
