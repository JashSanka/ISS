export const NEWS_CATEGORIES = [
  'general',
  'business',
  'technology',
  'science',
  'health',
  'sports',
  'entertainment',
] as const

export type NewsCategory = (typeof NEWS_CATEGORIES)[number]
