import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { EmptyState } from '../../../components/ui/EmptyState'
import type { NewsCategory } from '../../../constants/categories'
import { useNewsStore } from '../../news/store/newsStore'
import { useNewsDistributionData } from '../hooks/useNewsDistributionData'

const colors = ['#0ea5e9', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#14b8a6', '#f97316']

export function NewsDistributionChart() {
  const data = useNewsDistributionData()
  const setCategory = useNewsStore((state) => state.setCategory)
  const handlePieClick = (_entry: unknown, index: number) => {
    const category = data[index]?.category

    if (category) {
      setCategory(category as NewsCategory)
    }
  }

  if (data.length === 0) {
    return <EmptyState description="Fetch news articles to populate category distribution." title="No distribution yet" />
  }

  return (
    <ResponsiveContainer height="100%" width="100%">
      <PieChart>
        <Pie
          cx="50%"
          cy="50%"
          data={data}
          dataKey="value"
          innerRadius={62}
          nameKey="category"
          onClick={handlePieClick}
          outerRadius={104}
          paddingAngle={3}
        >
          {data.map((entry, index) => (
            <Cell cursor="pointer" fill={colors[index % colors.length]} key={entry.category} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: '#0f172a',
            border: '1px solid rgba(148, 163, 184, 0.35)',
            borderRadius: 8,
            color: '#f8fafc',
          }}
          formatter={(value, name) => [`${value} articles`, String(name)]}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
