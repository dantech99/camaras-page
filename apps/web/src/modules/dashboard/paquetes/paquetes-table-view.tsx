"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@camaras/ui/src/components/table";
import { Button } from "@camaras/ui/src/components/button";
import { PaquetesTableRow } from "./paquetes-table-row";
import { PaquetesFilters } from "./paquetes-filters";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

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

interface PaquetesTableViewProps {
  packages: PhotographersPackages[];
}

type SortField = "name" | "price" | "photoCount";
type SortOrder = "asc" | "desc";

interface SortConfig {
  field: SortField;
  order: SortOrder;
}

export function PaquetesTableView({ packages }: PaquetesTableViewProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortConfig, setSortConfig] = React.useState<SortConfig>({
    field: "name",
    order: "asc",
  });
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  // Filtrar paquetes por búsqueda
  const filteredPackages = React.useMemo(() => {
    return packages.filter((pack) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        pack.name.toLowerCase().includes(searchLower) ||
        pack.description.toLowerCase().includes(searchLower)
      );
    });
  }, [packages, searchTerm]);

  // Ordenar paquetes
  const sortedPackages = React.useMemo(() => {
    const sorted = [...filteredPackages];
    sorted.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortConfig.field) {
        case "name":
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case "price":
          aValue = a.price;
          bValue = b.price;
          break;
        case "photoCount":
          aValue = a.photoCount;
          bValue = b.photoCount;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) {
        return sortConfig.order === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.order === "asc" ? 1 : -1;
      }
      return 0;
    });
    return sorted;
  }, [filteredPackages, sortConfig]);

  // Calcular paginación
  const totalPages = Math.ceil(sortedPackages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPackages = sortedPackages.slice(startIndex, endIndex);

  // Reset página cuando cambian los filtros
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortConfig]);

  const handleSort = (field: SortField) => {
    setSortConfig((prev) => ({
      field,
      order: prev.field === field && prev.order === "asc" ? "desc" : "asc",
    }));
  };

  const handleReset = () => {
    setSearchTerm("");
    setSortConfig({ field: "name", order: "asc" });
    setCurrentPage(1);
  };

  const getSortIcon = (field: SortField) => {
    if (sortConfig.field !== field) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
    return sortConfig.order === "asc" ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    );
  };

  return (
    <div className="space-y-4">
      <PaquetesFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortBy={sortConfig.field}
        onSortChange={(value) =>
          setSortConfig((prev) => ({ ...prev, field: value as SortField }))
        }
        sortOrder={sortConfig.order}
        onSortOrderChange={(value) =>
          setSortConfig((prev) => ({ ...prev, order: value }))
        }
        onReset={handleReset}
      />

      <div className="rounded-lg border">
        <Table>
          <TableHeader className="bg-sidebar-accent">
            <TableRow>
              <TableHead className="min-w-[200px]">
                <Button
                  variant="ghost"
                  className="h-auto p-0 hover:bg-transparent font-medium"
                  onClick={() => handleSort("name")}
                >
                  Paquete
                  {getSortIcon("name")}
                </Button>
              </TableHead>
              <TableHead className="min-w-[250px]">Descripción</TableHead>
              <TableHead className="text-center min-w-[120px]">
                <Button
                  variant="ghost"
                  className="h-auto p-0 hover:bg-transparent font-medium mx-auto flex items-center"
                  onClick={() => handleSort("photoCount")}
                >
                  Fotos
                  {getSortIcon("photoCount")}
                </Button>
              </TableHead>
              <TableHead className="text-center min-w-[120px]">
                <Button
                  variant="ghost"
                  className="h-auto p-0 hover:bg-transparent font-medium mx-auto flex items-center"
                  onClick={() => handleSort("price")}
                >
                  Precio
                  {getSortIcon("price")}
                </Button>
              </TableHead>
              <TableHead className="text-right min-w-[80px]">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPackages.length > 0 ? (
              currentPackages.map((pack) => (
                <PaquetesTableRow key={pack.id} pack={pack} />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  {searchTerm
                    ? "No se encontraron paquetes con ese criterio"
                    : "No hay paquetes disponibles"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
          <p className="text-sm text-muted-foreground">
            Mostrando {startIndex + 1} a{" "}
            {Math.min(endIndex, sortedPackages.length)} de{" "}
            {sortedPackages.length} paquetes
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">
              Página {currentPage} de {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
