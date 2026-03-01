import type { GateType, PortDefinition, SavedCircuit } from '../types/circuit'

export function getPortDefinitions(
  gateType: GateType,
  savedCircuit?: SavedCircuit
): PortDefinition[] {
  switch (gateType) {
    case 'AND':
    case 'OR':
    case 'NAND':
    case 'NOR':
    case 'XOR':
    case 'XNOR':
      return [
        { id: 'in0', type: 'input', index: 0 },
        { id: 'in1', type: 'input', index: 1 },
        { id: 'out0', type: 'output', index: 0 },
      ]
    case 'NOT':
      return [
        { id: 'in0', type: 'input', index: 0 },
        { id: 'out0', type: 'output', index: 0 },
      ]
    case 'INPUT':
      return [{ id: 'out0', type: 'output', index: 0 }]
    case 'OUTPUT':
      return [{ id: 'in0', type: 'input', index: 0 }]
    case 'DECIMAL_INPUT':
      return Array.from({ length: 8 }, (_, i) => ({
        id: `bit${i}`, type: 'output' as const, label: `bit${i}`, index: i,
      }))
    case 'DECIMAL_OUTPUT':
      return Array.from({ length: 8 }, (_, i) => ({
        id: `bit${i}`, type: 'input' as const, label: `bit${i}`, index: i,
      }))
    case 'CONSTANT':
      return [{ id: 'out0', type: 'output', index: 0 }]
    case 'SEVEN_SEGMENT_DISPLAY':
      return ['a', 'b', 'c', 'd', 'e', 'f', 'g'].map((seg, i) => ({
        id: seg, type: 'input' as const, label: seg, index: i,
      }))
    case 'CUSTOM':
      if (!savedCircuit) return []
      return [
        ...savedCircuit.inputPorts.map((p, i) => ({
          id: p.id, type: 'input' as const, label: p.label, index: i,
        })),
        ...savedCircuit.outputPorts.map((p, i) => ({
          id: p.id, type: 'output' as const, label: p.label, index: i,
        })),
      ]
    default:
      return []
  }
}

export function getInputPortIds(gateType: GateType): string[] {
  return getPortDefinitions(gateType)
    .filter(p => p.type === 'input')
    .map(p => p.id)
}

export function getOutputPortIds(gateType: GateType): string[] {
  return getPortDefinitions(gateType)
    .filter(p => p.type === 'output')
    .map(p => p.id)
}
