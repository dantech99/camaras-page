'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@camaras/ui/src/components/avatar"
import { Button } from "@camaras/ui/src/components/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@camaras/ui/src/components/card"
import { Input } from "@camaras/ui/src/components/input"
import { Label } from "@camaras/ui/src/components/label"
import { Textarea } from "@camaras/ui/src/components/textarea"
import { useProfile } from "@/hooks/use-profile"
import { Loader2 } from "lucide-react"
import { FacebookIcon } from "@camaras/ui/src/icons/facebook-icon"

export function CuentaScreen() {
  const { data, isLoading } = useProfile()

  if (!data) {
    return <div>No se encontró el usuario</div>
  }

  if (isLoading) {
    return (
      <div className="h-[100svh] flex justify-center items-center">
        <span className="flex gap-2">
          <Loader2 className="animate-spin" />
          <p>Cargando...</p>
        </span>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col p-4 md:p-6 gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Tarjeta de perfil */}
        <Card className="md:col-span-1 py-8">
          <CardHeader className="flex flex-col items-center space-y-2">
            <Avatar className="h-24 w-24">
              <AvatarImage src={data?.user?.image || "/placeholder.svg"} alt={data?.user?.name} />
              <AvatarFallback className="text-lg">{data?.user?.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="space-y-1 text-center">
              <CardTitle className="text-2xl">{data?.user?.name}</CardTitle>
              <CardDescription>{data?.user?.email}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Descripción</h3>
              <Textarea
                className="min-h-[100px] resize-none"
                placeholder="Escribe una breve descripción sobre ti"
                defaultValue={data?.user?.description}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>
              Guardar cambios
            </Button>
          </CardFooter>
        </Card>

        {/* Tarjeta de redes sociales */}
        <Card className="md:col-span-1 py-8">
          <CardHeader>
            <CardTitle>Redes Sociales</CardTitle>
            <CardDescription>Gestiona tus enlaces a redes sociales</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="facebook" className="flex items-center gap-2">
                <FacebookIcon className="w-4 h-4" />
                Facebook
              </Label>
              <Input
                id="facebook"
                placeholder="https://facebook.com/tu-usuario"
                defaultValue={data?.user?.facebookUrl}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                placeholder="https://instagram.com/tu-usuario"
                defaultValue={data?.user?.instagramUrl}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tiktok">TikTok</Label>
              <Input
                id="tiktok"
                placeholder="https://tiktok.com/@tu-usuario"
                defaultValue={data?.user?.tiktokUrl}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Guardar cambios</Button>
          </CardFooter>
        </Card>
      </div>

      {/* Sección adicional para más información */}
      <Card className="py-8">
        <CardHeader>
          <CardTitle>Información adicional</CardTitle>
          <CardDescription>Completa tu perfil con más detalles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullname">Nombre completo</Label>
              <Input id="fullname" placeholder="Tu nombre completo" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Ubicación</Label>
              <Input id="location" placeholder="Ciudad, País" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Sitio web</Label>
              <Input id="website" placeholder="https://tu-sitio.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input id="phone" placeholder="+1 234 567 890" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancelar</Button>
          <Button>Actualizar perfil</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
