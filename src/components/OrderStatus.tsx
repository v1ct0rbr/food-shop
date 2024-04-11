export enum OrderStatusEnum {
  pending,
  canceled,
  processing,
  delivering,
  delivered,
}

export type OrderStatus = keyof typeof OrderStatusEnum

export function OrderStatus({ status }: { status: OrderStatus }) {
  const statusColor: Record<OrderStatus, { name: string; color: string }> = {
    pending: { name: 'Pendente', color: 'bg-yellow-400' },
    canceled: { name: 'Cancelado', color: 'bg-rose-500' },
    processing: { name: 'Em preparo', color: 'bg-amber-500' },
    delivering: { name: 'Entregando', color: 'bg-amber-500' },
    delivered: { name: 'Entregue', color: 'bg-emerald-500' },
  }

  return (
    <div className="flex items-center gap-2">
      <span
        data-testid="badge"
        className={`h-2 w-2 rounded-full ${statusColor[status].color}`}
      ></span>
      <span className="font-medium text-muted-foreground">
        {statusColor[status].name}
      </span>
    </div>
  )
}
