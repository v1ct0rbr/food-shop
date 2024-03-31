import { useQuery } from '@tanstack/react-query'

import { getOrderDetails } from '@/api/get-order-details'
import { OrderStatus } from '@/components/OrderStatus'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatCurrencyInCents } from '@/utils/CurrencyUtils'
import { formatDistance } from '@/utils/FormatDateUtils'

interface OrderDetailsProps {
  orderId: string
  open: boolean
}

export function OrderDetails({ orderId, open }: OrderDetailsProps) {
  const { data: orderDetails } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getOrderDetails(orderId),
    enabled: open,
    staleTime: 10000,
  })

  return (
    <div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pedido: {orderDetails?.id}</DialogTitle>
          <DialogDescription>Order Details</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <Table>
            <TableRow>
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell className="flex justify-end">
                {orderDetails?.status && (
                  <OrderStatus status={orderDetails.status} />
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Cliente</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-muted-foreground">
                    {orderDetails?.customer.name}
                  </span>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Telefone</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-muted-foreground">
                    {orderDetails?.customer.phone ?? 'Não informado'}
                  </span>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">E-mail</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-muted-foreground">
                    {orderDetails?.customer.email}
                  </span>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Realizado</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-muted-foreground">
                    {orderDetails?.createdAt &&
                      formatDistance(orderDetails.createdAt)}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          </Table>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead className="text-right">Qtd.</TableHead>
                <TableHead className="text-right">Preço</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderDetails?.orderItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrencyInCents(item.priceInCents)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrencyInCents(item.priceInCents * item.quantity)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>
                  <span className="font-medium text-muted-foreground">
                    Total do pedido
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <span className="font-medium text-muted-foreground">
                    {orderDetails &&
                      orderDetails?.totalInCents &&
                      formatCurrencyInCents(orderDetails.totalInCents)}
                  </span>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </DialogContent>
    </div>
  )
}
