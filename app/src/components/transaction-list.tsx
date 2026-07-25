import { format, parseISO } from 'date-fns'
import { ArrowDownLeft, ArrowUpRight, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/lib/finance'
import { useFinanceStore, type Transaction } from '@/lib/store'

function TransactionRow({ tx }: { tx: Transaction }) {
  const deleteTransaction = useFinanceStore((s) => s.deleteTransaction)
  const isIncome = tx.kind === 'income'

  return (
    <li className="group flex items-center gap-4 py-3">
      <span
        className={cn(
          'flex size-9 shrink-0 items-center justify-center rounded-full',
          isIncome ? 'bg-positive-soft text-positive' : 'bg-negative-soft text-negative',
        )}
      >
        {isIncome ? <ArrowUpRight className="size-4" /> : <ArrowDownLeft className="size-4" />}
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-foreground">{tx.description}</p>
        <p className="text-sm text-muted-foreground">{format(parseISO(tx.date), 'MMM d, yyyy')}</p>
      </div>

      {!isIncome && (
        <Badge variant="secondary" className="hidden sm:inline-flex">
          {tx.category}
        </Badge>
      )}

      <span
        className={cn(
          'shrink-0 tabular-nums font-medium',
          isIncome ? 'text-positive' : 'text-foreground',
        )}
      >
        {isIncome ? '+' : '−'}
        {formatCurrency(tx.amount)}
      </span>

      <Button
        variant="ghost"
        size="icon"
        className="shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
        onClick={() => deleteTransaction(tx.id)}
        aria-label={`Delete ${tx.description}`}
      >
        <Trash2 className="size-4" />
      </Button>
    </li>
  )
}

export function TransactionList({ transactions }: { transactions: Transaction[] }) {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
        <p className="font-medium text-foreground">No transactions yet</p>
        <p className="max-w-xs text-sm text-muted-foreground">
          Add your first income or expense to start tracking your balance.
        </p>
      </div>
    )
  }

  return (
    <ul className="divide-y divide-border">
      {transactions.map((tx) => (
        <TransactionRow key={tx.id} tx={tx} />
      ))}
    </ul>
  )
}
