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
import { Button, buttonVariants } from "@camaras/ui/src/components/button";
import { Trash, Trash2 } from "lucide-react";

import { CouponService } from "@/services/coupon-service";
import { useState } from "react";
import { toast } from "sonner";
import { useCoupons } from "@/hooks/use-cupons";

export function AlertDeteleCupon({ id, code }: { id: string; code: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const { refetch } = useCoupons();

  async function handleDelete(id: string) {
    try {
      setIsLoading(true);
      await CouponService.delete(id);
      await refetch();
      toast("El cupón de descuento ha sido eliminado correctamente", {
        description: "No hay reversiones para esta acción",
        duration: 3000,
      });
    } catch (error) {
      toast("El cupón no se pudo eliminar", {
        description: "Vuelva a intentar o intente más tarde",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructiveDashboard" size={"icon"} className="cursor-pointer">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estas seguro de querer eliminar {code}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no puede ser revertida. Por favor ten cuidado en cual
            cupón quieres eliminar
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className={buttonVariants({
              variant: "defaultDashboard",
            })}
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(id)}
            className={buttonVariants({
              variant: "destructiveDashboard",
            })}
          >
            {isLoading ? "Eliminando..." : "Eliminar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
