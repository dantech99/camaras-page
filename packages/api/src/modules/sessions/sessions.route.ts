import Elysia, { t } from "elysia";
import { sessionsModule } from "./sessions.module";
import { betterAuth } from "@camaras/api/src/utils/betteAuthPlugin";

export const sessionsRouter = new Elysia({
  prefix: "/sessions",
  name: "sessions",
})
  .use(betterAuth)
  .use(sessionsModule)
  .get("/", ({ sessionsService, user }) => sessionsService.getAll(user.id), {
    photographer: true,
  })
  .post("/day", ({ body, user, sessionsService }) => {
    return sessionsService.createAvailableDay(body.date, user.id);
  }, {
    photographer: true,
    body: t.Object({
      date: t.String(),
    }),
  })
  .post("/slots", ({ body, sessionsService }) => {
    return sessionsService.addSlotsTime(body.id, body.timeSlots);
  }, {
    photographer: true,
    body: t.Object({
      id: t.String(),
      timeSlots: t.Array(
        t.Object({
          start: t.String(),
          end: t.String(),
        })
      ),
    }),
  })
  .put("/slots", ({ body, sessionsService }) => {
    return sessionsService.updateSlotsTime(body.id, body.timeSlots);
  }, {
    photographer: true,
    body: t.Object({
      id: t.String(),
      timeSlots: t.Array(
        t.Object({
          start: t.String(),
          end: t.String(),
        })
      ),
    }),
  })
  .put("/slot", ({ body, sessionsService }) => {
    return sessionsService.updateOnlyOneSlot(body.id, body.start, body.end);
  }, {
    photographer: true,
    body: t.Object({
      id: t.String(),
      start: t.String(),
      end: t.String(),
    }),
  })
  .delete("/day", ({ params, user, sessionsService }) => {
    return sessionsService.deleteAvailableDay(params.id, user.id);
  }, {
    photographer: true,
    params: t.Object({
      id: t.String(),
    }),
  })
