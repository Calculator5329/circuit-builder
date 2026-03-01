import type { TutorialDefinition } from '../../types/tutorial'

export const multibitArithmeticTutorials: TutorialDefinition[] = [
  {
    id: 'multi-4bit-adder',
    trackId: 'multibit-arithmetic',
    order: 1,
    name: '4-bit Adder',
    description: 'Chain full adders to add 4-bit numbers',
    briefing:
      'A ripple-carry adder chains Full Adders together. The carry-out of each stage feeds into the carry-in of the next.\n\n' +
      'Build a 4-bit adder using four Full Adder components. The first carry-in should be tied to 0 using a Constant.',
    difficulty: 3,
    prerequisites: ['arith-full-adder'],
    availableGates: ['CONSTANT'],
    availableComponents: ['arith-full-adder'],
    setupInputs: [
      { label: 'A0', position: { x: 60, y: 80 } },
      { label: 'A1', position: { x: 60, y: 180 } },
      { label: 'A2', position: { x: 60, y: 280 } },
      { label: 'A3', position: { x: 60, y: 380 } },
      { label: 'B0', position: { x: 60, y: 500 } },
      { label: 'B1', position: { x: 60, y: 600 } },
      { label: 'B2', position: { x: 60, y: 700 } },
      { label: 'B3', position: { x: 60, y: 800 } },
    ],
    setupOutputs: [
      { label: 'S0', position: { x: 700, y: 80 } },
      { label: 'S1', position: { x: 700, y: 200 } },
      { label: 'S2', position: { x: 700, y: 320 } },
      { label: 'S3', position: { x: 700, y: 440 } },
      { label: 'Cout', position: { x: 700, y: 560 } },
    ],
    truthTable: [
      { inputs: { A0: 0, A1: 0, A2: 0, A3: 0, B0: 0, B1: 0, B2: 0, B3: 0 }, outputs: { S0: 0, S1: 0, S2: 0, S3: 0, Cout: 0 } },
      { inputs: { A0: 1, A1: 0, A2: 0, A3: 0, B0: 1, B1: 0, B2: 0, B3: 0 }, outputs: { S0: 0, S1: 1, S2: 0, S3: 0, Cout: 0 } },
      { inputs: { A0: 1, A1: 1, A2: 0, A3: 0, B0: 1, B1: 0, B2: 0, B3: 0 }, outputs: { S0: 0, S1: 0, S2: 1, S3: 0, Cout: 0 } },
      { inputs: { A0: 1, A1: 1, A2: 1, A3: 1, B0: 1, B1: 0, B2: 0, B3: 0 }, outputs: { S0: 0, S1: 0, S2: 0, S3: 0, Cout: 1 } },
      { inputs: { A0: 0, A1: 1, A2: 0, A3: 1, B0: 1, B1: 0, B2: 1, B3: 0 }, outputs: { S0: 1, S1: 1, S2: 0, S3: 0, Cout: 1 } },
    ],
    hints: [
      'Place four Full Adder components in a vertical chain.',
      'Connect A0+B0 to the first Full Adder, A1+B1 to the second, and so on.',
      'Chain the Cout of each Full Adder to the Cin of the next. Use a Constant (set to 0) for the first Cin.',
    ],
    unlocksComponent: {
      name: '4-bit Adder',
      description: 'Adds two 4-bit numbers with carry-out',
    },
  },
  {
    id: 'multi-4bit-sub',
    trackId: 'multibit-arithmetic',
    order: 2,
    name: '4-bit Subtractor',
    description: 'Chain full subtractors to subtract 4-bit numbers',
    briefing:
      'Similar to the 4-bit adder, chain four Full Subtractors to subtract two 4-bit numbers.\n\n' +
      'The borrow-out of each stage feeds into the borrow-in of the next. Tie the first borrow-in to 0.',
    difficulty: 3,
    prerequisites: ['arith-full-sub'],
    availableGates: ['CONSTANT'],
    availableComponents: ['arith-full-sub'],
    setupInputs: [
      { label: 'A0', position: { x: 60, y: 80 } },
      { label: 'A1', position: { x: 60, y: 180 } },
      { label: 'A2', position: { x: 60, y: 280 } },
      { label: 'A3', position: { x: 60, y: 380 } },
      { label: 'B0', position: { x: 60, y: 500 } },
      { label: 'B1', position: { x: 60, y: 600 } },
      { label: 'B2', position: { x: 60, y: 700 } },
      { label: 'B3', position: { x: 60, y: 800 } },
    ],
    setupOutputs: [
      { label: 'D0', position: { x: 700, y: 80 } },
      { label: 'D1', position: { x: 700, y: 200 } },
      { label: 'D2', position: { x: 700, y: 320 } },
      { label: 'D3', position: { x: 700, y: 440 } },
      { label: 'Bout', position: { x: 700, y: 560 } },
    ],
    truthTable: [
      { inputs: { A0: 0, A1: 0, A2: 0, A3: 0, B0: 0, B1: 0, B2: 0, B3: 0 }, outputs: { D0: 0, D1: 0, D2: 0, D3: 0, Bout: 0 } },
      { inputs: { A0: 1, A1: 0, A2: 0, A3: 0, B0: 1, B1: 0, B2: 0, B3: 0 }, outputs: { D0: 0, D1: 0, D2: 0, D3: 0, Bout: 0 } },
      { inputs: { A0: 0, A1: 1, A2: 1, A3: 0, B0: 1, B1: 0, B2: 1, B3: 0 }, outputs: { D0: 1, D1: 0, D2: 0, D3: 0, Bout: 0 } },
      { inputs: { A0: 0, A1: 0, A2: 0, A3: 0, B0: 1, B1: 0, B2: 0, B3: 0 }, outputs: { D0: 1, D1: 1, D2: 1, D3: 1, Bout: 1 } },
    ],
    hints: [
      'Place four Full Subtractor components chained together.',
      'Connect the Bout of each stage to the Bin of the next.',
      'Tie the first Bin to 0 using a Constant.',
    ],
    unlocksComponent: {
      name: '4-bit Subtractor',
      description: 'Subtracts two 4-bit numbers with borrow-out',
    },
  },
  {
    id: 'multi-adder-sub',
    trackId: 'multibit-arithmetic',
    order: 3,
    name: 'Adder-Subtractor',
    description: 'Switch between addition and subtraction with a control bit',
    briefing:
      'A combined adder-subtractor uses XOR gates to conditionally invert B when subtracting.\n\n' +
      'When Sub=0, it adds A+B. When Sub=1, it computes A-B by XOR-ing each B bit with Sub ' +
      '(which inverts B) and setting the initial carry-in to 1 (for two\'s complement).\n\n' +
      'Use a 4-bit Adder and XOR gates.',
    difficulty: 4,
    prerequisites: ['multi-4bit-adder'],
    availableGates: ['XOR'],
    availableComponents: ['multi-4bit-adder'],
    setupInputs: [
      { label: 'A0', position: { x: 60, y: 80 } },
      { label: 'A1', position: { x: 60, y: 160 } },
      { label: 'A2', position: { x: 60, y: 240 } },
      { label: 'A3', position: { x: 60, y: 320 } },
      { label: 'B0', position: { x: 60, y: 440 } },
      { label: 'B1', position: { x: 60, y: 520 } },
      { label: 'B2', position: { x: 60, y: 600 } },
      { label: 'B3', position: { x: 60, y: 680 } },
      { label: 'Sub', position: { x: 60, y: 800 } },
    ],
    setupOutputs: [
      { label: 'R0', position: { x: 750, y: 100 } },
      { label: 'R1', position: { x: 750, y: 220 } },
      { label: 'R2', position: { x: 750, y: 340 } },
      { label: 'R3', position: { x: 750, y: 460 } },
      { label: 'Cout', position: { x: 750, y: 580 } },
    ],
    truthTable: [
      // 3 + 2 = 5
      { inputs: { A0: 1, A1: 1, A2: 0, A3: 0, B0: 0, B1: 1, B2: 0, B3: 0, Sub: 0 }, outputs: { R0: 1, R1: 0, R2: 1, R3: 0, Cout: 0 } },
      // 5 - 3 = 2 (Sub=1: invert B, add 1 via carry-in)
      { inputs: { A0: 1, A1: 0, A2: 1, A3: 0, B0: 1, B1: 1, B2: 0, B3: 0, Sub: 1 }, outputs: { R0: 0, R1: 1, R2: 0, R3: 0, Cout: 1 } },
      // 0 + 0 = 0
      { inputs: { A0: 0, A1: 0, A2: 0, A3: 0, B0: 0, B1: 0, B2: 0, B3: 0, Sub: 0 }, outputs: { R0: 0, R1: 0, R2: 0, R3: 0, Cout: 0 } },
      // 7 + 1 = 8
      { inputs: { A0: 1, A1: 1, A2: 1, A3: 0, B0: 1, B1: 0, B2: 0, B3: 0, Sub: 0 }, outputs: { R0: 0, R1: 0, R2: 0, R3: 1, Cout: 0 } },
    ],
    hints: [
      'XOR each B bit with the Sub signal: B_i XOR Sub. When Sub=0, B passes through unchanged; when Sub=1, B is inverted.',
      'Feed the XOR outputs as the B inputs to the 4-bit Adder.',
      'Connect Sub directly to the Cin (carry-in) of the 4-bit Adder — this adds 1 when subtracting for two\'s complement.',
    ],
    unlocksComponent: {
      name: 'Adder-Subtractor',
      description: '4-bit adder/subtractor controlled by Sub input',
    },
  },
]
