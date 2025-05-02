'use client'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@camaras/ui/src/components/form"
import { Input } from "@camaras/ui/src/components/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@camaras/ui/src/components/card"
import { Button } from "@camaras/ui/src/components/button"
import { ProfileService } from "@/services/profile-service"
import { toast } from "sonner"
import { useProfile } from "@/hooks/use-profile"
import { useState } from "react"

const socialInformationSchema = z.object({
  facebook: z.string()
    .refine(
      (value) => {
        if (!value) return true;
        const urlPattern = /^(?:https?:\/\/)?((?:www\.)?(facebook\.com|fb\.com)\/[a-zA-Z0-9.]{5,50})$/;
        const match = value.match(urlPattern);
        if (match) {
          return true;
        }
        return false;
      },
      "Ingresa un perfil válido de Facebook (ej: facebook.com/tuUsuario)"
    )
    .optional(),
  instagram: z.string()
    .refine(
      (value) => {
        if (!value) return true;
        const urlPattern = /^(?:https?:\/\/)?((?:www\.)?instagram\.com\/[a-zA-Z0-9._]{1,30})$/;
        const match = value.match(urlPattern);
        if (match) {
          return true;
        }
        return false;
      },
      "Ingresa un perfil válido de Instagram (ej: instagram.com/tuUsuario)"
    )
    .optional(),
  tiktok: z.string()
    .refine(
      (value) => {
        if (!value) return true;
        const urlPattern = /^(?:https?:\/\/)?((?:www\.)?tiktok\.com\/@[a-zA-Z0-9._]{2,24})$/;
        const match = value.match(urlPattern);
        if (match) {
          return true;
        }
        return false;
      },
      "Ingresa un perfil válido de TikTok (ej: tiktok.com/@tuUsuario)"
    )
    .optional()
})

function formatUrl(url: string) {
  return url.replace("www.", "").replace("https://", "").replace("http://", "")
}

export function SocialInformationForm() {
  const { data, refetch } = useProfile()

  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof socialInformationSchema>>({
    resolver: zodResolver(socialInformationSchema),
    defaultValues: {
      facebook: data?.user?.facebookUrl || "",
      instagram: data?.user?.instagramUrl || "",
      tiktok: data?.user?.tiktokUrl || "",
    },
  })

  async function onSubmit(values: z.infer<typeof socialInformationSchema>) {
    try {
      setIsLoading(true)
      await ProfileService.updateSocials({
        facebookUrl: formatUrl(values.facebook || ""),
        instagramUrl: formatUrl(values.instagram || ""),
        tiktokUrl: formatUrl(values.tiktok || ""),
      })
      await refetch()

      toast.success("Redes sociales actualizadas correctamente")
    } catch (error) {
      toast.error("Error al actualizar las redes sociales")
    } finally {
      setIsLoading(false)
    }
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
              name="tiktok"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Tiktok
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="https://tiktok.com/@tuUsuario" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Guardando cambios..." : "Guardar cambios"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

