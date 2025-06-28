"use client"

import { useState } from "react"
import { useSaleStore } from "./store/sale.store"
import { Input } from "@camaras/ui/src/components/input"
import { Label } from "@camaras/ui/src/components/label"
import { Button } from "@camaras/ui/src/components/button"
import { Card, CardContent, CardHeader, CardTitle } from "@camaras/ui/src/components/card"
import { Separator } from "@camaras/ui/src/components/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@camaras/ui/src/components/dialog"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@camaras/ui/src/components/input-otp"
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
  const [showOTPDialog, setShowOTPDialog] = useState(false)

  const handleSendOTP = async () => {
    if (!phoneNumber) return

    setIsLoadingSendOTP(true)
    try {
      const response = await authClientVanilla.phoneNumber.sendOtp({
        phoneNumber,
      })
      console.log(response)
      setShowOTPDialog(true)
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
      setShowOTPDialog(false)
      setOtpCode("")
    } catch (error) {
      console.error("Error verifying OTP:", error)
    } finally {
      setIsLoadingVerifyOTP(false)
    }
  }

  const handleResendOTP = async () => {
    setOtpCode("")
    await handleSendOTP()
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      {/* Información Personal */}
      <Card className="bg-gradient-to-t from-primary/5 to-card shadow-xs cursor-pointer py-4">
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
      <Card className="bg-gradient-to-t from-primary/5 to-card shadow-xs cursor-pointer py-4">
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
                >
                  {isLoadingSendOTP ? (
                    "Enviando..."
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Enviar OTP
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialog para OTP */}
      <Dialog open={showOTPDialog} onOpenChange={setShowOTPDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Verificación de Teléfono
            </DialogTitle>
            <DialogDescription>
              Hemos enviado un código de verificación de 6 dígitos a tu teléfono{" "}
              <span className="font-medium">{phoneNumber}</span>
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="otp-input" className="text-center block">
                Código de Verificación
              </Label>
              <InputOTP maxLength={6} value={otpCode} onChange={(value) => setOtpCode(value)}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <div className="flex flex-col w-full space-y-2">
              <Button
                onClick={handleVerifyOTP}
                disabled={otpCode.length !== 6 || isLoadingVerifyOTP}
                className="w-full"
              >
                {isLoadingVerifyOTP ? (
                  "Verificando..."
                ) : (
                  <>
                    <Shield className="h-4 w-4 mr-2" />
                    Verificar Código
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                onClick={handleResendOTP}
                disabled={isLoadingSendOTP}
                className="w-full bg-transparent"
              >
                {isLoadingSendOTP ? "Reenviando..." : "Reenviar Código"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
