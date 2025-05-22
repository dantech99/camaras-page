'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormField, FormMessage, FormControl, FormItem, FormLabel } from "@camaras/ui/src/components/form"
import { Input } from "@camaras/ui/src/components/input"
import { Button } from "@camaras/ui/src/components/button"
import { Card, CardTitle, CardDescription, CardHeader, CardContent, CardFooter } from "@camaras/ui/src/components/card"
import { cn } from "@camaras/ui/src/lib/utils"
import { ProfileService } from "@/services/profile-service"
import { toast } from "sonner"
import { useProfile } from "@/hooks/use-profile"
import { useState } from "react"

const aditionalInformationSchema = z.object({
  nameTag: z.string().optional(),
  website: z.string().optional(),
  location: z.string().optional(),
  phoneNumber: z.string().optional(),
})

export function AditionalInformationForm() {
  const { data, refetch } = useProfile()

  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof aditionalInformationSchema>>({
    resolver: zodResolver(aditionalInformationSchema),
    defaultValues: {
      nameTag: data?.user?.nameTag || "",
      website: data?.user?.website || "",
      location: data?.user?.location || "",
      phoneNumber: data?.user?.phoneNumber || "",
    }
  })

  async function onSubmit(values: z.infer<typeof aditionalInformationSchema>) {
    try {
      setIsLoading(true)
      await ProfileService.updateAdditionalInformation({
        nameTag: values.nameTag || "",
        website: values.website || "",
        location: values.location || "",
        phoneNumber: values.phoneNumber || "",
      })
      toast.success("Información actualizada correctamente")
      await refetch()
    } catch (error) {
      toast.error("Error al actualizar la información")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className={cn("h-full py-6")}>
          <CardHeader>
            <CardTitle>Información adicional</CardTitle>
            <CardDescription>Completa tu perfil con más detalles</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4 w-full">
              <FormField
                control={form.control}
                name="nameTag"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de usuario</FormLabel>
                    <FormControl>
                      <Input placeholder="@miguelvalenzuela" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sitio web</FormLabel>
                    <FormControl>
                      <Input placeholder="https://mipaginaweb.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4 w-full">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ubicación</FormLabel>
                    <FormControl>
                      <Input placeholder="Bogotá, Colombia" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de teléfono</FormLabel>
                    <FormControl>
                      <Input placeholder="+57 312 123 1234" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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