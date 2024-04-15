import { http, HttpResponse } from 'msw'

import { DayOrdersAmountResponse } from '../get-dashboard-metrics'

export const getDatyOrdersAmountMock = http.get<
  never,
  never,
  DayOrdersAmountResponse
>('/metrics/day-orders-amount', () => {
  return HttpResponse.json({
    amount: 100,
    diffFromYesterday: -5,
  })
})
