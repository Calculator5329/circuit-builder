export function NotSymbol({ stroke = '#94a3b8' }: { stroke?: string }) {
  return (
    <g>
      {/* Triangle body */}
      <polygon points="8,4 48,28 8,52"
        fill="#1e293b" stroke={stroke} strokeWidth="2" />
      {/* Bubble */}
      <circle cx="53" cy="28" r="5"
        fill="#1e293b" stroke={stroke} strokeWidth="2" />
      {/* Input line */}
      <line x1="0" y1="28" x2="8" y2="28" stroke={stroke} strokeWidth="2" />
      {/* Output line */}
      <line x1="58" y1="28" x2="68" y2="28" stroke={stroke} strokeWidth="2" />
    </g>
  )
}
