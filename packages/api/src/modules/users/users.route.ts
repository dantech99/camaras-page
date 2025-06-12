import Elysia, { t } from "elysia";
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
  )
  .put(
    "/:id",
    ({ usersService, params, body }) => {
      return usersService.updateUserRole(params.id, body.role);
    },
    {
      admin: true,
      body: t.Object({
        role: t.Enum({
          admin: "admin",
          photographer: "photographer",
          user: "user",
        }),
      }),
    }
  );
