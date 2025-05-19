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

  // Utilidad para convertir de 24h a 12h con AM/PM
  const to12Hour = (time24: string) => {
    const [hours, minutes] = time24.split(':');
    let hour = parseInt(hours, 10);
    const period = hour >= 12 ? 'PM' : 'AM';
    
    if (hour === 0) hour = 12;
    else if (hour > 12) hour -= 12;
    
    return `${String(hour).padStart(2, '0')}:${minutes} ${period}`;
  };

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

      {/* Resumen de horarios - estilo similar al de la imagen */}
      {day?.timeSlots?.length ? (
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Resumen de horarios:</h3>
          <div className="space-y-2">
            {day.timeSlots.map((slot, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded border">
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span className="font-medium">
                    {to12Hour(slot.start)} - {to12Hour(slot.end)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {slot.isBooked ? (
                    <span className="flex items-center gap-1 text-green-600 text-sm">
                      <CheckCircle2Icon size={16} />
                      Reservado
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-yellow-600 text-sm">
                      <CheckCircle2Icon size={16} />
                      Disponible
                    </span>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <ResponsiveUpdateHorario horario={slot} />
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <AlertDeleteHorario idTime={slot.id} />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-8 text-center">
          <p className="text-muted-foreground mb-4">No hay horarios disponibles</p>
          <ResponsiveCreateHorarios />
        </div>
      )}

      {/* Grid de horarios individuales (opcional, para mostrar en tarjetas) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {day?.timeSlots?.map((slot, index) => (
          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <p className="font-semibold">
                {to12Hour(slot.start)} - {to12Hour(slot.end)}
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
        ))}
      </div>
    </div>
  );
}