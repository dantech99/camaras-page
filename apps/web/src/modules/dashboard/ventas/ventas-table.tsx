"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@camaras/ui/src/components/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@camaras/ui/src/components/table";
import { Avatar, AvatarFallback } from "@camaras/ui/src/components/avatar";
import { Badge } from "@camaras/ui/src/components/badge";
import { Button } from "@camaras/ui/src/components/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogAction,
} from "@camaras/ui/src/components/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@camaras/ui/src/components/dropdown-menu";

import {
  MoreHorizontal,
  Trash2,
  ShoppingCart,
  AlertCircle,
  RefreshCw,
  Loader,
  DollarSign,
  Calendar,
  User,
  Package,
  EyeIcon,
  CheckCircle,
  XCircle,
  EyeClosed,
  MoonStar,
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useSales } from "@/hooks/use-sale";
import { formatCurrency } from "@/utils/format-currency";
import { SaleStatus } from "@camaras/database";
import { VentasDetalles } from "@/modules/dashboard/ventas/ventas-detalles";
import { VentasConfirm } from "./ventas-confirm";
import { VentasConfirmPayment } from "./ventas-confirm-payment";
import { VentasCancel } from "./ventas-cancel";
import { VentasNoshow } from "./ventas-noshow";

interface Sale {
  id: string;
  buyerName: string;
  status: SaleStatus;
  packageName: string;
  price: number;
  hasDiscount: boolean;
  paymentConfirmation: boolean;
}

// Function to get badge variant based on status
const getStatusBadgeVariant = (status: SaleStatus) => {
  switch (status) {
    case "COMPLETED":
      return "default";
    case "PENDING":
      return "secondary";
    case "CANCELLED":
      return "destructive";
    default:
      return "secondary";
  }
};

// Function to get status display text
const getStatusText = (status: SaleStatus) => {
  switch (status) {
    case "COMPLETED":
      return "Completada";
    case "PENDING":
      return "Pendiente";
    case "CANCELLED":
      return "Cancelada";
    default:
      return status;
  }
};

// Function to format dates
const formatDate = (date: Date | string | undefined) => {
  if (!date) return "N/A";
  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return format(dateObj, "dd/MM/yyyy", { locale: es });
  } catch (error) {
    return "Fecha inválida";
  }
};

// Function to format dates with time
const formatDateTime = (date: Date | string | undefined) => {
  if (!date) return "N/A";
  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return format(dateObj, "dd/MM/yyyy HH:mm", { locale: es });
  } catch (error) {
    return "Fecha inválida";
  }
};

// Loading component
const LoadingState = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <Loader className="h-8 w-8 animate-spin text-primary mb-4" />
    <p className="text-sm text-muted-foreground">Cargando ventas...</p>
  </div>
);

// Error component
const ErrorState = ({ onRetry }: { onRetry?: () => void }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="w-16 h-16 mx-auto rounded-full bg-destructive/10 flex items-center justify-center mb-4">
      <AlertCircle className="h-8 w-8 text-destructive" />
    </div>
    <h4 className="text-lg font-semibold text-foreground mb-2">
      Error al cargar ventas
    </h4>
    <p className="text-sm text-muted-foreground mb-4 text-center max-w-sm">
      Hubo un problema al obtener la información. Por favor, intenta nuevamente.
    </p>
    {onRetry && (
      <Button variant="outline" onClick={onRetry} className="gap-2">
        <RefreshCw className="h-4 w-4" />
        Reintentar
      </Button>
    )}
  </div>
);

// Empty state component
const EmptyState = () => (
  <div className="text-center py-12">
    <div className="w-16 h-16 mx-auto rounded-full bg-muted/50 flex items-center justify-center mb-4">
      <ShoppingCart className="h-8 w-8 text-muted-foreground" />
    </div>
    <h4 className="text-lg font-semibold text-foreground mb-2">
      No se encontraron ventas
    </h4>
    <p className="text-sm text-muted-foreground max-w-sm mx-auto">
      Aún no hay ventas registradas en el sistema.
    </p>
  </div>
);

const SaleTableRow = ({ sale }: { sale: Sale }) => {

  console.log(sale)

  const handleDelete = () => {
    console.log("Eliminando venta:", sale.id);
  };

  return (
    <TableRow>
      <TableCell>
        <div className="font-medium text-foreground">
          {sale.id.slice(0, 8) + "..."}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{sale.buyerName}</span>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant={getStatusBadgeVariant(sale.status)}>
          {getStatusText(sale.status)}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-muted-foreground" />
          <span>{sale.packageName}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1 text-sm">
          <DollarSign className="h-3 w-3 text-muted-foreground" />
          {formatCurrency(sale.price)}
        </div>
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <VentasDetalles saleId={sale.id} buyerName={sale.buyerName} />
            {sale.paymentConfirmation === false && (
              <VentasConfirmPayment
                saleId={sale.id}
                buyerName={sale.buyerName}
              />
            )}
            {sale.status === "PENDING" && (
              <VentasConfirm saleId={sale.id} buyerName={sale.buyerName} />
            )}
            {sale.status === "PENDING" && (
              <VentasCancel saleId={sale.id} buyerName={sale.buyerName} />
            )}
            {sale.status === "PENDING" && (
              <VentasNoshow saleId={sale.id} buyerName={sale.buyerName} />
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

const SaleCard = ({ sale }: { sale: Sale }) => {
  const handleDelete = () => {
    console.log("Eliminando venta:", sale.id);
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {sale.buyerName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-foreground truncate">
                {sale.buyerName}
              </div>
              <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <Package className="h-3 w-3" />
                {sale.packageName}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Badge
                  variant={getStatusBadgeVariant(sale.status)}
                  className="text-xs"
                >
                  {getStatusText(sale.status)}
                </Badge>
                {sale.hasDiscount && (
                  <Badge variant="secondary" className="text-xs">
                    Con descuento
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <VentasDetalles saleId={sale.id} buyerName={sale.buyerName} />
              {sale.paymentConfirmation === false && (
                <VentasConfirmPayment
                  saleId={sale.id}
                  buyerName={sale.buyerName}
                />
              )}
              {sale.status === "PENDING" && (
                <VentasConfirm saleId={sale.id} buyerName={sale.buyerName} />
              )}
              {sale.status === "PENDING" && (
                <VentasCancel saleId={sale.id} buyerName={sale.buyerName} />
              )}
              {sale.status === "PENDING" && (
                <VentasNoshow saleId={sale.id} buyerName={sale.buyerName} />
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
          <div className="space-y-1">
            <div className="text-muted-foreground">Precio:</div>
            <div className="flex items-center gap-1 font-medium">
              <DollarSign className="h-3 w-3" />${sale.price.toFixed(2)}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-muted-foreground">Creado:</div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatCurrency(sale.price)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export function VentasTable() {
  const { data, isLoading, isError } = useSales();
  const sales = data?.sales || [];

  console.log(sales)

  const handleRetry = () => {
    console.log("Reintentando cargar datos...");
  };

  return (
    <Card className="bg-gradient-to-t from-primary/5 to-card shadow-sm py-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
          <ShoppingCart className="h-6 w-6" />
          Ventas ({isLoading ? "..." : sales.length})
        </CardTitle>
        <CardDescription>
          Gestiona y visualiza todas las ventas realizadas
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Loading State */}
        {isLoading && <LoadingState />}

        {/* Error State */}
        {isError && !isLoading && <ErrorState onRetry={handleRetry} />}

        {/* Loaded Data State */}
        {!isLoading && !isError && (
          <>
            {/* Empty State */}
            {sales.length === 0 && <EmptyState />}

            {/* Desktop View - Table */}
            {sales.length > 0 && (
              <div className="hidden lg:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID de Venta</TableHead>
                      <TableHead>Comprador</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Paquete</TableHead>
                      <TableHead>Precio</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sales.map((sale) => (
                      <SaleTableRow key={sale.id} sale={sale} />
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Mobile View - Cards */}
            {sales.length > 0 && (
              <div className="lg:hidden space-y-4">
                {sales.map((sale) => (
                  <SaleCard key={sale.id} sale={sale} />
                ))}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
