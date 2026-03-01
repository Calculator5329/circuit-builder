import { useState } from 'react'
import { GatePalette } from './GatePalette'
import { CircuitLibrary } from './CircuitLibrary'

type Tab = 'gates' | 'library'

export function Sidebar() {
  const [tab, setTab] = useState<Tab>('gates')

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800 w-64 shrink-0">
      {/* Tab bar */}
      <div className="flex border-b border-slate-800">
        {(['gates', 'library'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`
              flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors
              ${tab === t
                ? 'text-violet-400 border-b-2 border-violet-500 bg-slate-800/50'
                : 'text-slate-500 hover:text-slate-300'
              }
            `}
          >
            {t === 'gates' ? 'Gates' : 'Library'}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {tab === 'gates' ? <GatePalette /> : <CircuitLibrary />}
      </div>
    </div>
  )
}
