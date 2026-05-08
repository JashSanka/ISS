import { create } from 'zustand'
import { CACHE_KEYS } from '../../../constants/cache'
import { safeReadStorage, safeWriteStorage } from '../../../utils/storage/localStorage'

export type ThemeMode = 'light' | 'dark'

type ThemeState = {
  theme: ThemeMode
  toggleTheme: () => void
  setTheme: (theme: ThemeMode) => void
}

const initialTheme = safeReadStorage<ThemeMode>(CACHE_KEYS.theme, 'dark')

export const useThemeStore = create<ThemeState>((set) => ({
  theme: initialTheme,
  setTheme: (theme) => {
    safeWriteStorage(CACHE_KEYS.theme, theme)
    set({ theme })
  },
  toggleTheme: () =>
    set((state) => {
      const nextTheme = state.theme === 'dark' ? 'light' : 'dark'
      safeWriteStorage(CACHE_KEYS.theme, nextTheme)
      return { theme: nextTheme }
    }),
}))
