import { useQuery } from "@tanstack/react-query";
import { PhotographersService } from "@/services/photographer-service";

export function usePhotographers() {
  return useQuery({
    queryKey: ["photographers"],
    queryFn: () => PhotographersService.getAll(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function getPhotographerPackages(id: string) {
  return useQuery({
    queryKey: ["photographer-packages", id],
    queryFn: () => PhotographersService.getPackageFromPhotographer(id),
    staleTime: 1000 * 60 * 5,
  });
}

export function getPhotographerAvailableDays(id: string) {
  return useQuery({
    queryKey: ["photographer-available-days", id],
    queryFn: () => PhotographersService.getAvailableDays(id),
    staleTime: 1000 * 60 * 5,
  });
}
