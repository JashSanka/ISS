import { API_BASE_URLS } from '../../../constants/api'
import type { NewsCategory } from '../../../constants/categories'
import { createHttpClient } from '../../../services/http/axiosClient'
import { requireEnvValue } from '../../../utils/env/env'
import type { NewsApiResponse, NewsArticle, NewsQueryParams } from '../types/news.types'

export const newsHttpClient = createHttpClient(API_BASE_URLS.news)

export const newsApi = {
  async getTopHeadlines(params: NewsQueryParams): Promise<NewsArticle[]> {
    const apiKey = requireEnvValue('VITE_NEWS_API_KEY')
    const response = await newsHttpClient.get<NewsApiResponse>('/v2/top-headlines', {
      headers: {
        'X-Api-Key': apiKey,
      },
      params: {
        category: params.category === 'all' ? undefined : params.category,
        country: 'us',
        pageSize: 10,
        q: params.search.trim() || undefined,
      },
    })

    if (response.data.status === 'error') {
      throw new Error(response.data.message)
    }

    return response.data.articles
      .filter((article) => article.title && article.url)
      .slice(0, 10)
      .map((article, index) => normalizeArticle(article, params.category, index))
  },
}

function normalizeArticle(
  article: Extract<NewsApiResponse, { status: 'ok' }>['articles'][number],
  category: NewsCategory | 'all',
  index: number,
): NewsArticle {
  return {
    author: article.author,
    category: category === 'all' ? 'general' : category,
    description: article.description,
    id: `${article.url}-${index}`,
    imageUrl: article.urlToImage,
    publishedAt: article.publishedAt,
    source: article.source.name,
    title: article.title ?? 'Untitled article',
    url: article.url,
  }
}
