export function NotSymbol({ stroke = '#475569' }: { stroke?: string }) {
  return (
    <g>
      <polygon points="8,4 48,28 8,52"
        fill="#0d1117" stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="53" cy="28" r="5"
        fill="#0d1117" stroke={stroke} strokeWidth="2.5" />
      <line x1="0" y1="28" x2="8" y2="28" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="58" y1="28" x2="68" y2="28" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
    </g>
  )
}
