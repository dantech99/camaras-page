"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart } from "recharts"

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
  { photographer: "chrome", rating: 5, fill: "var(--color-chart-1)" },
  { photographer: "safari", rating: 4.6, fill: "var(--color-chart-2)" },
  { photographer: "firefox", rating: 3.0, fill: "var(--color-chart-3)" },
  { photographer: "edge", rating: 2.5, fill: "var(--color-chart-4)" },
]

const chartConfig = {
  rating: {
    label: "Calificación",
    color: "var(--color-chart-1)",
  },
  chrome: {
    label: "Chrome",
    color: "var(--color-chart-2)",
  },
  safari: {
    label: "Safari",
    color: "var(--color-chart-3)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--color-chart-4)",
  },
  edge: {
    label: "Edge",
    color: "var(--color-chart-5)",
  },
} satisfies ChartConfig

export function TopRatedPhotographerChart() {
  return (
    <Card>
      <CardHeader className="py-4">
        <CardTitle>Fotógrafos con mejor calificación</CardTitle>
        <CardDescription>SOFA 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 24,
              left: 24,
              right: 24,
            }}
          >
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  nameKey="rating"
                  hideLabel
                />
              }
            />
            <Line
              dataKey="rating"
              type="natural"
              stroke="var(--color-chart-1)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-chart-1)",
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
                dataKey="photographer"
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm py-4">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Mostrando calificación de los fotógrafos destacados
        </div>
      </CardFooter>
    </Card>
  )
}
