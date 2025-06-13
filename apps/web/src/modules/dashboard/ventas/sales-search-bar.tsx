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

export const SalesSearch = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      <Input placeholder="Buscar Ticket" className="w-full rounded-full border border-gray-300 focus:border-primary" />
      <Input placeholder="Buscar Nombre" className="w-full rounded-full border border-gray-300 focus:border-primary" />
      <Select>
        <SelectTrigger className="w-full cursor-pointer rounded-full border border-gray-300 focus:border-primary">
          <SelectValue placeholder="Buscar por Estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel >Estado</SelectLabel>
            <SelectItem value="Pagado" className="cursor-pointer">Pagado</SelectItem>
            <SelectItem value="Abonado" className="cursor-pointer">Abonado</SelectItem>
            <SelectItem value="Cancelado" className="cursor-pointer">Cancelado</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-full cursor-pointer rounded-full border border-gray-300 focus:border-primary">
          <SelectValue placeholder="Descuento" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Descuento</SelectLabel>
            <SelectItem value="Si" className="cursor-pointer">Si</SelectItem>
            <SelectItem value="No" className="cursor-pointer">No</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
