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
    <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-900 border-b border-slate-800 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2 mr-2">
        <div className="w-6 h-6 rounded bg-violet-600 flex items-center justify-center text-white text-xs font-bold">
          ⚡
        </div>
        <span className="text-slate-300 font-semibold text-sm hidden sm:block">Circuit Builder</span>
      </div>

      {/* Circuit name */}
      <div className="flex items-center gap-1">
        {editingName ? (
          <input
            autoFocus
            value={nameVal}
            onChange={e => setNameVal(e.target.value)}
            onBlur={commitName}
            onKeyDown={e => { if (e.key === 'Enter') commitName(); if (e.key === 'Escape') { setNameVal(circuitName); setEditingName(false) } }}
            className="bg-slate-700 border border-violet-500 rounded px-2 py-1 text-sm text-white outline-none w-44"
          />
        ) : (
          <button
            onClick={() => { setNameVal(circuitName); setEditingName(true) }}
            className="text-slate-200 hover:text-white text-sm font-medium px-2 py-1 rounded hover:bg-slate-700 transition-colors"
          >
            {circuitName}
          </button>
        )}
      </div>

      <div className="flex-1" />

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button variant="secondary" size="sm" onClick={exportToJSON} title="Export to JSON file">
          Export
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          title="Import from JSON file"
        >
          Import
        </Button>
        <input ref={fileInputRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
        <Button
          variant="danger"
          size="sm"
          onClick={() => setClearConfirm(true)}
          disabled={nodes.length === 0}
          title="Clear canvas"
        >
          Clear
        </Button>
      </div>

      {/* Confirm clear modal */}
      <Modal open={clearConfirm} onClose={() => setClearConfirm(false)} title="Clear Canvas?">
        <p className="text-slate-300 text-sm mb-4">
          This will remove all nodes and wires. This action cannot be undone.
        </p>
        <div className="flex gap-2 justify-end">
          <Button variant="ghost" onClick={() => setClearConfirm(false)}>Cancel</Button>
          <Button variant="danger" onClick={() => { clearCanvas(); setClearConfirm(false) }}>Clear</Button>
        </div>
      </Modal>
    </div>
  )
}
