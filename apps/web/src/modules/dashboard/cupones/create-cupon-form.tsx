"use client";

import type React from "react";
import { cn } from "@camaras/ui/src/lib/utils";
import { addDays, format } from "date-fns"
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
  } from "@camaras/ui/src/components/popover"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@camaras/ui/src/components/select"

import { toast } from "sonner";
import { CalendarIcon } from "lucide-react";

const createCuponSchema = z.object({
  code: z.string().min(1, { message: "El código es requerido" }),
  discountPercentage: z
    .number()
    .min(1, { message: "El porcentaje de descuento es requerido" }),
  expirationDate: z
    .date()
    .refine((date) => date > new Date(), {
      message: "La fecha de expiración debe ser futura",
    })
    .nullable(),
});

export function CreateCuponForm() {
  
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date>()

  const form = useForm<z.infer<typeof createCuponSchema>>({
    resolver: zodResolver(createCuponSchema),
    defaultValues: {
      code: "",
      discountPercentage: 0,
      expirationDate: null,
    },
  });

  async function onSubmit(values: z.infer<typeof createCuponSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 px-4 py-3"
      >
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 items-start">
          {/* Inputs del lado derecho */}
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Escribe el porcentaje de descuento</FormLabel>
                  <FormControl>
                    <Input placeholder="Agrega una descripción" {...field} />
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
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Seleccione la fecha</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        align="start"
                        className="flex w-auto flex-col space-y-2 p-2"
                      >
                        <Select
                          onValueChange={(value) =>
                            setDate(addDays(new Date(), parseInt(value)))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem value="0">Today</SelectItem>
                            <SelectItem value="1">Tomorrow</SelectItem>
                            <SelectItem value="3">In 3 days</SelectItem>
                            <SelectItem value="7">In a week</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="rounded-md border">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
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
          {isLoading ? "Subiendo cupón..." : "Crear Cupón"}
        </Button>
      </form>
    </Form>
  );
}
