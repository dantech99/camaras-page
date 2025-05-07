"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Clock, Camera, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@camaras/ui/src/components/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@camaras/ui/src/components/card"
import { Label } from "@camaras/ui/src/components/label"
import { Switch } from "@camaras/ui/src/components/switch"
import { toast } from "sonner"
import { useFSessions } from "@/hooks/use-fsessions"

export function AviabilityManager() {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today)
  const [calendarDays, setCalendarDays] = useState<Date[]>([])

  useEffect(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()


    const firstDayOfMonth = new Date(year, month, 1)
    const firstDayOfWeek = firstDayOfMonth.getDay()

    const daysFromPrevMonth = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1

    const startDate = new Date(year, month, 1 - daysFromPrevMonth)

    const days = []
    for (let i = 0; i < 35; i++) {
      const day = new Date(startDate)
      day.setDate(startDate.getDate() + i)
      days.push(day)
    }

    setCalendarDays(days)
  }, [currentMonth])

  const { data } = useFSessions()

  console.log(data)


  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const nextMonth = () => {
    const next = new Date(currentMonth)
    next.setMonth(currentMonth.getMonth() + 1)
    setCurrentMonth(next)
  }

  const prevMonth = () => {
    const prev = new Date(currentMonth)
    prev.setMonth(currentMonth.getMonth() - 1)
    setCurrentMonth(prev)
  }

  const formatDayNumber = (day: number) => {
    return day < 10 ? `0${day}` : day
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
            <div className="lg:col-span-3 rounded-lg p-4">
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

              <div className="grid grid-cols-7 gap-1">
                {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((day) => (
                  <div key={day} className="text-center font-medium text-sm py-2">
                    {day}
                  </div>
                ))}

                {calendarDays.map((day, index) => {
                  if (!day) return null;

                  return (
                    <Button
                      key={index}
                      variant={"ghost"}
                      className={`
                        h-16 w-full p-1 flex flex-col items-center justify-center
                      `}
                      disabled={day < today}
                    >
                      <span className="text-lg font-medium">{formatDayNumber(day.getDate())}</span>

                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-2 border rounded-lg">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Disponibilidad
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="day-available" className="text-sm">
                      Disponible
                    </Label>
                    <Switch id="day-available" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
