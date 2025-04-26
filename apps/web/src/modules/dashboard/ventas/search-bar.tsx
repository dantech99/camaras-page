import { Input } from "@camaras/ui/src/components/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@camaras/ui/src/components/select";

export const SearchBar = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      <Input placeholder="Buscar Ticket" className="w-full" />
      <Input placeholder="Buscar Nombre" className="w-full" />
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Buscar por Estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Estado</SelectLabel>
            <SelectItem value="Pagado">Pagado</SelectItem>
            <SelectItem value="Abonado">Abonado</SelectItem>
            <SelectItem value="Cancelado">Cancelado</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Descuento" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Descuento</SelectLabel>
            <SelectItem value="Si">Si</SelectItem>
            <SelectItem value="No">No</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
