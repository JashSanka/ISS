import { Inbox } from 'lucide-react'
import { Card } from './Card'

type EmptyStateProps = {
  title: string
  description: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <Card className="flex min-h-40 flex-col items-center justify-center gap-3 text-center">
      <Inbox className="size-6 text-slate-400" aria-hidden="true" />
      <div>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
      </div>
    </Card>
  )
}
