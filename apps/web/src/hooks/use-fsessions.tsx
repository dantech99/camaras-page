import { SessionsService } from "@/services/sessions-service";
import { useQuery } from "@tanstack/react-query";

export function useFSessions() {
  return useQuery({
    queryKey: ["fsessions"],
    queryFn: () => SessionsService.getAll(),
    staleTime: 1000 * 60 * 5,
  });
}
