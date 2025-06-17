import {
  Card,
} from "@camaras/ui/src/components/card";
import { ResponsiveUpdatePaquete } from "./responsive-update-paquete";
import { AlertDetelePaquete } from "./alert-delete-paquete";
import { Badge } from "@camaras/ui/src/components/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@camaras/ui/src/components/dropdown-menu";
import {
  MoreVertical,
  Camera,
  DollarSign,
  CheckCircle,
} from "lucide-react";
import { formatCurrency } from "@/utils/format-currency";

interface PhotographersPackages {
  price: number;
  discountPercentage: number;
  name: string;
  id: string;
  description: string;
  photographerName: string;
  imageUrl: string;
  photoCount: number;
  isActive: boolean;
}

export function PaqueteCard({ pack }: { pack: PhotographersPackages }) {
  return (
    <Card
      className="aspect-[3/5] p-2 relative"
      data-slot="card"
    >
      <div className="relative overflow-hidden rounded-lg h-full">
        <img
          src={pack.imageUrl}
          alt={pack.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

        {pack.isActive && (
          <Badge className="absolute top-3 left-3">
            <CheckCircle className="w-3 h-3 mr-1" />
            Activo
          </Badge>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
          <div className="space-y-2">
            <div>
              <h3 className="font-bold text-xl leading-tight">
                {pack.name}
              </h3>
              <p className="text-sm mt-1">
                {pack.description}
              </p>
            </div>

            <div className="flex items-center gap-2 justify-between">
              <div className="flex items-center gap-1">
                <Camera className="w-4 h-4 text-primary-blue" />
                <span className="text-sm">{pack.photoCount} fotos</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4 text-primary-blue" />
                <span className="text-sm">{formatCurrency(pack.price)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="absolute top-4 right-4 p-1 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-background transition-colors">
          <MoreVertical className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="flex flex-col">
          <ResponsiveUpdatePaquete pack={pack} />
          <AlertDetelePaquete id={pack.id} name={pack.name} />
        </DropdownMenuContent>
      </DropdownMenu>
    </Card>
  );
}
