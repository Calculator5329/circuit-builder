import type { Signal } from '../types/circuit'

export function signalToColor(signal: Signal): string {
  if (signal === 1) return '#00ff41'  // phosphor green HIGH
  if (signal === 0) return '#1a3a1a'  // dim trace LOW
  return '#ffb300'                     // amber FLOATING
}

export function signalToString(signal: Signal): string {
  if (signal === 1) return '1'
  if (signal === 0) return '0'
  return 'Z'
}

export function signalToBool(signal: Signal): boolean {
  return signal === 1
}
