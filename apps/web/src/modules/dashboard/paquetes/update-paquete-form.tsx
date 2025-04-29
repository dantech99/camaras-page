"use client"

import Image from "next/image"

import { z, ZodSchema } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useRef } from "react"

import { Button } from "@camaras/ui/src/components/button"
import { Input } from "@camaras/ui/src/components/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@camaras/ui/src/components/form"
import { Badge } from "@camaras/ui/src/components/badge"

import { PackageService } from "@/services/package-service"
import { usePackages } from "@/hooks/use-packages"
import { toast } from "sonner"
import { Camera, Plus, X } from "lucide-react"

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

const updatePaqueteSchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido" }),
  description: z.string().min(1, { message: "La descripción es requerida" }).nullable(),
  features: z
    .array(z.string())
    .min(1, { message: "Se requiere al menos una descripción" })
    .max(10, { message: "Se permiten un máximo de 10 descripciones" }),
  price: z.number().min(1, { message: "El precio es requerido" }),
  photosCount: z.number().min(1, { message: "La cantidad de fotos es requerida" }),
  image: z
    .union([
      z.custom<File>((v) => v instanceof File, {
        message: "Must be a File object",
      }),
      z.string(),
      z.undefined(),
    ])
    .nullable(),
  isActive: z.boolean()
})

export function UpdatePaqueteForm({ pack }: { pack: PhotographersPackages }) {
  const { refetch } = usePackages()
  const [isLoading, setIsLoading] = useState(false)
  const [photoInput, setPhotoInput] = useState("")
  const [previewImage, setPreviewImage] = useState<string>(pack.imageUrl);
  const [isImageUpdated, setIsImageUpdated] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof updatePaqueteSchema>>({
    resolver: zodResolver(updatePaqueteSchema),
    defaultValues: {
      name: pack.name,
      description: pack.description,
      price: pack.price,
      photosCount: pack.photoCount,
      image: pack.imageUrl,
      features: pack.features.map(bullet => bullet.content),
      isActive: pack.isActive
    }
  })

  const features = form.watch("features")

  const addDotsDescription = () => {
    if (!photoInput.trim()) return

    // Check if photo already exists
    if (features.includes(photoInput)) return

    form.setValue("features", [...features, photoInput])

    // Reset input
    setPhotoInput("")
  }

  const removeDotsDescription = (index: number) => {
    const updatedFeatures = [...features]
    updatedFeatures.splice(index, 1)
    form.setValue("features", updatedFeatures)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addDotsDescription()
    }
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setIsImageUpdated(true);
      };
      reader.readAsDataURL(file);
      form.setValue("image", file);
    }
  }

  function handleImageClick() {
    fileInputRef.current?.click();
  }

  async function onSubmit(data: z.infer<typeof updatePaqueteSchema>) {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-4 py-3">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 items-start">
          <div>
            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel>Imagen del Producto</FormLabel>
                  <FormControl>
                    <div
                      className="relative w-full aspect-square border border-input rounded-md overflow-hidden cursor-pointer"
                      onClick={handleImageClick}
                    >
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Vista previa"
                          className="absolute inset-0 w-full h-full object-cover"
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
                    <Input placeholder="Agrega una descripción" {...field} value={field.value ?? ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
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
                    <FormLabel>Fotos</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

          </div>
          <FormField
            control={form.control}
            name="features"
            render={() => (
              <FormItem className="col-span-2">
                <FormLabel>Fotos incluidas</FormLabel>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1.5">
                        {feature}
                        <button
                          type="button"
                          onClick={() => removeDotsDescription(index)}
                          className="ml-2 text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Eliminar {feature}</span>
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
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Actualizando..." : "Actualizar"}
        </Button>
      </form>
    </Form>
  )
}