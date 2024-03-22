import { api } from '@/lib/axios'

type UserType = {
  id: string
  name: string
  email: string
  phone: string | null
  role: 'manager' | 'customer'
  createdAt: Date | null
  updatedAt: Date | null
}

export async function getProfile(): Promise<UserType> {
  const response = await api.get('/me')
  return response.data
}
