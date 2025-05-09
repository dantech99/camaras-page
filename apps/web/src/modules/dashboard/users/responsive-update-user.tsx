import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@camaras/ui/src/components/dialog";

import { useEffect, useState } from "react";
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
import { Eye } from "lucide-react";
import { UserInfoCard } from "./user-info";

export function ResponsiveUpdateUser() {
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
      <DrawerTrigger asChild>
        <Button size={"icon"} className="cursor-pointer">
          <Eye />
        </Button>
      </DrawerTrigger>
      <DialogContent className="sm:max-w-[90vw] md:max-w-[50vw] lg:max-w-[40vw]">
        <DialogHeader>
          <DialogTitle>Información del Usuario</DialogTitle>
          <DialogDescription>
            Información general del usuario.
          </DialogDescription>
        </DialogHeader>
        <UserInfoCard
          user={{
            name: "John Doe",
            phoneNumber: "+123456789",
            email: "example",
            role: "admin",
          }}  
          />
      </DialogContent>
    </Dialog>
  );

  const MobileDrawer = () => (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button size={"icon"} className="cursor-pointer">
          <Eye />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-screen flex flex-col px-4 py-6">
        <div className="flex-1 overflow-hidden">
          <DrawerHeader>
            <DrawerTitle>Información del Usuario</DrawerTitle>
            <DrawerDescription>
              Información general del usuario.
            </DrawerDescription>
          </DrawerHeader>
          <div className="mt-4 overflow-y-auto max-h-[calc(100vh-450px)] px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          <UserInfoCard
          user={{
            name: "John Doe",
            phoneNumber: "+123456789",
            email: "example",
            role: "admin",
          }}  
          />
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
