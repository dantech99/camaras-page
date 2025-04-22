import { PrismaClient } from "@camaras/database";
import { betterAuth, map } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, anonymous, openAPI, organization, phoneNumber } from "better-auth/plugins";
import { admin as adminPlugin } from "better-auth/plugins"
import { ac, adminRole, photogrepherRole, userRole } from "permissons/permissons";

const prisma = new PrismaClient();

export const auth = betterAuth({
  appName: "Camaras-Page",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    additionalFields: {
      phoneNumber: {
        type: "string",
        required: true,
        input: true
      },
      role: {
        type: "string",
        required: true,
        input: false,
        defaultValue: "user",
      }
    },
  },
  secret: process.env.AUTH_SECRET,
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  trustedOrigins: [process.env.NEXT_PUBLIC_BACKEND_URL as string, process.env.NEXT_PUBLIC_FRONTEND_URL as string],
  emailAndPassword: {
    enabled: true,

  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [
    adminPlugin({
      ac,
      roles: {
        adminRole,
        photogrepherRole,
        userRole,
      }
    }),
    openAPI(),
    organization({
      async allowUserToCreateOrganization(user) {
        const finalUser = await prisma.user.findUnique({
          where: {
            id: user.id,
          },
        });

        return finalUser?.role === "admin";
      },
    }),
    anonymous(),
    admin(),
  ],
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
    },
  },
});
