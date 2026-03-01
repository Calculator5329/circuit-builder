import type { Signal } from '../types/circuit'

export function signalToColor(signal: Signal): string {
  if (signal === 1) return '#22c55e'  // green-500
  if (signal === 0) return '#334155'  // slate-700
  return '#475569'                     // slate-600 (floating)
}

export function signalToString(signal: Signal): string {
  if (signal === 1) return '1'
  if (signal === 0) return '0'
  return 'Z'
}

export function signalToBool(signal: Signal): boolean {
  return signal === 1
}
