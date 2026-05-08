import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { EmptyState } from '../../../components/ui/EmptyState'
import { formatTime } from '../../../utils/date/formatDate'
import { useSpeedChartData } from '../hooks/useSpeedChartData'

export function ISSSpeedChart() {
  const speedHistory = useSpeedChartData()
  const chartData = speedHistory.map((item) => ({
    speed: Math.round(item.speedKmh),
    time: formatTime(item.timestamp),
  }))

  if (chartData.length < 2) {
    return <EmptyState description="The chart appears after two or more ISS positions are tracked." title="Collecting speed data" />
  }

  return (
    <ResponsiveContainer height="100%" width="100%">
      <LineChart data={chartData} margin={{ bottom: 8, left: 0, right: 12, top: 8 }}>
        <CartesianGrid stroke="rgba(148, 163, 184, 0.22)" strokeDasharray="4 4" />
        <XAxis dataKey="time" minTickGap={28} stroke="#94a3b8" tick={{ fontSize: 12 }} />
        <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} tickFormatter={(value) => `${Math.round(Number(value) / 1000)}k`} width={42} />
        <Tooltip
          contentStyle={{
            background: '#0f172a',
            border: '1px solid rgba(148, 163, 184, 0.35)',
            borderRadius: 8,
            color: '#f8fafc',
          }}
          formatter={(value) => [`${Number(value).toLocaleString()} km/h`, 'Speed']}
        />
        <Line dataKey="speed" dot={false} isAnimationActive stroke="#38bdf8" strokeWidth={3} type="monotone" />
      </LineChart>
    </ResponsiveContainer>
  )
}
