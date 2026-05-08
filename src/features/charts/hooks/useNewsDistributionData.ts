import { useMemo } from 'react'
import { useNewsStore } from '../../news/store/newsStore'

export function useNewsDistributionData() {
  const articles = useNewsStore((state) => state.articles)

  return useMemo(() => {
    const counts = articles.reduce<Record<string, number>>((accumulator, article) => {
      accumulator[article.category] = (accumulator[article.category] ?? 0) + 1
      return accumulator
    }, {})

    return Object.entries(counts).map(([category, value]) => ({
      category,
      value,
    }))
  }, [articles])
}
