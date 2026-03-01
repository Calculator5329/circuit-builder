import { GatePaletteItem } from './GatePaletteItem'
import type { GateType } from '../../types/circuit'

const IO_GATES: Array<{ gateType: GateType; label: string; description: string }> = [
  { gateType: 'INPUT',          label: 'Input',       description: 'Toggle binary input' },
  { gateType: 'OUTPUT',         label: 'Output',      description: 'LED signal indicator' },
  { gateType: 'DECIMAL_INPUT',  label: 'Dec Input',   description: 'Type a number (0–255), outputs 8 bits' },
  { gateType: 'DECIMAL_OUTPUT', label: 'Dec Output',  description: 'Reads 8 bits, displays decimal value' },
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

export function GatePalette() {
  return (
    <div className="flex flex-col gap-1.5 p-3">
      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-1 px-1">
        I/O
      </p>
      {IO_GATES.map(g => (
        <GatePaletteItem key={g.gateType} {...g} />
      ))}

      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mt-3 mb-1 px-1">
        Gates
      </p>
      {LOGIC_GATES.map(g => (
        <GatePaletteItem key={g.gateType} {...g} />
      ))}
    </div>
  )
}
