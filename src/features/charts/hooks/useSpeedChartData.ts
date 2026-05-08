import { useISSStore } from '../../iss/store/issStore'

export function useSpeedChartData() {
  return useISSStore((state) => state.speedHistory)
}
