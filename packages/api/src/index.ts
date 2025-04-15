import { auth } from "@camaras/auth";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { type Context, Elysia } from "elysia";
import orderRouter from "./modules/order/router";
import "./utils/envs";

const betterAuthView = (context: Context) => {
  const BETTER_AUTH_ACCEPT_METHODS = ["POST", "GET"];
  // validate request method
  if (BETTER_AUTH_ACCEPT_METHODS.includes(context.request.method)) {
    return auth.handler(context.request);
  }
  return context.error(405);
};

export const api = new Elysia({
  prefix: "/api",
})
  .use(cors())
  .all("/auth/*", betterAuthView)
  .get("/hola", () => "hola")
  .use(swagger());

export type Api = typeof api;
