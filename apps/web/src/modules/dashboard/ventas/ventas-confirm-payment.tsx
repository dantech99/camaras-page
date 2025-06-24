"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@camaras/ui/src/components/alert-dialog";
import { useSales } from "@/hooks/use-sale";
import { SaleService } from "@/services/sale-service";
import { Button } from "@camaras/ui/src/components/button";
import { toast } from "sonner";
import { IconMoneybagPlus } from "@tabler/icons-react";

export function VentasConfirmPayment({
  saleId,
  buyerName,
}: {
  saleId: string;
  buyerName: string;
}) {
  const { refetch } = useSales();

  const handleConfirm = async () => {
    try {
      await SaleService.confirmPayment(saleId);
      await refetch();
      toast.success("Pago confirmado correctamente", {
        description: "El pago ha sido confirmado correctamente",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error al confirmar el pago:", error);
      toast.error("Error al confirmar el pago", {
        description: "Hubo un error al confirmar el pago",
        duration: 3000,
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="flex items-center gap-2 justify-start w-full px-2"
          variant={"ghost"}
        >
          <IconMoneybagPlus className="h-4 w-4" />
          Confirmar pago
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Se confirmará permanentemente el pago de {buyerName}. Esto confirma que el cliente hizo su pago y realmente se presento a su sesión de fotos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
          >
            <IconMoneybagPlus className="h-4 w-4" />
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
