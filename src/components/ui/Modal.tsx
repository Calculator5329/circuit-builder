import { useEffect, type ReactNode } from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.78)',
        backdropFilter: 'blur(3px)',
      }}
      onPointerDown={onClose}
    >
      {/* Panel */}
      <div
        style={{
          background: 'var(--bg-panel)',
          border: '1px solid var(--border-mid)',
          borderRadius: 3,
          boxShadow: '0 0 0 1px var(--border-dim), 0 24px 60px rgba(0,0,0,0.7), 0 0 40px rgba(0,255,65,0.03)',
          width: '100%',
          maxWidth: 440,
          margin: '0 16px',
          overflow: 'hidden',
        }}
        onPointerDown={e => e.stopPropagation()}
      >
        {/* Title bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 16px',
            borderBottom: '1px solid var(--border-dim)',
            background: 'var(--bg-surface)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 9,
              color: 'var(--border-hi)',
              letterSpacing: '0.06em',
            }}>
              ▶_
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 12,
              color: 'var(--text-bright)',
              letterSpacing: '0.1em',
              margin: 0,
            }}>
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-display)',
              fontSize: 14,
              color: 'var(--text-dim)',
              lineHeight: 1,
              padding: '2px 4px',
              borderRadius: 2,
              transition: 'color 0.12s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--danger)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-dim)')}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '20px 16px 16px' }}>
          {children}
        </div>
      </div>
    </div>
  )
}
