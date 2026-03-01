import { create } from 'zustand'
import {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  type Connection,
  type Viewport,
  type XYPosition,
} from '@xyflow/react'
import type { GateNode, WireEdge, GateType, SavedCircuit, Signal } from '../types/circuit'
import { createGateNode } from '../utils/nodeFactory'
import { runSimulation } from '../simulation/engine'
import { loadState, saveState } from '../persistence/localStorage'
import { exportCircuit, importFromJSON, downloadJSON } from '../persistence/serialization'

interface CircuitStore {
  // Canvas state
  nodes: GateNode[]
  edges: WireEdge[]
  viewport: Viewport

  // React Flow callbacks
  onNodesChange: OnNodesChange<GateNode>
  onEdgesChange: OnEdgesChange<WireEdge>
  onConnect: OnConnect

  // Saved circuits (library)
  savedCircuits: SavedCircuit[]

  // UI state
  circuitName: string
  isDirty: boolean
  _isLoaded: boolean

  // Canvas actions
  addGate: (gateType: GateType, position: XYPosition) => void
  addCustomGate: (savedCircuit: SavedCircuit, position: XYPosition) => void
  removeSelected: () => void
  clearCanvas: () => void
  setViewport: (viewport: Viewport) => void
  setCircuitName: (name: string) => void
  updateNodeLabel: (nodeId: string, label: string) => void

  // INPUT toggle
  toggleInput: (nodeId: string) => void
  setDecimalInput: (nodeId: string, value: number) => void

  // Simulation
  runSimulation: () => void

  // Library
  saveCurrentAsComponent: (name: string, description?: string) => void
  deleteFromLibrary: (id: string) => void
  renameInLibrary: (id: string, newName: string) => void

  // Persistence
  exportToJSON: () => void
  importFromJSON: (json: string) => void
  loadFromLocalStorage: () => void
  saveToLocalStorage: () => void
}

const EMPTY_VIEWPORT: Viewport = { x: 0, y: 0, zoom: 1 }

export const useCircuitStore = create<CircuitStore>((set, get) => ({
  nodes: [],
  edges: [],
  viewport: EMPTY_VIEWPORT,
  savedCircuits: [],
  circuitName: 'Untitled Circuit',
  isDirty: false,
  _isLoaded: false,

  onNodesChange: (changes) => {
    set(state => ({ nodes: applyNodeChanges(changes, state.nodes) as GateNode[], isDirty: true }))
    get().runSimulation()
  },

  onEdgesChange: (changes) => {
    set(state => ({ edges: applyEdgeChanges(changes, state.edges) as WireEdge[], isDirty: true }))
    get().runSimulation()
  },

  onConnect: (connection: Connection) => {
    set(state => {
      const newEdge: WireEdge = {
        id: `e-${connection.source}-${connection.sourceHandle ?? 'out'}-${connection.target}-${connection.targetHandle ?? 'in'}-${Date.now()}`,
        source: connection.source,
        sourceHandle: connection.sourceHandle,
        target: connection.target,
        targetHandle: connection.targetHandle,
        type: 'wire',
        data: { signal: null },
      }
      return { edges: addEdge(newEdge, state.edges) as WireEdge[], isDirty: true }
    })
    get().runSimulation()
  },

  addGate: (gateType, position) => {
    const node = createGateNode(gateType, position)
    set(state => ({ nodes: [...state.nodes, node], isDirty: true }))
    get().runSimulation()
  },

  addCustomGate: (savedCircuit, position) => {
    const node = createGateNode('CUSTOM', position, savedCircuit.name, savedCircuit)
    set(state => ({ nodes: [...state.nodes, node], isDirty: true }))
    get().runSimulation()
  },

  removeSelected: () => {
    set(state => {
      const selectedNodeIds = new Set(state.nodes.filter(n => n.selected).map(n => n.id))
      const selectedEdgeIds = new Set(state.edges.filter(e => e.selected).map(e => e.id))
      return {
        nodes: state.nodes.filter(n => !selectedNodeIds.has(n.id)),
        edges: state.edges.filter(e =>
          !selectedEdgeIds.has(e.id) &&
          !selectedNodeIds.has(e.source) &&
          !selectedNodeIds.has(e.target)
        ),
        isDirty: true,
      }
    })
    get().runSimulation()
  },

  clearCanvas: () => {
    set({ nodes: [], edges: [], isDirty: true })
  },

  setViewport: (viewport) => set({ viewport }),

  setCircuitName: (name) => set({ circuitName: name }),

  updateNodeLabel: (nodeId, label) => {
    set(state => ({
      nodes: state.nodes.map(n =>
        n.id === nodeId ? { ...n, data: { ...n.data, label } } : n
      ),
    }))
  },

  toggleInput: (nodeId) => {
    set(state => ({
      nodes: state.nodes.map(n => {
        if (n.id !== nodeId || (n.data.gateType !== 'INPUT' && n.data.gateType !== 'CONSTANT')) return n
        return { ...n, data: { ...n.data, inputState: !n.data.inputState } }
      }),
      isDirty: true,
    }))
    get().runSimulation()
  },

  setDecimalInput: (nodeId, value) => {
    const clamped = Math.max(0, Math.min(255, Math.floor(value)))
    set(state => ({
      nodes: state.nodes.map(n => {
        if (n.id !== nodeId || n.data.gateType !== 'DECIMAL_INPUT') return n
        return { ...n, data: { ...n.data, decimalValue: clamped } }
      }),
      isDirty: true,
    }))
    get().runSimulation()
  },

  runSimulation: () => {
    const { nodes, edges, savedCircuits } = get()
    const result = runSimulation(nodes, edges, savedCircuits)

    set(state => ({
      nodes: state.nodes.map(n => {
        const signals = result.nodeSignals[n.id]
        if (!signals) return n
        return {
          ...n,
          data: {
            ...n.data,
            inputSignals: signals.inputSignals,
            outputSignals: signals.outputSignals,
          },
        }
      }),
      edges: state.edges.map(e => ({
        ...e,
        data: { signal: (result.edgeSignals[e.id] ?? null) as Signal },
      })),
    }))

    // Only auto-save after initial load to prevent wiping localStorage
    if (get()._isLoaded) get().saveToLocalStorage()
  },

  saveCurrentAsComponent: (name, description) => {
    const { nodes, edges, viewport } = get()

    const inputPorts = nodes
      .filter(n => n.data.gateType === 'INPUT')
      .sort((a, b) => a.position.y - b.position.y)
      .map(n => ({ id: n.id, label: n.data.label }))

    const outputPorts = nodes
      .filter(n => n.data.gateType === 'OUTPUT')
      .sort((a, b) => a.position.y - b.position.y)
      .map(n => ({ id: n.id, label: n.data.label }))

    const savedCircuit: SavedCircuit = {
      id: crypto.randomUUID(),
      name,
      description,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      circuit: { id: crypto.randomUUID(), nodes, edges, viewport },
      inputPorts,
      outputPorts,
    }

    set(state => ({ savedCircuits: [...state.savedCircuits, savedCircuit] }))
    get().saveToLocalStorage()
  },

  deleteFromLibrary: (id) => {
    set(state => ({ savedCircuits: state.savedCircuits.filter(c => c.id !== id) }))
    get().saveToLocalStorage()
  },

  renameInLibrary: (id, newName) => {
    set(state => ({
      savedCircuits: state.savedCircuits.map(c =>
        c.id === id ? { ...c, name: newName, updatedAt: Date.now() } : c
      ),
    }))
    get().saveToLocalStorage()
  },

  exportToJSON: () => {
    const { nodes, edges, viewport, savedCircuits, circuitName } = get()
    const json = exportCircuit({ id: 'export', nodes, edges, viewport }, savedCircuits)
    downloadJSON(json, `${circuitName.replace(/\s+/g, '-').toLowerCase()}.json`)
  },

  importFromJSON: (json) => {
    try {
      const data = importFromJSON(json)
      if (data.circuit) {
        set({
          nodes: data.circuit.nodes as GateNode[],
          edges: data.circuit.edges as WireEdge[],
          viewport: data.circuit.viewport ?? EMPTY_VIEWPORT,
          isDirty: false,
        })
      }
      if (data.savedCircuits && data.savedCircuits.length > 0) {
        set(state => {
          const existingIds = new Set(state.savedCircuits.map(c => c.id))
          const newCircuits = data.savedCircuits!.filter(c => !existingIds.has(c.id))
          return { savedCircuits: [...state.savedCircuits, ...newCircuits] }
        })
      }
      get().runSimulation()
    } catch (e) {
      console.error('Import failed:', e)
    }
  },

  loadFromLocalStorage: () => {
    const state = loadState()
    // Atomically restore all state to prevent onNodesChange firing between sets
    set({
      ...(state.currentCircuit ? {
        nodes: state.currentCircuit.nodes as GateNode[],
        edges: state.currentCircuit.edges as WireEdge[],
        viewport: state.currentCircuit.viewport ?? EMPTY_VIEWPORT,
      } : {}),
      savedCircuits: state.savedCircuits ?? [],
      _isLoaded: true,
    })
    get().runSimulation()
  },

  saveToLocalStorage: () => {
    const { nodes, edges, viewport, savedCircuits } = get()
    saveState({
      currentCircuit: { id: 'current', nodes, edges, viewport },
      savedCircuits,
    })
  },
}))
