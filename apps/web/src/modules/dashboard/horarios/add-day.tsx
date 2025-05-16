"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@camaras/ui/src/lib/utils"
import { Button } from "@camaras/ui/src/components/button"
import { Calendar } from "@camaras/ui/src/components/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@camaras/ui/src/components/popover"
import { DaysService } from "@/services/day-service"
import { toast } from "sonner"
import { useDays } from "@/hooks/use-day"

export function AddDay() {
    const { data, refetch } = useDays()
    const [date, setDate] = useState<Date>();
    const [isLoading, setIsLoading] = useState(false);

    function normalizeDateToLocalMidnight(date: Date) {
        const normalized = new Date(date);
        normalized.setHours(0, 0, 0, 0);
        return normalized;
    }

    const onSubmit = async () => {
        try {
            setIsLoading(true)
    
            const normalizedDate = normalizeDateToLocalMidnight(date!);
            const formatted = format(normalizedDate, "yyyy-MM-dd");

            console.log(formatted)
    
            if (data?.some(day => day.date === formatted)) {
                toast.error("El día ya existe")
                return
            }
    
            await DaysService.create(formatted)
            await refetch()
            setDate(undefined)
    
            toast.success("Día agregado correctamente")
        } catch (error) {
            toast.error("Error al agregar el día")
        } finally {
            setIsLoading(false)
        }
    }
    

    return (
        <div className="flex items-center justify-center gap-4">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            "w-[240px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Selecciona una fecha</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>

            <Button onClick={onSubmit} disabled={!date || isLoading}>
                {isLoading ? "Guardando..." : "Agregar día"}
            </Button>
        </div>
    );
}