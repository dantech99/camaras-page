"use client";

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@camaras/ui/src/components/chart";

const chartData = [
  { month: " Día 1", money: 186 },
  { month: " Día 2", money: 305 },
  { month: " Día 3", money: 237 },
  { month: " Día 4", money: 73 },
  { month: " Día 5", money: 209 },
];

const chartConfig = {
  money: {
    label: "Monto total",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const totalRevenue = chartData.reduce((sum, item) => sum + item.money, 0);
const formattedRevenue = totalRevenue.toLocaleString("es-CO", {
  style: "currency",
  currency: "COP",
});

export function MoneyGraphChart() {
  return (
    <div className="bg-muted/50 p-4 rounded-md">
      <h1 className="text-2xl font-bold mb-1">
        Resumen de dinero en SOFA
      </h1>
      <h2 className="text-base text-muted-foreground mb-4">
        Se han generado un total de {formattedRevenue} de pesos
      </h2>
      <ChartContainer config={chartConfig}>
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            top: 20,
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 10)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Line
            dataKey="money"
            type="natural"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={{
              fill: "var(--color-desktop)",
            }}
            activeDot={{
              r: 6,
            }}
          >
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={12}
            />
          </Line>
        </LineChart>
      </ChartContainer>
    </div>
  );
}
