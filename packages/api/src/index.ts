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
  .use(betterAuth);

export type Api = typeof api;
