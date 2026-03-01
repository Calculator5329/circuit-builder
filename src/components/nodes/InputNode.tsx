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
          background: '#0d1117',
          boxShadow: selected
            ? '0 0 0 2px #f59e0b, 0 0 12px rgba(245,158,11,0.4)'
            : isOn
              ? '0 0 0 2px #22c55e, 0 0 16px rgba(34,197,94,0.45)'
              : '0 0 0 1px #2d3748, inset 0 0 0 1px #1f2637',
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
              ? 'radial-gradient(circle at 38% 35%, #86efac, #22c55e 55%, #16a34a)'
              : 'radial-gradient(circle at 38% 35%, #1e293b, #0f172a 55%, #0a0f1a)',
            boxShadow: isOn
              ? 'inset 0 -2px 4px rgba(0,0,0,0.3)'
              : 'inset 0 2px 4px rgba(0,0,0,0.5), inset 0 -1px 2px rgba(255,255,255,0.04)',
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
            color: isOn ? '#052e16' : '#4a5568',
            lineHeight: 1,
            userSelect: 'none',
          }}>
            {isOn ? '1' : '0'}
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
        type="source"
        position={Position.Right}
        id="out0"
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
