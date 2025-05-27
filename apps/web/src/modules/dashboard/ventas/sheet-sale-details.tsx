"use client";

import { AlertCircle, Calendar, Camera, Check, Clock, CreditCard, DollarSign, Loader2, Mail, Package, Phone, Tag, User } from "lucide-react";
import { useSaleByPhotographerAndId, useSalesPhotographer } from "@/hooks/use-sale";
import { Badge } from "@camaras/ui/src/components/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@camaras/ui/src/components/card"
import { Separator } from "@camaras/ui/src/components/separator"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CheckCircle, XCircle } from "lucide-react"
import { Button } from "@camaras/ui/src/components/button";
import { useState } from "react";
import { SaleService } from "@/services/sale-service";

export function SheetSaleDetails({ saleId }: { saleId: string }) {
  const { data, isLoading, isError, refetch } = useSaleByPhotographerAndId(saleId);
  const { refetch: refetchSales } = useSalesPhotographer();
  const [isConfirming, setIsConfirming] = useState(false);

  if (isLoading) return (
    <div className="flex items-center justify-center gap-2">
      <Loader2 className="animate-spin" />
      <p>Buscando entre tus ventas...</p>
    </div>
  );
  if (isError || !data?.sale) return (
    <div className="flex items-center justify-center">
      <p>Error al cargar los detalles.</p>
    </div>
  );

  const handleConfirmPayment = async () => {
    setIsConfirming(true)
    try {
        await SaleService.confirmSale(saleId);
        refetch();
        refetchSales();
    } catch (error) {
      console.error("Error al confirmar pago:", error)
    } finally {
      setIsConfirming(false)
    }
  }

  const getStatusBadge = (status: string, paymentConfirmation: boolean) => {
    if (status === "CANCELLED") {
      return (
        <Badge variant="destructive" className="gap-1">
          <XCircle className="w-3 h-3" />
          Cancelado
        </Badge>
      )
    }
    if (paymentConfirmation) {
      return (
        <Badge variant="default" className="gap-1 bg-green-500">
          <CheckCircle className="w-3 h-3" />
          Confirmado
        </Badge>
      )
    }
    return (
      <Badge variant="secondary" className="gap-1">
        <AlertCircle className="w-3 h-3" />
        Pendiente
      </Badge>
    )
  }

  const formatTimeSlot = (timeSlot: any) => {
    return `${timeSlot.start} ${timeSlot.ampmStart} - ${timeSlot.end} ${timeSlot.ampmEnd}`
  }


  return (
    <div className="space-y-2 px-4 overflow-y-auto mb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            {/* Estado y ID */}
            <Card className="py-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Estado del Ticket</CardTitle>
                  {getStatusBadge(data.sale.saleStatus, data.sale.paymentConfirmation)}
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">ID:</span>
                  <span className="font-mono">{data.sale.id}</span>
                </div>
                {data.sale.paymentConfirmationAt && (
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-muted-foreground">Confirmado el:</span>
                    <span>
                      {format(new Date(data.sale.paymentConfirmationAt), "dd 'de' MMMM, yyyy 'a las' HH:mm", {
                        locale: es,
                      })}
                    </span>
                  </div>
                )}
                {data.sale.cancelledAt && (
                  <div className="flex items-center gap-2 text-sm">
                    <XCircle className="w-4 h-4 text-destructive" />
                    <span className="text-muted-foreground">Cancelado el:</span>
                    <span>
                      {format(new Date(data.sale.cancelledAt), "dd 'de' MMMM, yyyy 'a las' HH:mm", { locale: es })}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Información del Comprador */}
            <Card className="py-4">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Información del Comprador
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{data.sale.buyer.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{data.sale.buyer.email}</span>
                </div>
                {data.sale.buyer.phoneNumber && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{data.sale.buyer.phoneNumber}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Información del Paquete */}
            <Card className="py-4">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Paquete Contratado
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{data.sale.package.name}</span>
                  <Badge variant="outline" className="gap-1">
                    <Camera className="w-3 h-3" />
                    {data.sale.package.photoCount} fotos
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Precio base:</span>
                  <span>${data.sale.package.price}</span>
                </div>
                {data.sale.discountCode && (
                  <div className="flex items-center gap-2 text-sm">
                    <Tag className="w-4 h-4 text-green-500" />
                    <span className="text-muted-foreground">Descuento aplicado:</span>
                    <span className="text-green-600 font-medium">
                      {data.sale.discountCode.code} (-{data.sale.discountCode.discountPercentage}%)
                    </span>
                  </div>
                )}
                <Separator />
                <div className="flex items-center justify-between font-medium">
                  <span>Precio final:</span>
                  <span className="text-lg">${data.sale.finalPrice}</span>
                </div>
              </CardContent>
            </Card>

            {/* Información de Pago */}
            <Card className="py-4">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Información de Pago
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Método:</span>
                  <span className="font-medium">{data.sale.methodPayment}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Fecha de compra:</span>
                  <span>{format(new Date(data.sale.createdAt), "dd 'de' MMMM, yyyy", { locale: es })}</span>
                </div>
              </CardContent>
            </Card>

            {/* Información de la Sesión */}
            {data.sale.day && (
              <Card className="py-4">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Sesión Programada
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Fecha:</span>
                    <span className="font-medium">
                      {format(new Date(data.sale.day.date), "dd 'de' MMMM, yyyy", { locale: es })}
                    </span>
                  </div>
                  {data.sale.timeSlot && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Horario:</span>
                        <span className="font-medium">
                          {formatTimeSlot(data.sale.timeSlot)}
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Botón de Confirmación */}
            {!data.sale.paymentConfirmation && data.sale.saleStatus !== "CANCELLED" && (
              <Card className="py-4 border-orange-200 bg-orange-50">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-2 text-orange-600">
                      <AlertCircle className="w-5 h-5" />
                      <span className="font-medium">Pago Pendiente de Confirmación</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Este ticket está pendiente de confirmación de pago. Una vez confirmado, el cliente recibirá la
                      confirmación.
                    </p>
                    <Button onClick={handleConfirmPayment} disabled={isConfirming} className="w-full gap-2">
                      {isConfirming ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Confirmando...
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          Confirmar Pago
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
  );
}
