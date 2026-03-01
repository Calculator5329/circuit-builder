import type { GateNode, WireEdge, Signal, SavedCircuit } from '../types/circuit'
import { evaluateGate } from './gateEvaluators'
import { buildEdgeMap, topoSort } from './topology'

export interface SimulationResult {
  nodeSignals: Record<string, {
    inputSignals: Record<string, Signal>
    outputSignals: Record<string, Signal>
  }>
  edgeSignals: Record<string, Signal>
}

export function runSimulation(
  nodes: GateNode[],
  edges: WireEdge[],
  savedCircuits: SavedCircuit[] = []
): SimulationResult {
  const { targetToSource } = buildEdgeMap(edges)
  const order = topoSort(nodes, edges)

  // Accumulated output signals per node
  const nodeOutputs = new Map<string, Record<string, Signal>>()
  const nodeInputs = new Map<string, Record<string, Signal>>()

  for (const node of nodes) {
    nodeOutputs.set(node.id, { ...node.data.outputSignals })
    nodeInputs.set(node.id, { ...node.data.inputSignals })
  }

  // Set INPUT and DECIMAL_INPUT node outputs from their state
  for (const node of nodes) {
    if (node.data.gateType === 'INPUT') {
      const sig: Signal = node.data.inputState ? 1 : 0
      nodeOutputs.set(node.id, { out0: sig })
    }
    if (node.data.gateType === 'DECIMAL_INPUT') {
      const value = (node.data.decimalValue as number) ?? 0
      const outputs: Record<string, Signal> = {}
      for (let i = 0; i < 8; i++) {
        outputs[`bit${i}`] = ((value >> i) & 1) as Signal
      }
      nodeOutputs.set(node.id, outputs)
    }
  }

  // Evaluate in topological order
  for (const node of order) {
    if (node.data.gateType === 'INPUT') continue // already set above
    if (node.data.gateType === 'DECIMAL_INPUT') continue // already set above

    // Collect input signals by looking up what drives each input handle
    const resolvedInputs: Record<string, Signal> = {}
    const inputHandles = Object.keys(node.data.inputSignals)

    for (const handle of inputHandles) {
      const tgtKey = `${node.id}::${handle}`
      const source = targetToSource.get(tgtKey)
      if (source) {
        const srcOutputs = nodeOutputs.get(source.nodeId)
        resolvedInputs[handle] = srcOutputs?.[source.handle] ?? null
      } else {
        resolvedInputs[handle] = null
      }
    }

    nodeInputs.set(node.id, resolvedInputs)

    let outputs: Record<string, Signal>

    if (node.data.gateType === 'CUSTOM') {
      outputs = evaluateCustomNode(node, resolvedInputs, savedCircuits)
    } else {
      outputs = evaluateGate(node.data.gateType, resolvedInputs)
    }

    nodeOutputs.set(node.id, outputs)
  }

  // Build result
  const nodeSignals: SimulationResult['nodeSignals'] = {}
  for (const node of nodes) {
    nodeSignals[node.id] = {
      inputSignals: nodeInputs.get(node.id) ?? {},
      outputSignals: nodeOutputs.get(node.id) ?? {},
    }
  }

  // Assign signal to each edge
  const edgeSignals: Record<string, Signal> = {}
  for (const edge of edges) {
    if (!edge.source || !edge.sourceHandle) {
      edgeSignals[edge.id] = null
      continue
    }
    const srcOutputs = nodeOutputs.get(edge.source)
    edgeSignals[edge.id] = srcOutputs?.[edge.sourceHandle ?? 'out0'] ?? null
  }

  return { nodeSignals, edgeSignals }
}

function evaluateCustomNode(
  node: GateNode,
  resolvedInputs: Record<string, Signal>,
  savedCircuits: SavedCircuit[]
): Record<string, Signal> {
  const sc = savedCircuits.find(c => c.id === node.data.customCircuitId)
  if (!sc) return {}

  // Clone inner circuit nodes and inject input signals at INPUT nodes
  const innerNodes: GateNode[] = sc.circuit.nodes.map(n => {
    if (n.data.gateType === 'INPUT') {
      const portDef = sc.inputPorts.find(p => p.id === n.id)
      if (portDef) {
        const sig = resolvedInputs[portDef.id] ?? null
        return {
          ...n,
          data: {
            ...n.data,
            inputState: sig === 1,
          },
        }
      }
    }
    return { ...n }
  })

  const result = runSimulation(innerNodes, sc.circuit.edges, savedCircuits)

  // Map OUTPUT node input signals back to our output ports
  const outputs: Record<string, Signal> = {}
  for (const outPort of sc.outputPorts) {
    const outputNodeSignals = result.nodeSignals[outPort.id]
    if (outputNodeSignals) {
      outputs[outPort.id] = outputNodeSignals.inputSignals['in0'] ?? null
    } else {
      outputs[outPort.id] = null
    }
  }

  return outputs
}
