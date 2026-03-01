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
      className="
        group relative flex items-start gap-2 px-3 py-2 rounded-lg
        bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-violet-600
        cursor-grab active:cursor-grabbing transition-all duration-100 select-none
      "
    >
      <div className="flex-1 min-w-0">
        {renaming ? (
          <input
            autoFocus
            value={nameVal}
            onChange={e => setNameVal(e.target.value)}
            onBlur={commitRename}
            onKeyDown={e => { if (e.key === 'Enter') commitRename(); if (e.key === 'Escape') setRenaming(false) }}
            className="w-full bg-slate-700 border border-violet-500 rounded px-1 py-0.5 text-sm text-white outline-none"
            onClick={e => e.stopPropagation()}
          />
        ) : (
          <div className="text-sm font-medium text-slate-200 truncate">{circuit.name}</div>
        )}
        <div className="text-[10px] text-slate-500 mt-0.5">
          {circuit.inputPorts.length}in · {circuit.outputPorts.length}out
        </div>
      </div>

      {/* Menu button */}
      <div className="relative">
        <button
          className="text-slate-500 hover:text-slate-300 text-lg leading-none px-1 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={e => { e.stopPropagation(); setMenuOpen(v => !v) }}
        >
          ⋯
        </button>
        {menuOpen && (
          <div
            className="absolute right-0 top-6 z-20 bg-slate-700 border border-slate-600 rounded-lg shadow-xl py-1 w-28"
            onPointerDown={e => e.stopPropagation()}
          >
            <button
              className="w-full text-left px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-600"
              onClick={() => { setRenaming(true); setMenuOpen(false) }}
            >
              Rename
            </button>
            <button
              className="w-full text-left px-3 py-1.5 text-xs text-red-400 hover:bg-slate-600"
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
