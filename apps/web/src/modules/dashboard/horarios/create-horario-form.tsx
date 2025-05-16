"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@camaras/ui/src/components/form";
import { Button } from "@camaras/ui/src/components/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@camaras/ui/src/components/input-otp";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@camaras/ui/src/components/select";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useDayById } from "@/hooks/use-day";
import { TimeService } from "@/services/time-service";

// Zod Schema
const createAppointmentSchema = z.object({
  startHour: z.string().length(2),
  startMinute: z.string().length(2),
  startPeriod: z.enum(["AM", "PM"]),
  endHour: z.string().length(2),
  endMinute: z.string().length(2),
  endPeriod: z.enum(["AM", "PM"]),
});

export function CreateHorarioForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { data, refetch } = useDayById(id as string);

  const form = useForm<z.infer<typeof createAppointmentSchema>>({
    resolver: zodResolver(createAppointmentSchema),
    defaultValues: {
      startHour: "",
      startMinute: "",
      startPeriod: "AM",
      endHour: "",
      endMinute: "",
      endPeriod: "AM",
    },
  });

  // Utilidad para convertir a formato 24h
  const to24Hour = (hour: string, minute: string, period: string) => {
    let h = parseInt(hour, 10);
    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0;
    return `${String(h).padStart(2, "0")}:${minute}`;
  };

  async function onSubmit(values: z.infer<typeof createAppointmentSchema>) {
    try {
      setIsLoading(true);

      const startTime = to24Hour(values.startHour, values.startMinute, values.startPeriod);
      const endTime = to24Hour(values.endHour, values.endMinute, values.endPeriod);

      if (startTime >= endTime) {
        toast.error("La hora de inicio debe ser anterior a la hora de fin");
        return;
      }

      if (data?.timeSlots.some((slot) => slot.start === startTime)) {
        toast.error("La hora de inicio ya existe");
        return;
      }

      await TimeService.create({
        startTime,
        endTime,
        ampmStart: values.startPeriod,
        ampmEnd: values.endPeriod,
        availableDayId: id as string,
      });

      await refetch();
      toast.success("Horario creado exitosamente");
    } catch (error) {
      console.log(error);
      toast.error("Error al crear el horario");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex items-center flex-col">
        {/* Start Time */}
        <div className="space-y-2">
          <FormLabel>Inicio</FormLabel>
          <div className="flex items-center space-x-4">
            <FormField
              control={form.control}
              name="startHour"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP maxLength={2} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <span>:</span>
            <FormField
              control={form.control}
              name="startMinute"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP maxLength={2} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startPeriod"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-[80px]">
                        <SelectValue placeholder="AM/PM" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AM">AM</SelectItem>
                        <SelectItem value="PM">PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* End Time */}
        <div className="space-y-2">
          <FormLabel>Fin</FormLabel>
          <div className="flex items-center space-x-4">
            <FormField
              control={form.control}
              name="endHour"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP maxLength={2} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <span>:</span>
            <FormField
              control={form.control}
              name="endMinute"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP maxLength={2} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endPeriod"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-[80px]">
                        <SelectValue placeholder="AM/PM" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AM">AM</SelectItem>
                        <SelectItem value="PM">PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" className="w-full mt-4" disabled={isLoading}>
          {isLoading ? "Creando..." : "Crear horario"}
        </Button>
      </form>
    </Form>
  );
}
