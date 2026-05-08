import { useMemo } from 'react'
import { useNewsStore } from '../store/newsStore'
import type { NewsArticle } from '../types/news.types'

export function useNewsFilters(articles: NewsArticle[]) {
  const sort = useNewsStore((state) => state.sort)

  const filteredArticles = useMemo(() => {
    const sorted = [...articles]

    if (sort === 'source') {
      sorted.sort((first, second) => first.source.localeCompare(second.source))
    } else {
      sorted.sort((first, second) => new Date(second.publishedAt).getTime() - new Date(first.publishedAt).getTime())
    }

    return sorted
  }, [articles, sort])

  return {
    filteredArticles,
  }
}
