import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";
import "./utils/envs";
import { betterAuth } from "./utils/betteAuthPlugin";

import orderRouter from "./modules/order/router";
import { packagesPhotosRouter } from "./modules/packages-photos/packages-photos.route";
import { photographersRouter } from "./modules/photographers/photographers.route";

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
  .use(orderRouter)
  .use(packagesPhotosRouter)
  .use(photographersRouter);

export type Api = typeof api;
