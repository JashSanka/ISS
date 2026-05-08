import { API_BASE_URLS } from '../../../constants/api'
import { createHttpClient } from '../../../services/http/axiosClient'
import { deriveNearestLocation } from '../../../utils/geo/reverseLocation'
import type { ISSPosition, OpenNotifyAstrosResponse, OpenNotifyISSNowResponse, PeopleInSpace } from '../types/iss.types'

export const issHttpClient = createHttpClient(API_BASE_URLS.iss)

export const issApi = {
  async getCurrentLocation(): Promise<ISSPosition> {
    const response = await issHttpClient.get<OpenNotifyISSNowResponse>('/iss-now.json')
    const latitude = Number(response.data.iss_position.latitude)
    const longitude = Number(response.data.iss_position.longitude)

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      throw new Error('Open Notify returned invalid ISS coordinates.')
    }

    return {
      latitude,
      longitude,
      nearestLocation: deriveNearestLocation(latitude, longitude),
      timestamp: response.data.timestamp * 1000,
    }
  },
  async getPeopleInSpace(): Promise<PeopleInSpace> {
    const response = await issHttpClient.get<OpenNotifyAstrosResponse>('/astros.json')

    return {
      people: response.data.people,
      total: response.data.number,
    }
  },
}
