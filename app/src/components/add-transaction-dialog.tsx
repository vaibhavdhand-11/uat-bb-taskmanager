import { useState } from 'react'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CATEGORIES, useFinanceStore, type Category, type TxKind } from '@/lib/store'

const EXPENSE_CATEGORIES = CATEGORIES.filter((c) => c !== 'Income')

function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

export function AddTransactionDialog() {
  const addTransaction = useFinanceStore((s) => s.addTransaction)
  const [open, setOpen] = useState(false)
  const [kind, setKind] = useState<TxKind>('expense')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState<Category>('Food')
  const [date, setDate] = useState(todayIso)

  function reset() {
    setKind('expense')
    setDescription('')
    setAmount('')
    setCategory('Food')
    setDate(todayIso())
  }

  function handleKindChange(next: TxKind) {
    setKind(next)
    setCategory(next === 'income' ? 'Income' : 'Food')
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const value = Number.parseFloat(amount)
    if (!description.trim()) {
      toast.error('Please add a description.')
      return
    }
    if (!Number.isFinite(value) || value <= 0) {
      toast.error('Enter an amount greater than zero.')
      return
    }
    addTransaction({
      description: description.trim(),
      amount: value,
      kind,
      category: kind === 'income' ? 'Income' : category,
      date,
    })
    toast.success('Transaction added.')
    reset()
    setOpen(false)
  }

  const categoryOptions = kind === 'income' ? (['Income'] as const) : EXPENSE_CATEGORIES

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (!next) reset()
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          Add transaction
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New transaction</DialogTitle>
          <DialogDescription>Record income or an expense.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant={kind === 'expense' ? 'default' : 'outline'}
              onClick={() => handleKindChange('expense')}
            >
              Expense
            </Button>
            <Button
              type="button"
              variant={kind === 'income' ? 'default' : 'outline'}
              onClick={() => handleKindChange('income')}
            >
              Income
            </Button>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Groceries"
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                min="0"
                step="0.01"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
          </div>

          {kind === 'expense' && (
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <DialogFooter>
            <Button type="submit">Save transaction</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
