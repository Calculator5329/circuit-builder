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
          background: '#0a0f0a',
          boxShadow: selected
            ? '0 0 0 2px #ffb300, 0 0 14px rgba(255,179,0,0.5)'
            : isOn
              ? '0 0 0 1px #00ff41, 0 0 20px rgba(0,255,65,0.6), 0 0 40px rgba(0,255,65,0.25)'
              : isFloat
                ? '0 0 0 1px #ffb30066, 0 0 8px rgba(255,179,0,0.15)'
                : '0 0 0 1px #1a3a1a',
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
              ? 'radial-gradient(circle at 35% 30%, #ccffdd, #00ff41 45%, #00bb2e 75%, #005a18)'
              : isFloat
                ? 'radial-gradient(circle at 35% 30%, #3a2f00, #ffb30033 45%, #1a1000)'
                : 'radial-gradient(circle at 35% 30%, #0f1a0f, #060b06)',
            boxShadow: isOn
              ? 'inset 0 -3px 8px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.15)'
              : 'inset 0 2px 6px rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s ease',
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
            background: isOn ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.06)',
            transform: 'rotate(-25deg)',
            pointerEvents: 'none',
          }} />
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 11,
            fontWeight: 600,
            color: isOn ? '#002b0d' : isFloat ? '#7a5500' : '#1a3a1a',
            lineHeight: 1,
            userSelect: 'none',
            zIndex: 1,
          }}>
            {isFloat ? '?' : isOn ? '1' : '0'}
          </span>
        </div>
      </div>

      {/* PCB silkscreen label */}
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: 9,
        color: selected ? '#ffb30099' : '#2a5a2a',
        letterSpacing: '0.08em',
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
          border: '1px solid #060b06',
          top: '42%',
        }}
      />
    </div>
  )
}
