import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../../../constants/queryKeys'
import { toAppError } from '../../../services/http/apiErrors'
import { issApi } from '../api/issApi'

export function useISSLocation() {
  return useQuery({
    queryKey: queryKeys.issLocation,
    queryFn: async () => {
      try {
        return await issApi.getCurrentLocation()
      } catch (error) {
        throw toAppError(error, 'Unable to fetch the current ISS position.')
      }
    },
    refetchInterval: 15_000,
  })
}
