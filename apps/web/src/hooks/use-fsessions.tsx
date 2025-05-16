import { SessionsService } from "@/services/sessions-service";
import { useQuery } from "@tanstack/react-query";

export function useFSessions() {
  return useQuery({
    queryKey: ["fsessions"],
    queryFn: () => SessionsService.getAll(),
    staleTime: 1000 * 60 * 5,
  });
}

export function useFSessionById(id: string) {
  return useQuery({
    queryKey: ["fsession", id],
    queryFn: () => SessionsService.getById(id),
    staleTime: 1000 * 60 * 5,
  });
}