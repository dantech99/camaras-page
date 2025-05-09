"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@camaras/ui/src/components/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@camaras/ui/src/components/select";
import { Button } from "@camaras/ui/src/components/button";
import { Label } from "@camaras/ui/src/components/label";
import { User, Mail, MapPin, Phone } from "lucide-react";

interface UserData {
  name: string;
  phoneNumber: string;
  email: string;
  role: string;
}

interface UserInfoCardProps {
  user: UserData;
  onSave: (role: string) => void;
  onCancel: () => void;
}

export function UserInfoCard({ user, onSave, onCancel }: UserInfoCardProps) {
  const [selectedRole, setSelectedRole] = useState(user.role);

  const handleSave = () => {
    onSave(selectedRole);
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl text-center">
          Información del Usuario
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {/* Nombre */}
          <div className="flex items-start space-x-3">
            <User className="h-5 w-5 text-gray-500 mt-0.5" />
            <div className="flex-1">
              <Label className="text-sm font-medium text-gray-500">
                Nombre
              </Label>
              <p className="font-medium">{user.name}</p>
            </div>
          </div>


          {/* WhatsApp */}
          <div className="flex items-start space-x-3">
            <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
            <div className="flex-1">
              <Label className="text-sm font-medium text-gray-500">
                WhatsApp
              </Label>
              <p className="font-medium">{user.phoneNumber}</p>
            </div>
          </div>

          {/* Correo */}
          <div className="flex items-start space-x-3">
            <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
            <div className="flex-1">
              <Label className="text-sm font-medium text-gray-500">
                Correo
              </Label>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>

          {/* Rol (editable) */}
          <div className="space-y-2 pt-2">
            <Label htmlFor="role" className="text-sm font-medium text-gray-500">
              Rol
            </Label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger id="role" className="w-full">
                <SelectValue placeholder="Seleccionar rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Administrador</SelectItem>
                <SelectItem value="Editor">Editor</SelectItem>
                <SelectItem value="Viewer">Visualizador</SelectItem>
                <SelectItem value="User">Usuario</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2 pt-2">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button onClick={handleSave}>Aceptar</Button>
      </CardFooter>
    </Card>
  );
}
