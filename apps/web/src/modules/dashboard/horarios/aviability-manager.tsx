"use client"

import { useState, useEffect } from "react"
import { format, parse, addMinutes } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Clock, Camera, ChevronLeft, ChevronRight, Plus, Save, Trash2 } from "lucide-react"

import { Button } from "@camaras/ui/src/components/button"
import { ScrollArea } from "@camaras/ui/src/components/scroll-area"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@camaras/ui/src/components/card"
import { Badge } from "@camaras/ui/src/components/badge"
import { Label } from "@camaras/ui/src/components/label"
import { Input } from "@camaras/ui/src/components/input"
import { Switch } from "@camaras/ui/src/components/switch"
import { toast } from "sonner"
import { SessionsService } from "@/services/sessions-service"

export default function Component() {
  const today = new Date()
  const [date, setDate] = useState<Date>(today)
  const [currentMonth, setCurrentMonth] = useState<Date>(today)
  const [calendarDays, setCalendarDays] = useState<Array<Date | null>>([])
  const [isDayAvailable, setIsDayAvailable] = useState<boolean>(false)
  const [timeSlots, setTimeSlots] = useState<Array<{ start: string; end: string; isBooked: boolean }>>([])
  const [availableDays, setAvailableDays] = useState<
    Map<string, Array<{ start: string; end: string; isBooked: boolean }>>
  >(new Map())

  // Generate calendar days for the current month with 5 weeks (35 days)
  useEffect(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    // First day of the month
    const firstDayOfMonth = new Date(year, month, 1)
    // Day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = firstDayOfMonth.getDay()

    // Calculate how many days to show from the previous month
    // If first day is Sunday (0), we need to show 6 days from previous month to start with Monday
    const daysFromPrevMonth = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1

    // Start date will be X days before the first day of the month
    const startDate = new Date(year, month, 1 - daysFromPrevMonth)

    // Generate 35 days (5 weeks)
    const days = []
    for (let i = 0; i < 35; i++) {
      const day = new Date(startDate)
      day.setDate(startDate.getDate() + i)
      days.push(day)
    }

    setCalendarDays(days)
  }, [currentMonth])

  // Helper: Convert yyyy-MM-dd string to local Date object
  const dateStringToLocalDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  // Check if a date has availability set
  const hasAvailability = (day: Date) => {
    const dateKey = format(day, "yyyy-MM-dd");
    return availableDays.has(dateKey) && availableDays.get(dateKey)!.length > 0;
  }

  // Load availability for selected date
  useEffect(() => {
    const dateKey = format(date, "yyyy-MM-dd");
    if (availableDays.has(dateKey)) {
      setTimeSlots([...availableDays.get(dateKey)!]);
      setIsDayAvailable(true);
    } else {
      setTimeSlots([]);
      setIsDayAvailable(false);
    }
  }, [date, availableDays]);

  // Handle availability toggle
  const handleAvailabilityToggle = async (isAvailable: boolean) => {
    setIsDayAvailable(isAvailable);

    if (!isAvailable) {
      const dateKey = format(date, "yyyy-MM-dd");
      const existingDay = Array.from(availableDays.entries()).find(
        ([key]) => key === dateKey
      );

      if (existingDay) {
        try {
          // Delete the day from the backend
          await SessionsService.update(existingDay[0], { timeSlots: [] });

          // Update local state
          const newAvailableDays = new Map(availableDays);
          newAvailableDays.delete(dateKey);
          setAvailableDays(newAvailableDays);
          setTimeSlots([]);

          toast.success("Disponibilidad actualizada", {
            description: "Se han eliminado todos los horarios para este día",
          });
        } catch (error) {
          toast.error("Error al actualizar", {
            description: "No se pudieron eliminar los horarios. Por favor, intente nuevamente.",
          });
          // Revert the toggle if there was an error
          setIsDayAvailable(true);
        }
      }
    } else if (timeSlots.length === 0) {
      // Add default time slot when toggling availability on
      setTimeSlots([{ start: "09:00", end: "09:15", isBooked: false }]);
    }
  };

  // Add a new time slot
  const addTimeSlot = () => {
    // Get the last time slot's end time as the start time for the new slot
    const lastSlot = timeSlots[timeSlots.length - 1]
    const lastEndTime = lastSlot ? lastSlot.end : "09:00"

    // Calculate new end time (15 minutes after start)
    const startTimeObj = parse(lastEndTime, "HH:mm", new Date())
    const endTimeObj = addMinutes(startTimeObj, 15)
    const newEndTime = format(endTimeObj, "HH:mm")

    setTimeSlots([...timeSlots, { start: lastEndTime, end: newEndTime, isBooked: false }])
  }

  // Remove a time slot
  const removeTimeSlot = (index: number) => {
    const newTimeSlots = [...timeSlots]
    newTimeSlots.splice(index, 1)
    setTimeSlots(newTimeSlots)
  }

  // Update time slot
  const updateTimeSlot = (index: number, field: "start" | "end", value: string) => {
    // Basic validation for time format HH:mm
    if (/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
      const newTimeSlots = [...timeSlots]
      newTimeSlots[index][field] = value

      // If updating start time, ensure end time is at least 15 minutes later
      if (field === "start") {
        const startTimeObj = parse(value, "HH:mm", new Date())
        const currentEndTimeObj = parse(newTimeSlots[index].end, "HH:mm", new Date())

        if (startTimeObj >= currentEndTimeObj) {
          const newEndTimeObj = addMinutes(startTimeObj, 15)
          newTimeSlots[index].end = format(newEndTimeObj, "HH:mm")
        }
      }

      setTimeSlots(newTimeSlots)
    }
  }

  // Save availability for the selected date
  const saveAvailability = async () => {
    if (!isDayAvailable || timeSlots.length === 0) {
      // If day is marked as unavailable, remove any existing availability
      const dateKey = format(date, "yyyy-MM-dd")
      const newAvailableDays = new Map(availableDays)
      newAvailableDays.delete(dateKey)
      setAvailableDays(newAvailableDays)

      toast.success("Disponibilidad actualizada", {
        description: "Se ha marcado este día como no disponible",
      })
      return
    }

    // Validate time slots
    for (let i = 0; i < timeSlots.length; i++) {
      const slot = timeSlots[i]
      const startTime = parse(slot.start, "HH:mm", new Date())
      const endTime = parse(slot.end, "HH:mm", new Date())

      if (startTime >= endTime) {
        toast.error("Error en los horarios", {
          description: `La hora de inicio debe ser anterior a la hora de fin en el horario ${i + 1}`,
        })
        return
      }

      // Check for overlapping time slots
      for (let j = 0; j < timeSlots.length; j++) {
        if (i !== j) {
          const otherSlot = timeSlots[j]
          const otherStartTime = parse(otherSlot.start, "HH:mm", new Date())
          const otherEndTime = parse(otherSlot.end, "HH:mm", new Date())

          if (
            (startTime >= otherStartTime && startTime < otherEndTime) ||
            (endTime > otherStartTime && endTime <= otherEndTime) ||
            (startTime <= otherStartTime && endTime >= otherEndTime)
          ) {
            toast.error("Horarios superpuestos", {
              description: `El horario ${i + 1} se superpone con el horario ${j + 1}`,
            })
            return
          }
        }
      }
    }

    try {
      const dateKey = format(date, "yyyy-MM-dd")
      const timeSlotsData = timeSlots.map((slot) => ({
        start: slot.start,
        end: slot.end,
      }))

      // Check if we already have an ID for this date
      const existingDay = Array.from(availableDays.entries()).find(
        ([key]) => key === dateKey
      )

      if (existingDay) {
        // Update existing day
        await SessionsService.update(existingDay[0], { timeSlots: timeSlotsData })
      } else {
        // Create new day
        await SessionsService.create({
          date: dateKey,
          timeSlots: timeSlotsData,
        })
      }

      // Update local state
      const newAvailableDays = new Map(availableDays)
      newAvailableDays.set(dateKey, timeSlots)
      setAvailableDays(newAvailableDays)

      toast.success("Disponibilidad guardada", {
        description: `Se han guardado ${timeSlots.length} horarios para el ${format(date, "d 'de' MMMM", { locale: es })}`,
      })
    } catch (error) {
      toast.error("Error al guardar", {
        description: "No se pudo guardar la disponibilidad. Por favor, intente nuevamente.",
      })
    }
  }

  // Load initial data
  useEffect(() => {
    const loadAvailableDays = async () => {
      try {
        const data = await SessionsService.getAll();
        const daysMap = new Map();

        if (data) {
          data.forEach((day: any) => {
            // Use the date string directly as the key
            daysMap.set(day.date, day.timeSlots);
          });
        }

        setAvailableDays(daysMap);
      } catch (error) {
        toast.error("Error al cargar", {
          description: "No se pudieron cargar los días disponibles.",
        });
      }
    };

    loadAvailableDays();
  }, []);

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  // Check if a date is today
  const isToday = (day: Date) => {
    return day.toDateString() === today.toDateString()
  }

  // Check if a date is selected
  const isSelected = (day: Date) => {
    return day.toDateString() === date.toDateString()
  }

  // Check if a date is in the current month
  const isCurrentMonth = (day: Date) => {
    return day.getMonth() === currentMonth.getMonth()
  }

  // Format day number with leading zero
  const formatDayNumber = (day: number) => {
    return day.toString().padStart(2, "0")
  }

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return (
    <div className="container mx-auto">
      <Card className="w-full bg-background max-w-6xl mx-auto border p-4">
        <CardHeader className="px-0">
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-6 w-6" />
            Calendario de Sesiones Fotográficas
          </CardTitle>
          <CardDescription>Gestiona tu disponibilidad para sesiones fotográficas</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Custom Calendar Section - Takes 3/5 of the space on desktop */}
            <div className="lg:col-span-3 rounded-lg p-4">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">{capitalize(format(currentMonth, "MMMM yyyy", { locale: es }))}</h2>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" onClick={prevMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={nextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Weekday Headers */}
                {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((day) => (
                  <div key={day} className="text-center font-medium text-sm py-2">
                    {day}
                  </div>
                ))}

                {/* Calendar Days */}
                {calendarDays.map((day, index) => {
                  if (!day) return null;

                  return (
                    <Button
                      key={index}
                      variant={isSelected(day) ? "default" : "ghost"}
                      className={`
                        h-16 w-full p-1 flex flex-col items-center justify-center
                        ${!isCurrentMonth(day) ? "opacity-40" : ""}
                        ${isToday(day) ? "border-primary" : ""}
                        ${hasAvailability(day) ? "border-green-500 border-2" : ""}
                      `}
                      disabled={day < today}
                      onClick={() => setDate(day)}
                    >
                      <span className="text-lg font-medium">{formatDayNumber(day.getDate())}</span>
                      {hasAvailability(day) && (
                        <Badge variant="secondary" className="mt-1 text-xs px-1">
                          {availableDays.get(day.toISOString().split("T")[0])!.length}
                        </Badge>
                      )}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Availability Section - Takes 2/5 of the space on desktop */}
            <div className="lg:col-span-2 border rounded-lg">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Disponibilidad
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="day-available" className="text-sm">
                      {isDayAvailable ? "Disponible" : "No disponible"}
                    </Label>
                    <Switch id="day-available" checked={isDayAvailable} onCheckedChange={handleAvailabilityToggle} />
                  </div>
                </div>
              </div>

              {isDayAvailable ? (
                <div className="p-4 space-y-4">
                  <div className="space-y-4">
                    {timeSlots.map((slot, index) => (
                      <div key={index} className="flex items-end space-x-2">
                        <div className="flex-1">
                          <Label htmlFor={`start-time-${index}`} className="text-xs mb-1 block">
                            Inicio
                          </Label>
                          <Input
                            id={`start-time-${index}`}
                            value={slot.start}
                            onChange={(e) => updateTimeSlot(index, "start", e.target.value)}
                            placeholder="HH:MM"
                          />
                        </div>
                        <div className="flex-1">
                          <Label htmlFor={`end-time-${index}`} className="text-xs mb-1 block">
                            Fin
                          </Label>
                          <Input
                            id={`end-time-${index}`}
                            value={slot.end}
                            onChange={(e) => updateTimeSlot(index, "end", e.target.value)}
                            placeholder="HH:MM"
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeTimeSlot(index)}
                          disabled={timeSlots.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between pt-2">
                    <Button variant="outline" size="sm" onClick={addTimeSlot} className="flex items-center">
                      <Plus className="h-4 w-4 mr-1" /> Agregar horario
                    </Button>
                    <Button onClick={saveAvailability} className="flex items-center">
                      <Save className="h-4 w-4 mr-1" /> Guardar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  <p>Marca este día como disponible para añadir horarios.</p>
                  <Button variant="outline" className="mt-4" onClick={() => handleAvailabilityToggle(true)}>
                    Marcar como disponible
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start px-0">
          <h3 className="text-sm font-medium mb-2">Días con disponibilidad configurada</h3>
          <div className="w-full">
            {availableDays.size > 0 ? (
              <div className="space-y-2">
                {Array.from(availableDays.entries()).map(([dateKey, slots]) => (
                  <div key={dateKey} className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{format(dateStringToLocalDate(dateKey), "dd/MM/yyyy")}:</span>
                      <span>{slots.length} {slots.length === 1 ? "Sesion" : "Sesiones"} {slots.length === 1 ? "creada" : "creadas"}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setDate(dateStringToLocalDate(dateKey));
                      }}
                    >
                      Ver
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No hay días con disponibilidad configurada.</p>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
