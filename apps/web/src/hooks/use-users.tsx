import { useQuery } from "@tanstack/react-query";
import { UsersService } from "../services/users-service";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => UsersService.getAll({ limit: 100, offset: 0 }),
    staleTime: 1000 * 60 * 5,
  });
}
