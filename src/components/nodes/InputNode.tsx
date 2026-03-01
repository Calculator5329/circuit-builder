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
    <div className="flex flex-col items-center gap-1 select-none">
      <div
        onPointerDown={(e) => {
          e.stopPropagation()
          toggleInput(id)
        }}
        className={`
          nodrag w-11 h-11 rounded-full border-2 cursor-pointer transition-all duration-150
          flex items-center justify-center text-xs font-bold
          ${isOn
            ? 'bg-green-500 border-green-300 text-green-900 shadow-[0_0_12px_rgba(34,197,94,0.6)]'
            : 'bg-slate-700 border-slate-500 text-slate-400'
          }
        `}
        style={{ pointerEvents: 'all' }}
      >
        {isOn ? '1' : '0'}
      </div>
      <span className="text-[10px] text-slate-400 max-w-[64px] truncate">{gateData.label}</span>
      <Handle
        type="source"
        position={Position.Right}
        id="out0"
        style={{
          background: signalToColor(signal),
          width: 10, height: 10,
          border: '2px solid #0f172a',
          top: '40%',
        }}
      />
      {selected && (
        <div className="absolute inset-0 rounded-full pointer-events-none ring-2 ring-blue-400 ring-offset-1 ring-offset-slate-900" />
      )}
    </div>
  )
}
