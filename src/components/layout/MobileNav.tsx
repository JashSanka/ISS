import { Bot, ChartNoAxesCombined, Newspaper, Satellite } from 'lucide-react'

const navItems = [
  { label: 'ISS', href: '#iss', icon: Satellite },
  { label: 'Charts', href: '#charts', icon: ChartNoAxesCombined },
  { label: 'News', href: '#news', icon: Newspaper },
  { label: 'Chat', href: '#chat', icon: Bot },
]

export function MobileNav() {
  return (
    <nav
      aria-label="Mobile dashboard sections"
      className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 lg:hidden"
    >
      {navItems.map((item) => {
        const Icon = item.icon

        return (
          <a className="flex min-h-14 flex-col items-center justify-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-300" href={item.href} key={item.label}>
            <Icon className="size-4" aria-hidden="true" />
            {item.label}
          </a>
        )
      })}
    </nav>
  )
}
