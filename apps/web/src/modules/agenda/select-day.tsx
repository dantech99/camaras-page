"use client"

import { useSaleStore } from "@/modules/agenda/store/sale.store";
import { getPhotographerAvailableDays } from "@/hooks/use-photographers";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { capitalizeMonth } from "@/utils/capitalize-month";
import { parseISO } from "date-fns";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@camaras/ui/src/components/accordion";
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
                        <p>Error al cargar los días disponibles</p>
                    </div>
                ) : availableDays?.availableDays?.length === 0 ? (
                    <div className="flex items-center justify-center p-4">
                        <p>No hay días disponibles</p>
                    </div>
                ) : (
                    <Accordion type="single" collapsible className="flex flex-col gap-4">
                        {availableDays?.availableDays?.map((day) => (
                            <AccordionItem value={day.day} key={day.day}>
                                <AccordionTrigger>
                                    {capitalizeMonth(format(parseISO(day.day), "d 'de' MMMM 'del' yyyy", {
                                        locale: es,
                                    }))}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {day.timeSlots.map((slot) => (
                                            <Button
                                                key={slot.id}
                                                variant="outline"
                                                className={`flex flex-col rounded-xl overflow-hidden transition-all hover:shadow-xl cursor-pointer ${timeSlotId === slot.id ? "border-2 border-primary-blue" : "border-2"}`}
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
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                )
            }
        </div>
    )   
}