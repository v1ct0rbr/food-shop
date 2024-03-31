import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

export function OrdersTableRowSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="w-[64px]" /> <Skeleton className="w-[140px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-[180px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-[140px]" /> <Skeleton />
      </TableCell>
      <TableCell>
        <Skeleton className="w-[140px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-[164px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-[132px]" />
      </TableCell>
    </TableRow>
  )
}
