import type { NearestLocation } from '../../../utils/geo/reverseLocation'

export type ISSPosition = {
  latitude: number
  longitude: number
  timestamp: number
  nearestLocation: NearestLocation
}

export type ISSSpeedMeasurement = {
  timestamp: number
  speedKmh: number
}

export type Astronaut = {
  name: string
  craft: string
}

export type OpenNotifyISSNowResponse = {
  message: 'success' | string
  timestamp: number
  iss_position: {
    latitude: string
    longitude: string
  }
}

export type OpenNotifyAstrosResponse = {
  message: 'success' | string
  number: number
  people: Astronaut[]
}

export type PeopleInSpace = {
  total: number
  people: Astronaut[]
}
