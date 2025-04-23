import { Elysia } from "elysia";
import { auth } from "@camaras/auth";

export const betterAuth = new Elysia({ name: "better-auth" })
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
  })
  .macro({
    photographer: {
      async resolve({ error, request: { headers } }) {
        const session = await auth.api.getSession({
          headers,
        });

        if (!session) return error(401);

        if (session.user.role !== "photographer") return error(401);

        return {
          user: session.user,
        }
      }
    }
  })
