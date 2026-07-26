import { Wallet } from 'lucide-react'
import { AppHeader } from '@/components/app-header'
import { AddTransactionDialog } from '@/components/add-transaction-dialog'
import { SummaryStats } from '@/components/summary-stats'
import { SpendingChart, type CategoryDatum } from '@/components/spending-chart'
import { TransactionList } from '@/components/transaction-list'
import { useFinanceStore, type Category } from '@/lib/store'

export default function Dashboard() {
  const transactions = useFinanceStore((s) => s.transactions)

  const income = transactions
    .filter((t) => t.kind === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
  const expenses = transactions
    .filter((t) => t.kind === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)
  const balance = income - expenses

  const byCategory = new Map<Category, number>()
  for (const t of transactions) {
    if (t.kind !== 'expense') continue
    byCategory.set(t.category, (byCategory.get(t.category) ?? 0) + t.amount)
  }
  const categoryData: CategoryDatum[] = Array.from(byCategory, ([category, total]) => ({
    category,
    total,
  })).sort((a, b) => b.total - a.total)

  return (
    <main className="min-h-screen bg-background">
      <AppHeader />
      <div className="mx-auto max-w-5xl px-6 py-10">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-forest text-forest-foreground">
              <Wallet className="size-5" />
            </span>
            <div>
              <h1
                className="font-heading text-2xl font-semibold tracking-tight text-foreground"
                style={{
                  textAlign: "left",
                  color: "#F56D6D",
                  lineHeight: "32px",
                  fontWeight: "900"
                }}>
                tracker 2
                            </h1>
              <p className="text-sm text-muted-foreground">
                Your income, spending and balance at a glance.
              </p>
            </div>
          </div>
          <AddTransactionDialog />
        </header>

        <div className="mt-8 space-y-8">
          <SummaryStats balance={balance} income={income} expenses={expenses} />

          <div className="grid gap-8 lg:grid-cols-5">
            <section className="lg:col-span-2">
              <h2 className="mb-4 text-sm font-medium text-muted-foreground">Spending by category</h2>
              <div className="rounded-xl border border-border bg-card p-5">
                <SpendingChart data={categoryData} />
              </div>
            </section>

            <section className="lg:col-span-3">
              <h2 className="mb-4 text-sm font-medium text-muted-foreground">
                Recent transactions
              </h2>
              <div className="rounded-xl border border-border bg-card px-5">
                <TransactionList transactions={transactions} />
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
