import { auth } from "@camaras/auth";
import twilio from "twilio";

const TWILIO_ACCOUNT_SID = process.env.TWILIO_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH;
const TWILIO_VERIFY_SERVICE_SID = process.env.TWILIO_VERIFY_SERVICE_SID;

const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export class OtpService {
  async sendOtp(phoneNumber: string) {
    try {
      await auth.api.sendPhoneNumberOTP({
        body: {
          phoneNumber,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to send OTP");
    }
  }

  async verifyOtp(phoneNumber: string, code: string) {
    try {
      const verification = await twilioClient.verify.v2.services(TWILIO_VERIFY_SERVICE_SID as string)
        .verificationChecks
        .create({ to: phoneNumber, code });

      return verification.status === 'approved';
    } catch (error) {
      console.error(error);
      throw new Error("Failed to verify OTP");
    }
  }
}