"use client"

import { useProfile } from "@/hooks/use-profile"
import { Facebook, Instagram, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Card } from "@camaras/ui/src/components/card"
import { Badge } from "@camaras/ui/src/components/badge"

export default function PerfilPage() {
  const { data, isLoading } = useProfile()

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
    <div className="px-4 py-2 space-y-4">
      {data?.user && (
        <div className="flex justify-center">
          <Card className="overflow-hidden max-w-[400px] w-full rounded-lg shadow-md">
            {/* Banner con glassmorphism */}
            <div className="relative h-32 w-full">
              {data.user.image ? (
                <>
                  <Image
                    src={data.user.image || "/placeholder.svg?height=128&width=350"}
                    alt="Banner"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, rgba(var(--primary-blue), 0.7), rgba(var(--primary-blue), 0.3))`,
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                    }}
                  ></div>
                </>
              ) : (
                <div
                  className="w-full h-full"
                  style={{
                    background: `linear-gradient(135deg, rgba(var(--primary-blue), 0.7), rgba(var(--primary-blue), 0.3))`,
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }}
                ></div>
              )}
            </div>

            {/* Foto de perfil circular */}
            <div className="flex justify-center -mt-16">
              <div className="relative w-32 h-32 rounded-full overflow-hidden bg-white">
                {data.user.image ? (
                  <Image
                    src={data.user.image || "/placeholder.svg?height=128&width=128"}
                    alt={data.user.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-4xl font-bold text-gray-500">
                    {data.user.name.charAt(0)}
                  </div>
                )}
              </div>
            </div>

            {/* Información del usuario */}
            <div className="p-4 text-center">
              <h2 className="text-xl font-bold">{data.user.name}</h2>
              <Badge variant="outline">Fotógrafo</Badge>

              {/* Descripción */}
              <p className="text-sm text-foreground my-4">
                {data.user.description || "Este usuario no tiene descripción."}
              </p>

              {/* Redes sociales */}
              <div className="flex justify-center gap-6 mt-4">

                {data.user.facebookUrl && (
                  <Link
                    href={data.user.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-700"
                  >
                    <Facebook size={20} />
                  </Link>
                )}
                {data.user.instagramUrl && (
                  <Link
                    href={data.user.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-pink-600"
                  >
                    <Instagram size={20} />
                  </Link>
                )}

                {
                  !data.user.facebookUrl && !data.user.instagramUrl && (
                    <p className="text-foreground text-sm">
                      No tiene ninguna red social enlazada.
                    </p>
                  )
                }
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
