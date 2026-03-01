import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { GateNodeData } from '../../types/circuit'
import { signalToColor } from '../../utils/signalUtils'

export function OutputNode({ data, selected }: NodeProps) {
  const gateData = data as GateNodeData
  const signal = gateData.inputSignals['in0'] ?? null
  const isOn = signal === 1

  return (
    <div className="flex flex-col items-center gap-1 select-none">
      <Handle
        type="target"
        position={Position.Left}
        id="in0"
        style={{
          background: signalToColor(signal),
          width: 10, height: 10,
          border: '2px solid #0f172a',
          top: '40%',
        }}
      />
      <div
        className={`
          w-11 h-11 rounded-full border-2 transition-all duration-150
          flex items-center justify-center text-xs font-bold
          ${isOn
            ? 'bg-yellow-400 border-yellow-200 text-yellow-900 shadow-[0_0_16px_rgba(250,204,21,0.7)]'
            : 'bg-slate-800 border-slate-600 text-slate-500'
          }
        `}
      >
        {signal !== null ? (isOn ? '1' : '0') : '?'}
      </div>
      <span className="text-[10px] text-slate-400 max-w-[64px] truncate">{gateData.label}</span>
      {selected && (
        <div className="absolute inset-0 rounded-full pointer-events-none ring-2 ring-blue-400" />
      )}
    </div>
  )
}
