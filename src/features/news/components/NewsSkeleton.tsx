import { Skeleton } from '../../../components/ui/Skeleton'

export function NewsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }, (_, index) => (
        <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950" key={index}>
          <Skeleton className="aspect-[16/9] w-full" />
          <Skeleton className="mt-4 h-5 w-4/5" />
          <Skeleton className="mt-2 h-4 w-2/3" />
          <Skeleton className="mt-4 h-16 w-full" />
        </div>
      ))}
    </div>
  )
}
