import { auth } from "@camaras/auth";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { type Context, Elysia } from "elysia";
import orderRouter from "./modules/order/router";
import "./utils/envs";

const betterAuth = new Elysia({ name: "better-auth" })
  .mount(auth.handler)
  .macro({
    auth: {
      async resolve({ error, request: { headers } }) {
        const session = await auth.api.getSession({
          headers,
        });

        if (!session) return error(401);

        return {
          user: session.user,
          session: session.session,
        };
      },
    },
  });

const betterAuthView = (context: Context) => {
  const BETTER_AUTH_ACCEPT_METHODS = ["POST", "GET"];

  if (BETTER_AUTH_ACCEPT_METHODS.includes(context.request.method)) {
    return auth.handler(context.request);
  }

  return context.error(405);
};

export const api = new Elysia({
  prefix: "/api",
})
  .use(
    cors({
      origin: process.env.NEXT_PUBLIC_FRONTEND_URL,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      credentials: true,
      allowedHeaders: ["Authorization", "Content-Type"],
    })
  )
  .use(betterAuth)
  .all("/auth/*", betterAuthView);

export type Api = typeof api;
