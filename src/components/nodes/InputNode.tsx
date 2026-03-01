import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { GateNodeData } from '../../types/circuit'
import { signalToColor } from '../../utils/signalUtils'
import { useCircuitStore } from '../../store/circuitStore'

export function InputNode({ data, id, selected }: NodeProps) {
  const gateData = data as GateNodeData
  const toggleInput = useCircuitStore(s => s.toggleInput)
  const signal = gateData.outputSignals['out0'] ?? null
  const isOn = signal === 1

  return (
    <div className="flex flex-col items-center gap-1.5 select-none">
      {/* Pushbutton outer bezel */}
      <div
        className="nodrag"
        onPointerDown={(e) => {
          e.stopPropagation()
          toggleInput(id)
        }}
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: '#0a0f0a',
          boxShadow: selected
            ? '0 0 0 2px #ffb300, 0 0 14px rgba(255,179,0,0.5)'
            : isOn
              ? '0 0 0 2px #00ff41, 0 0 18px rgba(0,255,65,0.55), 0 0 30px rgba(0,255,65,0.2)'
              : '0 0 0 1px #254525, inset 0 0 0 1px #172817',
          transition: 'box-shadow 0.15s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          position: 'relative',
          pointerEvents: 'all',
        }}
      >
        {/* Inner cap */}
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: isOn
              ? 'radial-gradient(circle at 38% 35%, #6fffaa, #00ff41 55%, #00bb2e)'
              : 'radial-gradient(circle at 38% 35%, #1e3a1e, #0d2b0d 55%, #071207)',
            boxShadow: isOn
              ? 'inset 0 -2px 4px rgba(0,0,0,0.4)'
              : 'inset 0 2px 4px rgba(0,0,0,0.6), inset 0 -1px 2px rgba(255,255,255,0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.12s ease',
            pointerEvents: 'none',
          }}
        >
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 12,
            fontWeight: 600,
            color: isOn ? '#002b0d' : '#1a4a1a',
            lineHeight: 1,
            userSelect: 'none',
          }}>
            {isOn ? '1' : '0'}
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
        type="source"
        position={Position.Right}
        id="out0"
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
