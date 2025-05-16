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
import { Trash2 } from "lucide-react";

import { TimeService } from "@/services/time-service";
import { useState } from "react";
import { toast } from "sonner";
import { useDayById } from "@/hooks/use-day";
import { useParams } from "next/navigation";

export function AlertDeleteHorario({ idTime }: { idTime: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { refetch } = useDayById(id as string);

  async function handleDelete(idTime: string) {
    try {
      setIsLoading(true);
      await TimeService.delete(idTime);
      await refetch();
      toast.success("Horario eliminado exitosamente");
    } catch (error) {
      toast.error("Error al eliminar el horario");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="text-red-400 hover:text-red-500 w-full text-center">
          Eliminar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estas seguro de querer eliminar este horario?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no puede ser revertida. Por favor ten cuidado en cual
            horario quieres eliminar
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className={buttonVariants({
              variant: "default",
            })}
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(idTime)}
            className={buttonVariants({
              variant: "destructive",
            })}
          >
            {isLoading ? "Eliminando..." : "Eliminar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
