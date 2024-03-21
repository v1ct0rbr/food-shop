import { ArrowRight, Search, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { formatCurrency } from '@/utils/CurrencyUtils'
import { formatDistance } from '@/utils/DateUtils'

interface OrderTableRowProps {
  id: string
  createdAt: Date
  status: string
  customer: string
  total: number
}

export function OrderTableRow({
  id,
  createdAt,
  status,
  customer,
  total,
}: OrderTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <Button variant="outline" size="sm">
          <Search className="h-3 w-3" />
          <span className="sr-only">Detalhes do pedido</span>
        </Button>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">{id}</TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistance(createdAt)}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-slate-400"></span>
          <span className="font-medium text-muted-foreground">{status}</span>
        </div>
      </TableCell>
      <TableCell className="font-medium">{customer}</TableCell>
      <TableCell className="font-medium">{formatCurrency(total)}</TableCell>

      <TableCell>
        <Button variant="outline" size="sm">
          <ArrowRight className="mr-2 h-3 w-3" />
          Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="ghost" size="sm">
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
