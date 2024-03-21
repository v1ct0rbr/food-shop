import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const formatDate = (date: Date): string => {
  return format(date, 'dd/MM/yyyy', { locale: ptBR })
}

export const formatDistance = (date: Date): string => {
  return formatDistanceToNow(date, { locale: ptBR, addSuffix: true })
}
