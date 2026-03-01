import type { Circuit, SavedCircuit } from '../types/circuit'

const KEYS = {
  CURRENT_CIRCUIT: 'lgcb:current-circuit',
  SAVED_CIRCUITS: 'lgcb:saved-circuits',
} as const

export interface PersistedState {
  currentCircuit?: Circuit
  savedCircuits?: SavedCircuit[]
}

export function loadState(): PersistedState {
  try {
    const circuit = localStorage.getItem(KEYS.CURRENT_CIRCUIT)
    const saved = localStorage.getItem(KEYS.SAVED_CIRCUITS)
    return {
      currentCircuit: circuit ? JSON.parse(circuit) : undefined,
      savedCircuits: saved ? JSON.parse(saved) : [],
    }
  } catch {
    return {}
  }
}

export function saveState(state: PersistedState): void {
  try {
    if (state.currentCircuit !== undefined) {
      localStorage.setItem(KEYS.CURRENT_CIRCUIT, JSON.stringify(state.currentCircuit))
    }
    if (state.savedCircuits !== undefined) {
      localStorage.setItem(KEYS.SAVED_CIRCUITS, JSON.stringify(state.savedCircuits))
    }
  } catch {
    // localStorage may be unavailable or full
  }
}

export function clearState(): void {
  localStorage.removeItem(KEYS.CURRENT_CIRCUIT)
  localStorage.removeItem(KEYS.SAVED_CIRCUITS)
}
