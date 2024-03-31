import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'

import { GetOrdersResponse } from '@/api/get-orders'
import {
  aproveOrder,
  cancelOrder,
  deliverOrder,
  dispatchOrder,
} from '@/api/update-order'
import { OrderStatus } from '@/components/OrderStatus'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { formatCurrencyInCents } from '@/utils/CurrencyUtils'
import { formatDistance } from '@/utils/FormatDateUtils'

import { OrderDetails } from './order-details'

interface OrderTableRowProps {
  order: {
    orderId: string
    createdAt: Date
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const queryClient = useQueryClient()

  function updateOrderStatusOnCache(orderId: string, status: OrderStatus) {
    const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['orders'],
    })

    ordersListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return
      }

      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.orderId === orderId) {
            return { ...order, status }
          }

          return order
        }),
      })
    })
  }

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
    useMutation({
      mutationFn: cancelOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'canceled')
      },
    })

  const { mutateAsync: aproveOrderFn, isPending: isAprovingOrder } =
    useMutation({
      mutationFn: aproveOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'processing')
      },
    })
  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'delivering')
      },
    })
  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: deliverOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'delivered')
      },
    })

  // function handleCancelOrder(orderId: string | null) {
  //   try {
  //     if (orderId) cancelOrderFn({ orderId })
  //     toast.success('Pedido cancelado com sucesso')
  //   } catch (error) {
  //     toast.error('Erro ao cancelar pedido')
  //   }
  // }

  return (
    <>
      <TableRow>
        <TableCell>
          <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Search className="h-3 w-3" />
                <span className="sr-only">Detalhes do pedido</span>
              </Button>
            </DialogTrigger>

            <OrderDetails open={isDetailsOpen} orderId={order.orderId} />
          </Dialog>
        </TableCell>
        <TableCell className="font-mono text-xs font-medium">
          {order.orderId}
        </TableCell>
        <TableCell className="text-muted-foreground">
          {formatDistance(order.createdAt)}
        </TableCell>
        <TableCell>
          <OrderStatus status={order.status} />
        </TableCell>
        <TableCell className="font-medium">{order.customerName}</TableCell>
        <TableCell className="font-medium">
          {formatCurrencyInCents(order.total)}
        </TableCell>

        <TableCell>
          {order.status === 'pending' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => aproveOrderFn({ orderId: order.orderId })}
              disabled={isAprovingOrder}
            >
              <ArrowRight className="mr-2 h-3 w-3" />
              Aprovar
            </Button>
          )}
          {order.status === 'processing' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => dispatchOrderFn({ orderId: order.orderId })}
              disabled={isDispatchingOrder}
            >
              <ArrowRight className="mr-2 h-3 w-3" />
              Mandar para entrega
            </Button>
          )}
          {order.status === 'delivering' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => deliverOrderFn({ orderId: order.orderId })}
              disabled={isDeliveringOrder}
            >
              <ArrowRight className="mr-2 h-3 w-3" />
              Finalizar entrega
            </Button>
          )}
        </TableCell>
        <TableCell>
          <Button
            onClick={() => cancelOrderFn({ orderId: order.orderId })}
            variant="ghost"
            size="sm"
            disabled={
              !['pending', 'processing'].includes(order.status) ||
              isCancelingOrder
            }
          >
            <X className="mr-2 h-3 w-3" /> Cancelar
          </Button>
        </TableCell>
      </TableRow>
    </>
  )
}
