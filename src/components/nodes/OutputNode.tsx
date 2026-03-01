import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { GateNodeData } from '../../types/circuit'
import { signalToColor } from '../../utils/signalUtils'

export function OutputNode({ data, selected }: NodeProps) {
  const gateData = data as GateNodeData
  const signal = gateData.inputSignals['in0'] ?? null
  const isOn = signal === 1
  const isFloat = signal === null

  return (
    <div className="flex flex-col items-center gap-1.5 select-none">
      {/* LED dome */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: '#0d1117',
          boxShadow: selected
            ? '0 0 0 2px #f59e0b, 0 0 12px rgba(245,158,11,0.4)'
            : isOn
              ? '0 0 0 1px #22c55e, 0 0 18px rgba(34,197,94,0.5), 0 0 32px rgba(34,197,94,0.2)'
              : isFloat
                ? '0 0 0 1px rgba(245,158,11,0.4)'
                : '0 0 0 1px #2d3748',
          transition: 'box-shadow 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Glass dome inner */}
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: isOn
              ? 'radial-gradient(circle at 35% 30%, #bbf7d0, #22c55e 45%, #15803d 75%, #052e16)'
              : isFloat
                ? 'radial-gradient(circle at 35% 30%, #2d2100, rgba(245,158,11,0.2) 45%, #1a1400)'
                : 'radial-gradient(circle at 35% 30%, #1e293b, #0f172a)',
            boxShadow: isOn
              ? 'inset 0 -3px 8px rgba(0,0,0,0.25), inset 0 2px 4px rgba(255,255,255,0.1)'
              : 'inset 0 2px 6px rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s ease',
            position: 'relative',
          }}
        >
          {/* Lens highlight */}
          <div style={{
            position: 'absolute',
            top: '28%',
            left: '30%',
            width: 8,
            height: 5,
            borderRadius: '50%',
            background: isOn ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.05)',
            transform: 'rotate(-25deg)',
            pointerEvents: 'none',
          }} />
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 11,
            fontWeight: 600,
            color: isOn ? '#052e16' : isFloat ? '#78350f' : '#4a5568',
            lineHeight: 1,
            userSelect: 'none',
            zIndex: 1,
          }}>
            {isFloat ? '?' : isOn ? '1' : '0'}
          </span>
        </div>
      </div>

      {/* Label */}
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: 9,
        color: selected ? 'rgba(245,158,11,0.7)' : '#4a5568',
        letterSpacing: '0.06em',
        maxWidth: 64,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}>
        {gateData.label}
      </span>

      <Handle
        type="target"
        position={Position.Left}
        id="in0"
        style={{
          background: signalToColor(signal),
          width: 9,
          height: 9,
          borderRadius: 2,
          border: '1px solid #0d1117',
          top: '42%',
        }}
      />
    </div>
  )
}
