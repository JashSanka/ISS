export type GeoPoint = {
  latitude: number
  longitude: number
  timestamp: number
}

const EARTH_RADIUS_KM = 6371

function toRadians(value: number) {
  return (value * Math.PI) / 180
}

export function calculateDistanceKm(start: GeoPoint, end: GeoPoint) {
  // The Haversine formula measures the great-circle distance between two
  // latitude/longitude points on a sphere. It is appropriate for ISS ground
  // track speed because we need surface distance between consecutive fixes.
  const latitudeDelta = toRadians(end.latitude - start.latitude)
  const longitudeDelta = toRadians(end.longitude - start.longitude)
  const startLatitude = toRadians(start.latitude)
  const endLatitude = toRadians(end.latitude)

  const haversineAngle =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(startLatitude) * Math.cos(endLatitude) * Math.sin(longitudeDelta / 2) ** 2

  return 2 * EARTH_RADIUS_KM * Math.atan2(Math.sqrt(haversineAngle), Math.sqrt(1 - haversineAngle))
}

export function calculateSpeedKmh(start: GeoPoint, end: GeoPoint) {
  // Speed is distance divided by elapsed time. API timestamps are converted
  // from milliseconds to hours so the final unit is kilometers per hour.
  const elapsedHours = (end.timestamp - start.timestamp) / (1000 * 60 * 60)

  if (elapsedHours <= 0) {
    return 0
  }

  return calculateDistanceKm(start, end) / elapsedHours
}
