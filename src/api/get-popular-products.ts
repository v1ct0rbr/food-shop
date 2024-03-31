import { api } from '@/lib/axios'

type productInfo = {
  product: string
  amount: number
}

type GetPopularProductsResponse = [productInfo]

export async function GetPopularProducts() {
  const response = await api.get<GetPopularProductsResponse>(
    '/metrics/popular-products',
  )
  return response.data
}
