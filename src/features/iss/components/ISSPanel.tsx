import { Radio } from 'lucide-react'
import { useEffect } from 'react'
import { Card } from '../../../components/ui/Card'
import { ErrorState } from '../../../components/ui/ErrorState'
import { usePeopleInSpace } from '../hooks/usePeopleInSpace'
import { useISSLocation } from '../hooks/useISSLocation'
import { useISSStore } from '../store/issStore'
import { ISSMap } from './ISSMap'
import { ISSRefreshButton } from './ISSRefreshButton'
import { ISSStats } from './ISSStats'
import { PeopleInSpaceCard } from './PeopleInSpaceCard'

export function ISSPanel() {
  const { data, error, isError, isFetching, isLoading, refetch } = useISSLocation()
  const { refetch: refetchPeople } = usePeopleInSpace()
  const positions = useISSStore((state) => state.positions)
  const speedHistory = useISSStore((state) => state.speedHistory)
  const trackPosition = useISSStore((state) => state.trackPosition)
  const currentPosition = positions.at(-1)
  const latestSpeed = speedHistory.at(-1)

  useEffect(() => {
    if (data) {
      trackPosition(data)
    }
  }, [data, trackPosition])

  async function handleRefresh() {
    const [locationResult, peopleResult] = await Promise.all([refetch(), refetchPeople()])

    if (locationResult.error || peopleResult.error) {
      throw locationResult.error ?? peopleResult.error
    }
  }

  return (
    <section className="grid gap-4" id="iss">
      <Card className="grid gap-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-orbit-600 dark:text-orbit-500">Live tracking</p>
            <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">International Space Station</h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-aurora-500/10 px-3 py-1 text-sm font-medium text-emerald-700 dark:text-emerald-300">
              <Radio className={isFetching ? 'size-4 animate-pulse' : 'size-4'} aria-hidden="true" />
              {isLoading ? 'Connecting' : isError ? 'Using last known' : 'Live'}
            </span>
            <ISSRefreshButton isFetching={isFetching} onRefresh={handleRefresh} />
          </div>
        </div>
        {isError ? (
          <ErrorState
            message={error instanceof Error ? error.message : 'Open Notify location data is temporarily unavailable.'}
            onRetry={() => void refetch()}
            title="ISS location unavailable"
          />
        ) : null}
        <ISSStats currentPosition={currentPosition} latestSpeed={latestSpeed} trackedCount={positions.length} />
        <ISSMap currentPosition={currentPosition} positions={positions} />
      </Card>
      <PeopleInSpaceCard />
    </section>
  )
}
