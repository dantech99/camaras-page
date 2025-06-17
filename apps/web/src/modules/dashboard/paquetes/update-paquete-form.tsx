"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useRef } from "react"

import { Button } from "@camaras/ui/src/components/button"
import { Input } from "@camaras/ui/src/components/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@camaras/ui/src/components/form"
import { Badge } from "@camaras/ui/src/components/badge"
import { Switch } from "@camaras/ui/src/components/switch"
import { PackageService } from "@/services/package-service"
import { usePackages } from "@/hooks/use-packages"
import { toast } from "sonner"
import { Camera, Plus, X } from "lucide-react"

interface PhotographersPackages {
  price: number;
  discountPercentage: number;
  name: string;
  id: string;
  photographerName: string;
  description: string;
  imageUrl: string;
  photoCount: number;
  isActive: boolean;
}

interface UpdatePaqueteFormProps {
  pack: PhotographersPackages;
  onSuccess?: () => void;
}

const updatePaqueteSchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido" }),
  description: z.string().min(1, { message: "La descripción es requerida" }),
  price: z.number().min(1, { message: "El precio es requerido" }),
  photosCount: z.number().min(1, { message: "La cantidad de fotos es requerida" }),
  image: z.any().optional(),
  isActive: z.boolean()
})

export function UpdatePaqueteForm({ pack, onSuccess }: UpdatePaqueteFormProps) {
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
      isActive: pack.isActive
    }
  })

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
    try {
      setIsLoading(true)
      const formData = {
        description: data.description,
        name: data.name,
        photoCount: data.photosCount.toString(),
        price: data.price.toString(),
        isActive: data.isActive,
        ...(isImageUpdated && form.getValues("image")
          ? { image: form.getValues("image") }
          : {})
      }

      const response = await PackageService.update(pack.id, formData)
      console.log(response)
      await refetch()
      toast.success("Paquete actualizado correctamente")
      onSuccess?.()
    } catch (error) {
      console.log(error)
      toast.error("Error al actualizar el paquete")
    } finally {
      setIsLoading(false)
    }
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

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Activo</FormLabel>
                    <div className="flex items-center gap-x-4">
                      <FormDescription>
                        Si el paquete no está activo, no se mostrará en la lista de paquetes.
                      </FormDescription>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Actualizando..." : "Actualizar"}
        </Button>
      </form>
    </Form >
  )
}