import { EmptyState } from '../../../components/ui/EmptyState'
import type { NewsArticle } from '../types/news.types'
import { NewsCard } from './NewsCard'

type NewsGridProps = {
  articles: NewsArticle[]
}

export function NewsGrid({ articles }: NewsGridProps) {
  if (articles.length === 0) {
    return <EmptyState description="Try a different search term or category." title="No articles found" />
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {articles.map((article) => (
        <NewsCard article={article} key={article.id} />
      ))}
    </div>
  )
}
