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
  fullName: z.string().optional(),
  website: z.string().optional(),
  location: z.string().optional(),
  hobbie: z.string().optional(),
})

export function AditionalInformationForm() {
  const { data, refetch } = useProfile()

  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof aditionalInformationSchema>>({
    resolver: zodResolver(aditionalInformationSchema),
    defaultValues: {
      fullName: data?.user?.fullName || "",
      website: data?.user?.website || "",
      location: data?.user?.location || "",
      hobbie: data?.user?.hobbie || "",
    }
  })

  async function onSubmit(values: z.infer<typeof aditionalInformationSchema>) {
    try {
      setIsLoading(true)
      await ProfileService.updateAdditionalInformation({
        fullName: values.fullName || "",
        website: values.website || "",
        location: values.location || "",
        hobbie: values.hobbie || "",
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
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Miguel Valenzuela" {...field} />
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
                      <Input placeholder="https://miguelvalenzuela.com" {...field} />
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
                name="hobbie"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hobbie</FormLabel>
                    <FormControl>
                      <Input placeholder="Leer libros" {...field} />
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