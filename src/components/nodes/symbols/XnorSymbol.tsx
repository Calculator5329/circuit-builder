export function XnorSymbol({ stroke = '#94a3b8' }: { stroke?: string }) {
  return (
    <g>
      {/* XOR body */}
      <path d="M 12 4 Q 28 4 40 28 Q 28 52 12 52 Q 24 28 12 4 Z"
        fill="#1e293b" stroke={stroke} strokeWidth="2" />
      {/* Extra curved line */}
      <path d="M 6 4 Q 18 28 6 52"
        fill="none" stroke={stroke} strokeWidth="2" />
      {/* Bubble */}
      <circle cx="45" cy="28" r="5"
        fill="#1e293b" stroke={stroke} strokeWidth="2" />
      {/* Input lines */}
      <line x1="0" y1="16" x2="16" y2="16" stroke={stroke} strokeWidth="2" />
      <line x1="0" y1="40" x2="16" y2="40" stroke={stroke} strokeWidth="2" />
      {/* Output line */}
      <line x1="50" y1="28" x2="68" y2="28" stroke={stroke} strokeWidth="2" />
    </g>
  )
}
