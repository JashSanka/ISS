export const CACHE_KEYS = {
  theme: 'iss-dashboard:theme',
  news: 'iss-dashboard:news-cache',
  chatHistory: 'iss-dashboard:chat-history',
  issPositions: 'iss-dashboard:iss-positions',
  speedHistory: 'iss-dashboard:speed-history',
} as const

export const NEWS_CACHE_TTL_MS = 15 * 60 * 1000
export const ISS_POSITION_LIMIT = 15
export const ISS_SPEED_LIMIT = 30
export const CHAT_MESSAGE_LIMIT = 30
