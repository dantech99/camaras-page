import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";
import "./utils/envs";
import { betterAuth } from "@camaras/api/src/utils/betteAuthPlugin";

import { packagesRouter } from "@camaras/api/src/modules/packages/packages.route";
import { photographersRouter } from "@camaras/api/src/modules/photographers/photographers.route";
import { couponRouter } from "@camaras/api/src/modules/coupon/coupon.route";
import { profileRouter } from "@camaras/api/src/modules/profile/profile.route";
import { usersRouter } from "@camaras/api/src/modules/users/users.route";
import { sessionsRouter } from "./modules/sessions/sessions.route";

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
  .use(packagesRouter)
  .use(photographersRouter)
  .use(couponRouter)
  .use(profileRouter)
  .use(usersRouter)
  .use(sessionsRouter);

export type Api = typeof api;
