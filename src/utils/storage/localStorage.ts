export function safeReadStorage<T>(key: string, fallback: T): T {
  try {
    const rawValue = window.localStorage.getItem(key)

    if (!rawValue) {
      return fallback
    }

    return JSON.parse(rawValue) as T
  } catch {
    return fallback
  }
}

export function safeWriteStorage<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage may be unavailable in private mode or restricted environments.
  }
}

export function safeRemoveStorage(key: string): void {
  try {
    window.localStorage.removeItem(key)
  } catch {
    // Storage may be unavailable in private mode or restricted environments.
  }
}
