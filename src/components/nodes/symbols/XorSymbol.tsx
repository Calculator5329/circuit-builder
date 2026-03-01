export function XorSymbol({ stroke = '#475569' }: { stroke?: string }) {
  return (
    <g>
      <path d="M 12 4 Q 28 4 44 28 Q 28 52 12 52 Q 24 28 12 4 Z"
        fill="#0d1117" stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M 6 4 Q 18 28 6 52"
        fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="0" y1="16" x2="16" y2="16" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="0" y1="40" x2="16" y2="40" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="44" y1="28" x2="60" y2="28" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
    </g>
  )
}
