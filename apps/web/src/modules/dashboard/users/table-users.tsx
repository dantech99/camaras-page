"use cliente";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@camaras/ui/src/components/table";
import { Loader2, Pencil, Trash } from "lucide-react";
import { useUsers } from "@/hooks/use-users";
import { Badge } from "@camaras/ui/src/components/badge";
import { Button } from "@camaras/ui/src/components/button";
import { getRolesConfig } from "@/utils/get-roles-config";

export const TableUsers = () => {
  const { data, isLoading, isError } = useUsers();

  return (
    <Table className="w-full rounded-lg overflow-hidden">
      <TableHeader className="bg-sidebar-accent w-full">
        <TableRow className="w-full">
          <TableHead className="min-w-[100px] text-left">
            Nombre
          </TableHead>
          <TableHead className="min-w-[100px] text-center">
            Fecha de creación
          </TableHead>
          <TableHead className="min-w-[100px] text-center">
            Rol
          </TableHead>
          <TableHead className="min-w-[100px] text-center">
            País
          </TableHead>
          <TableHead className="min-w-[100px] text-center">Whatsapp</TableHead>
          <TableHead className="min-w-[100px] text-center">
            Acciones
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-4">
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Cargando usuarios...</span>
              </div>
            </TableCell>
          </TableRow>
        ) : isError ? (
          <TableRow>
            <TableCell colSpan={9} className="text-center py-6">
              <div className="text-red-500">
                Error al cargar los usuarios. Por favor, intente nuevamente.
              </div>
            </TableCell>
          </TableRow>
        ) : data?.users.length > 0 ? (
          data?.users.map((user) => (
            <TableRow key={user.id} className="text-center">
              <TableCell className="text-left">{user.name}</TableCell>
              <TableCell>
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="space-x-2">
                {user.role?.split(",").map((role) => (
                  <Badge
                    key={role}
                    variant="outline"
                    className={getRolesConfig(role as "photographer" | "admin" | "user").color}
                  >
                    {getRolesConfig(role as "photographer" | "admin" | "user").label}
                  </Badge>
                ))}
              </TableCell>
              <TableCell>{user.location}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell className="space-x-2">
                <Button variant="outline" size="icon">
                  <Pencil />
                </Button>
                <Button variant="outline" size="icon">
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={9} className="text-center py-6">
              No hay usuarios disponibles
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
