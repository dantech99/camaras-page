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
import { Pencil } from "lucide-react";
import { UpdateHorarioForm } from "./update-horario-form";

interface Horario {
    id: string;
    start: string;
    end: string;
    ampmStart: string;
    ampmEnd: string;
    availableDayId: string;
}

export function ResponsiveUpdateHorario({ horario }: { horario: Horario }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  });

  const DesktopDialog = () => (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full text-center">
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Actualiza tu horario</DialogTitle>
          <DialogDescription>
            Rellena con la información actualizada para tu horario
          </DialogDescription>
        </DialogHeader>
        <div>
          <UpdateHorarioForm horario={horario} />
        </div>
      </DialogContent>
    </Dialog>
  );

  const MobileDrawer = () => (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" className="w-full text-center">
          Editar
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-screen flex flex-col overflow-y-auto px-4 py-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        <div className="flex-1 overflow-y-auto">
          <DrawerHeader>
            <DrawerTitle>Actualiza tu horario</DrawerTitle>
            <DrawerDescription>
              Rellena con la información actualizada para tu horario
            </DrawerDescription>
          </DrawerHeader>
          <div className="mt-4">
            <UpdateHorarioForm horario={horario} />
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
