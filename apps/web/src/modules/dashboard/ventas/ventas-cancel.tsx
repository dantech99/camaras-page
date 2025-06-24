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
import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { toast } from "sonner";

export function VentasCancel({
  saleId,
  buyerName,
}: {
  saleId: string;
  buyerName: string;
}) {
  const { refetch } = useSales();

  const handleCancel = async () => {
    try {
      await SaleService.cancelSale(saleId);
      await refetch();
      toast.success("Venta cancelada correctamente", {
        description: "La venta ha sido cancelada correctamente",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error al cancelar la venta:", error);
      toast.error("Error al cancelar la venta", {
        description: "Hubo un error al cancelar la venta",
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
          <XCircleIcon className="h-4 w-4" />
          Cancelar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Se cancelará permanentemente la
            venta de {buyerName}. Esto confirma que el cliente hizo su pago y realmente se presento a su sesión de fotos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleCancel}
          >
            <XCircleIcon className="h-4 w-4" />
            Cancelar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
