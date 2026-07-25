import type { Category } from '@/lib/store'

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value)
}

// Map expense categories to the theme's chart tokens for consistent coloring.
export const CATEGORY_COLOR: Record<Category, string> = {
  Income: 'var(--positive)',
  Housing: 'var(--cat-1)',
  Food: 'var(--cat-2)',
  Transport: 'var(--cat-3)',
  Shopping: 'var(--cat-4)',
  Health: 'var(--cat-5)',
  Entertainment: 'var(--cat-6)',
  Other: 'var(--muted-foreground)',
}
