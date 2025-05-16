"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@camaras/ui/src/components/chart";

const chartData = [
  { photoPackage: "Paquete 1", sales: 186 },
  { photoPackage: "Paquete 2", sales: 500 },
  { photoPackage: "Paquete 3", sales: 237 },
  { photoPackage: "Paquete 4", sales: 73 },
];

const chartConfig = {
  sales: {
    label: "Ventas",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const totalSales = chartData.reduce((sum, item) => sum + item.sales, 0);

export function PackageGraphChart() {
  return (
    <div className="bg-muted/50 p-4 rounded-md h-full">
      <h1 className="text-2xl font-bold">
        Resumen de ventas SOFA
      </h1>
      <h2 className="text-base text-muted-foreground mb-4">
        Se han vendido un total de {totalSales} paquetes
      </h2>

      <ChartContainer config={chartConfig} className="min-h-[200px]">
        <BarChart accessibilityLayer data={chartData} margin={{ top: 20 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="photoPackage"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 50)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="sales" fill="var(--color-desktop)" radius={8}>
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
}
