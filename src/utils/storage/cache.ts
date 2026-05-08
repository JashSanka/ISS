export type CachedValue<T> = {
  data: T
  timestamp: number
}

export function isCacheFresh(timestamp: number, ttlMs: number, now = Date.now()) {
  return now - timestamp < ttlMs
}
