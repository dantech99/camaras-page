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
import { Trash } from "lucide-react";

import { PackageService } from "@/services/package-service";
import { useState } from "react";
import { toast } from "sonner";
import { usePackages } from "@/hooks/use-packages";

export function AlertDetelePaquete({ id, name }: { id: string; name: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const { refetch } = usePackages();

  async function handleDelete(id: string) {
    try {
      setIsLoading(true);
      await PackageService.delete(id);
      await refetch();
      toast("El paquete ha sido eliminado correctamente", {
        description: "No hay reversiones para esta acción",
        duration: 3000,
      });
    } catch (error) {
      toast("El paquete no se pudo eliminar", {
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
        <Button variant="ghost" className="text-primary-blue hover:text-red-500">
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estas seguro de querer eliminar {name.toLowerCase()}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no puede ser revertida. Por favor ten cuidado en cual
            paquete quieres eliminar
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
            onClick={() => handleDelete(id)}
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
