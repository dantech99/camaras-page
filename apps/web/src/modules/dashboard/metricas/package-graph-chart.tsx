"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, LabelList } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@camaras/ui/src/components/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@camaras/ui/src/components/chart";

const chartData = [
  { day: "Día 1", salesPackage: 186 },
  { day: "Día 2", salesPackage: 305 },
  { day: "Día 3", salesPackage: 237 },
  { day: "Día 4", salesPackage: 73 },
  { day: "Día 5", salesPackage: 209 },
];

const totalSalesPackage = chartData.reduce(
  (sum, item) => sum + item.salesPackage,
  0
);

const chartConfig = {
  salesPackage: {
    label: "Paquetes vendidos: ",
    color: "var(--color-chart-1)",
  },
} satisfies ChartConfig;

export function PackageGraphChart() {
  return (
    <Card
      className="bg-gradient-to-t from-primary/5 to-card dark:bg-card shadow-xs cursor-pointer"
      data-slot="card"
    >
      <CardHeader className="py-4">
        <CardTitle>Paquetes vendidos en SOFA</CardTitle>
        <CardDescription>
          Enero - Junio 2024 · Total vendidos: {totalSalesPackage}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[350px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 5)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="salesPackage" fill="var(--color-chart-1)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm pb-4">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% este mes <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Mostrando total de paquetes vendidos en los últimos 5 días
        </div>
      </CardFooter>
    </Card>
  );
}
