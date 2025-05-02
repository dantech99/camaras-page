import Elysia from "elysia";
import { UsersService } from "@camaras/api/src/modules/users/users.service";

export const usersModule = new Elysia({
  name: "usersModule",
}).decorate(() => ({
  usersService: new UsersService(),
}));
