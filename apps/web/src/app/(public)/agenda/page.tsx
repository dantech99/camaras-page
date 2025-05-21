"use client";

import { Progress } from "@camaras/ui/src/components/progress";
import { GlobalStepper } from "@/modules/agenda/config/stepper.config";
import { SelectPhotographer } from "@/modules/agenda/select-photographer";
import { SelectPackage } from "@/modules/agenda/select-package";
import { SelectDay } from "@/modules/agenda/select-day";
import { useSaleStore } from "@/modules/agenda/store/sale.store";
import { Button } from "@camaras/ui/src/components/button";

export default function AgendaPage() {
  const methods = GlobalStepper.useStepper();
  const { photographerName, packageName, packagePrice, day, timeSlot } = useSaleStore();

  return (
    <GlobalStepper.Scoped>
      <div className="flex flex-col items-center justify-center h-[100dvh] max-w-6xl mx-auto">
        <div className="w-full space-y-2">
          <Progress value={methods.current.percentage} />
          <p className="text-2xl font-bold">{methods.current.title}</p>
          <p className="text-sm text-gray-500">{methods.current.description}</p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="flex flex-col w-full gap-4 h-full">
            <div className="flex-1 py-4">
              {methods.switch({
                first: () => <SelectPhotographer />,
                second: () => <SelectPackage />,
                third: () => <SelectDay />,
              })}
            </div>
            <div className="flex gap-2 w-full justify-between ">
              <Button
                onClick={() => methods.prev()}
                disabled={methods.current.id === "first"}
              >
                Atrás
              </Button>
              <Button
                onClick={() => methods.next()}
                disabled={methods.current.id === "fifth"}
              >
                Siguiente
              </Button>
            </div>
          </div>
          <aside className="w-64 p-4 border rounded-md h-full">
            <p className="text-lg font-bold">Resumen de compra:</p>
            <p>Fotógrafo: {photographerName || "Seleccionar"}</p>
            <p>Paquete: {packageName || "Seleccionar"}</p>
            <p>Precio: {packagePrice || "Seleccionar"}</p>
            <p>Día: {day || "Seleccionar"}</p>
            <p>Horario: {timeSlot || "Seleccionar"}</p>
          </aside>
        </div>
      </div>
    </GlobalStepper.Scoped>
  );
}
