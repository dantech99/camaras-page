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
import { MoonStarIcon } from "lucide-react";
import { toast } from "sonner";

export function VentasNoshow({
  saleId,
  buyerName,
}: {
  saleId: string;
  buyerName: string;
}) {
  const { refetch } = useSales();

  const handleNoshow = async () => {
    try {
      await SaleService.noShowSale(saleId);
      await refetch();
      toast.success("Se marco correctamente", {
        description: "La venta ha sido marcada como no-show correctamente",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error al marcar la venta como no-show:", error);
      toast.error("Error al marcar la venta como no-show", {
        description: "Hubo un error al marcar la venta como no-show",
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
          <MoonStarIcon className="h-4 w-4" />
          No se presento
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Se confirmará permanentemente la
            venta de {buyerName}. Esto confirma que el cliente no se presento a su sesión de fotos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleNoshow}
          >
            <MoonStarIcon className="h-4 w-4" />
            No se presento
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
