import Elysia, { t } from "elysia";
import { betterAuth } from "@camaras/api/src/utils/betteAuthPlugin";
import { couponModule } from "@camaras/api/src/modules/coupon/coupon.module";

export const couponRouter = new Elysia({
  prefix: "/coupon",
  name: "coupon",
})
  .use(betterAuth)
  .use(couponModule)
  .post("/validate", ({ couponService, body }) => couponService.validateCoupon(body.code, body.photographerId), {
    body: t.Object({
      code: t.String(),
      photographerId: t.String(),
    }),
  })
  .get("/", ({ couponService, user }) => couponService.getCoupons(user.id), {
    photographer: true,
  })
  .post(
    "/",
    ({ couponService, user, body }) =>
      couponService.createCoupon(user.id, body),
    {
      photographer: true,
      body: t.Object({
        code: t.String(),
        discountPercentage: t.Number(),
        expirationDate: t.Date(),
      }),
    }
  )
  .patch(
    "/:id",
    ({ couponService, user, params, body }) =>
      couponService.updateCoupon(params.id, body, user.id),
    {
      photographer: true,
      body: t.Object({
        code: t.String(),
        discountPercentage: t.Number(),
        expirationDate: t.Date(),
        isActive: t.Boolean(),
      }),
    }
  )
  .delete(
    "/:id",
    ({ params, user, couponService }) =>
      couponService.deleteCoupon(params.id, user.id),
    {
      photographer: true,
    }
  );
