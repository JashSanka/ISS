import { create } from 'zustand'
import { CACHE_KEYS, ISS_POSITION_LIMIT, ISS_SPEED_LIMIT } from '../../../constants/cache'
import { calculateSpeedKmh } from '../../../utils/geo/haversine'
import { safeReadStorage, safeWriteStorage } from '../../../utils/storage/localStorage'
import type { ISSPosition, ISSSpeedMeasurement } from '../types/iss.types'

type ISSState = {
  positions: ISSPosition[]
  speedHistory: ISSSpeedMeasurement[]
  setPositions: (positions: ISSPosition[]) => void
  trackPosition: (position: ISSPosition) => void
  addSpeedMeasurement: (measurement: ISSSpeedMeasurement) => void
}

const initialPositions = safeReadStorage<ISSPosition[]>(CACHE_KEYS.issPositions, [])
const initialSpeedHistory = safeReadStorage<ISSSpeedMeasurement[]>(CACHE_KEYS.speedHistory, [])

export const useISSStore = create<ISSState>((set) => ({
  positions: initialPositions.slice(-ISS_POSITION_LIMIT),
  speedHistory: initialSpeedHistory.slice(-ISS_SPEED_LIMIT),
  setPositions: (positions) => {
    const nextPositions = positions.slice(-ISS_POSITION_LIMIT)
    safeWriteStorage(CACHE_KEYS.issPositions, nextPositions)
    set({ positions: nextPositions })
  },
  trackPosition: (position) =>
    set((state) => ({
      ...createTrackedState(state.positions, state.speedHistory, position),
    })),
  addSpeedMeasurement: (measurement) =>
    set((state) => {
      const speedHistory = [...state.speedHistory, measurement].slice(-ISS_SPEED_LIMIT)
      safeWriteStorage(CACHE_KEYS.speedHistory, speedHistory)

      return {
        speedHistory,
      }
    }),
}))

function createTrackedState(
  currentPositions: ISSPosition[],
  currentSpeedHistory: ISSSpeedMeasurement[],
  position: ISSPosition,
) {
  const lastPosition = currentPositions.at(-1)

  if (lastPosition?.timestamp === position.timestamp) {
    return {
      positions: currentPositions,
      speedHistory: currentSpeedHistory,
    }
  }

  const positions = [...currentPositions, position].slice(-ISS_POSITION_LIMIT)
  const speedHistory =
    lastPosition && position.timestamp > lastPosition.timestamp
      ? [
          ...currentSpeedHistory,
          {
            speedKmh: calculateSpeedKmh(lastPosition, position),
            timestamp: position.timestamp,
          },
        ].slice(-ISS_SPEED_LIMIT)
      : currentSpeedHistory

  safeWriteStorage(CACHE_KEYS.issPositions, positions)
  safeWriteStorage(CACHE_KEYS.speedHistory, speedHistory)

  return {
    positions,
    speedHistory,
  }
}
