import { http, HttpResponse } from 'msw'

import { DailyReceipt } from '../get-daily-receipt-in-period'

const dailyReceipts: DailyReceipt[] = [
  {
    date: '2021-10-01',
    receipt: 100,
  },
  {
    date: '2021-10-02',
    receipt: 200,
  },
  {
    date: '2021-10-03',
    receipt: 300,
  },
]

interface DailyReceiptsQuery {
  from: string
  to: string
}

export const getDailyReceiptMock = http.get<
  never,
  DailyReceiptsQuery,
  DailyReceipt[]
>('/metrics/daily-receipt-in-period', () => {
  return HttpResponse.json([...dailyReceipts])
})
