import { DateRange } from 'react-day-picker'

import { api } from '@/lib/axios'
import { subtractDays } from '@/utils/DateUtils'
import { formatDateQuery } from '@/utils/FormatDateUtils'

export type DailyReceipt = {
  date: string
  receipt: number
}

type GetDailyReceiptInPeriod = [DailyReceipt]

export async function GetDailyReceiptInPeriod(
  dateRange: DateRange | undefined,
) {
  const dateFrom = dateRange?.from
    ? formatDateQuery(dateRange?.from)
    : formatDateQuery(subtractDays(new Date(), 10))
  const dateTo = dateRange?.to
    ? formatDateQuery(dateRange.to)
    : formatDateQuery(new Date())

  const response = await api.get<GetDailyReceiptInPeriod>(
    `/metrics/daily-receipt-in-period?from=${dateFrom}&to=${dateTo}`,
  )
  return response.data
}
