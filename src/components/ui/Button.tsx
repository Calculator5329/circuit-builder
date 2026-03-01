import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md'
  children: ReactNode
}

const variantStyles: Record<string, React.CSSProperties> = {
  primary:   { background: 'var(--bg-surface)', color: '#22c55e',          boxShadow: 'inset 0 0 0 1px #166534' },
  secondary: { background: 'var(--bg-surface)', color: 'var(--text-primary)', boxShadow: 'inset 0 0 0 1px var(--border-mid)' },
  danger:    { background: 'var(--bg-surface)', color: 'var(--danger)',     boxShadow: 'inset 0 0 0 1px #7f1d1d' },
  ghost:     { background: 'transparent',        color: 'var(--text-dim)',   boxShadow: 'inset 0 0 0 1px transparent' },
}

const hoverStyles: Record<string, React.CSSProperties> = {
  primary:   { background: '#052e16', color: '#4ade80', boxShadow: 'inset 0 0 0 1px #16a34a' },
  secondary: { background: 'var(--bg-surface)', color: 'var(--text-bright)', boxShadow: 'inset 0 0 0 1px var(--border-hi)' },
  danger:    { background: '#2d0a0a', color: '#fca5a5', boxShadow: 'inset 0 0 0 1px var(--danger)' },
  ghost:     { background: 'var(--bg-surface)', color: 'var(--text-primary)', boxShadow: 'inset 0 0 0 1px var(--border-dim)' },
}

const sizeStyles: Record<string, React.CSSProperties> = {
  sm: { padding: '4px 10px', fontSize: 11 },
  md: { padding: '6px 14px', fontSize: 12 },
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
    borderRadius: 3,
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: 'var(--font-display)',
    letterSpacing: '0.05em',
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
        if (!disabled) Object.assign(e.currentTarget.style, hoverStyles[variant])
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
