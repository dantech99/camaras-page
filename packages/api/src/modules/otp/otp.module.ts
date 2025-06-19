import Elysia from "elysia";
import { OtpService } from "@camaras/api/src/modules/otp/otp.service";

export const otpModule = new Elysia({
  name: "otpModule",
}).decorate(() => ({
  otpService: new OtpService(),
}));