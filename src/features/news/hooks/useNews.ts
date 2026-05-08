import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { CACHE_KEYS, NEWS_CACHE_TTL_MS } from '../../../constants/cache'
import { queryKeys } from '../../../constants/queryKeys'
import { toAppError } from '../../../services/http/apiErrors'
import { isCacheFresh, type CachedValue } from '../../../utils/storage/cache'
import { safeReadStorage, safeRemoveStorage, safeWriteStorage } from '../../../utils/storage/localStorage'
import { newsApi } from '../api/newsApi'
import { useNewsStore } from '../store/newsStore'
import type { NewsArticle } from '../types/news.types'

type NewsCacheData = {
  articles: NewsArticle[]
  category: string
  search: string
}

export function useNews() {
  const search = useNewsStore((state) => state.search)
  const category = useNewsStore((state) => state.category)
  const setArticles = useNewsStore((state) => state.setArticles)
  const cachedNews = safeReadStorage<CachedValue<NewsCacheData> | null>(CACHE_KEYS.news, null)
  const cacheMatchesRequest = cachedNews?.data.category === category && cachedNews.data.search === search
  const hasFreshCache = cachedNews && cacheMatchesRequest ? isCacheFresh(cachedNews.timestamp, NEWS_CACHE_TTL_MS) : false
  const cachedArticles = hasFreshCache && cachedNews ? cachedNews.data.articles : undefined

  const query = useQuery({
    initialData: cachedArticles,
    queryKey: [...queryKeys.news, category, search],
    queryFn: async () => {
      try {
        const articles = await newsApi.getTopHeadlines({ category, search })
        safeWriteStorage<CachedValue<NewsCacheData>>(CACHE_KEYS.news, {
          data: {
            articles,
            category,
            search,
          },
          timestamp: Date.now(),
        })
        return articles
      } catch (error) {
        throw toAppError(error, 'Unable to fetch latest news.')
      }
    },
  })

  useEffect(() => {
    if (cachedNews && !hasFreshCache && !cacheMatchesRequest) {
      safeRemoveStorage(CACHE_KEYS.news)
    }
  }, [cacheMatchesRequest, cachedNews, hasFreshCache])

  useEffect(() => {
    setArticles(query.data ?? [])
  }, [query.data, setArticles])

  return {
    ...query,
    articles: query.data ?? [],
  }
}
