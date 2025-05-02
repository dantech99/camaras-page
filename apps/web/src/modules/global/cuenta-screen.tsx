'use client'

import { Button } from "@camaras/ui/src/components/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@camaras/ui/src/components/card"
import { Input } from "@camaras/ui/src/components/input"
import { Label } from "@camaras/ui/src/components/label"

import { useProfile } from "@/hooks/use-profile"
import { Loader2 } from "lucide-react"

import { MainInformationForm } from "../dashboard/cuenta/main-information-form"
import { SocialInformationForm } from "../dashboard/cuenta/social-information-formt"
import { AditionalInformationForm } from "../dashboard/cuenta/aditional-information-form"

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
        <MainInformationForm />

        {/* Tarjeta de redes sociales */}
        <SocialInformationForm />

        {/* Sección adicional para más información */}
      </div>
      <AditionalInformationForm />
    </div>
  )
}
