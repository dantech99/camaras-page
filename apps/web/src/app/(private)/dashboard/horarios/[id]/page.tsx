"use client";

import { useParams } from "next/navigation";
import { useDayById } from "@/hooks/use-day";
import { useState, useEffect } from "react";
import { Clock, Trash2, Plus, Loader2 } from "lucide-react";
import { Button } from "@camaras/ui/src/components/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@camaras/ui/src/components/select";
import { TimeService } from "@/services/time-service";
import { toast } from "sonner";

interface TimeSlot {
  id?: string;
  startTime: string;
  endTime: string;
  startMinute: string;
  endMinute: string;
  ampmStart: string;
  ampmEnd: string;
  availableDayId: string;
}

export default function SessionPage() {
  const { id } = useParams();
  const { data: day, isLoading, refetch } = useDayById(id as string);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  // Inicializar timeSlots cuando se carga el día
  useEffect(() => {
    if (day?.timeSlots) {
      setTimeSlots(
        day.timeSlots.map((slot) => ({
          id: slot.id,
          startTime: slot.start.split(':')[0] || "09",
          startMinute: slot.start.split(':')[1] || "00",
          endTime: slot.end.split(':')[0] || "10",
          endMinute: slot.end.split(':')[1] || "00",
          ampmStart: slot.ampmStart,
          ampmEnd: slot.ampmEnd,
          availableDayId: slot.availableDayId,
        }))
      );
    } else if (day && day.timeSlots.length === 0) {
      // Si no hay horarios, agregar uno por defecto
      setTimeSlots([
        {
          startTime: "09",
          startMinute: "00",
          endTime: "10",
          endMinute: "00",
          ampmStart: "AM",
          ampmEnd: "AM",
          availableDayId: day.id,
        },
      ]);
    }
  }, [day]);

  // Generar opciones de hora (1-12)
  const hourOptions = Array.from({ length: 12 }, (_, i) => {
    const hour = String(i + 1).padStart(2, "0");
    return { value: hour, label: hour };
  });

  // Generar opciones de minutos
  const minuteOptions = [
    { value: "00", label: "00" },
    { value: "10", label: "10" },
    { value: "15", label: "15" },
    { value: "20", label: "20" },
    { value: "25", label: "25" },
    { value: "30", label: "30" },
    { value: "35", label: "35" },
    { value: "40", label: "40" },
    { value: "45", label: "45" },
    { value: "50", label: "50" },
    { value: "55", label: "55" },
  ];

  // Generar opciones AM/PM
  const ampmOptions = [
    { value: "AM", label: "AM" },
    { value: "PM", label: "PM" },
  ];

  // Actualizar un timeSlot específico
  const updateTimeSlot = (
    index: number,
    field: keyof TimeSlot,
    value: string
  ) => {
    setTimeSlots((prev) =>
      prev.map((slot, i) => (i === index ? { ...slot, [field]: value } : slot))
    );
  };

  // Agregar nuevo horario
  const addTimeSlot = () => {
    if (!day) return;

    setTimeSlots((prev) => [
      ...prev,
      {
        startTime: "09",
        startMinute: "00",
        endTime: "10",
        endMinute: "00",
        ampmStart: "AM",
        ampmEnd: "AM",
        availableDayId: day.id,
      },
    ]);
  };

  // Eliminar horario
  const removeTimeSlot = async (index: number) => {
    const slot = timeSlots[index];

    // Si tiene ID, eliminar del servidor
    if (slot.id) {
      try {
        await TimeService.delete(slot.id);
        toast.success("Horario eliminado");
        await refetch();
      } catch (error) {
        toast.error("No se pudo eliminar el horario");
        return;
      }
    }

    // Eliminar del estado local
    setTimeSlots((prev) => prev.filter((_, i) => i !== index));
  };

  // Guardar horarios
  const saveTimeSlots = async () => {
    if (!day) return;

    setIsSubmitting(true);
    try {
      const slotsToCreate = timeSlots.filter((slot) => !slot.id);
      const slotsToUpdate = timeSlots.filter((slot) => slot.id);

      const promises = [];

      // Crear nuevos horarios
      if (slotsToCreate.length > 0) {
        const slotsWithFormattedTime = slotsToCreate.map(slot => ({
          ...slot,
          startTime: `${slot.startTime}:${slot.startMinute}`,
          endTime: `${slot.endTime}:${slot.endMinute}`
        }));
        promises.push(TimeService.create(slotsWithFormattedTime));
      }

      // Actualizar horarios existentes
      if (slotsToUpdate.length > 0) {
        const slotsWithIds = slotsToUpdate.filter(
          (slot): slot is TimeSlot & { id: string } => slot.id !== undefined
        ).map(slot => ({
          ...slot,
          startTime: `${slot.startTime}:${slot.startMinute}`,
          endTime: `${slot.endTime}:${slot.endMinute}`
        }));
        promises.push(TimeService.update(slotsWithIds));
      }

      await Promise.all(promises);

      toast.success("Horarios guardados");

      await refetch();
    } catch (error) {
      toast.error("No se pudieron guardar los horarios");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Formatear tiempo para mostrar (HH:MM)
  const formatTimeDisplay = (hour: string, minute: string = "00") => {
    return `${hour}:${minute}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="animate-spin mr-2" />
        Cargando...
      </div>
    );
  }

  return (
    <div className="px-4 py-6 space-y-6 max-w-5xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">
          Registro de Horarios Disponibles
        </h1>
        <p className="text-sm">
          Ingresa los horarios disponibles en formato de 12 horas
        </p>
      </div>

      <div className="space-y-4">
        {timeSlots.map((slot, index) => (
          <div
            key={`${slot.id || "new"}-${index}`}
            className="border rounded-lg p-4 shadow-sm relative"
          >
            {/* Botón eliminar en esquina superior derecha */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => removeTimeSlot(index)}
              className="absolute top-2 right-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              disabled={timeSlots.length === 1}
            >
              <Trash2 className="h-4 w-4" />
            </Button>

            <div className="space-y-4 pr-12">
              {/* Hora de inicio */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Hora de inicio
                </label>
                <div className="flex gap-2 items-center">
                  <Select
                    value={slot.startTime}
                    onValueChange={(value) =>
                      updateTimeSlot(index, "startTime", value)
                    }
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {hourOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span>:</span>
                  <Select
                    value={slot.startMinute}
                    onValueChange={(value) =>
                      updateTimeSlot(index, "startMinute", value)
                    }
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {minuteOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={slot.ampmStart}
                    onValueChange={(value) =>
                      updateTimeSlot(index, "ampmStart", value)
                    }
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ampmOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Hora de fin */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Hora de fin
                </label>
                <div className="flex gap-2 items-center">
                  <Select
                    value={slot.endTime}
                    onValueChange={(value) =>
                      updateTimeSlot(index, "endTime", value)
                    }
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {hourOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span>:</span>
                  <Select
                    value={slot.endMinute}
                    onValueChange={(value) =>
                      updateTimeSlot(index, "endMinute", value)
                    }
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {minuteOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={slot.ampmEnd}
                    onValueChange={(value) =>
                      updateTimeSlot(index, "ampmEnd", value)
                    }
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ampmOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Botón agregar horario */}
        <Button
          variant="outline"
          onClick={addTimeSlot}
          className="w-full border-dashed"
        >
          <Plus className="h-4 w-4 mr-2" />
          Agregar nuevo horario
        </Button>

        {/* Botón guardar */}
        <div className="flex justify-end">
          <Button
            onClick={saveTimeSlots}
            disabled={isSubmitting}
            className="bg-black hover:bg-gray-800"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Clock className="h-4 w-4 mr-2" />
                Guardar horarios
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}