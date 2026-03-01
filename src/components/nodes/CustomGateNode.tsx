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
      <div className="bg-red-900/50 border border-red-500 rounded px-3 py-2 text-xs text-red-300">
        Missing: {gateData.label}
      </div>
    )
  }

  const inputCount = savedCircuit.inputPorts.length
  const outputCount = savedCircuit.outputPorts.length
  const rows = Math.max(inputCount, outputCount, 1)
  const height = rows * 28 + 32

  return (
    <div
      className={`
        relative bg-slate-800 rounded-lg px-3 py-2 min-w-[120px]
        border-2 transition-all
        ${selected ? 'border-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.4)]' : 'border-violet-600'}
      `}
      style={{ height }}
    >
      <div className="text-center text-xs text-violet-300 font-bold mb-1 truncate max-w-[120px]">
        {savedCircuit.name}
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
                width: 10, height: 10,
                border: '2px solid #0f172a',
              }}
            />
            <span
              className="absolute text-[9px] text-slate-400 pointer-events-none"
              style={{ top: `calc(${topPct}% - 6px)`, left: 10 }}
            >
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
                width: 10, height: 10,
                border: '2px solid #0f172a',
              }}
            />
            <span
              className="absolute text-[9px] text-slate-400 pointer-events-none text-right"
              style={{ top: `calc(${topPct}% - 6px)`, right: 10 }}
            >
              {port.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
