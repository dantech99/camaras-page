import { PrismaClient } from "@camaras/database";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, anonymous, openAPI, organization } from "better-auth/plugins";

const prisma = new PrismaClient();

export const auth = betterAuth({
  appName: "Camaras-Page",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
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
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    },
    twitter: {
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
    },
  },
  plugins: [
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
