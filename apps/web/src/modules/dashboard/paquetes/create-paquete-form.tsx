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
import { Camera, Plus, X } from "lucide-react"
import { Badge } from "@camaras/ui/src/components/badge"
import { PackagePhotosService } from "@/services/package-photos-service"
import { toast } from "sonner"

const createPaqueteSchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido" }),
  description: z.string().min(1, { message: "La descripción es requerida" }),
  dotsDescription: z
    .array(z.string())
    .min(1, { message: "Se requiere al menos una descripción" })
    .max(10, { message: "Se permiten un máximo de 10 descripciones" }),
  price: z.number().min(1, { message: "El precio es requerido" }),
  photosCount: z.number().min(1, { message: "La cantidad de fotos es requerida" }),
  image: z
    .instanceof(File)
    .nullable()
})

export function CreatePaqueteForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [photoInput, setPhotoInput] = useState<string>("")
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const form = useForm<z.infer<typeof createPaqueteSchema>>({
    resolver: zodResolver(createPaqueteSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      photosCount: 0,
      image: null,
      dotsDescription: [],
    },
  })

  const photos = form.watch("dotsDescription")

  const addDotsDescription = () => {
    if (!photoInput.trim()) return

    // Check if photo already exists
    if (photos.includes(photoInput)) return

    form.setValue("dotsDescription", [...photos, photoInput])

    // Reset input
    setPhotoInput("")
  }

  const removeDotsDescription = (index: number) => {
    const updatedPhotos = [...photos]
    updatedPhotos.splice(index, 1)
    form.setValue("dotsDescription", updatedPhotos)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addDotsDescription()
    }
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
      form.setValue("image", file)
    }
  }

  function handleImageClick() {
    fileInputRef.current?.click()
  }

  async function onSubmit(values: z.infer<typeof createPaqueteSchema>) {
    try {
      setIsLoading(true)
      await PackagePhotosService.create(values)
      toast("El paquete de fotos fue creado", {
        description: "Ahora puedes verlo en la tabla de paquetes",
        duration: 3000,
      })
    } catch (error) {
      toast("Event has been created", {
        description: "Sunday, December 03, 2023 at 9:00 AM",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-4 py-3">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 items-start">
          {/* Recuadro de la imagen */}
          <div>
            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel>Imagen del Paquete</FormLabel>
                  <FormControl>
                    <div
                      className="relative w-full aspect-square border border-input rounded-md overflow-hidden cursor-pointer"
                      onClick={handleImageClick}
                    >
                      {previewImage ? (
                        <Image
                          src={previewImage || "/placeholder.svg"}
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

          {/* Inputs del lado derecho */}
          <div className="flex flex-col gap-y-4">
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
                  <FormLabel>Descripción</FormLabel>
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
              name="photosCount"
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

            <FormField
              control={form.control}
              name="dotsDescription"
              render={() => (
                <FormItem>
                  <FormLabel>Fotos incluidas</FormLabel>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {photos.map((photo, index) => (
                        <Badge key={index} variant="secondary" className="px-3 py-1.5">
                          {photo}
                          <button
                            type="button"
                            onClick={() => removeDotsDescription(index)}
                            className="ml-2 text-muted-foreground hover:text-foreground"
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Eliminar {photo}</span>
                          </button>
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Input
                        placeholder="Agregar tipo de foto (ej: Foto grupal, 3 fotos únicas)"
                        value={photoInput}
                        onChange={(e) => setPhotoInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={addDotsDescription}
                        disabled={!photoInput.trim()}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit" className="w-full rounded-full mt-4 cursor-pointer" variant="outline">
          Crear Paquete
        </Button>
      </form>
    </Form>
  )
}
