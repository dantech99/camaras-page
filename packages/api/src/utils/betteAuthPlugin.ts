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

        const role = await auth.api.userHasPermission({
          body: {
            role: "photographer",
            permissions: {
              project: ["create"],
            },
          },
        });

        if (!role.success) return error(401);

        return {
          user: session.user,
        };
      },
    },
  })
  .macro({
    permissions: {
      async resolve({ error, request: { headers } }) {
        const session = await auth.api.getSession({
          headers,
        });

        const user = session?.user;

        const permissions = await auth.api.userHasPermission({
          body: {
            userId: user?.id,
            permissions: {
              project: ["create"],
            },
          },
        });

        if (!permissions) {
          return error(401);
        }

        return {
          user,
        };
      },
    },
  })
  .macro({
    admin: {
      async resolve({ error, request: { headers } }) {
        const session = await auth.api.getSession({
          headers,
        });

        if (!session) return error(401);

        const role = await auth.api.hasPermission({
          headers,
          body: {
            permissions: {
              organization: ["update"],
            },
          },
        });

        if (!role.success) return error(401);

        return {
          user: session.user,
          headers,
        };
      },
    },
  });
