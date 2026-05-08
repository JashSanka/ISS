import { Users } from 'lucide-react'
import { ErrorState } from '../../../components/ui/ErrorState'
import { Skeleton } from '../../../components/ui/Skeleton'
import { usePeopleInSpace } from '../hooks/usePeopleInSpace'

export function PeopleInSpaceCard() {
  const { data, error, isError, isLoading, refetch } = usePeopleInSpace()

  if (isError) {
    return (
      <ErrorState
        message={error instanceof Error ? error.message : 'Unable to load astronaut data.'}
        onRetry={() => void refetch()}
        title="People in space unavailable"
      />
    )
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-orbit-600 dark:text-orbit-500">People in Space Right Now</p>
          <h3 className="mt-1 text-2xl font-semibold text-slate-950 dark:text-white">
            {isLoading ? <Skeleton className="h-8 w-16" /> : `${data?.total ?? 0} astronauts`}
          </h3>
        </div>
        <Users className="size-5 text-slate-400" aria-hidden="true" />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {isLoading
          ? Array.from({ length: 4 }, (_, index) => <Skeleton className="h-8 w-24 rounded-full" key={index} />)
          : data?.people.map((person) => (
              <span
                className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-700 dark:border-slate-700 dark:text-slate-200"
                key={`${person.name}-${person.craft}`}
              >
                {person.name} - {person.craft}
              </span>
            ))}
      </div>
    </div>
  )
}
