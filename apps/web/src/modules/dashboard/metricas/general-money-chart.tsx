"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@camaras/ui/src/components/card"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@camaras/ui/src/components/chart"

const chartData = [
  { day: "Día 1", desktop: 26, mobile: 80, tablet: 50 },
  { day: "Día 2", desktop: 3205, mobile: 200, tablet: 100 },
  { day: "Día 3", desktop: 237, mobile: 3120, tablet: 70 },
  { day: "Día 4", desktop: 73, mobile: 190, tablet: 540 },
  { day: "Día 5", desktop: 2019, mobile: 1303, tablet: 760 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--color-chart-4)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--color-chart-1)",
  },
  tablet: {
    label: "Tablet",
    color: "var(--color-chart-2)",
  },
} satisfies ChartConfig

const totalPackagesSold = chartData.reduce(
  (sum, item) => sum + (item.desktop ?? 0) + (item.mobile ?? 0),
  0
);

const totalMoneyCollected = chartData.reduce(
  (sum, item) => sum + (item.desktop ?? 0) + (item.mobile ?? 0) + (item.tablet ?? 0),
  0
);

export function GeneralMoneyChart() {
  return (
    <Card>
      <CardHeader className="py-4">
        <CardTitle className="text-2xl md:text-3xl font-extrabold leading-tight mb-1">
          Dinero recolectado por día y tipo de paquete
        </CardTitle>
        <CardDescription className="text-sm md:text-base text-muted-foreground font-medium mb-2">
          SOFA · Total dinero recolectado: ${totalMoneyCollected.toLocaleString("es-CO")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[400px] w-full">
          <BarChart accessibilityLayer data={chartData}>
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
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="desktop" fill="var(--color-chart-4)" radius={10} />
            <Bar dataKey="mobile" fill="var(--color-chart-1)" radius={10} />
            <Bar dataKey="tablet" fill="var(--color-chart-2)" radius={10} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm py-4">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% este semestre <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Mostrando dinero recolectado por cada día y tipo de paquete
        </div>
      </CardFooter>
    </Card>
  )
}