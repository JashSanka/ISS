import { RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'
import { Button } from '../../../components/ui/Button'

type ISSRefreshButtonProps = {
  isFetching: boolean
  onRefresh: () => Promise<unknown>
}

export function ISSRefreshButton({ isFetching, onRefresh }: ISSRefreshButtonProps) {
  async function handleRefresh() {
    try {
      await onRefresh()
      toast.success('ISS data refreshed')
    } catch {
      toast.error('Unable to refresh ISS data')
    }
  }

  return (
    <Button
      aria-label="Refresh ISS data"
      disabled={isFetching}
      icon={<RefreshCw className={isFetching ? 'size-4 animate-spin' : 'size-4'} />}
      onClick={handleRefresh}
      variant="secondary"
    >
      Refresh
    </Button>
  )
}
