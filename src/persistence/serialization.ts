import type { Circuit, SavedCircuit } from '../types/circuit'

export interface ExportedFile {
  version: '1.0'
  exportedAt: number
  circuit?: Circuit
  savedCircuits?: SavedCircuit[]
}

export function exportCircuit(circuit: Circuit, savedCircuits: SavedCircuit[]): string {
  const payload: ExportedFile = {
    version: '1.0',
    exportedAt: Date.now(),
    circuit,
    savedCircuits,
  }
  return JSON.stringify(payload, null, 2)
}

export function importFromJSON(json: string): ExportedFile {
  const data = JSON.parse(json) as ExportedFile
  if (data.version !== '1.0') throw new Error('Unsupported file version')
  return data
}

export function downloadJSON(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
