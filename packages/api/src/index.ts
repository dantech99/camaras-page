import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";
import "./utils/envs";
import { betterAuth } from "@camaras/api/src/utils/betteAuthPlugin";

import { packagesPhotosRouter } from "@camaras/api/src/modules/packages-photos/packages-photos.route";
import { photographersRouter } from "@camaras/api/src/modules/photographers/photographers.route";
import { couponRouter } from "@camaras/api/src/modules/coupon/coupon.route";

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
  .use(packagesPhotosRouter)
  .use(photographersRouter)
  .use(couponRouter);

export type Api = typeof api;
