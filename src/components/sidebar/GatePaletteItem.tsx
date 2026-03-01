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
  const isDecOut = gateType === 'DECIMAL_OUTPUT'

  if (isInput) {
    return (
      <div style={{
        width: 24, height: 24, borderRadius: '50%',
        background: 'radial-gradient(circle at 38% 35%, #1e3a1e, #0d2b0d)',
        boxShadow: '0 0 0 1px #254525',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 9, color: '#2a5a2a' }}>SW</span>
      </div>
    )
  }
  if (gateType === 'OUTPUT') {
    return (
      <div style={{
        width: 24, height: 24, borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 30%, #0f1a0f, #060b06)',
        boxShadow: '0 0 0 1px #1a3a1a',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 9, color: '#2a5a2a' }}>LED</span>
      </div>
    )
  }
  const label = isDecIn ? 'DEC' : isDecOut ? 'BIN' : '?'
  const color = isDecIn ? '#254525' : '#3a2800'
  return (
    <div style={{
      width: 36, height: 24, borderRadius: 2,
      background: 'var(--bg-surface)',
      boxShadow: `0 0 0 1px ${color}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 9, color, letterSpacing: '0.06em' }}>{label}</span>
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
        padding: '7px 10px',
        borderRadius: 3,
        cursor: 'grab',
        background: hovered ? 'var(--bg-surface)' : 'transparent',
        boxShadow: hovered ? 'inset 0 0 0 1px var(--border-hi)' : 'inset 0 0 0 1px transparent',
        transition: 'background 0.12s, box-shadow 0.12s',
        userSelect: 'none',
      }}
    >
      {/* Symbol preview */}
      <div style={{
        width: 40,
        height: 28,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        {sym ? (
          <svg width={40} height={28} viewBox={sym.viewBox}>
            <g transform="scale(0.5) translate(0, 0)">
              <sym.symbol stroke={hovered ? '#3a7a3a' : '#254525'} />
            </g>
          </svg>
        ) : (
          <IOPreview gateType={gateType} />
        )}
      </div>

      {/* Label + description */}
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 11,
          color: hovered ? 'var(--text-bright)' : 'var(--text-primary)',
          letterSpacing: '0.06em',
          transition: 'color 0.12s',
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
