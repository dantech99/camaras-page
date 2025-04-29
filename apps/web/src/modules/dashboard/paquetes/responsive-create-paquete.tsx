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
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@camaras/ui/src/components/drawer";
import { Button } from "@camaras/ui/src/components/button";
import { CreatePaqueteForm } from "./create-paquete-form";

import { CirclePlus } from "lucide-react";

export function ResponsiveCreatePaquete() {
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
        <Button variant={"defaultDashboard"} className="cursor-pointer">
          <CirclePlus />
          Crear paquete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[90vw] md:max-w-[50vw] lg:max-w-[40vw]">
        <DialogHeader>
          <DialogTitle>Crear un nuevo paquete</DialogTitle>
          <DialogDescription>
            Rellena el formulario para crear un nuevo paquete.
          </DialogDescription>
        </DialogHeader>
        <CreatePaqueteForm />
      </DialogContent>
    </Dialog>
  );

  const MobileDrawer = () => (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant={"defaultDashboard"} className="cursor-pointer">
          <CirclePlus />
          Crear paquete
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-screen flex flex-col overflow-y-auto px-4 py-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        <div className="flex-1 overflow-y-auto">
          <DrawerHeader>
            <DrawerTitle>Crear nuevo paquete</DrawerTitle>
            <DrawerDescription>
              Rellena el formulario para crear un nuevo paquete.
            </DrawerDescription>
          </DrawerHeader>
          <div className="mt-4">
            <CreatePaqueteForm />
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
