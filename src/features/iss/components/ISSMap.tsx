import L from 'leaflet'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { MapContainer, Marker, Polyline, Popup, TileLayer, Tooltip, useMap } from 'react-leaflet'
import { Crosshair, Maximize2, Minimize2 } from 'lucide-react'
import type { ISSPosition } from '../types/iss.types'
import { formatTime } from '../../../utils/date/formatDate'

type ISSMapProps = {
  currentPosition?: ISSPosition
  positions: ISSPosition[]
}

const defaultCenter: [number, number] = [0, 0]

const issIcon = L.divIcon({
  className: '',
  html: `<div class="iss-marker-wrapper">
    <div class="iss-pulse-ring"></div>
    <div class="iss-pulse-ring iss-pulse-ring--delayed"></div>
    <div class="iss-marker-core">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
      </svg>
    </div>
  </div>`,
  iconAnchor: [24, 24],
  iconSize: [48, 48],
})

const TILE_URL_DARK = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
const TILE_URL_LIGHT = 'https://{s}.basemaps.cartocdn.com/voyager/{z}/{x}/{y}{r}.png'
const TILE_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'

export function ISSMap({ currentPosition, positions }: ISSMapProps) {
  const center = currentPosition ? toLatLng(currentPosition) : defaultCenter
  const path = useMemo(() => positions.map(toLatLng), [positions])
  const [followMode, setFollowMode] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDark = document.documentElement.classList.contains('dark')

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return
    if (!isFullscreen) {
      containerRef.current.requestFullscreen?.()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen?.()
      setIsFullscreen(false)
    }
  }, [isFullscreen])

  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  return (
    <div
      ref={containerRef}
      className={`iss-map-container relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 ${isFullscreen ? 'h-screen' : 'h-[420px]'}`}
    >
      <MapContainer
        center={center}
        className="h-full"
        maxZoom={10}
        minZoom={2}
        scrollWheelZoom
        zoom={3}
        zoomControl={false}
      >
        <TileLayer
          attribution={TILE_ATTRIBUTION}
          url={isDark ? TILE_URL_DARK : TILE_URL_LIGHT}
          subdomains="abcd"
        />
        <MapController center={center} followMode={followMode} />
        {path.length > 1 ? (
          <Polyline
            pathOptions={{
              color: '#0ea5e9',
              weight: 2.5,
              opacity: 0.7,
              dashArray: '8 6',
              lineCap: 'round',
            }}
            positions={path}
          />
        ) : null}
        {currentPosition ? (
          <Marker icon={issIcon} position={center}>
            <Tooltip
              direction="top"
              offset={[0, -28]}
              permanent
              className="iss-tooltip"
            >
              <span className="iss-tooltip-text">🛰️ ISS</span>
            </Tooltip>
            <Popup className="iss-popup">
              <div className="iss-popup-content">
                <div className="iss-popup-header">International Space Station</div>
                <div className="iss-popup-detail">
                  <span className="iss-popup-label">Location</span>
                  <span className="iss-popup-value">{currentPosition.nearestLocation.label}</span>
                </div>
                <div className="iss-popup-detail">
                  <span className="iss-popup-label">Coordinates</span>
                  <span className="iss-popup-value">
                    {currentPosition.latitude.toFixed(4)}°, {currentPosition.longitude.toFixed(4)}°
                  </span>
                </div>
                <div className="iss-popup-detail">
                  <span className="iss-popup-label">Last Update</span>
                  <span className="iss-popup-value">{formatTime(currentPosition.timestamp)}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ) : null}
      </MapContainer>

      {/* Controls overlay */}
      <div className="absolute right-3 top-3 z-[1000] flex flex-col gap-2">
        <button
          onClick={() => setFollowMode(!followMode)}
          className={`map-control-btn ${followMode ? 'map-control-btn--active' : ''}`}
          title={followMode ? 'Stop following ISS' : 'Follow ISS'}
          aria-label={followMode ? 'Stop following ISS' : 'Follow ISS'}
        >
          <Crosshair className="size-4" />
        </button>
        <button
          onClick={toggleFullscreen}
          className="map-control-btn"
          title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen map'}
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen map'}
        >
          {isFullscreen ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
        </button>
      </div>

      {/* Coordinates HUD */}
      {currentPosition ? (
        <div className="absolute bottom-3 left-3 z-[1000] rounded-lg bg-slate-900/80 px-3 py-2 font-mono text-xs text-slate-200 backdrop-blur-sm">
          <span className="text-orbit-500">LAT</span>{' '}
          {currentPosition.latitude.toFixed(4)}°{' '}
          <span className="ml-2 text-orbit-500">LON</span>{' '}
          {currentPosition.longitude.toFixed(4)}°
        </div>
      ) : null}

      {/* Track info badge */}
      {positions.length > 0 ? (
        <div className="absolute bottom-3 right-3 z-[1000] rounded-lg bg-slate-900/80 px-3 py-2 text-xs text-slate-300 backdrop-blur-sm">
          <span className="text-aurora-500">●</span> {positions.length} tracked points
        </div>
      ) : null}
    </div>
  )
}

function MapController({ center, followMode }: { center: [number, number]; followMode: boolean }) {
  const map = useMap()

  useEffect(() => {
    if (followMode) {
      map.flyTo(center, map.getZoom(), { animate: true, duration: 1.5 })
    }
  }, [center, map, followMode])

  // Invalidate size when container resizes (fullscreen toggle)
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      map.invalidateSize()
    })
    const container = map.getContainer()
    observer.observe(container)
    return () => observer.disconnect()
  }, [map])

  return null
}

function toLatLng(position: ISSPosition): [number, number] {
  return [position.latitude, position.longitude]
}
