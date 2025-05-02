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
import { CreateCuponForm } from "./create-cupon-form";
import { CirclePlus } from "lucide-react";

export function ResponsiveCreateCupones() {
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
        <Button

        >
          <CirclePlus />
          Crear cupón
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear un nuevo cupon</DialogTitle>
          <DialogDescription>
            Rellena el formulario para crear un nuevo cupón de descuento.
          </DialogDescription>
        </DialogHeader>
        <CreateCuponForm />
      </DialogContent>
    </Dialog>
  );

  const MobileDrawer = () => (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button

        >
          <CirclePlus />
          Crear Cupón
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-screen flex flex-col overflow-hidden px-4 py-6">
        <div className="flex-1 overflow-y-auto">
          <DrawerHeader>
            <DrawerTitle>Crear nuevo cupón de descuento</DrawerTitle>
            <DrawerDescription>
              Rellena el formulario para crear un nuevo Cupón.
            </DrawerDescription>
          </DrawerHeader>
          <div className="mt-4">
            <CreateCuponForm />
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
