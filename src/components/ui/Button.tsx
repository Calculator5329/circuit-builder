import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md'
  children: ReactNode
}

const variantStyles: Record<string, React.CSSProperties> = {
  primary: {
    background: 'var(--bg-surface)',
    color: 'var(--phosphor-hi)',
    boxShadow: 'inset 0 0 0 1px var(--border-hi)',
  },
  secondary: {
    background: 'var(--bg-surface)',
    color: 'var(--text-primary)',
    boxShadow: 'inset 0 0 0 1px var(--border-mid)',
  },
  danger: {
    background: 'var(--bg-surface)',
    color: 'var(--danger)',
    boxShadow: 'inset 0 0 0 1px #661111',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-dim)',
    boxShadow: 'inset 0 0 0 1px transparent',
  },
}

const hoverStyles: Record<string, React.CSSProperties> = {
  primary: {
    background: '#0d2b0d',
    color: 'var(--phosphor-hi)',
    boxShadow: 'inset 0 0 0 1px var(--phosphor-hi), 0 0 10px rgba(0,255,65,0.15)',
  },
  secondary: {
    background: 'var(--bg-surface)',
    color: 'var(--text-bright)',
    boxShadow: 'inset 0 0 0 1px var(--border-hi)',
  },
  danger: {
    background: '#2a0808',
    color: 'var(--danger)',
    boxShadow: 'inset 0 0 0 1px var(--danger), 0 0 8px rgba(255,51,51,0.15)',
  },
  ghost: {
    background: 'var(--bg-surface)',
    color: 'var(--text-primary)',
    boxShadow: 'inset 0 0 0 1px var(--border-dim)',
  },
}

const sizeStyles: Record<string, React.CSSProperties> = {
  sm: { padding: '4px 10px', fontSize: 10 },
  md: { padding: '6px 14px', fontSize: 11 },
}

export function Button({
  variant = 'secondary',
  size = 'md',
  className = '',
  children,
  disabled,
  style,
  onMouseEnter,
  onMouseLeave,
  ...props
}: ButtonProps) {
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    borderRadius: 2,
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: 'var(--font-display)',
    letterSpacing: '0.08em',
    transition: 'background 0.12s, color 0.12s, box-shadow 0.12s',
    opacity: disabled ? 0.35 : 1,
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...style,
  }

  return (
    <button
      {...props}
      disabled={disabled}
      className={className}
      style={base}
      onMouseEnter={e => {
        if (!disabled) {
          Object.assign(e.currentTarget.style, hoverStyles[variant])
        }
        onMouseEnter?.(e)
      }}
      onMouseLeave={e => {
        Object.assign(e.currentTarget.style, variantStyles[variant], sizeStyles[size])
        onMouseLeave?.(e)
      }}
    >
      {children}
    </button>
  )
}
