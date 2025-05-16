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
      timeService.createTimeSlot(
        body.startTime,
        body.endTime,
        body.ampm,
        body.availableDayId
      ),
    {
      photographer: true,
      body: t.Object({
        startTime: t.String(),
        endTime: t.String(),
        ampm: t.String(),
        availableDayId: t.String(),
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
    "/:id",
    ({ timeService, params, body }) =>
      timeService.updateTimeSlot(
        params.id,
        body.startTime,
        body.endTime,
        body.ampm,
        body.availableDayId
      ),
    {
      photographer: true,
      body: t.Object({
        startTime: t.String(),
        endTime: t.String(),
        ampm: t.String(),
        availableDayId: t.String(),
      }),
    }
  );
