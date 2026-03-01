import { GatePaletteItem } from './GatePaletteItem'
import type { GateType } from '../../types/circuit'

const IO_GATES: Array<{ gateType: GateType; label: string; description: string }> = [
  { gateType: 'INPUT',          label: 'INPUT',      description: 'Toggle binary input' },
  { gateType: 'OUTPUT',         label: 'OUTPUT',     description: 'LED signal indicator' },
  { gateType: 'DECIMAL_INPUT',  label: 'DEC IN',     description: 'Decimal → 8-bit output' },
  { gateType: 'DECIMAL_OUTPUT', label: 'DEC OUT',    description: '8-bit input → decimal' },
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
    <div
      className="flex items-center gap-2 px-3 pt-4 pb-1.5"
      style={{ userSelect: 'none' }}
    >
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 9,
          color: 'var(--border-hi)',
          letterSpacing: '0.14em',
        }}
      >
        //
      </span>
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 9,
          color: 'var(--text-dim)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: 'var(--border-dim)', marginTop: 1 }} />
    </div>
  )
}

export function GatePalette() {
  return (
    <div className="flex flex-col pb-4">
      <SectionHeader label="I/O Components" />
      <div className="flex flex-col gap-1 px-2">
        {IO_GATES.map(g => (
          <GatePaletteItem key={g.gateType} {...g} />
        ))}
      </div>

      <SectionHeader label="Logic Gates" />
      <div className="flex flex-col gap-1 px-2">
        {LOGIC_GATES.map(g => (
          <GatePaletteItem key={g.gateType} {...g} />
        ))}
      </div>
    </div>
  )
}
