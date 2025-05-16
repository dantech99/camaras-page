"use client";

import { useFSessions } from "@/hooks/use-fsessions";
import { format } from "date-fns";
import Link from "next/link";
import { es } from "date-fns/locale";
import { capitalizeMonth } from "@/utils/capitalize-month";

export function AvailableDays() {
  const { data: fsessions, isLoading } = useFSessions();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {fsessions?.map((fsession) => (
        <Link
          key={fsession.id}
          href={`/dashboard/horarios/${fsession.id}`}
          className="p-4 rounded-lg border"
        >
          {capitalizeMonth(format(new Date(fsession.date), "d 'de' MMMM 'del' yyyy", {
            locale: es,
          }))}
        </Link>
      ))}
    </div>
  );
}
