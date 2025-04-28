import { PackageService } from "@/services/package-service";
import { useQuery } from "@tanstack/react-query";

export function usePackages() {
  return useQuery({
    queryKey: ['packages'],
    queryFn: () => PackageService.getAll(),
    staleTime: 1000 * 60 * 5
  })
}