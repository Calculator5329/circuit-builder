import type { Node, Edge, Viewport, XYPosition } from '@xyflow/react'

export type Signal = 0 | 1 | null // null = floating/undriven

export type GateType =
  | 'AND'
  | 'OR'
  | 'NOT'
  | 'NAND'
  | 'NOR'
  | 'XOR'
  | 'XNOR'
  | 'INPUT'
  | 'OUTPUT'
  | 'DECIMAL_INPUT'
  | 'DECIMAL_OUTPUT'
  | 'CUSTOM'

export interface PortDefinition {
  id: string
  type: 'input' | 'output'
  label?: string
  index: number
}

export interface GateNodeData extends Record<string, unknown> {
  gateType: GateType
  label: string
  inputSignals: Record<string, Signal>
  outputSignals: Record<string, Signal>
  inputState?: boolean        // INPUT node toggle state
  decimalValue?: number       // DECIMAL_INPUT node value (0-255)
  customCircuitId?: string    // CUSTOM node: ref to SavedCircuit.id
}

export interface WireEdgeData extends Record<string, unknown> {
  signal: Signal
}

export type GateNode = Node<GateNodeData>
export type WireEdge = Edge<WireEdgeData>

export interface Circuit {
  id: string
  nodes: GateNode[]
  edges: WireEdge[]
  viewport: Viewport
}

export interface SavedCircuit {
  id: string
  name: string
  description?: string
  createdAt: number
  updatedAt: number
  circuit: Circuit
  inputPorts: Array<{ id: string; label: string }>
  outputPorts: Array<{ id: string; label: string }>
}

export interface AppState {
  currentCircuit: Circuit
  savedCircuits: SavedCircuit[]
}

// Re-export for convenience
export type { XYPosition, Viewport }
