import type { NewsCategory } from '../../../constants/categories'

export type NewsArticle = {
  id: string
  title: string
  source: string
  author: string | null
  publishedAt: string
  imageUrl: string | null
  description: string | null
  url: string
  category: NewsCategory
}

export type NewsApiArticle = {
  source: {
    id: string | null
    name: string
  }
  author: string | null
  title: string | null
  description: string | null
  url: string
  urlToImage: string | null
  publishedAt: string
  content?: string | null
}

export type NewsApiResponse =
  | {
      status: 'ok'
      totalResults: number
      articles: NewsApiArticle[]
    }
  | {
      status: 'error'
      code: string
      message: string
    }

export type NewsQueryParams = {
  category: NewsCategory | 'all'
  search: string
}
