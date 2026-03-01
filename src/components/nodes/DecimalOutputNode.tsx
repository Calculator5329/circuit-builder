import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { GateNodeData, Signal } from '../../types/circuit'
import { signalToColor } from '../../utils/signalUtils'

const BITS = 8
const BIT_HEIGHT = 22
const HEADER_H = 72
const NODE_H = HEADER_H + BITS * BIT_HEIGHT + 8
const NODE_W = 152

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

  const binStr = isValid
    ? decimal!.toString(2).padStart(BITS, '0')
    : '????????'

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
            BIN→DEC
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

        {/* Decimal display */}
        <div
          style={{
            width: '100%',
            borderRadius: 2,
            padding: '4px 8px',
            textAlign: 'center',
            fontFamily: 'var(--font-display)',
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: '0.04em',
            background: isValid ? '#1a0e00' : 'var(--bg-surface)',
            color: isValid ? '#ffb300' : 'var(--text-dim)',
            boxShadow: isValid
              ? 'inset 0 0 0 1px #3a2800, 0 0 8px rgba(255,179,0,0.12)'
              : 'inset 0 0 0 1px var(--border-dim)',
            transition: 'all 0.15s',
          }}
        >
          {isValid ? decimal : '—'}
        </div>

        {/* Binary preview bar */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 4 }}>
          {binStr.split('').map((b, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 9,
                fontWeight: 600,
                color: b === '1' ? '#7a5500' : b === '0' ? 'var(--border-dim)' : '#3a2800',
              }}
            >
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* Bit input handles */}
      {Array.from({ length: BITS }, (_, i) => {
        const bitIndex = BITS - 1 - i
        const topPx = HEADER_H + i * BIT_HEIGHT + BIT_HEIGHT / 2
        const sig = gateData.inputSignals[`bit${bitIndex}`] ?? null
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
                left: 14,
                letterSpacing: '0.04em',
              }}
            >
              b{bitIndex}
            </span>
            <Handle
              type="target"
              position={Position.Left}
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
