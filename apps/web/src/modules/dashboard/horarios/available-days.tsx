'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@camaras/ui/src/components/accordion";
import { useFSessions } from "@/hooks/use-fsessions";
import { Button } from "@camaras/ui/src/components/button";
import { format } from "date-fns";
import { Input } from "@camaras/ui/src/components/input";

export function AvailableDays() {
    const { data: fsessions, isLoading } = useFSessions();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Accordion type="single">
                {fsessions?.map((fsession) => (
                    <AccordionItem key={fsession.id} value={fsession.id}>
                        <AccordionTrigger>
                            <div className="flex items-center justify-between">
                                <h3>{format(new Date(fsession.date), "yyyy/MM/dd")}</h3>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col gap-2">
                                {fsession.timeSlots.map((slot) => (
                                    <div key={slot.id} className="flex items-center justify-between gap-1">
                                        <div className="flex gap-1">
                                            <Input defaultValue={slot.start ?? ''} type="time" className="w-48" />
                                            <Input defaultValue={slot.end ?? ''} type="time" className="w-48" />
                                        </div>
                                        <div className="flex gap-1">
                                            <Button variant="outline">Eliminar</Button>
                                            <Button variant="outline">Editar</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}