export function AndSymbol({ stroke = '#475569' }: { stroke?: string }) {
  return (
    <g>
      <path d="M 8 4 L 32 4 Q 52 4 52 28 Q 52 52 32 52 L 8 52 Z"
        fill="#0d1117" stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="0" y1="16" x2="8" y2="16" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="0" y1="40" x2="8" y2="40" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="52" y1="28" x2="60" y2="28" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
    </g>
  )
}
