import type { NodeTypes } from '@xyflow/react'
import { GateNode } from './GateNode'
import { InputNode } from './InputNode'
import { OutputNode } from './OutputNode'
import { DecimalInputNode } from './DecimalInputNode'
import { DecimalOutputNode } from './DecimalOutputNode'
import { CustomGateNode } from './CustomGateNode'

export const nodeTypes: NodeTypes = {
  AND: GateNode,
  OR: GateNode,
  NOT: GateNode,
  NAND: GateNode,
  NOR: GateNode,
  XOR: GateNode,
  XNOR: GateNode,
  INPUT: InputNode,
  OUTPUT: OutputNode,
  DECIMAL_INPUT: DecimalInputNode,
  DECIMAL_OUTPUT: DecimalOutputNode,
  CUSTOM: CustomGateNode,
}
