"use client";

import { cn } from "@camaras/ui/src/lib/utils";
import { addDays, format } from "date-fns";
import { Calendar } from "@camaras/ui/src/components/calendar";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@camaras/ui/src/components/button";
import { Input } from "@camaras/ui/src/components/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@camaras/ui/src/components/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@camaras/ui/src/components/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@camaras/ui/src/components/select";

import { toast } from "sonner";
import { CalendarIcon } from "lucide-react";
import { CouponService } from "@/services/coupon-service";
import { useCoupons } from "../../../hooks/use-cupons";

interface Coupon {
  id: string;
  code: string;
  discountPercentage: number;
  expirationDate: Date;
  isActive: boolean;
}

const createCuponSchema = z.object({
  code: z.string().min(1, { message: "El código es requerido" }),
  discountPercentage: z
    .number()
    .min(1, {
      message: "El descuento debe ser mayor de 1",
    })
    .max(100, {
      message: "Debe ser menor a 100",
    }),
  expirationDate: z.date().refine((date) => date > new Date(), {
    message: "La fecha de expiración debe ser futura",
  }),
  isActive: z.boolean(),
});

export function UpdateCouponForm({ coupon }: { coupon: Coupon }) {
  const { refetch } = useCoupons();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof createCuponSchema>>({
    resolver: zodResolver(createCuponSchema),
    defaultValues: {
      code: coupon.code,
      discountPercentage: coupon.discountPercentage,
      expirationDate: coupon.expirationDate,
      isActive: coupon.isActive,
    },
  });

  const date = form.watch("expirationDate");

  async function onSubmit(values: z.infer<typeof createCuponSchema>) {
    try {
      setIsLoading(true);
      await CouponService.update(coupon.id, {
        code: values.code,
        discountPercentage: values.discountPercentage,
        expirationDate: values.expirationDate,
        isActive: values.isActive,
      });
      await refetch();
      await form.reset();
      toast("El cupon fue actualizado", {
        description: "Ahora puedes verlo en la tabla de cupones",
        duration: 3000,
      });
    } catch (error) {
      toast("Hubo un error al actualizar el cupon", {
        description: "Intentalo de nuevo más tarde",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 grid-cols-1 items-start">
          <div className="flex flex-col gap-y-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código de descuento</FormLabel>
                  <FormControl>
                    <Input placeholder="DESCUENTO10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discountPercentage"
              render={({ field: { value, onChange, ...restField } }) => (
                <FormItem>
                  <FormLabel>
                    <span>
                      Escribe el porcentaje de descuento (sin el signo)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      {...restField}
                      value={value === 0 ? "" : value}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        onChange(
                          inputValue === "" ? 0 : parseFloat(inputValue)
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expirationDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selecciona la fecha de expiración</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild className="w-full rounded-full">
                        <Button
                          variant={"outline"}
                          className={cn(
                            " justify-center text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Seleccione la fecha"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        align="center"
                        className="flex w-auto flex-col space-y-2 p-2"
                      >
                        <Select
                          onValueChange={(value) => {
                            const newDate = addDays(
                              new Date(),
                              parseInt(value)
                            );
                            form.setValue("expirationDate", newDate);
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecciona una opción" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem value="0">Hoy</SelectItem>
                            <SelectItem value="1">Mañana</SelectItem>
                            <SelectItem value="3">En 3 días</SelectItem>
                            <SelectItem value="7">En una semana</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="rounded-md border">
                          <Calendar
                            mode="single"
                            selected={date ?? undefined}
                            onSelect={(selectedDate) => {
                              if (selectedDate) {
                                form.setValue("expirationDate", selectedDate);
                              }
                            }}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button
          type="submit"
          className="w-full rounded-full mt-4 cursor-pointer"
          variant="outline"
        >
          {isLoading ? "Actualizando cupón..." : "Actualizar Cupón"}
        </Button>
      </form>
    </Form>
  );
}
