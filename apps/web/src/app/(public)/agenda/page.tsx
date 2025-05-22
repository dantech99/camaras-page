"use client";

import { Progress } from "@camaras/ui/src/components/progress";
import { GlobalStepper } from "@/modules/agenda/config/stepper.config";
import { SelectPhotographer } from "@/modules/agenda/select-photographer";
import { SelectPackage } from "@/modules/agenda/select-package";
import { SelectDay } from "@/modules/agenda/select-day";
import { Button } from "@camaras/ui/src/components/button";
import { SelectPaymentMethod } from "@/modules/agenda/select-payment-method";
import { ConfirmPayment } from "@/modules/agenda/confirm-payment";
import { useSaleStore } from "@/modules/agenda/store/sale.store";
import { toast } from "sonner";

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
      default:
        break;
    }

    methods.next();
  };

  return (
    <GlobalStepper.Scoped>
      <div className="flex flex-col items-center justify-center h-[100dvh] max-w-6xl mx-auto">
        <div className="w-full space-y-2">
          <Progress value={methods.current.percentage} />
          <p className="text-2xl font-bold">{methods.current.title}</p>
          <p className="text-sm text-gray-500">{methods.current.description}</p>
        </div>
        <div className="flex items-center w-full justify-center gap-4">
          <div className="flex flex-col w-full h-full">
            <div className="w-full py-4">
              {methods.switch({
                first: () => <SelectPhotographer />,
                second: () => <SelectPackage />,
                third: () => <SelectDay />,
                fourth: () => <SelectPaymentMethod />,
                fifth: () => <ConfirmPayment />,
              })}
            </div>
            <div className="flex gap-2 w-full justify-between ">
              <Button
                onClick={() => methods.prev()}
                disabled={methods.current.id === "first"}
              >
                Atrás
              </Button>
              {methods.current.id !== "fifth" && (
                <Button onClick={handleNext}>
                  Siguiente
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </GlobalStepper.Scoped>
  );
}
