import { http, HttpResponse } from 'msw'

import { MonthRevenue } from '../get-dashboard-metrics'

export const getMonthRevenueMock = http.get<never, never, MonthRevenue>(
  '/metrics/month-receipt',
  () => {
    return HttpResponse.json({
      receipt: 2000,
      diffFromLastMonth: 10,
    })
  },
)
