"use client";

import { Button } from "@camaras/ui/src/components/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@camaras/ui/src/components/sheet";
import {
  EyeIcon,
  Loader2,
  Calendar,
  Clock,
  User,
  Package,
  CreditCard,
  AlertCircle,
} from "lucide-react";
import { useSaleById } from "@/hooks/use-sale";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@camaras/ui/src/components/card";

interface SaleData {
  status: number;
  message: string;
  sale: {
    id: string;
    buyerPhoneNumber: string;
    buyerName: string;
    buyerEmail: string;
    buyerCharacter: string;
    package: {
      name: string;
      price: number;
      photoCount: number;
    };
    discountCode: {
      discountPercentage: number;
      code: string;
    };
    finalPrice: number;
    saleStatus: string;
    paymentConfirmation: boolean;
    paymentConfirmationAt: string | null;
    cancelledAt: string | null;
    cancelledById: string | null;
    methodPayment: string;
    createdAt: string;
    price: number;
    updatedAt: string;
    day: {
      date: string;
    };
    timeSlot: {
      start: string;
      end: string;
      ampmStart: string;
      ampmEnd: string;
    };
  };
}

export function VentasDetalles({
  saleId,
  buyerName,
}: {
  saleId: string;
  buyerName: string;
}) {
  const { data, isLoading, isError } = useSaleById(saleId) as {
    data: SaleData | undefined;
    isLoading: boolean;
    isError: boolean;
  };

  console.log(data)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "text-yellow-600 bg-yellow-50";
      case "CONFIRMED":
        return "text-green-600 bg-green-50";
      case "CANCELLED":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Pendiente";
      case "CONFIRMED":
        return "Confirmada";
      case "CANCELLED":
        return "Cancelada";
      default:
        return status;
    }
  };

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case "CASH":
        return "Efectivo";
      case "CARD":
        return "Tarjeta";
      case "TRANSFER":
        return "Transferencia";
      default:
        return method;
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="flex items-center gap-2 justify-start w-full px-2"
          variant={"ghost"}
        >
          <EyeIcon className="h-4 w-4" />
          Ver detalles
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Detalles de la venta</SheetTitle>
          <SheetDescription>
            Información completa de la venta de {buyerName}
          </SheetDescription>
        </SheetHeader>

        <div className="overflow-y-auto mb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Cargando detalles...
            </div>
          ) : isError ? (
            <div className="flex items-center justify-center py-12 text-red-600">
              <AlertCircle className="mr-2 h-4 w-4" />
              Error al cargar los detalles
            </div>
          ) : data?.sale ? (
            <div className="space-y-6 px-4">
              {/* Estado de la venta */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">
                  Estado:
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(data.sale.saleStatus)}`}
                >
                  {getStatusText(data.sale.saleStatus)}
                </span>
              </div>

              {/* Información del comprador */}
              <Card className="py-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Información del comprador
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Nombre:
                    </span>
                    <span className="text-sm font-medium">
                      {data.sale.buyerName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Email:
                    </span>
                    <span className="text-sm font-medium">
                      {data.sale.buyerEmail}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Teléfono:
                    </span>
                    <span className="text-sm font-medium">
                      {data.sale.buyerPhoneNumber}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Personaje:
                    </span>
                    <span className="text-sm font-medium">
                      {data.sale.buyerCharacter}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Información del paquete */}
              <Card className="py-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Paquete seleccionado
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Nombre:
                    </span>
                    <span className="text-sm font-medium">
                      {data.sale.package.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Precio:
                    </span>
                    <span className="text-sm font-medium">
                      ${data.sale.package.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Cantidad de fotos:
                    </span>
                    <span className="text-sm font-medium">
                      {data.sale.package.photoCount}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Información de la cita */}
              <Card className="py-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Fecha y hora
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Fecha:
                    </span>
                    <span className="text-sm font-medium">
                      {formatDate(data.sale.day.date)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Horario:
                    </span>
                    <span className="text-sm font-medium">
                      {data.sale.timeSlot.start} {data.sale.timeSlot.ampmStart}{" "}
                      - {data.sale.timeSlot.end} {data.sale.timeSlot.ampmEnd}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Información de pago */}
              <Card className="py-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Información de pago
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Método de pago:
                    </span>
                    <span className="text-sm font-medium">
                      {getPaymentMethodText(data.sale.methodPayment)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Precio final:
                    </span>
                    <span className="text-sm font-bold text-green-600">
                      ${data.sale.finalPrice.toLocaleString()}
                    </span>
                  </div>
                  {data.sale.discountCode && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Código de descuento:
                      </span>
                      <span className="text-sm font-medium">
                        {data.sale.discountCode.code}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Pago confirmado:
                    </span>
                    <span
                      className={`text-sm font-medium ${data.sale.paymentConfirmation ? "text-green-600" : "text-red-600"}`}
                    >
                      {data.sale.paymentConfirmation ? "Sí" : "No"}
                    </span>
                  </div>
                  {data.sale.paymentConfirmationAt && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Confirmado el:
                      </span>
                      <span className="text-sm font-medium">
                        {formatDateTime(data.sale.paymentConfirmationAt)}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Información adicional */}
              <Card className="py-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Información adicional
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Creada el:
                    </span>
                    <span className="text-sm font-medium">
                      {formatDateTime(data.sale.createdAt)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Última actualización:
                    </span>
                    <span className="text-sm font-medium">
                      {formatDateTime(data.sale.updatedAt)}
                    </span>
                  </div>
                  {data.sale.cancelledAt && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        Cancelada el:
                      </span>
                      <span className="text-sm font-medium text-red-600">
                        {formatDateTime(data.sale.cancelledAt)}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="flex items-center justify-center py-12 text-gray-500">
              <AlertCircle className="mr-2 h-4 w-4" />
              No se encontraron detalles para esta venta
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
