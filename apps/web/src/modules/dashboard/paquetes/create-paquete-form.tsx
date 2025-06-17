"use client";

import type React from "react";
import Image from "next/image";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@camaras/ui/src/components/button";
import { Input } from "@camaras/ui/src/components/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@camaras/ui/src/components/form";
import { Camera, Plus, X } from "lucide-react";
import { Badge } from "@camaras/ui/src/components/badge";
import { PackageService } from "@/services/package-service";
import { usePackages } from "@/hooks/use-packages";
import { toast } from "sonner";

const createPaqueteSchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido" }),
  description: z.string().min(1, { message: "La descripción es requerida" }),
  price: z.number().min(1, { message: "El precio es requerido" }),
  photoCount: z
    .number()
    .min(1, { message: "La cantidad de fotos es requerida" }),
  image: z.instanceof(File, { message: "La imagen es requerida" }),
});

export function CreatePaqueteForm() {
  const { refetch } = usePackages();
  const [isLoading, setIsLoading] = useState(false);
  const [photoInput, setPhotoInput] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<z.infer<typeof createPaqueteSchema>>({
    resolver: zodResolver(createPaqueteSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      photoCount: 0,
    },
  });

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("image", file);
    }
  }

  function handleImageClick() {
    fileInputRef.current?.click();
  }

  async function onSubmit(values: z.infer<typeof createPaqueteSchema>) {
    try {
      setIsLoading(true);
      const response = await PackageService.create(values);
      console.log(response);
      await refetch();
      form.reset();
      setPreviewImage(null);
      setPhotoInput("");
      toast.success("El paquete de fotos fue creado", {
        description: "Ahora puedes verlo en la tabla de paquetes",
        duration: 3000,
      });
    } catch (error) {
      toast.error("Error al crear el paquete", {
        description: "Hubo un error al crear el paquete",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 px-4 py-3"
      >
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
                          src={previewImage}
                          alt="Vista previa"
                          fill
                          className="object-cover"
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
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value || ''}
                        onChange={(e) => field.onChange(e.target.value === '' ? '' : Number(e.target.value))}
                        min={0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="photoCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fotos</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value || ''}
                        onChange={(e) => field.onChange(e.target.value === '' ? '' : Number(e.target.value))}
                        min={0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Subiendo paquete..." : "Crear Paquete"}
        </Button>
      </form>
    </Form>
  );
}
