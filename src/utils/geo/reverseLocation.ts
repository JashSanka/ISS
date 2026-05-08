export type NearestLocation = {
  label: string
  type: 'city' | 'ocean' | 'unknown'
}

type ReferenceCity = {
  name: string
  latitude: number
  longitude: number
}

const referenceCities: ReferenceCity[] = [
  { name: 'New York', latitude: 40.7128, longitude: -74.006 },
  { name: 'Los Angeles', latitude: 34.0522, longitude: -118.2437 },
  { name: 'Mexico City', latitude: 19.4326, longitude: -99.1332 },
  { name: 'Rio de Janeiro', latitude: -22.9068, longitude: -43.1729 },
  { name: 'London', latitude: 51.5072, longitude: -0.1276 },
  { name: 'Paris', latitude: 48.8566, longitude: 2.3522 },
  { name: 'Cairo', latitude: 30.0444, longitude: 31.2357 },
  { name: 'Nairobi', latitude: -1.2921, longitude: 36.8219 },
  { name: 'Cape Town', latitude: -33.9249, longitude: 18.4241 },
  { name: 'Moscow', latitude: 55.7558, longitude: 37.6173 },
  { name: 'Dubai', latitude: 25.2048, longitude: 55.2708 },
  { name: 'Mumbai', latitude: 19.076, longitude: 72.8777 },
  { name: 'Singapore', latitude: 1.3521, longitude: 103.8198 },
  { name: 'Tokyo', latitude: 35.6762, longitude: 139.6503 },
  { name: 'Sydney', latitude: -33.8688, longitude: 151.2093 },
]

export function getFallbackNearestLocation(): NearestLocation {
  return {
    label: 'Resolving location',
    type: 'unknown',
  }
}

function approximateDistanceDegrees(latitudeA: number, longitudeA: number, latitudeB: number, longitudeB: number) {
  const latitudeDelta = latitudeA - latitudeB
  const longitudeDelta = longitudeA - longitudeB

  return Math.sqrt(latitudeDelta ** 2 + longitudeDelta ** 2)
}

function getOceanLabel(latitude: number, longitude: number) {
  if (latitude < -60) {
    return 'Southern Ocean'
  }

  if (latitude > 66) {
    return 'Arctic Ocean'
  }

  if (longitude >= -70 && longitude <= 20) {
    return 'Atlantic Ocean'
  }

  if (longitude > 20 && longitude < 120) {
    return 'Indian Ocean'
  }

  return 'Pacific Ocean'
}

export function deriveNearestLocation(latitude: number, longitude: number): NearestLocation {
  const nearestCity = referenceCities
    .map((city) => ({
      city,
      distance: approximateDistanceDegrees(latitude, longitude, city.latitude, city.longitude),
    }))
    .sort((a, b) => a.distance - b.distance)[0]

  if (nearestCity && nearestCity.distance <= 8) {
    return {
      label: `Near ${nearestCity.city.name}`,
      type: 'city',
    }
  }

  return {
    label: `Over the ${getOceanLabel(latitude, longitude)}`,
    type: 'ocean',
  }
}
