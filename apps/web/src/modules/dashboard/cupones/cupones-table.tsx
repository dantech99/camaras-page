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
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@camaras/ui/src/components/avatar";
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
  Users,
  Trash2,
  Edit,
  Users2,
  AlertCircle,
  RefreshCw,
  Loader,
  Percent,
  Calendar,
} from "lucide-react";
import { useCoupons } from "@/hooks/use-cupons";
import { ResponsiveUpdateCupon } from "./responsive-update-cupon";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CuponesFilters } from "./cupones-filter";

interface Coupon {
  id: string;
  discountPercentage: number;
  isActive: boolean;
  code: string;
  expirationDate: Date;
  createdat: Date;
  updatedat?: Date;
}

// Función para obtener el variant del badge según el estado
const getStatusBadgeVariant = (isActive: boolean) => {
  return isActive ? "default" : "secondary";
};

// Función para formatear fechas
const formatDate = (date: Date | string | undefined) => {
  if (!date) return "N/A";
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, "dd/MM/yyyy", { locale: es });
  } catch (error) {
    return "Fecha inválida";
  }
};

// Función para formatear fechas con hora
const formatDateTime = (date: Date | string | undefined) => {
  if (!date) return "N/A";
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, "dd/MM/yyyy HH:mm", { locale: es });
  } catch (error) {
    return "Fecha inválida";
  }
};

// Componente de Loading
const LoadingState = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <Loader className="h-8 w-8 animate-spin text-primary mb-4" />
    <p className="text-sm text-muted-foreground">Cargando cupones...</p>
  </div>
);

// Componente de Error
const ErrorState = ({ onRetry }: { onRetry?: () => void }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="w-16 h-16 mx-auto rounded-full bg-destructive/10 flex items-center justify-center mb-4">
      <AlertCircle className="h-8 w-8 text-destructive" />
    </div>
    <h4 className="text-lg font-semibold text-foreground mb-2">
      Error al cargar cupones
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

// Componente de Estado Vacío
const EmptyState = () => (
  <div className="text-center py-12">
    <div className="w-16 h-16 mx-auto rounded-full bg-muted/50 flex items-center justify-center mb-4">
      <Percent className="h-8 w-8 text-muted-foreground" />
    </div>
    <h4 className="text-lg font-semibold text-foreground mb-2">
      No se encontraron cupones
    </h4>
    <p className="text-sm text-muted-foreground max-w-sm mx-auto">
      Intenta ajustar los filtros o crear un nuevo cupón para comenzar.
    </p>
  </div>
);

const CouponTableRow = ({ cupon }: { cupon: Coupon }) => {
  const handleDelete = () => {
    // Aquí iría la lógica para eliminar el cupón
    console.log("Eliminando cupón:", cupon.id);
  };

  return (
    <TableRow key={cupon.id}>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {cupon.code.substring(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-foreground">{cupon.code}</div>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <Percent className="h-3 w-3" />
              {cupon.discountPercentage} de descuento
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant={getStatusBadgeVariant(cupon.isActive)}>
          {cupon.isActive ? "Activo" : "Inactivo"}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1 text-sm">
          <Calendar className="h-3 w-3 text-muted-foreground" />
          {formatDate(cupon.expirationDate)}
        </div>
      </TableCell>
      <TableCell>
        <div className="text-sm text-muted-foreground">
          {formatDateTime(cupon.createdat)}
        </div>
      </TableCell>
      <TableCell>
        <div className="text-sm text-muted-foreground">
          {cupon.updatedat ? formatDateTime(cupon.updatedat) : "Nunca"}
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
            <ResponsiveUpdateCupon coupon={cupon} />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Eliminar
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no se puede deshacer. Se eliminará
                    permanentemente el cupón "{cupon.code}".
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
                    Eliminar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

const CouponCard = ({ cupon }: { cupon: Coupon }) => {
  const handleDelete = () => {
    // Aquí iría la lógica para eliminar el cupón
    console.log("Eliminando cupón:", cupon.id);
  };

  return (
    <Card key={cupon.id} className="shadow-sm hover:shadow-md transition-shadow" data-slot="card">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {cupon.code.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-foreground truncate">{cupon.code}</div>
              <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <Percent className="h-3 w-3" />
                {cupon.discountPercentage}% de descuento
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Badge
                  variant={cupon.isActive ? "default" : "secondary"}
                  className="text-xs"
                >
                  {cupon.isActive ? "Activo" : "Inactivo"}
                </Badge>
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
              <ResponsiveUpdateCupon coupon={cupon} />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Eliminar
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción no se puede deshacer. Se eliminará
                      permanentemente el cupón "{cupon.code}".
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
                      Eliminar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
          <div className="space-y-1">
            <div className="text-muted-foreground">Expira:</div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(cupon.expirationDate)}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-muted-foreground">Creado:</div>
            <div>{formatDate(cupon.createdat)}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export function CuponesTable() {
  const { data, isLoading, isError, refetch } = useCoupons();
  const cupones = data?.coupons || [];

  const handleRetry = () => {
    if (refetch) {
      refetch();
    }
  };

  return (
    <Card
      className="bg-gradient-to-t from-primary/5 to-card dark:bg-card shadow-sm py-4"
      data-slot="card"
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
          <Users2 className="h-6 w-6" />
          Cupones ({cupones.length})
        </CardTitle>
        <CardDescription>
          Gestiona y filtra cupones por código, descuento o estado
        </CardDescription>
        <CuponesFilters />
      </CardHeader>
      <CardContent>
        {/* Estado de Carga */}
        {isLoading && <LoadingState />}

        {/* Estado de Error */}
        {isError && !isLoading && <ErrorState onRetry={handleRetry} />}

        {/* Estado de Datos Cargados */}
        {!isLoading && !isError && (
          <>
            {/* Estado Vacío */}
            {cupones.length === 0 && <EmptyState />}

            {/* Vista Desktop - Tabla */}
            {cupones.length > 0 && (
              <div className="hidden lg:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Fecha de Expiración</TableHead>
                      <TableHead>Fecha de Creación</TableHead>
                      <TableHead>Última Actualización</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cupones.map((coupon) => (
                      <CouponTableRow key={coupon.id} cupon={coupon} />
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Vista Mobile - Cards */}
            {cupones.length > 0 && (
              <div className="lg:hidden space-y-4">
                {cupones.map((coupon) => (
                  <CouponCard key={coupon.id} cupon={coupon} />
                ))}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}