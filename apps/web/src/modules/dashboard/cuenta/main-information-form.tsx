'use client'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormLabel, FormItem, FormMessage } from "@camaras/ui/src/components/form"
import { Textarea } from "@camaras/ui/src/components/textarea"
import { Button } from "@camaras/ui/src/components/button"
import { Card, CardContent, CardTitle, CardHeader, CardDescription, CardFooter } from "@camaras/ui/src/components/card"
import { Camera } from "lucide-react"
import { useState, useRef } from "react"
import { useProfile } from "@/hooks/use-profile"
import { ProfileService } from "@/services/profile-service"
import { toast } from "sonner"

const descriptionSchema = z.object({
  description: z.string().max(255).optional(),
  image: z.any().optional(),
})

export function MainInformationForm() {

  const { data, refetch } = useProfile()
  const [previewImage, setPreviewImage] = useState<string>(data?.user?.image || "")
  const [isImageUpdated, setIsImageUpdated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<z.infer<typeof descriptionSchema>>({
    resolver: zodResolver(descriptionSchema),
    defaultValues: {
      description: data?.user?.description || "",
    },
  })

  function handleImageClick() {
    fileInputRef.current?.click();
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

  async function onSubmit(values: z.infer<typeof descriptionSchema>) {
    try {
      setIsLoading(true)
      await ProfileService.updateMainInformation({
        description: values.description,
        image: values.image,
      })
      await refetch()
      toast.success("Información actualizada correctamente")
    } catch (error) {
      toast.error("Error al actualizar la información")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
        <Card className="h-full py-8">
          <CardHeader className="flex flex-col items-center space-y-2">
            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel>Imagen del Fotógrafo</FormLabel>
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
            <div className="space-y-1 text-center">
              <CardTitle className="text-2xl">{data?.user?.name}</CardTitle>
              <CardDescription>{data?.user?.email}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Escribe una breve descripción sobre ti" className="min-h-[100px] resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Guardando..." : "Guardar cambios"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}