import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { Loader2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { DateRange } from 'react-day-picker'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import { GetDailyReceiptInPeriod } from '@/api/get-daily-receipt-in-period'
import { DatePickerWithRange } from '@/components/DataRangePicker'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { formatCurrency } from '@/utils/CurrencyUtils'

export function RevenueChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })
  const { data } = useQuery({
    queryFn: () => GetDailyReceiptInPeriod(dateRange),
    queryKey: ['metrics', 'get-daily-receipt-in-period', dateRange],
    staleTime: 5000,
  })

  function handleDateChange(range: DateRange | undefined) {
    if (!range) return
    setDateRange(range)
  }

  const chartData = useMemo(() => {
    return data?.map((item) => ({
      date: item.date,
      receipt: item.receipt / 100,
    }))
  }, [data])

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium"></CardTitle>
          Receita no período
          <CardDescription>Receita diária</CardDescription>
        </div>

        <div className="flex items-center gap-3">
          <Label>Período</Label>
          <DatePickerWithRange
            date={dateRange}
            onDateChange={handleDateChange}
          />
        </div>
      </CardHeader>
      <CardContent>
        {chartData ? (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData} style={{ fontSize: 12 }}>
              <YAxis
                dataKey="receipt"
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
                dy={16}
              ></XAxis>
              <CartesianGrid vertical={false} className="stroke-muted" />
              <Tooltip
                labelClassName="text-[#888]"
                formatter={(value) => formatCurrency(value as number)}
              />
              <Line
                type="linear"
                strokeWidth={2}
                dataKey="receipt"
                stroke={colors.violet[500]}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-[240px] w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
