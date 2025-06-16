"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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
  { day: "Día 1", totalAmount: 186 },
  { day: "Día 2", totalAmount: 305 },
  { day: "Día 3", totalAmount: 237 },
  { day: "Día 4", totalAmount: 73 },
  { day: "Día 5", totalAmount: 209 },
];

const totalAmountSold = chartData.reduce(
  (sum, item) => sum + item.totalAmount,
  0
);

const chartConfig = {
  totalAmount: {
    label: "Desktop",
    color: "var(--color-chart-1)",
  },
} satisfies ChartConfig;

export function MoneyGraphChart() {
  return (
    <Card
      className="bg-gradient-to-t from-primary/5 to-card dark:bg-card shadow-xs cursor-pointer"
      data-slot="card"
    >
      <CardHeader className="py-4">
        <CardTitle>Ventas totales en dinero</CardTitle>
        <CardDescription>
          Enero - Junio 2024 · Total vendido: $
          {totalAmountSold.toLocaleString("es-CO")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[350px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 5)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="totalAmount"
              type="natural"
              stroke="var(--color-chart-1)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-chart-1)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Mostrando total de dinero ganado en los últimos 5 días
        </div>
      </CardFooter>
    </Card>
  );
}
