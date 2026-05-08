import type { ReactNode } from 'react'
import { Card } from '../../../components/ui/Card'

type ChartCardProps = {
  children: ReactNode
  eyebrow: string
  icon: ReactNode
  title: string
}

export function ChartCard({ children, eyebrow, icon, title }: ChartCardProps) {
  return (
    <Card>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-orbit-600 dark:text-orbit-500">{eyebrow}</p>
          <h2 className="text-xl font-semibold text-slate-950 dark:text-white">{title}</h2>
        </div>
        <div className="text-slate-400">{icon}</div>
      </div>
      <div className="mt-4 h-72 min-h-72">{children}</div>
    </Card>
  )
}
