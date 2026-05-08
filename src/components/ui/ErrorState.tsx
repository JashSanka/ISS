import { AlertTriangle } from 'lucide-react'
import { Button } from './Button'
import { Card } from './Card'

type ErrorStateProps = {
  title: string
  message: string
  onRetry?: () => void
}

export function ErrorState({ title, message, onRetry }: ErrorStateProps) {
  return (
    <Card className="flex flex-col gap-4 border-red-200 bg-red-50 text-red-950 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-100">
      <div className="flex gap-3">
        <AlertTriangle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="mt-1 text-sm opacity-80">{message}</p>
        </div>
      </div>
      {onRetry ? (
        <Button className="w-fit" onClick={onRetry} variant="secondary">
          Retry
        </Button>
      ) : null}
    </Card>
  )
}
