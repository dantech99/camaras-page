import Elysia, { t } from "elysia";
import { otpModule } from "@camaras/api/src/modules/otp/otp.module";

export const otpRoutes = new Elysia({
  name: "otpRoutes",
  prefix: "/otp",
})
  .use(otpModule)
  .post("/", ({ otpService, body }) => {
    return otpService.sendOtp(body.phoneNumber);
  }, {
    body: t.Object({
      phoneNumber: t.String(),
    }),
  })
  .post("/verify", ({ otpService, body }) => {
    return otpService.verifyOtp(body.phoneNumber, body.code);
  }, {
    body: t.Object({
      phoneNumber: t.String(),
      code: t.String(),
    }),
  });