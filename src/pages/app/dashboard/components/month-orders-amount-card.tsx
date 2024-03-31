import { useQuery } from '@tanstack/react-query'
import { ShoppingBag } from 'lucide-react'

import { getMonthOrdersAmount } from '@/api/get-dashboard-metrics'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { MetricCardSkeleton } from './metric-card-skeleton'

export function MonthOrdersAmountCard() {
  const { data: mountOrdersAmount } = useQuery({
    queryKey: ['metrics', 'mounth-orders-amount'],
    queryFn: getMonthOrdersAmount,
    staleTime: 5000,
  })
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (mês)</CardTitle>
        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {mountOrdersAmount ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {mountOrdersAmount.amount}
            </span>

            <p className="text-xs text-muted-foreground">
              {mountOrdersAmount.diffFromLastMonth < 0 ? (
                <span className="mr-2 text-rose-500 dark:text-rose-400">
                  -{mountOrdersAmount?.diffFromLastMonth}%
                </span>
              ) : (
                <span className="mr-2 text-emerald-500 dark:text-emerald-400">
                  +{mountOrdersAmount?.diffFromLastMonth}%
                </span>
              )}
              em relação ao mês passado
            </p>
          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  )
}
