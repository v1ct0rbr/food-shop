import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const OrderTableFilterSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z
    .string()
    .optional()
    .transform((value) => (value === 'all' ? '' : value)),
})

type FilterType = z.infer<typeof OrderTableFilterSchema>

export function OrderTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm<FilterType>({
    resolver: zodResolver(OrderTableFilterSchema),
    defaultValues: {
      orderId: orderId ?? '',
      customerName: customerName ?? '',
      status: status ?? 'all',
    },
  })

  function handleSubmitFilter({ orderId, customerName, status }: FilterType) {
    setSearchParams((state) => {
      if (orderId) state.set('orderId', orderId)
      else state.delete('orderId')

      if (customerName) state.set('customerName', customerName)
      else state.delete('customerName')

      if (status) state.set('status', status)
      else state.delete('status')

      state.set('page', '1')
      return state
    })
  }

  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete('orderId')
      state.delete('customerName')
      state.delete('status')
      state.set('page', '1')
      return state
    })
    reset(
      {
        orderId: '',
        customerName: '',
        status: 'all',
      },
      { keepDefaultValues: true },
    )
  }

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={handleSubmit(handleSubmitFilter)}
    >
      <span className="text-sm font-semibold">Filtros</span>
      <Input
        placeholder="Id do pedido"
        className="h-8 w-auto"
        {...register('orderId')}
      />
      <Input
        placeholder="Nome do cliente"
        className="h-8 w-[320px]"
        {...register('customerName')}
      />

      <Controller
        control={control}
        name="status"
        render={({ field: { name, onChange, value, disabled } }) => (
          <Select
            value={value}
            disabled={disabled}
            defaultValue="all"
            name={name}
            onValueChange={onChange}
          >
            <SelectTrigger className="h-8 w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="canceled">Cancelado</SelectItem>
              <SelectItem value="processing">Em preparo</SelectItem>
              <SelectItem value="delivering">Em entrega</SelectItem>
              <SelectItem value="delivered">Entregue</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      <Button
        type="submit"
        variant="secondary"
        size="sm"
        className="flex items-center gap-2"
        disabled={isSubmitting}
      >
        <Search className="h-4 w-4" /> Filtra resultados
      </Button>
      <Button
        onClick={handleClearFilters}
        type="button"
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
      >
        <X className="h-4 w-4" /> Remover filtros
      </Button>
    </form>
  )
}
