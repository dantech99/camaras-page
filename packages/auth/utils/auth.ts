import { PrismaClient } from "@camaras/database";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, anonymous, openAPI, organization, phoneNumber } from "better-auth/plugins";
import {
  ac,
  admin as adminRole,
  photographer,
  user,
} from "permissons/permissons";
import twilio from "twilio";

const TWILIO_ACCOUNT_SID = process.env.TWILIO_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH;
const TWILIO_VERIFY_SERVICE_SID = process.env.TWILIO_VERIFY_SERVICE_SID;

const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const prisma = new PrismaClient();

export const auth = betterAuth({
  logger: {
    level: "debug",
    disabled: false,
  },
  appName: "Camaras-Page",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        input: false,
        defaultValue: "user",
      },
    },
  },
  secret: process.env.AUTH_SECRET,
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  trustedOrigins: [
    process.env.NEXT_PUBLIC_BACKEND_URL as string,
    process.env.NEXT_PUBLIC_FRONTEND_URL as string,
  ],
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
    admin({
      ac,
      roles: {
        admin: adminRole,
        user,
        photographer,
      },
      adminRoles: ["admin"],
      defaultRole: "user",
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
    phoneNumber({
      sendOTP: async ({ phoneNumber, code }) => {
        try {
          await twilioClient.verify.v2.services(TWILIO_VERIFY_SERVICE_SID as string)
            .verifications
            .create({ to: phoneNumber, channel: 'sms', customCode: code });
          console.log("OTP sent to", phoneNumber, code);
        } catch (error) {
          console.error(error);
          throw new Error("Failed to send OTP");
        }
      },
    }),
  ],
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
    },
  },
});