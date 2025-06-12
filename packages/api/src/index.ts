import { Elysia } from "elysia";
import "./utils/envs";
import { betterAuth } from "@camaras/api/src/utils/betteAuthPlugin";
import { cors } from "@elysiajs/cors";

import { packagesRouter } from "@camaras/api/src/modules/packages/packages.route";
import { photographersRouter } from "@camaras/api/src/modules/photographers/photographers.route";
import { couponRouter } from "@camaras/api/src/modules/coupon/coupon.route";
import { profileRouter } from "@camaras/api/src/modules/profile/profile.route";
import { usersRouter } from "@camaras/api/src/modules/users/users.route";
import { dayRouter } from "@camaras/api/src/modules/day/day.route";
import { timeRouter } from "@camaras/api/src/modules/time/time.route";
import { saleRouter } from "@camaras/api/src/modules/sales/sale.route";

export const api = new Elysia({
  prefix: "/api",
})
  .use(
    cors({
      origin: process.env.NEXT_PUBLIC_FRONTEND_URL,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      credentials: true,
      allowedHeaders: ["Authorization", "Content-Type"],
    })
  )
  .use(betterAuth)
  .use(usersRouter)
  .use(packagesRouter)
  .use(photographersRouter)
  .use(couponRouter)
  .use(profileRouter)
  .use(dayRouter)
  .use(timeRouter)
  .use(saleRouter);

export type Api = typeof api;
