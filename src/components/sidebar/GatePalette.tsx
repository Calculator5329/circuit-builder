import { GatePaletteItem } from './GatePaletteItem'
import type { GateType } from '../../types/circuit'

const IO_GATES: Array<{ gateType: GateType; label: string; description: string }> = [
  { gateType: 'INPUT',          label: 'Input',      description: 'Toggle binary input' },
  { gateType: 'OUTPUT',         label: 'Output',     description: 'LED signal indicator' },
  { gateType: 'DECIMAL_INPUT',  label: 'Dec Input',  description: 'Decimal → 8-bit output' },
  { gateType: 'DECIMAL_OUTPUT', label: 'Dec Output', description: '8-bit input → decimal' },
  { gateType: 'CONSTANT',       label: 'Constant',   description: 'Always 0 or 1 (click to toggle)' },
  { gateType: 'SEVEN_SEGMENT_DISPLAY', label: '7-Seg Display', description: '7-segment display (a–g inputs)' },
]

const LOGIC_GATES: Array<{ gateType: GateType; label: string; description: string }> = [
  { gateType: 'AND',  label: 'AND',  description: 'Output 1 if all inputs are 1' },
  { gateType: 'OR',   label: 'OR',   description: 'Output 1 if any input is 1' },
  { gateType: 'NOT',  label: 'NOT',  description: 'Inverts the input signal' },
  { gateType: 'NAND', label: 'NAND', description: 'NOT AND — inverted AND' },
  { gateType: 'NOR',  label: 'NOR',  description: 'NOT OR — inverted OR' },
  { gateType: 'XOR',  label: 'XOR',  description: 'Output 1 if inputs differ' },
  { gateType: 'XNOR', label: 'XNOR', description: 'Output 1 if inputs match' },
]

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 px-3 pt-4 pb-1.5" style={{ userSelect: 'none' }}>
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: 9,
        color: 'var(--text-dim)',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: 'var(--border-dim)', marginTop: 1 }} />
    </div>
  )
}

export function GatePalette() {
  return (
    <div className="flex flex-col pb-4">
      <SectionHeader label="I/O" />
      <div className="flex flex-col gap-0.5 px-2">
        {IO_GATES.map(g => (
          <GatePaletteItem key={g.gateType} {...g} />
        ))}
      </div>

      <SectionHeader label="Logic Gates" />
      <div className="flex flex-col gap-0.5 px-2">
        {LOGIC_GATES.map(g => (
          <GatePaletteItem key={g.gateType} {...g} />
        ))}
      </div>
    </div>
  )
}
