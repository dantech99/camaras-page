'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormField, FormMessage, FormDescription, FormControl, FormItem, FormLabel } from "@camaras/ui/src/components/form"
import { Input } from "@camaras/ui/src/components/input"
import { Button } from "@camaras/ui/src/components/button"
import { Card, CardTitle, CardDescription, CardHeader, CardContent, CardFooter } from "@camaras/ui/src/components/card"
import { cn } from "@camaras/ui/src/lib/utils"

const aditionalInformationSchema = z.object({
  fullName: z.string().min(1, "El nombre es requerido"),
  website: z.string().url("La URL es requerida"),
  location: z.string().min(1, "La ubicación es requerida"),
  hobbie: z.string().min(1, "El hobbie es requerido"),
})

export function AditionalInformationForm() {
  const form = useForm<z.infer<typeof aditionalInformationSchema>>({
    resolver: zodResolver(aditionalInformationSchema),
    defaultValues: {
      fullName: "",
      website: "",
      location: "",
      hobbie: "",
    }
  })

  function onSubmit(values: z.infer<typeof aditionalInformationSchema>) {
    console.log(values)
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
            <Button type="submit">Guardar cambios</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}