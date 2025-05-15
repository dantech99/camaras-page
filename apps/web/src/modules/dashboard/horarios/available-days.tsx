'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@camaras/ui/src/components/accordion";
import { useFSessions } from "@/hooks/use-fsessions";

export function AvailableDays() {
    const { data: fsessions, isLoading } = useFSessions();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Días que elegiste:</h2>
            <Accordion type="single">
                {fsessions?.map((fsession) => (
                    <AccordionItem key={fsession.id} value={fsession.id}>
                        <AccordionTrigger>
                            <div className="flex items-center justify-between">
                                <h3>{fsession.date}</h3>
                                <p>{fsession.isAvailable ? 'Disponible' : 'No disponible'}</p>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div>
                                {fsession.timeSlots.map((slot) => (
                                    <div key={slot.id}>
                                        <p>{slot.start}</p>
                                        <p>{slot.end}</p>
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