export function NandSymbol({ stroke = '#94a3b8' }: { stroke?: string }) {
  return (
    <g>
      {/* AND body */}
      <path d="M 8 4 L 32 4 Q 48 4 48 28 Q 48 52 32 52 L 8 52 Z"
        fill="#1e293b" stroke={stroke} strokeWidth="2" />
      {/* Bubble */}
      <circle cx="53" cy="28" r="5"
        fill="#1e293b" stroke={stroke} strokeWidth="2" />
      {/* Input lines */}
      <line x1="0" y1="16" x2="8" y2="16" stroke={stroke} strokeWidth="2" />
      <line x1="0" y1="40" x2="8" y2="40" stroke={stroke} strokeWidth="2" />
      {/* Output line */}
      <line x1="58" y1="28" x2="68" y2="28" stroke={stroke} strokeWidth="2" />
    </g>
  )
}
