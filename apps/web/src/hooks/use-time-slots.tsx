import { useState } from "react";

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

interface Day {
  id: string;
  timeSlots: any[];
}

export function useTimeSlots(day?: Day) {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

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
  const addTimeSlot = (currentDay?: Day) => {
    if (!currentDay) return;

    setTimeSlots((prev) => [
      ...prev,
      {
        startTime: "09",
        startMinute: "00",
        endTime: "10",
        endMinute: "00",
        ampmStart: "AM",
        ampmEnd: "AM",
        availableDayId: currentDay.id,
      },
    ]);
  };

  // Eliminar horario del estado local
  const removeTimeSlot = (index: number) => {
    setTimeSlots((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    timeSlots,
    setTimeSlots,
    updateTimeSlot,
    addTimeSlot,
    removeTimeSlot,
  };
}