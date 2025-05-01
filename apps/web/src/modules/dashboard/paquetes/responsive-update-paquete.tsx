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
import { Pencil } from "lucide-react";
import { UpdatePaqueteForm } from "./update-paquete-form";

interface PhotographersPackages {
  price: number;
  discountPercentage: number;
  features: {
    id: string;
    packageId: string;
    content: string;
  }[];
  name: string;
  id: string;
  photographerName: string;
  description: string;
  imageUrl: string;
  photoCount: number;
  isActive: boolean;
}

export function ResponsiveUpdatePaquete({ pack }: { pack: PhotographersPackages }) {
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
          className="cursor-pointer rounded-full size-10"
          variant={"defaultDashboard"}
        >
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[90vw] md:max-w-[50vw] lg:max-w-[40vw]">
        <DialogHeader>
          <DialogTitle>Actualiza tu paquete</DialogTitle>
          <DialogDescription>
            Rellena con la información actualizada para tu paquete
          </DialogDescription>
        </DialogHeader>
        <UpdatePaqueteForm pack={pack} onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );

  const MobileDrawer = () => (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          className="cursor-pointer rounded-full size-10"
          variant={"defaultDashboard"}
        >
          <Pencil />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-screen flex flex-col overflow-y-auto px-4 py-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        <div className="flex-1 overflow-y-auto">
          <DrawerHeader>
            <DrawerTitle>Actualiza tu paquete</DrawerTitle>
            <DrawerDescription>
              Rellena con la información actualizada para tu paquete
            </DrawerDescription>
          </DrawerHeader>
          <div className="mt-4">
            <UpdatePaqueteForm pack={pack} onSuccess={() => setIsOpen(false)} />
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
