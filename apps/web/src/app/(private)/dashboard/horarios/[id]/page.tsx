"use client";

import { useParams } from "next/navigation";
import { useDayById } from "@/hooks/use-day";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  CheckCircle2Icon,
  Clock,
  Loader2,
  MoreHorizontal,
} from "lucide-react";
import { capitalizeMonth } from "@/utils/capitalize-month";
import { Button } from "@camaras/ui/src/components/button";
import { ResponsiveCreateHorarios } from "@/modules/dashboard/horarios/responsive-create-horarios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@camaras/ui/src/components/dropdown-menu";
import { Input } from "@camaras/ui/src/components/input";
import { AlertDeleteHorario } from "@/modules/dashboard/horarios/alert-delete-horario";
import { ResponsiveUpdateHorario } from "@/modules/dashboard/horarios/responsive-update-horario";

export default function SessionPage() {
  const { id } = useParams();
  const { data: day, isLoading } = useDayById(id as string);

  if (isLoading) {
    return (
      <div className="h-52 flex justify-center items-center">
        <span className="flex gap-2">
          <Loader2 className="animate-spin" />
          <p>Cargando...</p>
        </span>
      </div>
    );
  }

  return (
    <div className="px-4 py-2 space-y-4">
      <div className="flex items-center gap-2">
        <p className="font-bold text-2xl">
          Fecha:{" "}
          {capitalizeMonth(
            format(new Date(day?.date || ""), "d 'de' MMMM 'del' yyyy", {
              locale: es,
            })
          )}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <ResponsiveCreateHorarios />
        <Button variant="outline">Ver todos</Button>
        <Input placeholder="Buscar" className="max-w-56" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {day?.timeSlots?.length ? day?.timeSlots?.map((slot, index) => (
          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <p className="font-semibold">
                {slot.start} - {slot.end}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {slot.isBooked ? (
                <CheckCircle2Icon className="text-green-500" />
              ) : (
                <CheckCircle2Icon className="text-yellow-500" />
              )}
              <DropdownMenu>
                <DropdownMenuTrigger>
                    <MoreHorizontal />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    className="text-center"
                    asChild
                  >
                    <ResponsiveUpdateHorario horario={slot} />
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-center text-red-500"
                    asChild
                  >
                    <AlertDeleteHorario idTime={slot.id} />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )) : (
          <div className="col-span-3 h-52 flex items-center justify-center">
            <p className="text-center text-muted-foreground">No hay horarios</p>
          </div>
        )}
      </div>
    </div>
  );
}
