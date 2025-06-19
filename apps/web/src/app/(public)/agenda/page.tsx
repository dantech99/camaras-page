"use client";

import { Progress } from "@camaras/ui/src/components/progress";
import { GlobalStepper } from "@/modules/agenda/config/stepper.config";
import { SelectPhotographer } from "@/modules/agenda/select-photographer";
import { SelectPackage } from "@/modules/agenda/select-package";
import { SelectDay } from "@/modules/agenda/select-day";
import { Button } from "@camaras/ui/src/components/button";
import { SelectPaymentMethod } from "@/modules/agenda/select-payment-method";
import { UserData } from "@/modules/agenda/user-data";
import { useSaleStore } from "@/modules/agenda/store/sale.store";
import { toast } from "sonner";
import { ConfirmPayment } from "@/modules/agenda/confirm-payment";

export default function AgendaPage() {
  const methods = GlobalStepper.useStepper();
  const saleStore = useSaleStore();

  const handleNext = () => {
    const currentStepId = methods.current.id;

    switch (currentStepId) {
      case "first":
        if (!saleStore.photographerId) {
          toast.error("Por favor, selecciona un fotógrafo antes de continuar.");
          return;
        }
        break;
      case "second":
        if (!saleStore.packageId) {
          toast.error("Por favor, selecciona un paquete antes de continuar.");
          return;
        }
        break;
      case "third":
        if (!saleStore.timeSlotId) {
          toast.error("Por favor, selecciona un horario antes de continuar.");
          return;
        }
        break;
      case "fourth":
        if (!saleStore.methodPayment) {
          toast.error("Por favor, selecciona un método de pago antes de continuar.");
          return;
        }
        break;
      case "fifth":
        
        if (!saleStore.name || !saleStore.phoneNumber || !saleStore.character) {
          toast.error("Por favor, completa todos los campos antes de continuar.");
          return;
        }

        if (!saleStore.isVerified) {
          toast.error("Por favor, ingresa tu correo electrónico antes de continuar.");
          return;
        }
        break;
      default:
        break;
    }

    methods.next();
  };

  return (
    <GlobalStepper.Scoped>
      <div className="flex flex-col h-[calc(100dvh-8rem)] p-8 mt-28">
        {/* Progress bar y títulos - siempre arriba */}
        <div className="w-full space-y-2 flex-shrink-0">
          <Progress value={methods.current.percentage} />
          <p className="text-2xl font-bold">{methods.current.title}</p>
          <p className="text-sm text-gray-500">{methods.current.description}</p>
        </div>

        {/* Contenido principal - ocupa el espacio restante con overflow */}
        <div className="flex-1 overflow-y-auto py-4 min-h-0">
          <div className="flex items-center w-full justify-center">
            <div className="w-full">
              {methods.switch({
                first: () => <SelectPhotographer />,
                second: () => <SelectPackage />,
                third: () => <SelectDay />,
                fourth: () => <SelectPaymentMethod />,
                fifth: () => <UserData />,
                sixth: () => <ConfirmPayment />,
              })}
            </div>
          </div>
        </div>

        {/* Botones - siempre en el bottom */}
        <div className="flex-shrink-0 flex justify-between gap-4 pt-4">
          <Button
            onClick={() => methods.prev()}
            disabled={methods.current.id === "first"}
          >
            Atrás
          </Button>
          {methods.current.id !== "sixth" && (
            <Button onClick={handleNext}>
              Siguiente
            </Button>
          )}
        </div>
      </div>
    </GlobalStepper.Scoped>
  );
}