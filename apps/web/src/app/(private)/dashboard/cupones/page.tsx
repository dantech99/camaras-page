import { ResponsiveCreateCupones } from "@/modules/dashboard/cupones/responsive-create-cupones";
import { TableCoupons } from "@/modules/dashboard/cupones/table-cupones";

export default function CuponesPage() {
  return (
    <div className="px-4 py-2 space-y-4">
        <ResponsiveCreateCupones />
      <div className="flex-1 max-w-[calc(100vw-2rem)] border rounded-lg overflow-hidden">
        <TableCoupons />
      </div>
    </div>
  );
}
