import Elysia, { t } from "elysia";
import { betterAuth } from "@camaras/api/src/utils/betteAuthPlugin";
import { timeModule } from "@camaras/api/src/modules/time/time.module";

export const timeRouter = new Elysia({
  prefix: "/time",
  name: "time",
})
  .use(betterAuth)
  .use(timeModule)
  .post(
    "/",
    ({ timeService, body }) =>
      timeService.createMultipleTimeSlots(body.timeSlots),
    {
      photographer: true,
      body: t.Object({
        timeSlots: t.Array(
          t.Object({
            startTime: t.String(),
            endTime: t.String(),
            ampmStart: t.String(),
            ampmEnd: t.String(),
            availableDayId: t.String(),
          })
        ),
      }),
    }
  )
  .delete(
    "/:id",
    ({ timeService, params }) => timeService.deleteTimeSlot(params.id),
    {
      photographer: true,
    }
  )
  .patch(
    "/",
    ({ timeService, body }) =>
      timeService.updateMultipleTimeSlots(body.timeSlots),
    {
      photographer: true,
      body: t.Object({
        timeSlots: t.Array(
          t.Object({
            id: t.String(),
            startTime: t.String(),
            endTime: t.String(),
            ampmStart: t.String(),
            ampmEnd: t.String(),
            availableDayId: t.String(),
          })
        ),
      }),
    }
  );
