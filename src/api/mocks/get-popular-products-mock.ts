import { http, HttpResponse } from 'msw'

import { productInfo } from '../get-popular-products'

const popularProducts = [
  {
    product: 'product1',
    amount: 100,
  },
  {
    product: 'product2',
    amount: 200,
  },
  {
    product: 'product3',
    amount: 300,
  },
  {
    product: 'product3',
    amount: 400,
  },
] as productInfo[]

export const getPopularProdutsMock = http.get<never, never, productInfo[]>(
  '/metrics/popular-products',
  () => {
    return HttpResponse.json([...popularProducts])
  },
)
