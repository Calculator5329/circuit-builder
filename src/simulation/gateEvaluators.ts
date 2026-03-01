import type { GateType, Signal } from '../types/circuit'

type Inputs = Record<string, Signal>
type Outputs = Record<string, Signal>

function twoInput(
  inputs: Inputs,
  op: (a: number, b: number) => number
): Outputs {
  const a = inputs['in0']
  const b = inputs['in1']
  if (a === null || b === null) return { out0: null }
  return { out0: op(a, b) as Signal }
}

export function evaluateGate(gateType: GateType, inputs: Inputs): Outputs {
  switch (gateType) {
    case 'INPUT': {
      // Driven externally via inputState; signal is set directly
      return { out0: inputs['__state__'] ?? null }
    }
    case 'OUTPUT':
    case 'DECIMAL_OUTPUT':
      return {} // sinks

    case 'AND':  return twoInput(inputs, (a, b) => a & b)
    case 'OR':   return twoInput(inputs, (a, b) => a | b)
    case 'NAND': return twoInput(inputs, (a, b) => (a & b) ^ 1)
    case 'NOR':  return twoInput(inputs, (a, b) => (a | b) ^ 1)
    case 'XOR':  return twoInput(inputs, (a, b) => a ^ b)
    case 'XNOR': return twoInput(inputs, (a, b) => (a ^ b) ^ 1)

    case 'NOT': {
      const a = inputs['in0']
      if (a === null) return { out0: null }
      return { out0: (a ^ 1) as Signal }
    }

    case 'CONSTANT': {
      return { out0: inputs['__state__'] ?? null }
    }

    case 'SEVEN_SEGMENT_DISPLAY':
      return {}

    case 'CUSTOM':
      return {}

    default:
      return {}
  }
}
