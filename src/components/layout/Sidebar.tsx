import { Bot, ChartNoAxesCombined, Newspaper, Satellite } from 'lucide-react'
import { cn } from '../ui/cn'

const navItems = [
  { label: 'ISS', icon: Satellite },
  { label: 'Charts', icon: ChartNoAxesCombined },
  { label: 'News', icon: Newspaper },
  { label: 'Chat', icon: Bot },
]

export function Sidebar() {
  return (
    <aside className="hidden border-r border-slate-200 bg-white px-3 py-5 dark:border-slate-800 dark:bg-slate-950 lg:block">
      <nav aria-label="Dashboard sections" className="flex flex-col gap-1">
        {navItems.map((item, index) => {
          const Icon = item.icon

          return (
            <a
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white',
                index === 0 && 'bg-slate-100 text-slate-950 dark:bg-slate-900 dark:text-white',
              )}
              href={`#${item.label.toLowerCase()}`}
              key={item.label}
            >
              <Icon className="size-4" aria-hidden="true" />
              {item.label}
            </a>
          )
        })}
      </nav>
    </aside>
  )
}
