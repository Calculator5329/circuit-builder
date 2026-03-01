import type { TutorialDefinition } from '../../types/tutorial'

export const arithmeticTutorials: TutorialDefinition[] = [
  {
    id: 'arith-half-adder',
    trackId: 'arithmetic',
    order: 1,
    name: 'Half Adder',
    description: 'Add two single bits together',
    briefing:
      'A half adder adds two single-bit numbers A and B, producing a **Sum** and a **Carry**.\n\n' +
      '- Sum = A XOR B\n' +
      '- Carry = A AND B\n\n' +
      'Build it using XOR and AND gates.',
    difficulty: 2,
    prerequisites: ['intro-and'],
    availableGates: ['XOR', 'AND'],
    availableComponents: [],
    setupInputs: [
      { label: 'A', position: { x: 100, y: 150 } },
      { label: 'B', position: { x: 100, y: 300 } },
    ],
    setupOutputs: [
      { label: 'Sum', position: { x: 550, y: 150 } },
      { label: 'Carry', position: { x: 550, y: 300 } },
    ],
    truthTable: [
      { inputs: { A: 0, B: 0 }, outputs: { Sum: 0, Carry: 0 } },
      { inputs: { A: 0, B: 1 }, outputs: { Sum: 1, Carry: 0 } },
      { inputs: { A: 1, B: 0 }, outputs: { Sum: 1, Carry: 0 } },
      { inputs: { A: 1, B: 1 }, outputs: { Sum: 0, Carry: 1 } },
    ],
    hints: [
      'XOR gives you the Sum bit: it outputs 1 when A and B differ.',
      'AND gives you the Carry bit: it outputs 1 only when both A and B are 1.',
      'You need two gates: one XOR and one AND. Both take A and B as inputs.',
    ],
    unlocksComponent: {
      name: 'Half Adder',
      description: 'Adds two 1-bit values, producing Sum and Carry',
    },
  },
  {
    id: 'arith-full-adder',
    trackId: 'arithmetic',
    order: 2,
    name: 'Full Adder',
    description: 'Add two bits plus a carry-in',
    briefing:
      'A full adder extends the half adder by accepting a **carry-in** (Cin) from a previous stage.\n\n' +
      'It produces a Sum and Carry-out (Cout). You can build it using two Half Adders and an OR gate, ' +
      'or from individual gates.\n\n' +
      '- Sum = A XOR B XOR Cin\n' +
      '- Cout = (A AND B) OR (Cin AND (A XOR B))',
    difficulty: 2,
    prerequisites: ['arith-half-adder'],
    availableGates: ['XOR', 'AND', 'OR'],
    availableComponents: ['arith-half-adder'],
    setupInputs: [
      { label: 'A', position: { x: 80, y: 120 } },
      { label: 'B', position: { x: 80, y: 250 } },
      { label: 'Cin', position: { x: 80, y: 380 } },
    ],
    setupOutputs: [
      { label: 'Sum', position: { x: 650, y: 170 } },
      { label: 'Cout', position: { x: 650, y: 320 } },
    ],
    truthTable: [
      { inputs: { A: 0, B: 0, Cin: 0 }, outputs: { Sum: 0, Cout: 0 } },
      { inputs: { A: 0, B: 0, Cin: 1 }, outputs: { Sum: 1, Cout: 0 } },
      { inputs: { A: 0, B: 1, Cin: 0 }, outputs: { Sum: 1, Cout: 0 } },
      { inputs: { A: 0, B: 1, Cin: 1 }, outputs: { Sum: 0, Cout: 1 } },
      { inputs: { A: 1, B: 0, Cin: 0 }, outputs: { Sum: 1, Cout: 0 } },
      { inputs: { A: 1, B: 0, Cin: 1 }, outputs: { Sum: 0, Cout: 1 } },
      { inputs: { A: 1, B: 1, Cin: 0 }, outputs: { Sum: 0, Cout: 1 } },
      { inputs: { A: 1, B: 1, Cin: 1 }, outputs: { Sum: 1, Cout: 1 } },
    ],
    hints: [
      'You can chain two Half Adders: first adds A+B, second adds that Sum+Cin.',
      'The final Cout is the OR of both Half Adder carries.',
      'Alternative: use three XOR gates for Sum and AND/OR gates for Cout.',
    ],
    unlocksComponent: {
      name: 'Full Adder',
      description: 'Adds two 1-bit values with carry-in, producing Sum and Cout',
    },
  },
  {
    id: 'arith-half-sub',
    trackId: 'arithmetic',
    order: 3,
    name: 'Half Subtractor',
    description: 'Subtract one bit from another',
    briefing:
      'A half subtractor computes A minus B, producing a **Difference** and a **Borrow**.\n\n' +
      '- Difference = A XOR B\n' +
      '- Borrow = (NOT A) AND B\n\n' +
      'The borrow indicates when B is larger than A.',
    difficulty: 2,
    prerequisites: ['intro-and'],
    availableGates: ['XOR', 'AND', 'NOT'],
    availableComponents: [],
    setupInputs: [
      { label: 'A', position: { x: 100, y: 150 } },
      { label: 'B', position: { x: 100, y: 300 } },
    ],
    setupOutputs: [
      { label: 'Diff', position: { x: 550, y: 150 } },
      { label: 'Borrow', position: { x: 550, y: 300 } },
    ],
    truthTable: [
      { inputs: { A: 0, B: 0 }, outputs: { Diff: 0, Borrow: 0 } },
      { inputs: { A: 0, B: 1 }, outputs: { Diff: 1, Borrow: 1 } },
      { inputs: { A: 1, B: 0 }, outputs: { Diff: 1, Borrow: 0 } },
      { inputs: { A: 1, B: 1 }, outputs: { Diff: 0, Borrow: 0 } },
    ],
    hints: [
      'Difference uses the same XOR gate as a half adder.',
      'For Borrow, invert A with NOT, then AND it with B.',
    ],
    unlocksComponent: {
      name: 'Half Subtractor',
      description: 'Subtracts B from A, producing Difference and Borrow',
    },
  },
  {
    id: 'arith-full-sub',
    trackId: 'arithmetic',
    order: 4,
    name: 'Full Subtractor',
    description: 'Subtract with borrow-in',
    briefing:
      'A full subtractor extends the half subtractor by accepting a **borrow-in** (Bin).\n\n' +
      '- Diff = A XOR B XOR Bin\n' +
      '- Bout = (NOT A AND B) OR (NOT A AND Bin) OR (B AND Bin)\n\n' +
      'You can also build it from two Half Subtractors and an OR gate.',
    difficulty: 3,
    prerequisites: ['arith-half-sub'],
    availableGates: ['XOR', 'AND', 'OR', 'NOT'],
    availableComponents: ['arith-half-sub'],
    setupInputs: [
      { label: 'A', position: { x: 80, y: 120 } },
      { label: 'B', position: { x: 80, y: 250 } },
      { label: 'Bin', position: { x: 80, y: 380 } },
    ],
    setupOutputs: [
      { label: 'Diff', position: { x: 650, y: 170 } },
      { label: 'Bout', position: { x: 650, y: 320 } },
    ],
    truthTable: [
      { inputs: { A: 0, B: 0, Bin: 0 }, outputs: { Diff: 0, Bout: 0 } },
      { inputs: { A: 0, B: 0, Bin: 1 }, outputs: { Diff: 1, Bout: 1 } },
      { inputs: { A: 0, B: 1, Bin: 0 }, outputs: { Diff: 1, Bout: 1 } },
      { inputs: { A: 0, B: 1, Bin: 1 }, outputs: { Diff: 0, Bout: 1 } },
      { inputs: { A: 1, B: 0, Bin: 0 }, outputs: { Diff: 1, Bout: 0 } },
      { inputs: { A: 1, B: 0, Bin: 1 }, outputs: { Diff: 0, Bout: 0 } },
      { inputs: { A: 1, B: 1, Bin: 0 }, outputs: { Diff: 0, Bout: 0 } },
      { inputs: { A: 1, B: 1, Bin: 1 }, outputs: { Diff: 1, Bout: 1 } },
    ],
    hints: [
      'Chain two Half Subtractors: first computes A-B, second subtracts Bin from that result.',
      'OR the two borrow outputs together for the final Bout.',
    ],
    unlocksComponent: {
      name: 'Full Subtractor',
      description: 'Subtracts B and Bin from A, producing Diff and Bout',
    },
  },
]
