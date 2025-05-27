import { AddDay } from "@/modules/dashboard/horarios/add-day";
import { AvailableDays } from "@/modules/dashboard/horarios/available-days";

export default function HorariosPage() {
  return (
    <div className="px-4 py-2 space-y-4">
      <AddDay />
      <AvailableDays />
    </div>
  );
}