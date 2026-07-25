import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const CATEGORIES = [
  'Income',
  'Housing',
  'Food',
  'Transport',
  'Shopping',
  'Health',
  'Entertainment',
  'Other',
] as const

export type Category = (typeof CATEGORIES)[number]
export type TxKind = 'income' | 'expense'

export interface Transaction {
  id: string
  description: string
  amount: number
  kind: TxKind
  category: Category
  date: string // ISO yyyy-mm-dd
}

const SEED: Transaction[] = [
  { id: 't1', description: 'Monthly salary', amount: 4200, kind: 'income', category: 'Income', date: isoDaysAgo(20) },
  { id: 't2', description: 'Rent', amount: 1450, kind: 'expense', category: 'Housing', date: isoDaysAgo(18) },
  { id: 't3', description: 'Groceries', amount: 186.4, kind: 'expense', category: 'Food', date: isoDaysAgo(14) },
  { id: 't4', description: 'Train pass', amount: 79, kind: 'expense', category: 'Transport', date: isoDaysAgo(12) },
  { id: 't5', description: 'Freelance project', amount: 850, kind: 'income', category: 'Income', date: isoDaysAgo(10) },
  { id: 't6', description: 'New headphones', amount: 129.99, kind: 'expense', category: 'Shopping', date: isoDaysAgo(8) },
  { id: 't7', description: 'Pharmacy', amount: 43.2, kind: 'expense', category: 'Health', date: isoDaysAgo(6) },
  { id: 't8', description: 'Cinema night', amount: 32, kind: 'expense', category: 'Entertainment', date: isoDaysAgo(4) },
  { id: 't9', description: 'Dinner out', amount: 68.5, kind: 'expense', category: 'Food', date: isoDaysAgo(2) },
  { id: 't10', description: 'Coffee & snacks', amount: 21.75, kind: 'expense', category: 'Food', date: isoDaysAgo(1) },
]

function isoDaysAgo(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d.toISOString().slice(0, 10)
}

interface FinanceState {
  transactions: Transaction[]
  addTransaction: (tx: Omit<Transaction, 'id'>) => void
  deleteTransaction: (id: string) => void
}

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set) => ({
      transactions: SEED,
      addTransaction: (tx) =>
        set((state) => ({
          transactions: [{ ...tx, id: crypto.randomUUID() }, ...state.transactions],
        })),
      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),
    }),
    { name: 'finance-tracker' },
  ),
)
