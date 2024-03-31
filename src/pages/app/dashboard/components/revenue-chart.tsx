import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
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
import { formatCurrencyInCents } from '@/utils/CurrencyUtils'

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
        {data && (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={data} style={{ fontSize: 12 }}>
              <YAxis
                dataKey="receipt"
                stroke="#888"
                axisLine={false}
                tickLine={false}
                width={80}
                tickFormatter={(value) => formatCurrencyInCents(value)}
              />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                dy={16}
              ></XAxis>
              <CartesianGrid vertical={false} className="stroke-muted" />
              <Line
                type="linear"
                strokeWidth={2}
                dataKey="receipt"
                stroke={colors.violet[500]}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
