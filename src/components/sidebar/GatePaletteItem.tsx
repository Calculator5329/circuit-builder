import { useState } from 'react'
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

function IOPreview({ gateType }: { gateType: string }) {
  const isInput = gateType === 'INPUT'
  const isDecIn = gateType === 'DECIMAL_INPUT'

  if (isInput || gateType === 'OUTPUT') {
    return (
      <div style={{
        width: 24, height: 24, borderRadius: '50%',
        background: 'var(--bg-surface)',
        boxShadow: '0 0 0 1px var(--border-mid)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 8,
          color: 'var(--text-dim)',
        }}>
          {isInput ? 'SW' : 'LED'}
        </span>
      </div>
    )
  }
  return (
    <div style={{
      width: 36, height: 24, borderRadius: 2,
      background: 'var(--bg-surface)',
      boxShadow: '0 0 0 1px var(--border-mid)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: 8,
        color: 'var(--text-dim)',
        letterSpacing: '0.04em',
      }}>
        {isDecIn ? 'DEC' : 'BIN'}
      </span>
    </div>
  )
}

export function GatePaletteItem({ gateType, label, description }: GatePaletteItemProps) {
  const [hovered, setHovered] = useState(false)

  const onDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('application/circuit-gate', JSON.stringify({ gateType }))
    e.dataTransfer.effectAllowed = 'copy'
  }

  const sym = SYMBOL_MAP[gateType]

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={description}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '6px 10px',
        borderRadius: 3,
        cursor: 'grab',
        background: hovered ? 'var(--bg-surface)' : 'transparent',
        boxShadow: hovered ? 'inset 0 0 0 1px var(--border-hi)' : 'inset 0 0 0 1px transparent',
        transition: 'background 0.1s, box-shadow 0.1s',
        userSelect: 'none',
      }}
    >
      <div style={{ width: 40, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {sym ? (
          <svg width={40} height={28} viewBox={sym.viewBox}>
            <g transform="scale(0.5) translate(0, 0)">
              <sym.symbol stroke={hovered ? '#4a5568' : '#2d3748'} />
            </g>
          </svg>
        ) : (
          <IOPreview gateType={gateType} />
        )}
      </div>

      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 11,
          color: hovered ? 'var(--text-bright)' : 'var(--text-primary)',
          letterSpacing: '0.04em',
          transition: 'color 0.1s',
        }}>
          {label}
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 9,
          color: 'var(--text-dim)',
          marginTop: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {description}
        </div>
      </div>
    </div>
  )
}
