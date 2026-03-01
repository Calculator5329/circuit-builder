import { useRef, useState } from 'react'
import { useCircuitStore } from '../../store/circuitStore'
import { Button } from '../ui/Button'
import { Modal } from '../ui/Modal'

export function Toolbar() {
  const {
    circuitName, setCircuitName,
    clearCanvas, nodes,
    exportToJSON, importFromJSON: importJSON,
  } = useCircuitStore()

  const [editingName, setEditingName] = useState(false)
  const [nameVal, setNameVal] = useState(circuitName)
  const [clearConfirm, setClearConfirm] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const commitName = () => {
    if (nameVal.trim()) setCircuitName(nameVal.trim())
    else setNameVal(circuitName)
    setEditingName(false)
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      try {
        importJSON(ev.target?.result as string)
      } catch {
        alert('Invalid circuit file.')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <div
      className="flex items-center gap-3 px-4 shrink-0"
      style={{
        height: 44,
        background: 'var(--bg-panel)',
        borderBottom: '1px solid var(--border-mid)',
        boxShadow: '0 1px 0 var(--border-dim), 0 2px 12px rgba(0,0,0,0.5)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 mr-1 shrink-0">
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 15,
            color: 'var(--phosphor-hi)',
            letterSpacing: '0.04em',
            lineHeight: 1,
          }}
        >
          <span style={{ color: 'var(--amber)' }}>[</span>
          CB
          <span style={{ color: 'var(--amber)' }}>]</span>
        </div>
        <div
          style={{
            width: 1,
            height: 20,
            background: 'var(--border-mid)',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 10,
            color: 'var(--text-dim)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
          className="hidden sm:block"
        >
          CIRCUIT·BUILDER
        </span>
      </div>

      {/* Circuit name — breadcrumb style */}
      <div className="flex items-center gap-1 min-w-0">
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 10,
            color: 'var(--text-dim)',
            letterSpacing: '0.06em',
            flexShrink: 0,
          }}
        >
          ▶
        </span>
        {editingName ? (
          <input
            autoFocus
            value={nameVal}
            onChange={e => setNameVal(e.target.value)}
            onBlur={commitName}
            onKeyDown={e => {
              if (e.key === 'Enter') commitName()
              if (e.key === 'Escape') { setNameVal(circuitName); setEditingName(false) }
            }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 12,
              color: 'var(--text-bright)',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-hi)',
              borderRadius: 2,
              padding: '2px 8px',
              outline: 'none',
              width: 176,
              letterSpacing: '0.04em',
            }}
          />
        ) : (
          <button
            onClick={() => { setNameVal(circuitName); setEditingName(true) }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 12,
              color: 'var(--text-primary)',
              background: 'transparent',
              border: 'none',
              borderRadius: 2,
              padding: '2px 6px',
              cursor: 'text',
              letterSpacing: '0.04em',
              transition: 'color 0.12s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-bright)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-primary)')}
          >
            {circuitName}
          </button>
        )}
      </div>

      <div className="flex-1" />

      {/* Node count readout */}
      {nodes.length > 0 && (
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 9,
            color: 'var(--text-dim)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            borderLeft: '1px solid var(--border-dim)',
            paddingLeft: 10,
          }}
          className="hidden md:block"
        >
          {nodes.length} NODES
        </div>
      )}

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        <Button variant="secondary" size="sm" onClick={exportToJSON} title="Export to JSON file">
          EXPORT
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          title="Import from JSON file"
        >
          IMPORT
        </Button>
        <input ref={fileInputRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
        <Button
          variant="danger"
          size="sm"
          onClick={() => setClearConfirm(true)}
          disabled={nodes.length === 0}
          title="Clear canvas"
        >
          CLR
        </Button>
      </div>

      {/* Confirm clear modal */}
      <Modal open={clearConfirm} onClose={() => setClearConfirm(false)} title="CLEAR CANVAS?">
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          color: 'var(--text-primary)',
          marginBottom: 16,
          lineHeight: 1.6,
        }}>
          This will erase all nodes and wires.<br />
          <span style={{ color: 'var(--danger)', fontSize: 11 }}>This action cannot be undone.</span>
        </p>
        <div className="flex gap-2 justify-end">
          <Button variant="ghost" onClick={() => setClearConfirm(false)}>CANCEL</Button>
          <Button variant="danger" onClick={() => { clearCanvas(); setClearConfirm(false) }}>CLR</Button>
        </div>
      </Modal>
    </div>
  )
}
