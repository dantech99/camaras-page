import Elysia, { t } from "elysia";
import { betterAuth } from "@camaras/api/src/utils/betteAuthPlugin";
import { dayModule } from "@camaras/api/src/modules/day/day.module";

export const dayRouter = new Elysia({
  prefix: "/day",
  name: "day",
})
  .use(betterAuth)
  .use(dayModule)
  .post("/", ({ dayService, user, body }) => dayService.createDay(body.date, user.id), {
    photographer: true,
    body: t.Object({
      date: t.String(),
    }),
  })
  .delete("/:id", ({ dayService, user, params }) => dayService.deleteDay(params.id, user.id), {
    photographer: true,
  })
  .get("/", ({ dayService, user }) => dayService.getDays(user.id), {
    photographer: true,
  })
  .get("/:id", ({ dayService, user, params }) => dayService.getDay(params.id, user.id), {
    photographer: true,
  });
    
