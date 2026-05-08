import { Gauge, MapPin, Route } from 'lucide-react'
import type { ReactNode } from 'react'
import { formatTime } from '../../../utils/date/formatDate'
import type { ISSPosition, ISSSpeedMeasurement } from '../types/iss.types'

type ISSStatsProps = {
  currentPosition?: ISSPosition
  latestSpeed?: ISSSpeedMeasurement
  trackedCount: number
}

export function ISSStats({ currentPosition, latestSpeed, trackedCount }: ISSStatsProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <Metric icon={<MapPin className="size-4" />} label="Latitude" value={formatCoordinate(currentPosition?.latitude)} />
      <Metric icon={<MapPin className="size-4" />} label="Longitude" value={formatCoordinate(currentPosition?.longitude)} />
      <Metric icon={<Gauge className="size-4" />} label="Speed" value={latestSpeed ? `${Math.round(latestSpeed.speedKmh).toLocaleString()} km/h` : '-- km/h'} />
      <Metric icon={<Route className="size-4" />} label="Tracked positions" value={String(trackedCount)} />
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900 sm:col-span-2 xl:col-span-4">
        <p className="text-sm text-slate-500 dark:text-slate-400">Current nearest location</p>
        <p className="mt-1 text-base font-semibold text-slate-950 dark:text-white">
          {currentPosition?.nearestLocation.label ?? 'Waiting for first position'}
        </p>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Last update: {currentPosition ? formatTime(currentPosition.timestamp) : '--'}
        </p>
      </div>
    </div>
  )
}

function Metric({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        {icon}
        {label}
      </div>
      <p className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">{value}</p>
    </div>
  )
}

function formatCoordinate(value?: number) {
  return typeof value === 'number' ? value.toFixed(4) : '--'
}
