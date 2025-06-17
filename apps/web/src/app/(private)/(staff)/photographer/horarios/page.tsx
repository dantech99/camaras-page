import { AddDay } from "@/modules/dashboard/horarios/add-day";
import { AvailableDays } from "@/modules/dashboard/horarios/available-days";

export default function HorariosPage() {
  return (
    <div className="space-y-4">
      <AddDay />
      <AvailableDays />
    </div>
  );
}