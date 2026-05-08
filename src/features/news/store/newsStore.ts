import { create } from 'zustand'
import type { NewsCategory } from '../../../constants/categories'
import type { NewsArticle } from '../types/news.types'

export type NewsSort = 'date' | 'source'

type NewsState = {
  articles: NewsArticle[]
  search: string
  category: NewsCategory | 'all'
  sort: NewsSort
  setArticles: (articles: NewsArticle[]) => void
  setSearch: (search: string) => void
  setCategory: (category: NewsCategory | 'all') => void
  setSort: (sort: NewsSort) => void
}

export const useNewsStore = create<NewsState>((set) => ({
  articles: [],
  search: '',
  category: 'all',
  sort: 'date',
  setArticles: (articles) => set({ articles }),
  setSearch: (search) => set({ search }),
  setCategory: (category) => set({ category }),
  setSort: (sort) => set({ sort }),
}))
