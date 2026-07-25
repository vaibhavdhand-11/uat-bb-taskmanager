import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { PieChartIcon } from 'lucide-react'
import { CATEGORY_COLOR, formatCurrency } from '@/lib/finance'
import type { Category } from '@/lib/store'

export type CategoryDatum = { category: Category; total: number }

type TooltipEntry = { payload: CategoryDatum }

function ChartTooltip({ active, payload }: { active?: boolean; payload?: TooltipEntry[] }) {
  if (!active || !payload?.length) return null
  const { category, total } = payload[0].payload
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-sm shadow-md">
      <p className="font-medium text-popover-foreground">{category}</p>
      <p className="tabular-nums text-muted-foreground">{formatCurrency(total)}</p>
    </div>
  )
}

export function SpendingChart({ data }: { data: CategoryDatum[] }) {
  if (data.length === 0) {
    return (
      <div className="flex h-full min-h-56 flex-col items-center justify-center gap-2 text-center text-muted-foreground">
        <PieChartIcon className="size-6" />
        <p className="text-sm">Add an expense to see your spending breakdown.</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16, top: 4, bottom: 4 }}>
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="category"
          width={92}
          tickLine={false}
          axisLine={false}
          tick={{ fill: 'var(--muted-foreground)', fontSize: 13 }}
        />
        <Tooltip cursor={{ fill: 'var(--muted)' }} content={<ChartTooltip />} />
        <Bar dataKey="total" radius={[0, 6, 6, 0]} barSize={22}>
          {data.map((d) => (
            <Cell key={d.category} fill={CATEGORY_COLOR[d.category]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
