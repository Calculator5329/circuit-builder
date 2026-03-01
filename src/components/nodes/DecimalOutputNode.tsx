import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { GateNodeData, Signal } from '../../types/circuit'
import { signalToColor } from '../../utils/signalUtils'

const BITS = 8
const BIT_HEIGHT = 22
const HEADER_H = 68
const NODE_H = HEADER_H + BITS * BIT_HEIGHT + 8
const NODE_W = 148

function bitsToDecimal(signals: Record<string, Signal>): number | null {
  let result = 0
  for (let i = 0; i < BITS; i++) {
    const sig = signals[`bit${i}`]
    if (sig === null) return null
    result |= (sig << i)
  }
  return result
}

export function DecimalOutputNode({ data, selected }: NodeProps) {
  const gateData = data as GateNodeData
  const decimal = bitsToDecimal(gateData.inputSignals)
  const isValid = decimal !== null

  // Binary string for display: MSB left, LSB right
  const binStr = isValid
    ? decimal!.toString(2).padStart(BITS, '0')
    : '????????'

  return (
    <div
      style={{ width: NODE_W, height: NODE_H, position: 'relative' }}
      className={`
        bg-slate-800 border-2 rounded-lg
        ${selected ? 'border-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.3)]' : 'border-amber-700'}
      `}
    >
      {/* Header */}
      <div className="px-3 pt-2 pb-1">
        <div className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider mb-1">
          Bin → Dec
        </div>
        {/* Decimal display */}
        <div
          className={`
            w-full rounded px-2 py-1 text-center font-mono text-lg font-bold
            ${isValid
              ? 'bg-amber-500/10 text-amber-300 border border-amber-700'
              : 'bg-slate-700/50 text-slate-500 border border-slate-600'}
          `}
        >
          {isValid ? decimal : '—'}
        </div>
        {/* Binary preview */}
        <div className="flex justify-center gap-[2px] mt-1">
          {binStr.split('').map((b, i) => (
            <span
              key={i}
              className={`text-[9px] font-mono font-bold ${
                b === '1' ? 'text-amber-400' : b === '0' ? 'text-slate-600' : 'text-slate-700'
              }`}
            >
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* Bit input handles — bit7 (MSB) at top, bit0 (LSB) at bottom */}
      {Array.from({ length: BITS }, (_, i) => {
        const bitIndex = BITS - 1 - i // bit7 first (top), bit0 last (bottom)
        const topPx = HEADER_H + i * BIT_HEIGHT + BIT_HEIGHT / 2
        const sig = gateData.inputSignals[`bit${bitIndex}`] ?? null
        return (
          <div key={bitIndex}>
            <span
              className="absolute text-[9px] text-slate-400 pointer-events-none select-none font-mono"
              style={{ top: topPx - 6, left: 16 }}
            >
              {`b${bitIndex}`}
            </span>
            <Handle
              type="target"
              position={Position.Left}
              id={`bit${bitIndex}`}
              style={{
                top: topPx,
                background: signalToColor(sig),
                width: 10, height: 10,
                border: '2px solid #0f172a',
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
