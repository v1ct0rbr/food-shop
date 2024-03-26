import { api } from '@/lib/axios'

type ManagedRestaurantResponse = {
  id: string
  name: string
  createdAt: Date | null
  updatedAt: Date | null
  description: string | null
  managerId: string | null
}

export async function getManagedRestaurant(): Promise<ManagedRestaurantResponse> {
  const response = await api.get('/managed-restaurant')
  return response.data
}
