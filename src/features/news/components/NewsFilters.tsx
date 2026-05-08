import { Search } from 'lucide-react'
import { NEWS_CATEGORIES } from '../../../constants/categories'
import { Card } from '../../../components/ui/Card'
import { useNewsStore } from '../store/newsStore'

export function NewsFilters() {
  const category = useNewsStore((state) => state.category)
  const search = useNewsStore((state) => state.search)
  const sort = useNewsStore((state) => state.sort)
  const setCategory = useNewsStore((state) => state.setCategory)
  const setSearch = useNewsStore((state) => state.setSearch)
  const setSort = useNewsStore((state) => state.setSort)

  return (
    <Card className="grid gap-3 md:grid-cols-[minmax(0,1fr)_180px_160px]">
      <label className="relative">
        <span className="sr-only">Search articles</span>
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        <input
          className="min-h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none focus:border-orbit-500 focus:ring-2 focus:ring-orbit-500/20 dark:border-slate-700 dark:bg-slate-900"
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search headlines"
          type="search"
          value={search}
        />
      </label>
      <label>
        <span className="sr-only">Filter by category</span>
        <select
          className="min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm capitalize outline-none focus:border-orbit-500 focus:ring-2 focus:ring-orbit-500/20 dark:border-slate-700 dark:bg-slate-900"
          onChange={(event) => setCategory(event.target.value as typeof category)}
          value={category}
        >
          <option value="all">All categories</option>
          {NEWS_CATEGORIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span className="sr-only">Sort articles</span>
        <select
          className="min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-orbit-500 focus:ring-2 focus:ring-orbit-500/20 dark:border-slate-700 dark:bg-slate-900"
          onChange={(event) => setSort(event.target.value as typeof sort)}
          value={sort}
        >
          <option value="date">Sort by date</option>
          <option value="source">Sort by source</option>
        </select>
      </label>
    </Card>
  )
}
