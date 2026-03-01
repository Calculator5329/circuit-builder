import { useState } from 'react'
import { GatePalette } from './GatePalette'
import { CircuitLibrary } from './CircuitLibrary'

type Tab = 'gates' | 'library'

export function Sidebar() {
  const [tab, setTab] = useState<Tab>('gates')

  return (
    <div
      className="flex flex-col h-full shrink-0"
      style={{
        width: 240,
        background: 'var(--bg-panel)',
        borderRight: '1px solid var(--border-mid)',
      }}
    >
      {/* Tab bar */}
      <div
        className="flex"
        style={{ borderBottom: '1px solid var(--border-dim)' }}
      >
        {(['gates', 'library'] as Tab[]).map(t => {
          const active = tab === t
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1,
                padding: '10px 0',
                fontFamily: 'var(--font-display)',
                fontSize: 10,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                background: 'transparent',
                border: 'none',
                borderBottom: active ? '2px solid var(--amber)' : '2px solid transparent',
                color: active ? 'var(--amber)' : 'var(--text-dim)',
                transition: 'color 0.15s, border-color 0.15s',
              }}
              onMouseEnter={e => {
                if (!active) e.currentTarget.style.color = 'var(--text-primary)'
              }}
              onMouseLeave={e => {
                if (!active) e.currentTarget.style.color = 'var(--text-dim)'
              }}
            >
              {t === 'gates' ? 'GATES' : 'LIBRARY'}
            </button>
          )
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {tab === 'gates' ? <GatePalette /> : <CircuitLibrary />}
      </div>
    </div>
  )
}
