import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

import { getMonthCanceledOrdersAmount } from '@/api/get-dashboard-metrics'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function MonthCanceledOrdersAmountCard() {
  const { data: mounthCanceledOrders } = useQuery({
    queryKey: ['metrics', 'mounth-canceled-orders'],
    queryFn: getMonthCanceledOrdersAmount,
    staleTime: 5000,
  })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Cancelamentos (mês)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {mounthCanceledOrders && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {mounthCanceledOrders.amount}
            </span>

            <p className="text-xs text-muted-foreground">
              {mounthCanceledOrders.diffFromLastMonth < 0 ? (
                <span className="mr-2 text-emerald-500 dark:text-emerald-400">
                  -{mounthCanceledOrders?.diffFromLastMonth}%
                </span>
              ) : (
                <span className="mr-2  text-rose-500 dark:text-rose-400">
                  +{mounthCanceledOrders?.diffFromLastMonth}%
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
