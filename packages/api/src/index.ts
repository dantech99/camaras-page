import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";
import "./utils/envs";
import { betterAuth } from "./utils/betteAuthPlugin";

import orderRouter from "./modules/order/router";

export const api = new Elysia({
  prefix: "/api",
})
  .use(
    cors({
      origin: process.env.NEXT_PUBLIC_FRONTEND_URL,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      credentials: true,
      allowedHeaders: ["Authorization", "Content-Type"],
    }),
  )
  .use(betterAuth)
  .use(orderRouter)

export type Api = typeof api;
