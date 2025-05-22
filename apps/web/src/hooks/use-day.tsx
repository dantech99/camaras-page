import { DaysService } from "@/services/day-service";
import { useQuery } from "@tanstack/react-query";

export function useDays() {
  return useQuery({
    queryKey: ["days"],
    queryFn: () => DaysService.getAll(),
    staleTime: 1000 * 60 * 5,
  });
}

export function useDayById(id: string) {
  return useQuery({
    queryKey: ["day", id],
    queryFn: () => DaysService.getOne(id),
    staleTime: 1000 * 60 * 5,
  });
}
