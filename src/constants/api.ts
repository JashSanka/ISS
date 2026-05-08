export const API_BASE_URLS = {
  iss: '/open-notify',
  news: '/newsapi',
  ai: '/hf-router',
} as const

export const AI_MODEL = 'mistralai/Mistral-7B-Instruct-v0.2' as const
export const HF_ROUTER_AI_MODEL = `${AI_MODEL}:featherless-ai` as const
