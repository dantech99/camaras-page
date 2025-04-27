import Elysia from "elysia";
import { CouponService } from "@camaras/api/src/modules/coupon/coupon.service";

export const couponModule = new Elysia({
  name: "coupon-module",
}).decorate(() => ({
  couponService: new CouponService(),
}));
