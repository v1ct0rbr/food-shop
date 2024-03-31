import { api } from '@/lib/axios'

interface DayOrdersAmountResponse {
  amount: number
  diffFromYesterday: number
}

interface MonthOrdersAmountResponse {
  amount: number
  diffFromLastMonth: number
}

interface MonthCanceledOrdersAmountResponse {
  amount: number
  diffFromLastMonth: number
}

interface MonthRevenue {
  receipt: number
  diffFromLastMonth: number
}

export async function getDayOrdersAmount() {
  const response = await api.get<DayOrdersAmountResponse>(
    '/metrics/day-orders-amount',
  )
  return response.data
}

export async function getMonthOrdersAmount() {
  const response = await api.get<MonthOrdersAmountResponse>(
    '/metrics/month-orders-amount',
  )
  return response.data
}

export async function getMonthCanceledOrdersAmount() {
  const response = await api.get<MonthCanceledOrdersAmountResponse>(
    '/metrics/month-canceled-orders-amount',
  )
  return response.data
}

export async function getMonthRevenue() {
  const response = await api.get<MonthRevenue>('/metrics/month-receipt')
  return response.data
}
