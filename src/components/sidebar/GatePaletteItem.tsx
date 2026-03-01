import type { GateType } from '../../types/circuit'
import { AndSymbol } from '../nodes/symbols/AndSymbol'
import { OrSymbol } from '../nodes/symbols/OrSymbol'
import { NotSymbol } from '../nodes/symbols/NotSymbol'
import { NandSymbol } from '../nodes/symbols/NandSymbol'
import { NorSymbol } from '../nodes/symbols/NorSymbol'
import { XorSymbol } from '../nodes/symbols/XorSymbol'
import { XnorSymbol } from '../nodes/symbols/XnorSymbol'

interface GatePaletteItemProps {
  gateType: GateType
  label: string
  description: string
}

const SYMBOL_MAP: Record<string, { symbol: React.ComponentType<{ stroke?: string }>, viewBox: string }> = {
  AND:  { symbol: AndSymbol,  viewBox: '0 0 60 56' },
  OR:   { symbol: OrSymbol,   viewBox: '0 0 60 56' },
  NOT:  { symbol: NotSymbol,  viewBox: '0 0 68 56' },
  NAND: { symbol: NandSymbol, viewBox: '0 0 68 56' },
  NOR:  { symbol: NorSymbol,  viewBox: '0 0 68 56' },
  XOR:  { symbol: XorSymbol,  viewBox: '0 0 60 56' },
  XNOR: { symbol: XnorSymbol, viewBox: '0 0 68 56' },
}

export function GatePaletteItem({ gateType, label, description }: GatePaletteItemProps) {
  const onDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('application/circuit-gate', JSON.stringify({ gateType }))
    e.dataTransfer.effectAllowed = 'copy'
  }

  const sym = SYMBOL_MAP[gateType]

  return (
    <div
      draggable
      onDragStart={onDragStart}
      title={description}
      className="
        flex items-center gap-3 px-3 py-2 rounded-lg cursor-grab active:cursor-grabbing
        bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-500
        transition-all duration-100 select-none group
      "
    >
      {sym ? (
        <svg width={40} height={28} viewBox={sym.viewBox} className="shrink-0">
          <g transform="scale(0.5) translate(0, 0)">
            <sym.symbol stroke="#64748b" />
          </g>
        </svg>
      ) : (
        <div className="w-10 h-7 rounded flex items-center justify-center bg-slate-700 text-[10px] text-slate-400 shrink-0">
          {gateType === 'INPUT' ? (
            <span className="text-green-500 font-bold text-sm">⬤</span>
          ) : (
            <span className="text-yellow-400 font-bold text-sm">◯</span>
          )}
        </div>
      )}
      <div className="min-w-0">
        <div className="text-sm font-medium text-slate-200 group-hover:text-white">{label}</div>
        <div className="text-[10px] text-slate-500 truncate">{description}</div>
      </div>
    </div>
  )
}
