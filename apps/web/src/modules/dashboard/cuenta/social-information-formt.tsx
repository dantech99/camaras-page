'use client'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@camaras/ui/src/components/form"
import { Input } from "@camaras/ui/src/components/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@camaras/ui/src/components/card"
import { Button } from "@camaras/ui/src/components/button"
import { FacebookIcon } from "@camaras/ui/src/icons/facebook-icon"
import { InstagramIcon } from "@camaras/ui/src/icons/instagram-icon"
import { TiktokIcon } from "@camaras/ui/src/icons/titok-icon"

const socialInformationSchema = z.object({
  facebook: z.string()
    .min(1, "El campo es requerido")
    .regex(
      /^(https?:\/\/)?(www\.)?(facebook\.com|fb\.com)\/[a-zA-Z0-9.]{5,50}$/,
      "Ingresa una URL válida de Facebook (ej: facebook.com/tuUsuario)"
    ),
  instagram: z.string()
    .min(1, "El campo es requerido")
    .regex(
      /^(https?:\/\/)?(www\.)?(instagram\.com)\/[a-zA-Z0-9._]{1,30}$/,
      "Ingresa una URL válida de Instagram (ej: instagram.com/tuUsuario)"
    ),
  tiktok: z.string()
    .min(1, "El campo es requerido")
    .regex(
      /^(https?:\/\/)?(www\.)?(tiktok\.com)\/@[a-zA-Z0-9._]{2,24}$/,
      "Ingresa una URL válida de TikTok (ej: tiktok.com/@tuUsuario)"
    ),
})

export function SocialInformationForm() {
  const form = useForm<z.infer<typeof socialInformationSchema>>({
    resolver: zodResolver(socialInformationSchema),
    defaultValues: {
      facebook: "",
      instagram: "",
      tiktok: "",
    },
  })

  function onSubmit(values: z.infer<typeof socialInformationSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
        <Card className="h-full py-8">
          <CardHeader>
            <CardTitle>Redes sociales</CardTitle>
            <CardDescription>
              Agrega tus redes sociales para que más gente pueda encontrarte.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Facebook
                    <FacebookIcon className="w-3 h-3" />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="facebook.com/tuUsuario" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Instagram
                    <InstagramIcon className="w-4 h-4" />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="instagram.com/tuUsuario" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Tiktok
                    <TiktokIcon className="w-4 h-4" />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="tiktok.com/@tuUsuario" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit">
              Guardar cambios
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

