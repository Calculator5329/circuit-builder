import type { GateNode, WireEdge, SavedCircuit, Signal } from '../types/circuit'
import type { TutorialDefinition, VerificationResult } from '../types/tutorial'
import { runSimulation } from '../simulation/engine'

export function verifyCircuit(
  tutorial: TutorialDefinition,
  nodes: GateNode[],
  edges: WireEdge[],
  savedCircuits: SavedCircuit[],
): VerificationResult {
  const outputNodes = nodes.filter(n => n.data.gateType === 'OUTPUT')
  const outputsByLabel = new Map(outputNodes.map(n => [n.data.label, n]))

  const rowResults = tutorial.truthTable.map(row => {
    const testNodes: GateNode[] = nodes.map(n => {
      if (n.data.gateType === 'INPUT') {
        const expected = row.inputs[n.data.label]
        if (expected !== undefined) {
          return { ...n, data: { ...n.data, inputState: expected === 1 } }
        }
      }
      return n
    })

    const result = runSimulation(testNodes, edges, savedCircuits)

    const actual: Record<string, 0 | 1 | null> = {}
    let rowPassed = true

    for (const [label, expectedValue] of Object.entries(row.outputs)) {
      const outputNode = outputsByLabel.get(label)
      if (!outputNode) {
        actual[label] = null
        rowPassed = false
        continue
      }

      const signals = result.nodeSignals[outputNode.id]
      const sig: Signal = signals?.inputSignals['in0'] ?? null
      actual[label] = sig as 0 | 1 | null

      if (sig !== expectedValue) {
        rowPassed = false
      }
    }

    return { row, actual, passed: rowPassed }
  })

  return {
    passed: rowResults.every(r => r.passed),
    rowResults,
  }
}
