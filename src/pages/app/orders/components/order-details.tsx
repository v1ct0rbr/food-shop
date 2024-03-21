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
import { formatCurrency } from '@/utils/CurrencyUtils'
import { formatDistance } from '@/utils/DateUtils'

export function OrderDetails() {
  return (
    <div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pedido: 1231sadfas</DialogTitle>
          <DialogDescription>Order Details</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <Table>
            <TableRow>
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  <span className="font-medium text-muted-foreground">
                    Pendente
                  </span>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Cliente</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-muted-foreground">
                    Victor Queiroga
                  </span>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Telefone</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-muted-foreground">
                    (83) 99999-9999
                  </span>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">E-mail</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-muted-foreground">
                    contato@victorqueiroga.com
                  </span>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Realizado</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-muted-foreground">
                    {formatDistance(new Date())}
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
              <TableRow>
                <TableCell>Produto 1</TableCell>
                <TableCell className="text-right">1</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(99.99)}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(99.99)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Produto 2</TableCell>
                <TableCell className="text-right">1</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(105.59)}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(111.99)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Produto 3</TableCell>
                <TableCell className="text-right">1</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(56.95)}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(99.99)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Produto 4</TableCell>
                <TableCell className="text-right">1</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(99.99)}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(99.99)}
                </TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3} className="text-right">
                  <span className="font-medium text-muted-foreground">
                    Total do pedido
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <span className="font-medium text-muted-foreground">
                    {formatCurrency(411.96)}
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
