import { RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'
import { Button } from '../../../components/ui/Button'
import { ErrorState } from '../../../components/ui/ErrorState'
import { useNews } from '../hooks/useNews'
import { useNewsFilters } from '../hooks/useNewsFilters'
import { NewsFilters } from './NewsFilters'
import { NewsGrid } from './NewsGrid'
import { NewsSkeleton } from './NewsSkeleton'

export function NewsPanel() {
  const { articles, error, isError, isFetching, isLoading, refetch } = useNews()
  const { filteredArticles } = useNewsFilters(articles)

  async function handleRefresh() {
    const result = await refetch()

    if (result.error) {
      toast.error('Unable to refresh news')
      return
    }

    toast.success('News refreshed')
  }

  return (
    <section className="grid gap-4" id="news">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-orbit-600 dark:text-orbit-500">Latest headlines</p>
          <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">News Dashboard</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Showing up to 10 live articles from NewsAPI.</p>
        </div>
        <Button
          disabled={isFetching}
          icon={<RefreshCw className={isFetching ? 'size-4 animate-spin' : 'size-4'} />}
          onClick={handleRefresh}
          variant="secondary"
        >
          Refresh
        </Button>
      </div>
      <NewsFilters />
      {isError ? (
        <ErrorState message={getErrorMessage(error)} onRetry={() => void refetch()} title="News unavailable" />
      ) : null}
      {isLoading ? <NewsSkeleton /> : <NewsGrid articles={filteredArticles} />}
    </section>
  )
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message
  }

  if (typeof error === 'object' && error && 'message' in error && typeof error.message === 'string') {
    return error.message
  }

  return 'Unable to load latest articles from NewsAPI.'
}
