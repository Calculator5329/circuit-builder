import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { GateNodeData } from '../../types/circuit'
import { signalToColor } from '../../utils/signalUtils'
import { useCircuitStore } from '../../store/circuitStore'

export function CustomGateNode({ data, selected }: NodeProps) {
  const gateData = data as GateNodeData
  const savedCircuit = useCircuitStore(s =>
    s.savedCircuits.find(c => c.id === gateData.customCircuitId)
  )

  if (!savedCircuit) {
    return (
      <div style={{
        background: '#1a0808',
        boxShadow: 'inset 0 0 0 1px var(--danger)',
        borderRadius: 3,
        padding: '6px 10px',
        fontFamily: 'var(--font-display)',
        fontSize: 10,
        color: 'var(--danger)',
        letterSpacing: '0.06em',
      }}>
        MISSING: {gateData.label}
      </div>
    )
  }

  const inputCount = savedCircuit.inputPorts.length
  const outputCount = savedCircuit.outputPorts.length
  const rows = Math.max(inputCount, outputCount, 1)
  const height = rows * 28 + 44
  const borderColor = selected ? '#ffb300' : '#3a2800'
  const glowColor = selected ? 'rgba(255,179,0,0.4)' : 'rgba(255,179,0,0.02)'

  return (
    <div
      style={{
        position: 'relative',
        minWidth: 124,
        height,
        background: '#070d07',
        borderRadius: 3,
        boxShadow: `inset 0 0 0 1px ${borderColor}, 0 0 12px ${glowColor}`,
        transition: 'box-shadow 0.15s',
        padding: '6px 8px 4px',
      }}
    >
      {/* IC chip header */}
      <div style={{
        borderBottom: '1px solid var(--border-dim)',
        paddingBottom: 4,
        marginBottom: 2,
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 8,
          color: 'var(--text-dim)',
          letterSpacing: '0.1em',
          marginBottom: 2,
        }}>
          IC
        </div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 10,
          color: selected ? '#ffb300' : '#7a5500',
          letterSpacing: '0.06em',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: 108,
        }}>
          {savedCircuit.name}
        </div>
      </div>

      {savedCircuit.inputPorts.map((port, i) => {
        const topPct = ((i + 1) / (inputCount + 1)) * 100
        return (
          <div key={port.id}>
            <Handle
              type="target"
              position={Position.Left}
              id={port.id}
              style={{
                top: `${topPct}%`,
                background: signalToColor(gateData.inputSignals[port.id] ?? null),
                width: 9,
                height: 9,
                borderRadius: 2,
                border: '1px solid #060b06',
              }}
            />
            <span style={{
              position: 'absolute',
              fontFamily: 'var(--font-display)',
              fontSize: 8,
              color: 'var(--text-dim)',
              pointerEvents: 'none',
              letterSpacing: '0.04em',
              top: `calc(${topPct}% - 6px)`,
              left: 10,
            }}>
              {port.label}
            </span>
          </div>
        )
      })}

      {savedCircuit.outputPorts.map((port, i) => {
        const topPct = ((i + 1) / (outputCount + 1)) * 100
        return (
          <div key={port.id}>
            <Handle
              type="source"
              position={Position.Right}
              id={port.id}
              style={{
                top: `${topPct}%`,
                background: signalToColor(gateData.outputSignals[port.id] ?? null),
                width: 9,
                height: 9,
                borderRadius: 2,
                border: '1px solid #060b06',
              }}
            />
            <span style={{
              position: 'absolute',
              fontFamily: 'var(--font-display)',
              fontSize: 8,
              color: 'var(--text-dim)',
              pointerEvents: 'none',
              letterSpacing: '0.04em',
              textAlign: 'right',
              top: `calc(${topPct}% - 6px)`,
              right: 10,
            }}>
              {port.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
