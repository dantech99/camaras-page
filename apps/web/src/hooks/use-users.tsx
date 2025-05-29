import { useQuery } from "@tanstack/react-query";
import { UsersService } from "../services/users-service";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => UsersService.getAll(),
    staleTime: 1000 * 60 * 5,
  });
}
