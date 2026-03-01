export function NandSymbol({ stroke = '#3a7a3a' }: { stroke?: string }) {
  return (
    <g>
      <path d="M 8 4 L 32 4 Q 48 4 48 28 Q 48 52 32 52 L 8 52 Z"
        fill="#070d07" stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="53" cy="28" r="5"
        fill="#070d07" stroke={stroke} strokeWidth="2.5" />
      <line x1="0" y1="16" x2="8" y2="16" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="0" y1="40" x2="8" y2="40" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="58" y1="28" x2="68" y2="28" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
    </g>
  )
}
