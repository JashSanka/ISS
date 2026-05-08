import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { ChatbotButton } from '../../features/chatbot/components/ChatbotButton'
import { ChartsOverview } from '../../features/charts/components/ChartsOverview'
import { ISSPanel } from '../../features/iss/components/ISSPanel'
import { NewsPanel } from '../../features/news/components/NewsPanel'

export function DashboardRoutes() {
  return (
    <DashboardLayout>
      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
        <ISSPanel />
        <ChartsOverview />
      </section>
      <NewsPanel />
      <ChatbotButton />
    </DashboardLayout>
  )
}
