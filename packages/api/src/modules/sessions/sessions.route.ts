import Elysia, { t } from "elysia";
import { sessionsModule } from "./sessions.module";
import { betterAuth } from "@camaras/api/src/utils/betteAuthPlugin";

export const sessionsRouter = new Elysia({
  prefix: "/sessions",
  name: "sessions",
})
  .use(betterAuth)
  .use(sessionsModule)
  .post(
    "/",
    ({ body, user, sessionsService }) => {
      return sessionsService.createAvailableDay(
        body.date,
        body.timeSlots,
        user.id
      );
    },
    {
      photographer: true,
      body: t.Object({
        date: t.String(),
        timeSlots: t.Array(
          t.Object({
            start: t.String(),
            end: t.String(),
          })
        ),
      }),
    }
  )
  .get(
    "/",
    ({ user, sessionsService }) => {
      return sessionsService.getAvailableDays(user.id);
    },
    {
      photographer: true,
    }
  )
  .put(
    "/:id",
    ({ params, body, sessionsService }) => {
      return sessionsService.updateAvailableDay(params.id, body.timeSlots);
    },
    {
      photographer: true,
      params: t.Object({
        id: t.String(),
      }),
      body: t.Object({
        timeSlots: t.Array(
          t.Object({
            start: t.String(),
            end: t.String(),
          })
        ),
      }),
    }
  );
