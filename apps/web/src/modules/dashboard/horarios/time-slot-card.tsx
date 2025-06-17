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
  isOnlySlot 
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

  return (
    <div className="border rounded-lg p-4 relative bg-card shadow-sm"
      data-slot="card">
      {/* Botón eliminar en esquina superior derecha */}
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
        />
      </div>
    </div>
  );
}

// components/TimeSelector.tsx
interface TimeSelectorProps {
  label: string;
  hourValue: string;
  minuteValue: string;
  ampmValue: string;
  onHourChange: (value: string) => void;
  onMinuteChange: (value: string) => void;
  onAmpmChange: (value: string) => void;
}

function TimeSelector({
  label,
  hourValue,
  minuteValue,
  ampmValue,
  onHourChange,
  onMinuteChange,
  onAmpmChange,
}: TimeSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div className="flex gap-2 items-center">
        <Select value={hourValue} onValueChange={onHourChange}>
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
        <Select value={minuteValue} onValueChange={onMinuteChange}>
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
        <Select value={ampmValue} onValueChange={onAmpmChange}>
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
  );
}