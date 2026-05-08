import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../../../constants/queryKeys'
import { toAppError } from '../../../services/http/apiErrors'
import { issApi } from '../api/issApi'

export function usePeopleInSpace() {
  return useQuery({
    queryKey: queryKeys.peopleInSpace,
    queryFn: async () => {
      try {
        return await issApi.getPeopleInSpace()
      } catch (error) {
        throw toAppError(error, 'Unable to fetch people in space.')
      }
    },
    staleTime: 60_000,
  })
}
