import { Handle, Position, type NodeProps } from '@xyflow/react'
import { useCircuitStore } from '../../store/circuitStore'
import type { GateNodeData } from '../../types/circuit'
import { signalToColor } from '../../utils/signalUtils'

const BITS = 8
const BIT_HEIGHT = 22
const HEADER_H = 72
const NODE_H = HEADER_H + BITS * BIT_HEIGHT + 8
const NODE_W = 148

export function DecimalInputNode({ data, id, selected }: NodeProps) {
  const gateData = data as GateNodeData
  const setDecimalInput = useCircuitStore(s => s.setDecimalInput)
  const value = (gateData.decimalValue as number) ?? 0

  // Binary string for display: MSB left, LSB right
  const binStr = value.toString(2).padStart(BITS, '0')

  return (
    <div
      style={{ width: NODE_W, height: NODE_H, position: 'relative' }}
      className={`
        bg-slate-800 border-2 rounded-lg
        ${selected ? 'border-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.3)]' : 'border-emerald-700'}
      `}
    >
      {/* Header */}
      <div className="px-3 pt-2 pb-1">
        <div className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider mb-1">
          Dec → Bin
        </div>
        <input
          type="number"
          min={0}
          max={255}
          value={value}
          onChange={e => setDecimalInput(id, Number(e.target.value))}
          className="nodrag nowheel w-full bg-slate-700 border border-slate-600 focus:border-emerald-500
                     rounded px-2 py-1 text-sm text-white font-mono outline-none text-center"
          style={{ pointerEvents: 'all' }}
        />
        {/* Binary preview */}
        <div className="flex justify-center gap-[2px] mt-1">
          {binStr.split('').map((b, i) => (
            <span
              key={i}
              className={`text-[9px] font-mono font-bold ${b === '1' ? 'text-emerald-400' : 'text-slate-600'}`}
            >
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* Bit output handles — bit7 (MSB) at top, bit0 (LSB) at bottom */}
      {Array.from({ length: BITS }, (_, i) => {
        const bitIndex = BITS - 1 - i // bit7 first (top), bit0 last (bottom)
        const topPx = HEADER_H + i * BIT_HEIGHT + BIT_HEIGHT / 2
        const sig = gateData.outputSignals[`bit${bitIndex}`] ?? null
        return (
          <div key={bitIndex}>
            {/* Label */}
            <span
              className="absolute text-[9px] text-slate-400 pointer-events-none select-none font-mono"
              style={{ top: topPx - 6, right: 16 }}
            >
              {`b${bitIndex}`}
            </span>
            <Handle
              type="source"
              position={Position.Right}
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
