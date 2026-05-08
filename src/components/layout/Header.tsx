import { useIsFetching, useQueryClient } from '@tanstack/react-query'
import { Moon, RefreshCw, Sun } from 'lucide-react'
import toast from 'react-hot-toast'
import { queryKeys } from '../../constants/queryKeys'
import { useTheme } from '../../features/theme/hooks/useTheme'
import { Button } from '../ui/Button'
import { cn } from '../ui/cn'

export function Header() {
  const { isDark, toggleTheme } = useTheme()
  const queryClient = useQueryClient()
  const activeFetches = useIsFetching()

  async function handleRefresh() {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: queryKeys.issLocation }),
      queryClient.invalidateQueries({ queryKey: queryKeys.peopleInSpace }),
      queryClient.invalidateQueries({ queryKey: queryKeys.news }),
    ])

    toast.success('Dashboard refreshed')
  }

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/85 backdrop-blur dark:border-slate-800 dark:bg-slate-950/85">
      <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-orbit-600 dark:text-orbit-500">Mission Control</p>
          <h1 className="text-lg font-semibold text-slate-950 dark:text-white sm:text-xl">ISS Intelligence Dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            aria-label="Refresh dashboard data"
            className="hidden sm:inline-flex"
            disabled={activeFetches > 0}
            icon={<RefreshCw className={cn('size-4', activeFetches > 0 && 'animate-spin')} />}
            onClick={() => void handleRefresh()}
            variant="secondary"
          >
            Refresh
          </Button>
          <Button
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className={cn(
              'size-10 border px-0 shadow-sm',
              isDark
                ? 'border-amber-400/30 bg-amber-400/10 text-amber-300 hover:bg-amber-400/20'
                : 'border-slate-300 bg-slate-950 text-white hover:bg-slate-800',
            )}
            icon={isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            onClick={toggleTheme}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            variant="ghost"
          />
        </div>
      </div>
    </header>
  )
}
