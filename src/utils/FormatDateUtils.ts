import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const formatDate = (date: Date): string => {
  return format(date, 'dd/MM/yyyy', { locale: ptBR })
}

export const formatStringDate = (date: string): string => {
  return format(new Date(date), 'dd/MM/yyyy', { locale: ptBR })
}

export const formatDistance = (date: Date): string => {
  return formatDistanceToNow(date, { locale: ptBR, addSuffix: true })
}

export const formatDateStringToNow = (date: string): string => {
  return formatDistanceToNow(new Date(date), { locale: ptBR, addSuffix: true })
}

export function formatDateQuery(date: Date) {
  try {
    const dataStr = format(date, 'yyyy-MM-dd')
    return dataStr
  } catch (error) {
    return 'String ISO inválida'
  }
}
