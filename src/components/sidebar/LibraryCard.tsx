import { useState } from 'react'
import type { SavedCircuit } from '../../types/circuit'
import { useCircuitStore } from '../../store/circuitStore'

interface LibraryCardProps {
  circuit: SavedCircuit
}

export function LibraryCard({ circuit }: LibraryCardProps) {
  const { deleteFromLibrary, renameInLibrary } = useCircuitStore()
  const [menuOpen, setMenuOpen] = useState(false)
  const [renaming, setRenaming] = useState(false)
  const [nameVal, setNameVal] = useState(circuit.name)
  const [hovered, setHovered] = useState(false)

  const onDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('application/circuit-gate', JSON.stringify({
      gateType: 'CUSTOM',
      savedCircuitId: circuit.id,
    }))
    e.dataTransfer.effectAllowed = 'copy'
  }

  const commitRename = () => {
    if (nameVal.trim()) renameInLibrary(circuit.id, nameVal.trim())
    setRenaming(false)
  }

  return (
    <div
      draggable={!renaming}
      onDragStart={onDragStart}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 8,
        padding: '8px 10px',
        borderRadius: 3,
        cursor: renaming ? 'default' : 'grab',
        background: hovered ? 'var(--bg-surface)' : 'transparent',
        boxShadow: hovered ? 'inset 0 0 0 1px var(--border-hi)' : 'inset 0 0 0 1px transparent',
        transition: 'background 0.12s, box-shadow 0.12s',
        userSelect: 'none',
        position: 'relative',
      }}
    >
      {/* IC chip indicator */}
      <div style={{
        width: 20,
        height: 20,
        borderRadius: 2,
        background: 'var(--bg-canvas)',
        boxShadow: 'inset 0 0 0 1px var(--border-mid)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        marginTop: 1,
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 7, color: 'var(--text-dim)', letterSpacing: '0' }}>IC</span>
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        {renaming ? (
          <input
            autoFocus
            value={nameVal}
            onChange={e => setNameVal(e.target.value)}
            onBlur={commitRename}
            onKeyDown={e => {
              if (e.key === 'Enter') commitRename()
              if (e.key === 'Escape') setRenaming(false)
            }}
            style={{
              width: '100%',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-hi)',
              borderRadius: 2,
              padding: '2px 6px',
              fontFamily: 'var(--font-display)',
              fontSize: 11,
              color: 'var(--text-bright)',
              outline: 'none',
            }}
            onClick={e => e.stopPropagation()}
          />
        ) : (
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 11,
            color: hovered ? 'var(--text-bright)' : 'var(--text-primary)',
            letterSpacing: '0.04em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            transition: 'color 0.12s',
          }}>
            {circuit.name}
          </div>
        )}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 9,
          color: 'var(--text-dim)',
          marginTop: 2,
          letterSpacing: '0.06em',
        }}>
          {circuit.inputPorts.length}in · {circuit.outputPorts.length}out
        </div>
      </div>

      {/* Context menu button */}
      <div style={{ position: 'relative' }}>
        <button
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0 4px',
            fontFamily: 'var(--font-display)',
            fontSize: 14,
            color: hovered ? 'var(--text-dim)' : 'transparent',
            lineHeight: 1,
            transition: 'color 0.12s',
          }}
          onClick={e => { e.stopPropagation(); setMenuOpen(v => !v) }}
        >
          ···
        </button>
        {menuOpen && (
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 20,
              zIndex: 20,
              background: 'var(--bg-panel)',
              border: '1px solid var(--border-mid)',
              borderRadius: 3,
              boxShadow: '0 4px 16px rgba(0,0,0,0.6)',
              overflow: 'hidden',
              minWidth: 110,
            }}
            onPointerDown={e => e.stopPropagation()}
          >
            <button
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '7px 12px',
                fontFamily: 'var(--font-display)',
                fontSize: 10,
                letterSpacing: '0.08em',
                color: 'var(--text-primary)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.1s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-surface)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              onClick={() => { setRenaming(true); setMenuOpen(false) }}
            >
              Rename
            </button>
            <button
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '7px 12px',
                fontFamily: 'var(--font-display)',
                fontSize: 10,
                letterSpacing: '0.08em',
                color: 'var(--danger)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.1s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-surface)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              onClick={() => { deleteFromLibrary(circuit.id); setMenuOpen(false) }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
