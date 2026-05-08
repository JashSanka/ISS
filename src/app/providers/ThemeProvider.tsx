import type { PropsWithChildren } from 'react'
import { useEffect } from 'react'
import { useThemeStore } from '../../features/theme/store/themeStore'

export function ThemeProvider({ children }: PropsWithChildren) {
  const theme = useThemeStore((state) => state.theme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return children
}
