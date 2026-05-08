import { ExternalLink, ImageOff } from 'lucide-react'
import { formatDateTime } from '../../../utils/date/formatDate'
import type { NewsArticle } from '../types/news.types'

type NewsCardProps = {
  article: NewsArticle
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-950">
      <div className="aspect-[16/9] bg-slate-100 dark:bg-slate-900">
        {article.imageUrl ? (
          <img alt="" className="h-full w-full object-cover" loading="lazy" src={article.imageUrl} />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">
            <ImageOff className="size-8" aria-hidden="true" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="rounded-full bg-orbit-500/10 px-2 py-1 font-medium text-orbit-700 dark:text-orbit-300">
            {article.source}
          </span>
          <span>{formatDateTime(article.publishedAt)}</span>
        </div>
        <h3 className="text-base font-semibold leading-snug text-slate-950 dark:text-white">{article.title}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">By {article.author || 'Unknown author'}</p>
        <p className="line-clamp-3 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
          {article.description || 'No short description is available for this article.'}
        </p>
        <a
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-orbit-600 px-4 text-sm font-medium text-white transition hover:bg-orbit-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orbit-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
          href={article.url}
          rel="noreferrer"
          target="_blank"
        >
          Read More
          <ExternalLink className="size-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  )
}
