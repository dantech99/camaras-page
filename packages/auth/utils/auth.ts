import { PrismaClient } from "@camaras/database";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import {
  admin,
  anonymous,
  organization,
  phoneNumber,
  openAPI,
} from "better-auth/plugins";

const prisma = new PrismaClient();

export const auth = betterAuth({
  appName: "Camaras-Page",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  secret: process.env.AUTH_SECRET,
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  plugins: [
    openAPI(),
    phoneNumber({
      sendOTP(data, request) {},
    }),
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
