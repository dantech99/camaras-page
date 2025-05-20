"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

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
  { photographer: "Fotógrafo 1", sales: 186 },
  { photographer: "Fotógrafo 2", sales: 305 },
  { photographer: "Fotógrafo 3", sales: 237 },
  { photographer: "Fotógrafo 4", sales: 73 },
  { photographer: "Fotógrafo 5", sales: 209 },

]

const chartConfig = {
  sales: {
    label: "Ventas",
    color: "var(--color-chart-1)",
  },
  label: {
    color: "var(--color-chart-3)",
  },
} satisfies ChartConfig

export function TopSellingPhotographerChart() {
  return (
    <Card>
      <CardHeader className="py-4">
        <CardTitle>Fotógrafo con más ventas</CardTitle>
        <CardDescription>SOFA 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="photographer"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 10)}
              hide
            />
            <XAxis dataKey="sales" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="sales"
              layout="vertical"
              fill="var(--color-chart-1)"
              radius={8}
            >
              <LabelList
                dataKey="photographer"
                position="insideLeft"
                offset={8}
                className="fill-var(--color-chart-3)"
                fontSize={12}
              />
              <LabelList
                dataKey="sales"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm py-4">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
