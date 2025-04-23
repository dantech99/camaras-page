"use client"

import type React from "react"
import Image from "next/image"

import { useState, useRef } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@camaras/ui/src/components/button"
import { Input } from "@camaras/ui/src/components/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@camaras/ui/src/components/form"
import { Camera } from "lucide-react"

const createPaqueteSchema = z.object({
    name: z.string().min(1, { message: "El nombre es requerido" }),
    description: z.string().min(1, { message: "La descripción es requerida" }),
    price: z.number().min(1, { message: "El precio es requerido" }),
    photosQuantity: z.number().min(1, { message: "La cantidad de fotos es requerida" }),
    imageUrl: z
        .any()
        .optional()
        .refine(
            (file) => {
                if (file instanceof File) {
                    return file.size <= 10 * 1024 * 1024;
                }
                return true;
            },
            {
                message: "La imagen debe pesar menos de 10MB",
            }
        ),
})

export function CreatePaqueteForm() {
    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement | null>(null)


    const form = useForm<z.infer<typeof createPaqueteSchema>>({
        resolver: zodResolver(createPaqueteSchema),
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            photosQuantity: 0,
        },
    })

    async function onSubmit(values: z.infer<typeof createPaqueteSchema>) {
        console.log(values)
    }

    function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
            form.setValue("imageUrl", file);
        }
    }

    function handleImageClick() {
        fileInputRef.current?.click();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-4 grid-cols-1  md:grid-cols-2">
                    <div>
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Imagen del Producto</FormLabel>
                                    <FormControl>
                                        <div
                                            className="relative w-full aspect-square border border-input rounded-md overflow-hidden cursor-pointer"
                                            onClick={handleImageClick}
                                        >
                                            {previewImage ? (
                                                <Image
                                                    src={previewImage}
                                                    alt="Vista previa"
                                                    layout="fill"
                                                    objectFit="cover"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center h-full">
                                                    <Camera className="w-12 h-12 text-muted-foreground" />
                                                </div>
                                            )}
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/jpeg, image/jpg, image/png"
                                                onChange={handleImageChange}
                                                className="hidden"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-y-2 md:gap-0 md:justify-between h-full">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre del paquete</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Paquete Premium" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Pequeña descripción</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Agrega una descripción" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Precio</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="photosQuantity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cantidad de fotos</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            </form>
            <Button type="submit" className="w-full rounded-full mt-2" variant="outline">
                Crear paquete
            </Button>
        </Form>
    )
}
