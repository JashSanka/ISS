import type { PropsWithChildren } from 'react'
import { Header } from './Header'
import { MobileNav } from './MobileNav'
import { Sidebar } from './Sidebar'

export function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-svh bg-space-50 text-slate-950 dark:bg-[#080b12] dark:text-slate-100">
      <div className="grid min-h-svh lg:grid-cols-[240px_minmax(0,1fr)]">
        <Sidebar />
        <div className="min-w-0 pb-20 lg:pb-0">
          <Header />
          <main className="mx-auto flex w-full max-w-[1500px] flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
      <MobileNav />
    </div>
  )
}
