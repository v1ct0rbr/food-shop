import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { formatCurrency } from '@/utils/CurrencyUtils'
import { formatDate } from '@/utils/DateUtils'

const data = [
  { date: '2024-03-01', revenue: 1200 },
  { date: '2024-03-02', revenue: 800 },
  { date: '2024-03-03', revenue: 900 },
  { date: '2024-03-04', revenue: 400 },
  { date: '2024-03-05', revenue: 2300 },
  { date: '2024-03-06', revenue: 800 },
  { date: '2024-03-07', revenue: 640 },
]

export function RevenueChart() {
  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium"></CardTitle>
          Receita no período
          <CardDescription>Receita diária</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} style={{ fontSize: 12 }}>
            <YAxis
              dataKey="revenue"
              stroke="#888"
              axisLine={false}
              tickLine={false}
              width={80}
              tickFormatter={(value) => formatCurrency(value)}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => formatDate(value)}
              dy={16}
            ></XAxis>
            <CartesianGrid vertical={false} className="stroke-muted" />
            <Line
              type="linear"
              strokeWidth={2}
              dataKey="revenue"
              stroke={colors.violet[500]}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
