import { http, HttpResponse } from 'msw'

import { MonthCanceledOrdersAmountResponse } from '../get-dashboard-metrics'

export const getMonthCancelledOrdersAmountMock = http.get<
  never,
  never,
  MonthCanceledOrdersAmountResponse
>('/metrics/month-canceled-orders-amount', () => {
  return HttpResponse.json({
    amount: 5,
    diffFromLastMonth: -5,
  })
})
