import Elysia from "elysia";
import { usersModule } from "@camaras/api/src/modules/users/users.module";
import { betterAuth } from "@camaras/api/src/utils/betteAuthPlugin";

export const usersRouter = new Elysia({
  prefix: "/users",
  name: "users",
})
  .use(betterAuth)
  .use(usersModule)
  .get(
    "/",
    ({ usersService }) => {
      return usersService.getUsers();
    },
    {
      admin: true,
    }
  );
