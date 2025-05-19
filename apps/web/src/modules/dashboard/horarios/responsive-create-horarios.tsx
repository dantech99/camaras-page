"use client";

import { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@camaras/ui/src/components/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@camaras/ui/src/components/drawer";
import { Button } from "@camaras/ui/src/components/button";
import { PlusIcon } from "lucide-react";
import { CreateHorarioForm } from "./create-horario-form";

export function ResponsiveCreateHorarios() {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const DesktopDialog = () => (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <PlusIcon size={16} />
          Agregar horario
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Registro de Horarios Disponibles</DialogTitle>
          <DialogDescription>
            Ingresa los horarios disponibles en formato de 12 horas
          </DialogDescription>
        </DialogHeader>
        <CreateHorarioForm />
      </DialogContent>
    </Dialog>
  );

  const MobileDrawer = () => (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <PlusIcon size={16} />
          Agregar horario
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[90vh] flex flex-col overflow-hidden px-4 py-6">
        <div className="flex-1 overflow-y-auto">
          <DrawerHeader>
            <DrawerTitle>Registro de Horarios Disponibles</DrawerTitle>
            <DrawerDescription>
              Ingresa los horarios disponibles en formato de 12 horas
            </DrawerDescription>
          </DrawerHeader>
          <div className="mt-4">
            <CreateHorarioForm />
          </div>
        </div>
        <DrawerFooter className="mt-6 flex justify-end">
          <Button
            variant="outline"
            className="rounded-full cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Cancelar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );

  return isMobile ? <MobileDrawer /> : <DesktopDialog />;
}