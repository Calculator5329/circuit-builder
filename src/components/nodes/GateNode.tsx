import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { GateNodeData, Signal } from '../../types/circuit'
import { signalToColor } from '../../utils/signalUtils'
import { AndSymbol } from './symbols/AndSymbol'
import { OrSymbol } from './symbols/OrSymbol'
import { NotSymbol } from './symbols/NotSymbol'
import { NandSymbol } from './symbols/NandSymbol'
import { NorSymbol } from './symbols/NorSymbol'
import { XorSymbol } from './symbols/XorSymbol'
import { XnorSymbol } from './symbols/XnorSymbol'

interface GateConfig {
  symbol: React.ComponentType<{ stroke?: string }>
  viewBox: string
  width: number
  height: number
  inputs: Array<{ id: string; topPct: number }>
  outputs: Array<{ id: string; topPct: number }>
}

const GATE_CONFIGS: Record<string, GateConfig> = {
  AND: {
    symbol: AndSymbol,
    viewBox: '0 0 60 56',
    width: 80, height: 56,
    inputs: [{ id: 'in0', topPct: 29 }, { id: 'in1', topPct: 71 }],
    outputs: [{ id: 'out0', topPct: 50 }],
  },
  OR: {
    symbol: OrSymbol,
    viewBox: '0 0 60 56',
    width: 80, height: 56,
    inputs: [{ id: 'in0', topPct: 29 }, { id: 'in1', topPct: 71 }],
    outputs: [{ id: 'out0', topPct: 50 }],
  },
  NOT: {
    symbol: NotSymbol,
    viewBox: '0 0 68 56',
    width: 88, height: 56,
    inputs: [{ id: 'in0', topPct: 50 }],
    outputs: [{ id: 'out0', topPct: 50 }],
  },
  NAND: {
    symbol: NandSymbol,
    viewBox: '0 0 68 56',
    width: 88, height: 56,
    inputs: [{ id: 'in0', topPct: 29 }, { id: 'in1', topPct: 71 }],
    outputs: [{ id: 'out0', topPct: 50 }],
  },
  NOR: {
    symbol: NorSymbol,
    viewBox: '0 0 68 56',
    width: 88, height: 56,
    inputs: [{ id: 'in0', topPct: 29 }, { id: 'in1', topPct: 71 }],
    outputs: [{ id: 'out0', topPct: 50 }],
  },
  XOR: {
    symbol: XorSymbol,
    viewBox: '0 0 60 56',
    width: 80, height: 56,
    inputs: [{ id: 'in0', topPct: 29 }, { id: 'in1', topPct: 71 }],
    outputs: [{ id: 'out0', topPct: 50 }],
  },
  XNOR: {
    symbol: XnorSymbol,
    viewBox: '0 0 68 56',
    width: 88, height: 56,
    inputs: [{ id: 'in0', topPct: 29 }, { id: 'in1', topPct: 71 }],
    outputs: [{ id: 'out0', topPct: 50 }],
  },
}

function handleStyle(signal: Signal) {
  return {
    background: signalToColor(signal),
    width: 9,
    height: 9,
    borderRadius: 2,
    border: '1px solid #060b06',
  }
}

export function GateNode({ data, selected, type }: NodeProps) {
  const gateData = data as GateNodeData
  const config = GATE_CONFIGS[type ?? '']
  if (!config) return null

  const Symbol = config.symbol
  const stroke = selected ? '#ffb300' : '#3a7a3a'

  return (
    <div
      style={{
        width: config.width,
        height: config.height,
        position: 'relative',
        background: '#070d07',
        boxShadow: selected
          ? 'inset 0 0 0 1px #ffb300, 0 0 16px rgba(255,179,0,0.45)'
          : 'inset 0 0 0 1px #254525',
        borderRadius: 2,
        transition: 'box-shadow 0.15s ease',
      }}
    >
      {config.inputs.map(({ id, topPct }) => (
        <Handle
          key={id}
          type="target"
          position={Position.Left}
          id={id}
          style={{ ...handleStyle(gateData.inputSignals[id] ?? null), top: `${topPct}%` }}
        />
      ))}

      <svg
        width={config.width}
        height={config.height}
        viewBox={config.viewBox}
        overflow="visible"
      >
        <Symbol stroke={stroke} />
      </svg>

      {config.outputs.map(({ id, topPct }) => (
        <Handle
          key={id}
          type="source"
          position={Position.Right}
          id={id}
          style={{ ...handleStyle(gateData.outputSignals[id] ?? null), top: `${topPct}%` }}
        />
      ))}

      {/* IC silkscreen label below node */}
      <div
        style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          paddingTop: 4,
          textAlign: 'center',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 9,
          color: selected ? '#ffb30099' : '#2a5a2a',
          letterSpacing: '0.08em',
        }}>
          {type}
        </span>
      </div>
    </div>
  )
}
