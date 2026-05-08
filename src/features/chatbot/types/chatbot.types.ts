export type ChatRole = 'user' | 'assistant'

export type ChatMessage = {
  id: string
  role: ChatRole
  content: string
  createdAt: number
}

export type DashboardChatContext = {
  iss: {
    currentPosition: {
      latitude: number
      longitude: number
      nearestLocation: string
      timestamp: number
    } | null
    latestSpeedKmh: number | null
    trackedPositions: number
  }
  peopleInSpace: {
    total: number
    people: Array<{
      name: string
      craft: string
    }>
  } | null
  news: Array<{
    title: string
    source: string
    author: string | null
    publishedAt: string
    description: string | null
    category: string
  }>
}

export type ChatRequest = {
  question: string
  context: DashboardChatContext
}
