"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface PaymentChartProps {
  data: {
    labels: string[];
    data: number[];
  };
}

export function PaymentChart({ data }: PaymentChartProps) {
  const chartData = React.useMemo(() => {
    return data.labels.map((label, index) => ({
      status: label,
      jumlah: data.data[index],
      fill: label === 'Diterima' ? 'rgb(34 197 94)' : 
            label === 'Pending' ? 'rgb(234 179 8)' : 
            'rgb(239 68 68)'
    }))
  }, [data])

  const chartConfig = {
    jumlah: {
      label: "Jumlah",
    },
    diterima: {
      label: "Diterima",
      color: "rgb(34 197 94)",
    },
    pending: {
      label: "Pending",
      color: "rgb(234 179 8)",
    },
    ditolak: {
      label: "Ditolak",
      color: "rgb(239 68 68)",
    },
  } satisfies ChartConfig

  const totalPembayaran = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.jumlah, 0)
  }, [chartData])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Statistik Pembayaran</CardTitle>
        <CardDescription>Status Pembayaran Terkini</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="jumlah"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalPembayaran.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {chartData.map((item) => (
            <div key={item.status} className="flex items-center gap-1">
              <div 
                className={`h-2 w-2 rounded-full ${
                  item.status === 'Diterima' ? 'bg-green-500' :
                  item.status === 'Pending' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
              />
              <span className={`
                ${item.status === 'Diterima' ? 'text-green-500' :
                  item.status === 'Pending' ? 'text-yellow-500' :
                  'text-red-500'}
              `}>{item.status}: {item.jumlah}</span>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  )
} 