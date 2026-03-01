import { useState } from 'react'
import { useCircuitStore } from '../../store/circuitStore'
import { LibraryCard } from './LibraryCard'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'

export function CircuitLibrary() {
  const { savedCircuits, saveCurrentAsComponent, nodes } = useCircuitStore()
  const [saveOpen, setSaveOpen] = useState(false)
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')

  const hasIO = nodes.some(n => n.data.gateType === 'INPUT') &&
                nodes.some(n => n.data.gateType === 'OUTPUT')

  const handleSave = () => {
    if (!name.trim()) return
    saveCurrentAsComponent(name.trim(), desc.trim() || undefined)
    setName('')
    setDesc('')
    setSaveOpen(false)
  }

  return (
    <div className="flex flex-col gap-2 p-3">
      <Button
        variant="primary"
        size="sm"
        onClick={() => setSaveOpen(true)}
        disabled={nodes.length === 0}
        className="w-full justify-center"
      >
        + Save current as component
      </Button>

      {!hasIO && nodes.length > 0 && (
        <p className="text-[10px] text-amber-500/80 px-1">
          Tip: add INPUT and OUTPUT nodes to define this component's ports.
        </p>
      )}

      {savedCircuits.length === 0 ? (
        <p className="text-xs text-slate-500 text-center py-6">
          No saved components yet.
          <br />Build a circuit and save it!
        </p>
      ) : (
        <div className="flex flex-col gap-1.5 mt-1">
          {savedCircuits.map(sc => (
            <LibraryCard key={sc.id} circuit={sc} />
          ))}
        </div>
      )}

      <Modal open={saveOpen} onClose={() => setSaveOpen(false)} title="Save as Component">
        <div className="flex flex-col gap-3">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Name *</label>
            <input
              autoFocus
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSave() }}
              placeholder="e.g. Half Adder"
              className="w-full bg-slate-700 border border-slate-600 focus:border-violet-500 rounded-lg px-3 py-2 text-sm text-white outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Description (optional)</label>
            <input
              value={desc}
              onChange={e => setDesc(e.target.value)}
              placeholder="What does this circuit do?"
              className="w-full bg-slate-700 border border-slate-600 focus:border-violet-500 rounded-lg px-3 py-2 text-sm text-white outline-none transition-colors"
            />
          </div>
          <div className="flex gap-2 justify-end mt-1">
            <Button variant="ghost" onClick={() => setSaveOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleSave} disabled={!name.trim()}>Save</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
