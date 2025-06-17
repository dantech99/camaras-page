// pages/SessionPage.tsx
"use client";

import { useParams } from "next/navigation";
import { useDayById } from "@/hooks/use-day";
import { useState, useEffect } from "react";
import { Clock, Plus, Loader2 } from "lucide-react";
import { Button } from "@camaras/ui/src/components/button";
import { TimeService } from "@/services/time-service";
import { toast } from "sonner";
import { TimeSlotCard } from "@/modules/dashboard/horarios/time-slot-card";
import { useTimeSlots } from "@/hooks/use-time-slots";

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
  
  const {
    timeSlots,
    setTimeSlots,
    updateTimeSlot,
    addTimeSlot,
    removeTimeSlot
  } = useTimeSlots(day || undefined);

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
  }, [day, setTimeSlots]);

  // Eliminar horario con manejo de estado independiente
  const handleRemoveTimeSlot = async (index: number) => {
    const slot = timeSlots[index];

    // Si tiene ID, eliminar del servidor
    if (slot.id) {
      try {
        await TimeService.delete(slot.id);
        toast.success("Horario eliminado");
        await refetch();
      } catch (error) {
        toast.error("No se pudo eliminar el horario");
        throw error; // Re-lanzar para que el componente maneje el estado de loading
      }
    }

    // Eliminar del estado local
    removeTimeSlot(index);
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
      <PageHeader />
      
      <div className="space-y-4">
        {timeSlots.map((slot, index) => (
          <TimeSlotCard
            key={`${slot.id || "new"}-${index}`}
            slot={slot}
            index={index}
            onUpdate={updateTimeSlot}
            onRemove={handleRemoveTimeSlot}
            isOnlySlot={timeSlots.length === 1}
          />
        ))}

        <AddTimeSlotButton onAdd={() => addTimeSlot(day || undefined)} />
        
        <SaveButton 
          onSave={saveTimeSlots} 
          isSubmitting={isSubmitting} 
        />
      </div>
    </div>
  );
}

// components/PageHeader.tsx
function PageHeader() {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">
        Registro de Horarios Disponibles
      </h1>
      <p className="text-sm">
        Ingresa los horarios disponibles en formato de 12 horas
      </p>
    </div>
  );
}

// components/AddTimeSlotButton.tsx
interface AddTimeSlotButtonProps {
  onAdd: () => void;
}

function AddTimeSlotButton({ onAdd }: AddTimeSlotButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={onAdd}
      className="w-full border-dashed"
    >
      <Plus className="h-4 w-4 mr-2" />
      Agregar nuevo horario
    </Button>
  );
}

// components/SaveButton.tsx
interface SaveButtonProps {
  onSave: () => void;
  isSubmitting: boolean;
}

function SaveButton({ onSave, isSubmitting }: SaveButtonProps) {
  return (
    <div className="flex justify-end">
      <Button
        onClick={onSave}
        disabled={isSubmitting}
        className="w-full"
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
  );
}