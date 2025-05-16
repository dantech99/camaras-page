'use client'

import { useParams } from "next/navigation";
import { useDayById } from "@/hooks/use-day";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { EyeIcon, Loader2, Pencil, Trash } from "lucide-react";
import { capitalizeMonth } from "@/utils/capitalize-month";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@camaras/ui/src/components/card";
import { Button } from "@camaras/ui/src/components/button";
import { Badge } from "@camaras/ui/src/components/badge";
import { ResponsiveCreateHorarios } from "@/modules/dashboard/horarios/responsive-create-horarios";


export default function SessionPage() {
    const { id } = useParams();

    const { data: day, isLoading } = useDayById(id as string);

    if (isLoading) {
        return (
            <div className="h-52 flex justify-center items-center">
                <span className="flex gap-2">
                    <Loader2 className="animate-spin" />
                    <p>Cargando...</p>
                </span>
            </div>
        )
    }

    return (
        <div className="px-4 py-2 space-y-4">
            <div className="flex items-center gap-2">
                <ResponsiveCreateHorarios />
                <h3 className="font-bold text-2xl">{capitalizeMonth(format(new Date(day?.date || ""), "d 'de' MMMM 'del' yyyy", {
                    locale: es,
              }))}</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {day?.timeSlots.map((slot, index) => (
                    <Card key={index} className="py-4">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <p>Horario</p>
                                {
                                    slot.isBooked ? (
                                        <Badge variant="outline" className="text-orange-500 border-orange-500">Reservado</Badge>
                                    ) : (
                                        <Badge variant="outline" className="text-green-500 border-green-500">Disponible</Badge>
                                    ) 
                                }
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{slot.start} - {slot.end}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" size={"icon"}>
                                <Pencil />
                            </Button>
                            {
                                slot.isBooked ? (
                                    <Button variant="outline" size={"icon"}>
                                        <EyeIcon />
                                    </Button>
                                ) : (
                                    <Button variant="destructive" size={"icon"}>
                                        <Trash />
                                    </Button>
                                )
                            }   
                        </CardFooter>
                    </Card>
                ))}
            
            </div>
        </div>
    );
}