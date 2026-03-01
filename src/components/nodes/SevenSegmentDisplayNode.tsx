import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { GateNodeData, Signal } from '../../types/circuit'
import { signalToColor } from '../../utils/signalUtils'

const SEGMENT_IDS = ['a', 'b', 'c', 'd', 'e', 'f', 'g'] as const

interface SegmentPath {
  d: string
}

const SEGMENT_PATHS: Record<string, SegmentPath> = {
  a: { d: 'M 12 4 L 38 4 L 35 9 L 15 9 Z' },
  b: { d: 'M 39 6 L 39 24 L 36 21 L 36 9 Z' },
  c: { d: 'M 39 26 L 39 44 L 36 41 L 36 29 Z' },
  d: { d: 'M 12 46 L 38 46 L 35 41 L 15 41 Z' },
  e: { d: 'M 11 26 L 11 44 L 14 41 L 14 29 Z' },
  f: { d: 'M 11 6 L 11 24 L 14 21 L 14 9 Z' },
  g: { d: 'M 13 23 L 37 23 L 35 27 L 15 27 Z' },
}

function isLit(signal: Signal): boolean {
  return signal === 1
}

export function SevenSegmentDisplayNode({ data, selected }: NodeProps) {
  const gateData = data as GateNodeData

  return (
    <div className="flex flex-col items-center gap-1 select-none">
      <div
        style={{
          width: 64,
          height: 80,
          borderRadius: 8,
          background: '#0a0f14',
          boxShadow: selected
            ? '0 0 0 2px #f59e0b, 0 0 12px rgba(245,158,11,0.4)'
            : '0 0 0 1px #1e293b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: 6,
        }}
      >
        <svg viewBox="0 0 50 50" width="50" height="50">
          {SEGMENT_IDS.map(seg => {
            const signal = gateData.inputSignals[seg] ?? null
            const lit = isLit(signal)
            return (
              <path
                key={seg}
                d={SEGMENT_PATHS[seg].d}
                fill={lit ? '#ef4444' : '#1e293b'}
                opacity={lit ? 1 : 0.3}
                style={{ transition: 'fill 0.15s ease, opacity 0.15s ease' }}
              />
            )
          })}
        </svg>

        {SEGMENT_IDS.map((seg, i) => (
          <Handle
            key={seg}
            type="target"
            position={Position.Left}
            id={seg}
            style={{
              background: signalToColor(gateData.inputSignals[seg] ?? null),
              width: 7,
              height: 7,
              borderRadius: 2,
              border: '1px solid #0d1117',
              top: `${14 + i * 9}%`,
              left: -4,
            }}
          />
        ))}
      </div>

      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: 9,
        color: selected ? 'rgba(245,158,11,0.7)' : '#4a5568',
        letterSpacing: '0.06em',
      }}>
        {gateData.label}
      </span>
    </div>
  )
}
