import { Activity, ChartPie } from 'lucide-react'
import { ChartCard } from './ChartCard'
import { ISSSpeedChart } from './ISSSpeedChart'
import { NewsDistributionChart } from './NewsDistributionChart'

export function ChartsOverview() {
  return (
    <section className="grid gap-4" id="charts">
      <ChartCard eyebrow="Telemetry" icon={<Activity className="size-5" aria-hidden="true" />} title="ISS Speed Chart">
        <ISSSpeedChart />
      </ChartCard>
      <ChartCard eyebrow="News mix" icon={<ChartPie className="size-5" aria-hidden="true" />} title="Distribution">
        <NewsDistributionChart />
      </ChartCard>
    </section>
  )
}
