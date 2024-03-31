import { api } from '@/lib/axios'

interface UpdateOrderProps {
  orderId: string
}

interface UpdateOrderResponse {
  code: string
  message: string
}

export async function aproveOrder({ orderId }: UpdateOrderProps) {
  const response = await api.patch<UpdateOrderResponse>(
    `/orders/${orderId}/approve`,
  )
  return response.data
}

export async function cancelOrder({ orderId }: UpdateOrderProps) {
  const response = await api.patch<UpdateOrderResponse>(
    `/orders/${orderId}/cancel`,
  )
  return response.data
}

export async function deliverOrder({ orderId }: UpdateOrderProps) {
  const response = await api.patch<UpdateOrderResponse>(
    `/orders/${orderId}/deliver`,
  )
  return response.data
}

export async function dispatchOrder({ orderId }: UpdateOrderProps) {
  const response = await api.patch<UpdateOrderResponse>(
    `/orders/${orderId}/dispatch`,
  )
  return response.data
}
