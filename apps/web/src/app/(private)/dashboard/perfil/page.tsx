"use client"

import { useProfile } from "@/hooks/use-profile"
import { Facebook, Instagram, Loader2, Globe, MapPin, Mail, Phone } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Card } from "@camaras/ui/src/components/card"

export default function PerfilPage() {
  const { data, isLoading } = useProfile()

  if (isLoading) {
    return (
      <div className="h-52 flex justify-center items-center">
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
              <div className="relative w-32 h-32 rounded-full overflow-hidden bg-white border-4 border-card">
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
              <h2 className="text-xl font-bold">{data.user.nameTag || data.user.name}</h2>
              <p className="text-sm text-muted-foreground">{data.user.nameTag ? data.user.name : ""}</p>

              {/* Información de contacto */}
              <div className="mt-4 space-y-2 text-sm">
                {data.user.email && (
                  <div className="flex items-center justify-center gap-2">
                    <Mail size={16} className="text-muted-foreground" />
                    <span>{data.user.email}</span>
                  </div>
                )}
                {data.user.phoneNumber && (
                  <div className="flex items-center justify-center gap-2">
                    <Phone size={16} className="text-muted-foreground" />
                    <span>{data.user.phoneNumber}</span>
                  </div>
                )}
                {data.user.location && (
                  <div className="flex items-center justify-center gap-2">
                    <MapPin size={16} className="text-muted-foreground" />
                    <span>{data.user.location}</span>
                  </div>
                )}
              </div>

              {/* Descripción */}
              <p className="text-sm text-foreground my-4">
                {data.user.description || "Este usuario no tiene descripción."}
              </p>

              {/* Redes sociales y enlaces */}
              <div className="flex flex-col gap-4 mt-4">
                <div className="flex justify-center gap-6">
                  {data.user.facebookUrl && (
                    <Link
                      href={`https://${data.user.facebookUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-blue-700"
                    >
                      <Facebook size={20} />
                    </Link>
                  )}
                  {data.user.instagramUrl && (
                    <Link
                      href={`https://${data.user.instagramUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-pink-600"
                    >
                      <Instagram size={20} />
                    </Link>
                  )}
                  {data.user.tiktokUrl && (
                    <Link
                      href={`https://${data.user.tiktokUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-black"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
                        <path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                        <path d="M15 8v8a4 4 0 0 1-4 4" />
                        <line x1="15" y1="4" x2="15" y2="8" />
                      </svg>
                    </Link>
                  )}
                </div>

                {data.user.website && (
                  <Link
                    href={data.user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-sm text-primary-blue hover:text-primary-blue/80"
                  >
                    <Globe size={16} />
                    <span>Visitar sitio web</span>
                  </Link>
                )}

                {!data.user.facebookUrl && !data.user.instagramUrl && !data.user.tiktokUrl && !data.user.website && (
                  <p className="text-foreground text-sm">
                    No tiene ninguna red social o sitio web enlazado.
                  </p>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
