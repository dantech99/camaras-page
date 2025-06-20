"use client"

import { useState } from "react"
import { useSaleStore } from "./store/sale.store"
import { Input } from "@camaras/ui/src/components/input"
import { Label } from "@camaras/ui/src/components/label"
import { Button } from "@camaras/ui/src/components/button"
import { Card, CardContent, CardHeader, CardTitle } from "@camaras/ui/src/components/card"
import { Separator } from "@camaras/ui/src/components/separator"
import { User, Phone, Mail, UserCircle, Shield, Send } from "lucide-react"
import { authClientVanilla } from "@camaras/auth/client/vanilla"

export function UserData() {
  const {
    name,
    phoneNumber,
    character,
    email,
    isVerified,
    setName,
    setPhoneNumber,
    setCharacter,
    setEmail,
    setIsVerified,
  } = useSaleStore()

  const [otpCode, setOtpCode] = useState("")
  const [isLoadingSendOTP, setIsLoadingSendOTP] = useState(false)
  const [isLoadingVerifyOTP, setIsLoadingVerifyOTP] = useState(false)
  const [otpSent, setOtpSent] = useState(false)

  const handleSendOTP = async () => {
    if (!phoneNumber) return

    setIsLoadingSendOTP(true)
    try {
      const response = await authClientVanilla.phoneNumber.sendOtp({
        phoneNumber,
      })
      console.log(response)
      setOtpSent(true)
    } catch (error) {
      console.error("Error sending OTP:", error)
    } finally {
      setIsLoadingSendOTP(false)
    }
  }

  const handleVerifyOTP = async () => {
    if (!otpCode || !phoneNumber) return

    setIsLoadingVerifyOTP(true)
    try {
      const response = await authClientVanilla.phoneNumber.verify({
        phoneNumber: phoneNumber as string,
        code: otpCode,
      })
      console.log(response)
      setIsVerified(true)
    } catch (error) {
      console.error("Error verifying OTP:", error)
    } finally {
      setIsLoadingVerifyOTP(false)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      {/* Información Personal */}
      <Card className="bg-gradient-to-t from-primary/5 to-card dark:bg-card shadow-xs cursor-pointer py-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Información Personal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Nombre
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ingresa tu nombre completo"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="character" className="flex items-center gap-2">
                <UserCircle className="h-4 w-4" />
                Personaje
              </Label>
              <Input
                id="character"
                type="text"
                value={character}
                onChange={(e) => setCharacter(e.target.value)}
                placeholder="Nombre del personaje"
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Información de Contacto */}
      <Card className="bg-gradient-to-t from-primary/5 to-card dark:bg-card shadow-xs cursor-pointer py-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Información de Contacto
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Correo Electrónico
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full"
            />
          </div>

          <Separator />

          {/* Teléfono y Verificación */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Número de Teléfono
                {isVerified && (
                  <span className="inline-flex items-center gap-1 text-green-600 text-sm">
                    <Shield className="h-3 w-3" />
                    Verificado
                  </span>
                )}
              </Label>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  id="phone"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+1234567890"
                  className="flex-1"
                  disabled={isVerified}
                />
                <Button
                  onClick={handleSendOTP}
                  disabled={!phoneNumber || isLoadingSendOTP || isVerified}
                  className="sm:w-auto w-full"
                  variant={otpSent ? "secondary" : "default"}
                >
                  {isLoadingSendOTP ? (
                    "Enviando..."
                  ) : otpSent ? (
                    "OTP Enviado"
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Enviar OTP
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Verificación OTP */}
            {otpSent && !isVerified && (
              <div className="space-y-2 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <Label htmlFor="otp" className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                  <Shield className="h-4 w-4" />
                  Código de Verificación
                </Label>
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">
                  Hemos enviado un código de verificación a tu teléfono
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    id="otp"
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="Ingresa el código de 6 dígitos"
                    className="flex-1"
                    maxLength={6}
                  />
                  <Button
                    onClick={handleVerifyOTP}
                    disabled={!otpCode || isLoadingVerifyOTP}
                    className="sm:w-auto w-full"
                  >
                    {isLoadingVerifyOTP ? (
                      "Verificando..."
                    ) : (
                      <>
                        <Shield className="h-4 w-4 mr-2" />
                        Verificar
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {isVerified && (
              <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                  <Shield className="h-4 w-4" />
                  <span className="font-medium">Teléfono verificado exitosamente</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
