import { http, HttpResponse } from 'msw'

import { MonthOrdersAmountResponse } from '../get-dashboard-metrics'

export const getMonthOrdersAmountMock = http.get<
  never,
  never,
  MonthOrdersAmountResponse
>('/metrics/month-orders-amount', () => {
  return HttpResponse.json({
    amount: 200,
    diffFromLastMonth: 7,
  })
})
