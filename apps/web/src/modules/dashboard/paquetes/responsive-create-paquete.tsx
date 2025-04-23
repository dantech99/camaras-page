"use client"

import { useState, useEffect } from "react"
import { useMediaQuery } from "@camaras/ui/src/hooks/use-media-query"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@camaras/ui/src/components/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@camaras/ui/src/components/drawer"
import { Button } from "@camaras/ui/src/components/button"
import { CreatePaqueteForm } from "./create-paquete-form"

export function ResponsiveCreatePaquete() {
    const [isMobile, setIsMobile] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    })

    const DesktopDialog = () => (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    Crear paquete
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Crear nuevo paquete</DialogTitle>
                    <DialogDescription>
                        Rellena el formulario para crear un nuevo paquete.
                    </DialogDescription>
                </DialogHeader>
                <CreatePaqueteForm />
            </DialogContent>
        </Dialog>
    )

    const MobileDrawer = () => (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
                <Button>
                    Crear paquete
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Crear nuevo paquete</DrawerTitle>
                    <DrawerDescription>
                        Rellena el formulario para crear un nuevo paquete.
                    </DrawerDescription>
                </DrawerHeader>
                <div className="px-4">
                    <CreatePaqueteForm />
                </div>
                <DrawerFooter>
                    <Button variant="outline" className="rounded-full" onClick={() => setIsOpen(false)}>
                        Cancelar
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )

    return isMobile ? <MobileDrawer /> : <DesktopDialog />
}