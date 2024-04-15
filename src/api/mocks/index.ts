import { setupWorker } from 'msw/browser'

import { env } from '@/env'

import { getDailyReceiptMock } from './get-daily-revenue-in-period-mock'
import { getDatyOrdersAmountMock } from './get-day-orders-amount-mock'
import { getMonthCancelledOrdersAmountMock } from './get-month-cancelled-orders-amount-mock'
import { getMonthOrdersAmountMock } from './get-month-orders-amount-mock'
import { getMonthRevenueMock } from './get-month-revenue-mock'
import { getPopularProdutsMock } from './get-popular-products-mock'
import { registerRestaurantMock } from './register-restaurant-mock'
import { signInMock } from './sign-in-mock'

export const worker = setupWorker(
  signInMock,
  registerRestaurantMock,
  getDatyOrdersAmountMock,
  getMonthOrdersAmountMock,
  getMonthCancelledOrdersAmountMock,
  getMonthRevenueMock,
  getDailyReceiptMock,
  getPopularProdutsMock,
)

export async function enableMSW() {
  if (env.MODE !== 'test') {
    return
  }
  await worker.start()
}
