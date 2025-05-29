"use client";

import { useDays } from "@/hooks/use-day";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { es } from "date-fns/locale";
import { capitalizeMonth } from "@/utils/capitalize-month";

export function AvailableDays() {
  const { data: days, isLoading } = useDays();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {days?.map((day) => (
        <Link
          key={day.id}
          href={`/photographer/horarios/${day.id}`}
          className="p-4 rounded-lg border"
        >
          {capitalizeMonth(format(parseISO(day.date), "d 'de' MMMM 'del' yyyy", {
            locale: es,
          }))}
        </Link>
      ))}
    </div>
  );
}
