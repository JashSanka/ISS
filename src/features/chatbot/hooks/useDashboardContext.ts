import { useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../../../constants/queryKeys'
import { useISSStore } from '../../iss/store/issStore'
import type { PeopleInSpace } from '../../iss/types/iss.types'
import { useNewsStore } from '../../news/store/newsStore'
import type { DashboardChatContext } from '../types/chatbot.types'

export function useDashboardContext(): DashboardChatContext {
  const queryClient = useQueryClient()
  const positions = useISSStore((state) => state.positions)
  const speedHistory = useISSStore((state) => state.speedHistory)
  const articles = useNewsStore((state) => state.articles)
  const peopleInSpace = queryClient.getQueryData<PeopleInSpace>(queryKeys.peopleInSpace)
  const currentPosition = positions.at(-1)
  const latestSpeed = speedHistory.at(-1)

  return {
    iss: {
      currentPosition: currentPosition
        ? {
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
            nearestLocation: currentPosition.nearestLocation.label,
            timestamp: currentPosition.timestamp,
          }
        : null,
      latestSpeedKmh: latestSpeed?.speedKmh ?? null,
      trackedPositions: positions.length,
    },
    news: articles.slice(0, 10).map((article) => ({
      author: article.author,
      category: article.category,
      description: article.description,
      publishedAt: article.publishedAt,
      source: article.source,
      title: article.title,
    })),
    peopleInSpace: peopleInSpace
      ? {
          people: peopleInSpace.people,
          total: peopleInSpace.total,
        }
      : null,
  }
}
