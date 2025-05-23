"use client";

import { useState } from "react";
import { useSaleStore } from "@/modules/agenda/store/sale.store";
import { Button } from "@camaras/ui/src/components/button";
import { CouponService } from "@/services/coupon-service";
import { toast } from "sonner";
import { SaleService } from "@/services/sale-service";

export function ConfirmPayment() {
  const {
    photographerName,
    packageName,
    packagePrice,
    day,
    timeSlot,
    methodPayment,
    photographerId,
    packageId,
    dayId,
    timeSlotId,
  } = useSaleStore();
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountCodeId, setDiscountCodeId] = useState("");
  const [validatingDiscount, setValidatingDiscount] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [finalPrice, setFinalPrice] = useState(packagePrice);
  const [loading, setLoading] = useState(false);

  const handleDiscountValidation = async () => {
    setValidatingDiscount(true);
    try {
      const response = await CouponService.validate(
        discountCode,
        photographerId
      );
      if (response && response.status === 200 && response.coupon) {
        setDiscountApplied(true);
        setFinalPrice(
          packagePrice * (1 - response.coupon.discountPercentage / 100)
        );
        setIsValid(true);
        setDiscountCodeId(response.coupon.id);
      }
    } catch (error) {
      toast.error("Error al validar el cupón");
    } finally {
      setValidatingDiscount(false);
    }
  };

  const confirmPurchase = async () => {
    setLoading(true);
    try {
      const response = await SaleService.create({
        photographerId,
        packageId,
        discountCodeId,
        dayId,
        timeSlotId,
        price: finalPrice,
        methodPayment,
      });
      if (response && response.status === 200) {
        toast.success("Compra confirmada");
      }
    } catch (error) {
      toast.error("Error al confirmar la compra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl shadow-md overflow-hidden">
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex justify-between items-center py-2 border-b border-primary-foreground">
            <span className="font-bold">Fotógrafo:</span>
            <span className="">{photographerName}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-primary-foreground">
            <span className="font-bold">Paquete:</span>
            <span className="">{packageName}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-primary-foreground">
            <span className="font-bold">Día:</span>
            <span className="">{day}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-primary-foreground">
            <span className="font-bold">Horario:</span>
            <span className="">{timeSlot}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-primary-foreground">
            <span className="font-bold">Método de Pago:</span>
            <span className="">{methodPayment}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-primary-foreground">
            <span className="font-bold">Precio:</span>
            <span
              className={`font-bold ${discountApplied ? "line-through text-gray-500" : "text-gray-400"}`}
            >
              $
              {typeof packagePrice === "number"
                ? packagePrice.toFixed(2)
                : packagePrice}
            </span>
          </div>

          {discountApplied && (
            <div className="flex justify-between items-center py-2 border-b border-primary-foreground">
              <span className="font-bold">Precio con descuento:</span>
              <span className="font-bold text-green-600">
                $
                {typeof finalPrice === "number"
                  ? finalPrice.toFixed(2)
                  : finalPrice}
              </span>
            </div>
          )}
        </div>

        <div className="mt-6 mb-6">
          <label
            htmlFor="discountCode"
            className="block text-sm font-medium text-muted-foreground mb-2"
          >
            ¿Tienes un código de descuento? Verficalo antes de confirmar la
            compra
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              id="discountCode"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="Ingresa tu código"
              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border shadow-sm focus:outline-none sm:text-sm"
              disabled={discountApplied || validatingDiscount}
            />
            <Button
              onClick={handleDiscountValidation}
              disabled={
                discountApplied || validatingDiscount || isValid === true
              }
              className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${discountApplied ? "bg-gray-400" : "bg-primary-blue"}`}
            >
              {validatingDiscount ? "Validando..." : "Validar"}
            </Button>
          </div>
          {discountApplied && (
            <p className="mt-2 text-sm text-green-600">
              ¡Descuento aplicado correctamente!
            </p>
          )}
        </div>

        <div className="mt-8">
          <Button
            onClick={confirmPurchase}
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium transition duration-150 ease-in-out"
          >
            Confirmar Compra
          </Button>
        </div>
      </div>
    </div>
  );
}
