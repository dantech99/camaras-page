"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { Button } from "@camaras/ui/src/components/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@camaras/ui/src/components/select";

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

interface TimeSlotCardProps {
  slot: TimeSlot;
  index: number;
  onUpdate: (index: number, field: keyof TimeSlot, value: string) => void;
  onRemove: (index: number) => Promise<void>;
  isOnlySlot: boolean;
  usedStartTimes: string[]; // Nuevas horas de inicio ya ocupadas
}

const hourOptions = Array.from({ length: 12 }, (_, i) => {
  const hour = String(i + 1).padStart(2, "0");
  return { value: hour, label: hour };
});

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

const ampmOptions = [
  { value: "AM", label: "AM" },
  { value: "PM", label: "PM" },
];

export function TimeSlotCard({ 
  slot, 
  index, 
  onUpdate, 
  onRemove, 
  isOnlySlot,
  usedStartTimes 
}: TimeSlotCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRemove = async () => {
    setIsDeleting(true);
    try {
      await onRemove(index);
    } finally {
      setIsDeleting(false);
    }
  };

  // Función para verificar si una hora de inicio está disponible
  const isStartTimeAvailable = (hour: string, minute: string, ampm: string) => {
    const timeKey = `${hour}:${minute}:${ampm}`;
    return !usedStartTimes.includes(timeKey);
  };

  // Filtrar las opciones de hora disponibles para hora de inicio
  const getAvailableHourOptions = () => {
    return hourOptions.filter(option => {
      // Permitir la hora actual (para no romper el estado actual)
      if (option.value === slot.startTime) return true;
      
      // Verificar disponibilidad con los minutos y AM/PM actuales
      return isStartTimeAvailable(option.value, slot.startMinute, slot.ampmStart);
    });
  };

  // Filtrar las opciones de minutos disponibles para hora de inicio
  const getAvailableMinuteOptions = () => {
    return minuteOptions.filter(option => {
      // Permitir el minuto actual (para no romper el estado actual)
      if (option.value === slot.startMinute) return true;
      
      // Verificar disponibilidad con la hora y AM/PM actuales
      return isStartTimeAvailable(slot.startTime, option.value, slot.ampmStart);
    });
  };

  // Filtrar las opciones de AM/PM disponibles para hora de inicio
  const getAvailableAmpmOptions = () => {
    return ampmOptions.filter(option => {
      // Permitir el AM/PM actual (para no romper el estado actual)
      if (option.value === slot.ampmStart) return true;
      
      // Verificar disponibilidad con la hora y minutos actuales
      return isStartTimeAvailable(slot.startTime, slot.startMinute, option.value);
    });
  };

  return (
    <div className="border rounded-lg p-4 relative bg-card shadow-sm"
      data-slot="card">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleRemove}
        className="absolute top-2 right-2 text-red-600"
        disabled={isOnlySlot || isDeleting}
      >
        {isDeleting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </Button>

      <div className="space-y-4 pr-12">
        {/* Hora de inicio */}
        <TimeSelector
          label="Hora de inicio"
          hourValue={slot.startTime}
          minuteValue={slot.startMinute}
          ampmValue={slot.ampmStart}
          onHourChange={(value) => onUpdate(index, "startTime", value)}
          onMinuteChange={(value) => onUpdate(index, "startMinute", value)}
          onAmpmChange={(value) => onUpdate(index, "ampmStart", value)}
          availableHours={getAvailableHourOptions()}
          availableMinutes={getAvailableMinuteOptions()}
          availableAmpm={getAvailableAmpmOptions()}
          isStartTime={true}
        />

        {/* Hora de fin */}
        <TimeSelector
          label="Hora de fin"
          hourValue={slot.endTime}
          minuteValue={slot.endMinute}
          ampmValue={slot.ampmEnd}
          onHourChange={(value) => onUpdate(index, "endTime", value)}
          onMinuteChange={(value) => onUpdate(index, "endMinute", value)}
          onAmpmChange={(value) => onUpdate(index, "ampmEnd", value)}
          availableHours={hourOptions} // Todas las horas disponibles para hora de fin
          availableMinutes={minuteOptions} // Todos los minutos disponibles para hora de fin
          availableAmpm={ampmOptions} // Todos los AM/PM disponibles para hora de fin
          isStartTime={false}
        />
      </div>
    </div>
  );
}

interface TimeSelectorProps {
  label: string;
  hourValue: string;
  minuteValue: string;
  ampmValue: string;
  onHourChange: (value: string) => void;
  onMinuteChange: (value: string) => void;
  onAmpmChange: (value: string) => void;
  availableHours: { value: string; label: string }[];
  availableMinutes: { value: string; label: string }[];
  availableAmpm: { value: string; label: string }[];
  isStartTime: boolean;
}

function TimeSelector({
  label,
  hourValue,
  minuteValue,
  ampmValue,
  onHourChange,
  onMinuteChange,
  onAmpmChange,
  availableHours,
  availableMinutes,
  availableAmpm,
  isStartTime,
}: TimeSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}
        {isStartTime && availableHours.length < hourOptions.length && (
          <span className="text-xs text-muted-foreground ml-2">
            (algunas horas no disponibles)
          </span>
        )}
      </label>
      <div className="flex gap-2 items-center">
        <Select value={hourValue} onValueChange={onHourChange}>
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {availableHours.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span>:</span>
        <Select value={minuteValue} onValueChange={onMinuteChange}>
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {availableMinutes.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={ampmValue} onValueChange={onAmpmChange}>
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {availableAmpm.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}