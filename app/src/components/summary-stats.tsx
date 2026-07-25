import { TrendingDown, TrendingUp, Wallet } from 'lucide-react'
import { formatCurrency } from '@/lib/finance'

type SummaryStatsProps = {
  balance: number
  income: number
  expenses: number
}

export function SummaryStats({ balance, income, expenses }: SummaryStatsProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-3">
      <div className="rounded-xl bg-primary p-6 text-primary-foreground">
        <div className="flex items-center gap-2 text-sm opacity-80">
          <Wallet className="size-4" />
          Net balance
        </div>
        <p className="mt-3 font-heading text-4xl font-semibold tracking-tight tabular-nums">
          {formatCurrency(balance)}
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <TrendingUp className="size-4 text-positive" />
          Income
        </div>
        <p className="mt-3 font-heading text-3xl font-semibold tracking-tight tabular-nums text-positive">
          {formatCurrency(income)}
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <TrendingDown className="size-4 text-negative" />
          Expenses
        </div>
        <p className="mt-3 font-heading text-3xl font-semibold tracking-tight tabular-nums text-negative">
          {formatCurrency(expenses)}
        </p>
      </div>
    </section>
  )
}
