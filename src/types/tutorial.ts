import type { GateType, XYPosition } from './circuit'

export interface TutorialTrack {
  id: string
  name: string
  description: string
  order: number
}

export interface TutorialDefinition {
  id: string
  trackId: string
  order: number
  name: string
  description: string
  briefing: string
  difficulty: 1 | 2 | 3 | 4 | 5
  prerequisites: string[]
  availableGates: GateType[]
  availableComponents: string[]
  setupInputs: Array<{ label: string; position: XYPosition }>
  setupOutputs: Array<{ label: string; position: XYPosition }>
  truthTable: TruthTableRow[]
  hints: string[]
  unlocksComponent?: { name: string; description: string }
}

export interface TruthTableRow {
  inputs: Record<string, 0 | 1>
  outputs: Record<string, 0 | 1>
}

export interface TutorialProgress {
  completedTutorials: string[]
  unlockedComponents: Record<string, string>
}

export interface VerificationResult {
  passed: boolean
  rowResults: Array<{
    row: TruthTableRow
    actual: Record<string, 0 | 1 | null>
    passed: boolean
  }>
}
