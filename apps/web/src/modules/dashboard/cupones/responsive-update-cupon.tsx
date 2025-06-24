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
import { UpdateCouponForm } from "./update-cupon-form";

interface Coupon {
  code: string;
  id: string;
  discountPercentage: number;
  expirationDate: string | Date;
  createdat: Date;
  isActive: boolean;
}

export function ResponsiveUpdateCupon({ coupon }: { coupon: Coupon }) {
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
      <Button className="flex items-center gap-2 justify-start w-full px-2"  variant={"ghost"}>
        <Pencil className="mr-2 h-4 w-4" />
        <span>Editar</span>
      </Button> 
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Actualiza tu cupón</DialogTitle>
          <DialogDescription>
            Rellena con la información actualizada para tu cupón
          </DialogDescription>
        </DialogHeader>
        <div>
          <UpdateCouponForm coupon={coupon} />
        </div>
      </DialogContent>
    </Dialog>
  );  

  const MobileDrawer = () => (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button className="flex items-center gap-2 justify-start w-full px-2" variant={"ghost"}>
          <Pencil className="mr-2 h-4 w-4" />
          <span>Editar</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-screen flex flex-col overflow-y-auto px-4 py-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        <div className="flex-1 overflow-y-auto">
          <DrawerHeader>
            <DrawerTitle>Actualiza tu cupón</DrawerTitle>
            <DrawerDescription>
              Rellena con la información actualizada para tu cupón
            </DrawerDescription>
          </DrawerHeader>
          <div className="mt-4">
            <UpdateCouponForm coupon={coupon} />
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