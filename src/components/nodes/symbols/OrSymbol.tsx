export function OrSymbol({ stroke = '#94a3b8' }: { stroke?: string }) {
  return (
    <g>
      {/* Body */}
      <path d="M 8 4 Q 24 4 44 28 Q 24 52 8 52 Q 20 28 8 4 Z"
        fill="#1e293b" stroke={stroke} strokeWidth="2" />
      {/* Input lines */}
      <line x1="0" y1="16" x2="14" y2="16" stroke={stroke} strokeWidth="2" />
      <line x1="0" y1="40" x2="14" y2="40" stroke={stroke} strokeWidth="2" />
      {/* Output line */}
      <line x1="44" y1="28" x2="60" y2="28" stroke={stroke} strokeWidth="2" />
    </g>
  )
}
