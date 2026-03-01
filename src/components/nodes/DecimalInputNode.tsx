import { Handle, Position, type NodeProps } from '@xyflow/react'
import { useCircuitStore } from '../../store/circuitStore'
import type { GateNodeData } from '../../types/circuit'
import { signalToColor } from '../../utils/signalUtils'

const BITS = 8
const BIT_HEIGHT = 22
const HEADER_H = 76
const NODE_H = HEADER_H + BITS * BIT_HEIGHT + 8
const NODE_W = 152

export function DecimalInputNode({ data, id, selected }: NodeProps) {
  const gateData = data as GateNodeData
  const setDecimalInput = useCircuitStore(s => s.setDecimalInput)
  const value = (gateData.decimalValue as number) ?? 0

  const binStr = value.toString(2).padStart(BITS, '0')

  const borderColor = selected ? '#f59e0b' : '#2d3748'
  const glowColor = selected ? 'rgba(245,158,11,0.3)' : 'transparent'

  return (
    <div
      style={{
        width: NODE_W,
        height: NODE_H,
        position: 'relative',
        background: '#0d1117',
        borderRadius: 3,
        boxShadow: `inset 0 0 0 1px ${borderColor}, 0 0 14px ${glowColor}`,
        transition: 'box-shadow 0.15s',
      }}
    >
      {/* IC chip header stripe */}
      <div style={{
        padding: '6px 10px 4px',
        borderBottom: '1px solid var(--border-dim)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 5,
        }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 9,
            color: selected ? 'rgba(245,158,11,0.7)' : 'var(--text-dim)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}>
            DEC→BIN
          </span>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 8,
            color: 'var(--text-dim)',
            letterSpacing: '0.08em',
          }}>
            8-BIT
          </span>
        </div>

        <input
          type="number"
          min={0}
          max={255}
          value={value}
          onChange={e => setDecimalInput(id, Number(e.target.value))}
          className="nodrag nowheel"
          style={{
            width: '100%',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-mid)',
            borderRadius: 2,
            padding: '4px 8px',
            fontFamily: 'var(--font-display)',
            fontSize: 14,
            color: 'var(--text-bright)',
            outline: 'none',
            textAlign: 'center',
            letterSpacing: '0.06em',
            pointerEvents: 'all',
            transition: 'border-color 0.12s',
          }}
          onFocus={e => (e.target.style.borderColor = 'var(--border-hi)')}
          onBlur={e => (e.target.style.borderColor = 'var(--border-mid)')}
        />

        {/* Binary preview bar */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 4 }}>
          {binStr.split('').map((b, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 9,
                fontWeight: 600,
                color: b === '1' ? '#22c55e' : 'var(--border-dim)',
                transition: 'color 0.1s',
              }}
            >
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* Bit output handles */}
      {Array.from({ length: BITS }, (_, i) => {
        const bitIndex = BITS - 1 - i
        const topPx = HEADER_H + i * BIT_HEIGHT + BIT_HEIGHT / 2
        const sig = gateData.outputSignals[`bit${bitIndex}`] ?? null
        return (
          <div key={bitIndex}>
            <span
              style={{
                position: 'absolute',
                fontFamily: 'var(--font-display)',
                fontSize: 8,
                color: 'var(--text-dim)',
                pointerEvents: 'none',
                userSelect: 'none',
                top: topPx - 6,
                right: 14,
                letterSpacing: '0.04em',
              }}
            >
              b{bitIndex}
            </span>
            <Handle
              type="source"
              position={Position.Right}
              id={`bit${bitIndex}`}
              style={{
                top: topPx,
                background: signalToColor(sig),
                width: 9,
                height: 9,
                borderRadius: 2,
                border: '1px solid #0d1117',
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
