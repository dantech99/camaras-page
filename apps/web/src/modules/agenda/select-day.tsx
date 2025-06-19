"use client"

import { useSaleStore } from "@/modules/agenda/store/sale.store";
import { getPhotographerAvailableDays } from "@/hooks/use-photographers";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { capitalizeMonth } from "@/utils/capitalize-month";
import { parseISO } from "date-fns";
import { Button } from "@camaras/ui/src/components/button";

export function SelectDay() {
    const { photographerId, setDay, setTimeSlotId, setTimeSlot, timeSlotId, setDayId } = useSaleStore()
    const {data: availableDays, isLoading, isError} = getPhotographerAvailableDays(photographerId)

    return (
        <div className="flex flex-col flex-1">
            {
                isLoading ? (
                    <div className="flex items-center justify-center p-4">
                        <Loader2 className="animate-spin" />
                    </div>
                ) : isError ? (
                    <div className="flex items-center justify-center p-4">
                        <p className="text-red-500">Error al cargar los días disponibles</p>
                    </div>
                ) : availableDays?.availableDays?.length === 0 ? (
                    <div className="flex items-center justify-center p-4">
                        <p className="text-gray-500">No hay días disponibles</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {availableDays?.availableDays?.map((day) => (
                            <div key={day.day} className="space-y-3">
                                {/* Label del día */}
                                <h3 className="text-lg font-semibold border-b pb-2">
                                    {capitalizeMonth(format(parseISO(day.day), "d 'de' MMMM 'del' yyyy", {
                                        locale: es,
                                    }))}
                                </h3>
                                
                                {/* Horarios disponibles */}
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                    {day.timeSlots.map((slot) => (
                                        <Button
                                            key={slot.id}
                                            variant="outline"
                                            className={`
                                                flex items-center justify-center p-3 rounded-lg 
                                                transition-all duration-200 hover:shadow-md cursor-pointer
                                                font-medium text-sm
                                                ${timeSlotId === slot.id 
                                                    ? "border-2 border-primary-blue bg-primary-blue/10 text-primary-blue shadow-sm" 
                                                    : "border"
                                                }
                                            `}
                                            onClick={() => {
                                                setDay(day.day)
                                                setDayId(day.dayId)
                                                setTimeSlotId(slot.id)
                                                setTimeSlot(`${slot.start} ${slot.ampmStart} - ${slot.end} ${slot.ampmEnd}`)
                                            }}
                                        >
                                            {slot.start} {slot.ampmStart} - {slot.end} {slot.ampmEnd}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    )   
}