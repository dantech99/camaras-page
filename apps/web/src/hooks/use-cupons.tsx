import { CouponService } from "@/services/coupon-service";
import { useQuery } from "@tanstack/react-query";

export function useCoupons() {
  return useQuery({
    queryKey: ['coupons'],
    queryFn: () => CouponService.getAll(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}