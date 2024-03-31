import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

import { getMonthRevenue } from '@/api/get-dashboard-metrics'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrencyInCents } from '@/utils/CurrencyUtils'

export function MonthRevenueCard() {
  const { data: mounthRevenue } = useQuery({
    queryKey: ['metrics', 'mounth-revenue'],
    queryFn: getMonthRevenue,
    staleTime: 5000,
  })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Receita total (mês)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {mounthRevenue && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {formatCurrencyInCents(mounthRevenue.receipt)}
            </span>
            <p className="text-xs text-muted-foreground">
              {mounthRevenue.diffFromLastMonth < 0 ? (
                <span className="mr-2 text-rose-500 dark:text-rose-400">
                  -{mounthRevenue?.diffFromLastMonth}%
                </span>
              ) : (
                <span className="mr-2 text-emerald-500 dark:text-emerald-400">
                  +{mounthRevenue?.diffFromLastMonth}%
                </span>
              )}
              em relação ao mês passado
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
