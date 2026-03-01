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
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(4px)',
      }}
      onPointerDown={onClose}
    >
      <div
        style={{
          background: 'var(--bg-panel)',
          border: '1px solid var(--border-mid)',
          borderRadius: 4,
          boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
          width: '100%',
          maxWidth: 440,
          margin: '0 16px',
          overflow: 'hidden',
        }}
        onPointerDown={e => e.stopPropagation()}
      >
        {/* Title bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          borderBottom: '1px solid var(--border-dim)',
          background: 'var(--bg-surface)',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 12,
            color: 'var(--text-bright)',
            letterSpacing: '0.06em',
            margin: 0,
          }}>
            {title}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              fontSize: 16,
              color: 'var(--text-dim)',
              lineHeight: 1,
              padding: '2px 4px',
              transition: 'color 0.12s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--danger)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-dim)')}
          >
            ×
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
