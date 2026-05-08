import L from 'leaflet'
import { useEffect, useMemo } from 'react'
import { MapContainer, Marker, Polyline, Popup, Tooltip, useMap } from 'react-leaflet'
import type { ISSPosition } from '../types/iss.types'

type ISSMapProps = {
  currentPosition?: ISSPosition
  positions: ISSPosition[]
}

const defaultCenter: [number, number] = [0, 0]

const issIcon = L.divIcon({
  className: '',
  html: '<div class="iss-marker" aria-hidden="true">ISS</div>',
  iconAnchor: [16, 16],
  iconSize: [32, 32],
})

export function ISSMap({ currentPosition, positions }: ISSMapProps) {
  const center = currentPosition ? toLatLng(currentPosition) : defaultCenter
  const path = useMemo(() => positions.map(toLatLng), [positions])

  return (
    <div className="h-[360px] overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800">
      <MapContainer center={center} className="h-full" maxZoom={6} minZoom={2} scrollWheelZoom zoom={3} zoomControl>
        <MapController center={center} />
        {path.length > 1 ? <Polyline pathOptions={{ color: '#38bdf8', weight: 3 }} positions={path} /> : null}
        {currentPosition ? (
          <Marker icon={issIcon} position={center}>
            <Tooltip direction="top" offset={[0, -18]} permanent>
              ISS live position
            </Tooltip>
            <Popup>
              <div className="text-sm">
                <strong>{currentPosition.nearestLocation.label}</strong>
                <br />
                Lat {currentPosition.latitude.toFixed(4)}, Lon {currentPosition.longitude.toFixed(4)}
              </div>
            </Popup>
          </Marker>
        ) : null}
      </MapContainer>
    </div>
  )
}

function MapController({ center }: { center: [number, number] }) {
  const map = useMap()

  useEffect(() => {
    map.setView(center, map.getZoom(), { animate: true })
  }, [center, map])

  return null
}

function toLatLng(position: ISSPosition): [number, number] {
  return [position.latitude, position.longitude]
}
