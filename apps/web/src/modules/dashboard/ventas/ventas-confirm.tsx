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
import { CheckCircleIcon } from "lucide-react";
import { toast } from "sonner";

export function VentasConfirm({
  saleId,
  buyerName,
}: {
  saleId: string;
  buyerName: string;
}) {
  const { refetch } = useSales();

  const handleConfirm = async () => {
    try {
      await SaleService.confirmSale(saleId);
      await refetch();
      toast.success("Venta confirmada correctamente", {
        description: "La venta ha sido confirmada correctamente",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error al confirmar la venta:", error);
      toast.error("Error al confirmar la venta", {
        description: "Hubo un error al confirmar la venta",
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
          <CheckCircleIcon className="h-4 w-4" />
          Confirmar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Se confirmará permanentemente la
            venta de {buyerName}. Esto confirma que el cliente hizo su pago y realmente se presento a su sesión de fotos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
          >
            <CheckCircleIcon className="h-4 w-4" />
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
