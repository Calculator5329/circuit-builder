import type { TutorialDefinition } from '../../types/tutorial'

export const aluTutorials: TutorialDefinition[] = [
  {
    id: 'alu-1bit',
    trackId: 'alu',
    order: 1,
    name: '1-bit ALU',
    description: 'Perform AND, OR, ADD, or XOR on two bits',
    briefing:
      'An ALU (Arithmetic Logic Unit) performs multiple operations selected by an opcode.\n\n' +
      'Build a 1-bit ALU that supports four operations:\n' +
      '- Op=00: A AND B\n' +
      '- Op=01: A OR B\n' +
      '- Op=10: A + B (Full Adder, with carry)\n' +
      '- Op=11: A XOR B\n\n' +
      'Compute all four results, then use a 4:1 Mux to select the Result. ' +
      'The Cout comes directly from the Full Adder.',
    difficulty: 4,
    prerequisites: ['arith-full-adder', 'mux-4to1'],
    availableGates: ['AND', 'OR', 'XOR'],
    availableComponents: ['arith-full-adder', 'mux-4to1'],
    setupInputs: [
      { label: 'A', position: { x: 60, y: 100 } },
      { label: 'B', position: { x: 60, y: 220 } },
      { label: 'Cin', position: { x: 60, y: 340 } },
      { label: 'Op0', position: { x: 60, y: 480 } },
      { label: 'Op1', position: { x: 60, y: 580 } },
    ],
    setupOutputs: [
      { label: 'Result', position: { x: 700, y: 200 } },
      { label: 'Cout', position: { x: 700, y: 400 } },
    ],
    truthTable: [
      // AND (Op=00)
      { inputs: { A: 1, B: 1, Cin: 0, Op0: 0, Op1: 0 }, outputs: { Result: 1, Cout: 0 } },
      { inputs: { A: 1, B: 0, Cin: 0, Op0: 0, Op1: 0 }, outputs: { Result: 0, Cout: 0 } },
      // OR (Op=01)
      { inputs: { A: 1, B: 0, Cin: 0, Op0: 1, Op1: 0 }, outputs: { Result: 1, Cout: 0 } },
      { inputs: { A: 0, B: 0, Cin: 0, Op0: 1, Op1: 0 }, outputs: { Result: 0, Cout: 0 } },
      // ADD (Op=10)
      { inputs: { A: 1, B: 1, Cin: 0, Op0: 0, Op1: 1 }, outputs: { Result: 0, Cout: 1 } },
      { inputs: { A: 1, B: 0, Cin: 1, Op0: 0, Op1: 1 }, outputs: { Result: 0, Cout: 1 } },
      // XOR (Op=11)
      { inputs: { A: 1, B: 1, Cin: 0, Op0: 1, Op1: 1 }, outputs: { Result: 0, Cout: 0 } },
      { inputs: { A: 1, B: 0, Cin: 0, Op0: 1, Op1: 1 }, outputs: { Result: 1, Cout: 0 } },
    ],
    hints: [
      'Compute all four operations in parallel: A AND B, A OR B, Full Adder Sum, A XOR B.',
      'Feed all four results into a 4:1 Mux with Op0 and Op1 as selectors.',
      'The Cout output always comes from the Full Adder, regardless of the opcode.',
    ],
    unlocksComponent: {
      name: '1-bit ALU',
      description: '1-bit ALU with AND, OR, ADD, XOR operations',
    },
  },
  {
    id: 'alu-4bit',
    trackId: 'alu',
    order: 2,
    name: '4-bit ALU',
    description: 'Chain 1-bit ALUs for 4-bit operations',
    briefing:
      'Chain four 1-bit ALU components to build a 4-bit ALU.\n\n' +
      'The carry-out of each stage feeds into the carry-in of the next. ' +
      'Tie the initial carry-in to 0 with a Constant. All ALU slices share the same Op0 and Op1 signals.',
    difficulty: 5,
    prerequisites: ['alu-1bit'],
    availableGates: ['CONSTANT'],
    availableComponents: ['alu-1bit'],
    setupInputs: [
      { label: 'A0', position: { x: 50, y: 60 } },
      { label: 'A1', position: { x: 50, y: 140 } },
      { label: 'A2', position: { x: 50, y: 220 } },
      { label: 'A3', position: { x: 50, y: 300 } },
      { label: 'B0', position: { x: 50, y: 420 } },
      { label: 'B1', position: { x: 50, y: 500 } },
      { label: 'B2', position: { x: 50, y: 580 } },
      { label: 'B3', position: { x: 50, y: 660 } },
      { label: 'Op0', position: { x: 50, y: 780 } },
      { label: 'Op1', position: { x: 50, y: 860 } },
    ],
    setupOutputs: [
      { label: 'R0', position: { x: 750, y: 100 } },
      { label: 'R1', position: { x: 750, y: 220 } },
      { label: 'R2', position: { x: 750, y: 340 } },
      { label: 'R3', position: { x: 750, y: 460 } },
      { label: 'Cout', position: { x: 750, y: 600 } },
    ],
    truthTable: [
      // AND: 0b1010 AND 0b1100 = 0b1000
      { inputs: { A0: 0, A1: 1, A2: 0, A3: 1, B0: 0, B1: 0, B2: 1, B3: 1, Op0: 0, Op1: 0 }, outputs: { R0: 0, R1: 0, R2: 0, R3: 1, Cout: 0 } },
      // OR: 0b1010 OR 0b0101 = 0b1111
      { inputs: { A0: 0, A1: 1, A2: 0, A3: 1, B0: 1, B1: 0, B2: 1, B3: 0, Op0: 1, Op1: 0 }, outputs: { R0: 1, R1: 1, R2: 1, R3: 1, Cout: 0 } },
      // ADD: 3 + 5 = 8
      { inputs: { A0: 1, A1: 1, A2: 0, A3: 0, B0: 1, B1: 0, B2: 1, B3: 0, Op0: 0, Op1: 1 }, outputs: { R0: 0, R1: 0, R2: 0, R3: 1, Cout: 0 } },
      // ADD: 15 + 1 = 16 (overflow)
      { inputs: { A0: 1, A1: 1, A2: 1, A3: 1, B0: 1, B1: 0, B2: 0, B3: 0, Op0: 0, Op1: 1 }, outputs: { R0: 0, R1: 0, R2: 0, R3: 0, Cout: 1 } },
      // XOR: 0b1010 XOR 0b1100 = 0b0110
      { inputs: { A0: 0, A1: 1, A2: 0, A3: 1, B0: 0, B1: 0, B2: 1, B3: 1, Op0: 1, Op1: 1 }, outputs: { R0: 0, R1: 1, R2: 1, R3: 0, Cout: 0 } },
    ],
    hints: [
      'Place four 1-bit ALU components in a chain.',
      'Connect A0+B0 to the first, A1+B1 to the second, etc.',
      'Chain Cout -> Cin between ALU slices. First Cin is a Constant 0.',
      'Connect Op0 and Op1 to ALL four ALU slices (shared opcode).',
    ],
    unlocksComponent: {
      name: '4-bit ALU',
      description: '4-bit ALU supporting AND, OR, ADD, XOR',
    },
  },
]
