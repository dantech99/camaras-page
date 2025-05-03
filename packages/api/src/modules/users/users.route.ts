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
    ({ usersService, request, query }) => {
      const headers: Record<string, string> = {};
      request.headers.forEach((value, key) => {
        headers[key] = value;
      });
      return usersService.getUsers(headers, query);
    },
    {
      admin: true,
      query: t.Object({
        limit: t.Number(),
        offset: t.Number(),
        email: t.Optional(t.String()),
        role: t.Optional(
          t.Enum({
            admin: "admin",
            photographer: "photographer",
            user: "user",
          })
        ),
      }),
    }
  )
  .put(
    "/:id",
    ({ usersService, params, body, request }) => {
      const headers: Record<string, string> = {};
      request.headers.forEach((value, key) => {
        headers[key] = value;
      });
      return usersService.updateUserRole(params.id, body.role, headers);
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
