import type { TutorialDefinition } from '../../types/tutorial'

export const comparisonTutorials: TutorialDefinition[] = [
  {
    id: 'cmp-1bit',
    trackId: 'comparison',
    order: 1,
    name: '1-bit Comparator',
    description: 'Compare two single bits',
    briefing:
      'A 1-bit comparator determines the relationship between two bits A and B, producing three outputs:\n\n' +
      '- **GT** (A > B): A AND (NOT B)\n' +
      '- **EQ** (A = B): A XNOR B (or NOT(A XOR B))\n' +
      '- **LT** (A < B): (NOT A) AND B\n\n' +
      'Build it using XOR, AND, and NOT gates.',
    difficulty: 2,
    prerequisites: ['intro-and'],
    availableGates: ['XOR', 'AND', 'NOT'],
    availableComponents: [],
    setupInputs: [
      { label: 'A', position: { x: 100, y: 120 } },
      { label: 'B', position: { x: 100, y: 300 } },
    ],
    setupOutputs: [
      { label: 'GT', position: { x: 550, y: 80 } },
      { label: 'EQ', position: { x: 550, y: 210 } },
      { label: 'LT', position: { x: 550, y: 340 } },
    ],
    truthTable: [
      { inputs: { A: 0, B: 0 }, outputs: { GT: 0, EQ: 1, LT: 0 } },
      { inputs: { A: 0, B: 1 }, outputs: { GT: 0, EQ: 0, LT: 1 } },
      { inputs: { A: 1, B: 0 }, outputs: { GT: 1, EQ: 0, LT: 0 } },
      { inputs: { A: 1, B: 1 }, outputs: { GT: 0, EQ: 1, LT: 0 } },
    ],
    hints: [
      'GT: AND the original A with NOT B.',
      'LT: AND NOT A with the original B.',
      'EQ: XOR A and B, then NOT the result (XNOR).',
    ],
    unlocksComponent: {
      name: '1-bit Comparator',
      description: 'Compares two 1-bit values: GT, EQ, LT outputs',
    },
  },
  {
    id: 'cmp-4bit',
    trackId: 'comparison',
    order: 2,
    name: '4-bit Comparator',
    description: 'Compare two 4-bit numbers',
    briefing:
      'A 4-bit comparator determines the relationship between two 4-bit numbers.\n\n' +
      'Compare from the most significant bit (bit 3) down. At each stage:\n' +
      '- If A_i > B_i, the result is GT regardless of lower bits\n' +
      '- If A_i < B_i, the result is LT regardless of lower bits\n' +
      '- If A_i = B_i, cascade to the next lower bit\n\n' +
      'Use four 1-bit Comparators and AND/OR logic to cascade.',
    difficulty: 4,
    prerequisites: ['cmp-1bit'],
    availableGates: ['AND', 'OR'],
    availableComponents: ['cmp-1bit'],
    setupInputs: [
      { label: 'A0', position: { x: 60, y: 60 } },
      { label: 'A1', position: { x: 60, y: 150 } },
      { label: 'A2', position: { x: 60, y: 240 } },
      { label: 'A3', position: { x: 60, y: 330 } },
      { label: 'B0', position: { x: 60, y: 450 } },
      { label: 'B1', position: { x: 60, y: 540 } },
      { label: 'B2', position: { x: 60, y: 630 } },
      { label: 'B3', position: { x: 60, y: 720 } },
    ],
    setupOutputs: [
      { label: 'GT', position: { x: 800, y: 200 } },
      { label: 'EQ', position: { x: 800, y: 380 } },
      { label: 'LT', position: { x: 800, y: 560 } },
    ],
    truthTable: [
      { inputs: { A0: 0, A1: 0, A2: 0, A3: 0, B0: 0, B1: 0, B2: 0, B3: 0 }, outputs: { GT: 0, EQ: 1, LT: 0 } },
      { inputs: { A0: 1, A1: 0, A2: 0, A3: 0, B0: 0, B1: 0, B2: 0, B3: 0 }, outputs: { GT: 1, EQ: 0, LT: 0 } },
      { inputs: { A0: 0, A1: 0, A2: 0, A3: 0, B0: 1, B1: 0, B2: 0, B3: 0 }, outputs: { GT: 0, EQ: 0, LT: 1 } },
      { inputs: { A0: 1, A1: 0, A2: 1, A3: 0, B0: 0, B1: 1, B2: 0, B3: 0 }, outputs: { GT: 1, EQ: 0, LT: 0 } },
      { inputs: { A0: 0, A1: 1, A2: 0, A3: 0, B0: 0, B1: 0, B2: 1, B3: 0 }, outputs: { GT: 0, EQ: 0, LT: 1 } },
      { inputs: { A0: 1, A1: 1, A2: 1, A3: 1, B0: 1, B1: 1, B2: 1, B3: 1 }, outputs: { GT: 0, EQ: 1, LT: 0 } },
    ],
    hints: [
      'Compare each bit pair with a 1-bit Comparator (four total).',
      'Start cascading from bit 3 (MSB). If bit 3 GT, the overall result is GT.',
      'If bit 3 EQ, cascade to bit 2. Use AND to combine the EQ chain with each bit\'s GT/LT.',
      'Final GT = GT3 OR (EQ3 AND GT2) OR (EQ3 AND EQ2 AND GT1) OR (EQ3 AND EQ2 AND EQ1 AND GT0)',
    ],
    unlocksComponent: {
      name: '4-bit Comparator',
      description: 'Compares two 4-bit numbers: GT, EQ, LT outputs',
    },
  },
]
