import type { GateType, GateNode, GateNodeData, SavedCircuit, XYPosition } from '../types/circuit'
import { getInputPortIds, getOutputPortIds } from './portUtils'

let idCounter = 0
function generateId(): string {
  return `node-${Date.now()}-${++idCounter}`
}

export function createGateNode(
  gateType: GateType,
  position: XYPosition,
  label?: string,
  savedCircuit?: SavedCircuit
): GateNode {
  const inputPortIds = gateType === 'CUSTOM' && savedCircuit
    ? savedCircuit.inputPorts.map(p => p.id)
    : getInputPortIds(gateType)

  const outputPortIds = gateType === 'CUSTOM' && savedCircuit
    ? savedCircuit.outputPorts.map(p => p.id)
    : getOutputPortIds(gateType)

  const data: GateNodeData = {
    gateType,
    label: label ?? defaultLabel(gateType, savedCircuit),
    inputSignals: Object.fromEntries(inputPortIds.map(id => [id, null])),
    outputSignals: Object.fromEntries(outputPortIds.map(id => [id, null])),
    inputState: gateType === 'INPUT' ? false : undefined,
    decimalValue: gateType === 'DECIMAL_INPUT' ? 0 : undefined,
    customCircuitId: savedCircuit?.id,
  }

  return {
    id: generateId(),
    type: gateType,
    position,
    data,
  }
}

function defaultLabel(gateType: GateType, savedCircuit?: SavedCircuit): string {
  if (gateType === 'CUSTOM' && savedCircuit) return savedCircuit.name
  const labels: Record<GateType, string> = {
    AND: 'AND', OR: 'OR', NOT: 'NOT',
    NAND: 'NAND', NOR: 'NOR', XOR: 'XOR', XNOR: 'XNOR',
    INPUT: 'In', OUTPUT: 'Out',
    DECIMAL_INPUT: 'Dec In', DECIMAL_OUTPUT: 'Dec Out',
    CUSTOM: 'Custom',
  }
  return labels[gateType]
}
