import type { TutorialDefinition } from '../../types/tutorial'

export const encodingTutorials: TutorialDefinition[] = [
  {
    id: 'enc-decoder-2to4',
    trackId: 'encoding',
    order: 1,
    name: '2-to-4 Decoder',
    description: 'Activate one of four outputs based on a 2-bit input',
    briefing:
      'A 2-to-4 decoder takes a 2-bit address and activates exactly one of four output lines.\n\n' +
      '- A1=0, A0=0 → Y0=1\n' +
      '- A1=0, A0=1 → Y1=1\n' +
      '- A1=1, A0=0 → Y2=1\n' +
      '- A1=1, A0=1 → Y3=1\n\n' +
      'Build it using AND and NOT gates.',
    difficulty: 2,
    prerequisites: ['intro-and'],
    availableGates: ['AND', 'NOT'],
    availableComponents: [],
    setupInputs: [
      { label: 'A0', position: { x: 80, y: 150 } },
      { label: 'A1', position: { x: 80, y: 300 } },
    ],
    setupOutputs: [
      { label: 'Y0', position: { x: 600, y: 80 } },
      { label: 'Y1', position: { x: 600, y: 190 } },
      { label: 'Y2', position: { x: 600, y: 300 } },
      { label: 'Y3', position: { x: 600, y: 410 } },
    ],
    truthTable: [
      { inputs: { A0: 0, A1: 0 }, outputs: { Y0: 1, Y1: 0, Y2: 0, Y3: 0 } },
      { inputs: { A0: 1, A1: 0 }, outputs: { Y0: 0, Y1: 1, Y2: 0, Y3: 0 } },
      { inputs: { A0: 0, A1: 1 }, outputs: { Y0: 0, Y1: 0, Y2: 1, Y3: 0 } },
      { inputs: { A0: 1, A1: 1 }, outputs: { Y0: 0, Y1: 0, Y2: 0, Y3: 1 } },
    ],
    hints: [
      'Create NOT versions of both A0 and A1.',
      'Y0 = NOT_A1 AND NOT_A0, Y1 = NOT_A1 AND A0, Y2 = A1 AND NOT_A0, Y3 = A1 AND A0.',
    ],
    unlocksComponent: {
      name: '2-to-4 Decoder',
      description: 'Decodes 2-bit input to one-of-four output',
    },
  },
  {
    id: 'enc-decoder-3to8',
    trackId: 'encoding',
    order: 2,
    name: '3-to-8 Decoder',
    description: 'Activate one of eight outputs from a 3-bit input',
    briefing:
      'A 3-to-8 decoder activates one of eight output lines based on a 3-bit address.\n\n' +
      'Build it using two 2-to-4 Decoders and AND gates. Use A2 to enable one decoder or the other.',
    difficulty: 3,
    prerequisites: ['enc-decoder-2to4'],
    availableGates: ['AND', 'NOT'],
    availableComponents: ['enc-decoder-2to4'],
    setupInputs: [
      { label: 'A0', position: { x: 60, y: 150 } },
      { label: 'A1', position: { x: 60, y: 280 } },
      { label: 'A2', position: { x: 60, y: 410 } },
    ],
    setupOutputs: [
      { label: 'Y0', position: { x: 700, y: 40 } },
      { label: 'Y1', position: { x: 700, y: 110 } },
      { label: 'Y2', position: { x: 700, y: 180 } },
      { label: 'Y3', position: { x: 700, y: 250 } },
      { label: 'Y4', position: { x: 700, y: 320 } },
      { label: 'Y5', position: { x: 700, y: 390 } },
      { label: 'Y6', position: { x: 700, y: 460 } },
      { label: 'Y7', position: { x: 700, y: 530 } },
    ],
    truthTable: [
      { inputs: { A0: 0, A1: 0, A2: 0 }, outputs: { Y0: 1, Y1: 0, Y2: 0, Y3: 0, Y4: 0, Y5: 0, Y6: 0, Y7: 0 } },
      { inputs: { A0: 1, A1: 0, A2: 0 }, outputs: { Y0: 0, Y1: 1, Y2: 0, Y3: 0, Y4: 0, Y5: 0, Y6: 0, Y7: 0 } },
      { inputs: { A0: 0, A1: 1, A2: 0 }, outputs: { Y0: 0, Y1: 0, Y2: 1, Y3: 0, Y4: 0, Y5: 0, Y6: 0, Y7: 0 } },
      { inputs: { A0: 1, A1: 1, A2: 0 }, outputs: { Y0: 0, Y1: 0, Y2: 0, Y3: 1, Y4: 0, Y5: 0, Y6: 0, Y7: 0 } },
      { inputs: { A0: 0, A1: 0, A2: 1 }, outputs: { Y0: 0, Y1: 0, Y2: 0, Y3: 0, Y4: 1, Y5: 0, Y6: 0, Y7: 0 } },
      { inputs: { A0: 1, A1: 0, A2: 1 }, outputs: { Y0: 0, Y1: 0, Y2: 0, Y3: 0, Y4: 0, Y5: 1, Y6: 0, Y7: 0 } },
      { inputs: { A0: 0, A1: 1, A2: 1 }, outputs: { Y0: 0, Y1: 0, Y2: 0, Y3: 0, Y4: 0, Y5: 0, Y6: 1, Y7: 0 } },
      { inputs: { A0: 1, A1: 1, A2: 1 }, outputs: { Y0: 0, Y1: 0, Y2: 0, Y3: 0, Y4: 0, Y5: 0, Y6: 0, Y7: 1 } },
    ],
    hints: [
      'Use two 2-to-4 Decoders, both receiving A0 and A1.',
      'AND each output of the first decoder with NOT_A2 for Y0-Y3.',
      'AND each output of the second decoder with A2 for Y4-Y7.',
    ],
    unlocksComponent: {
      name: '3-to-8 Decoder',
      description: 'Decodes 3-bit input to one-of-eight output',
    },
  },
  {
    id: 'enc-encoder-4to2',
    trackId: 'encoding',
    order: 3,
    name: '4-to-2 Priority Encoder',
    description: 'Encode the highest active input as a 2-bit number',
    briefing:
      'A 4-to-2 priority encoder outputs the binary index of the highest-priority active input.\n\n' +
      'I3 has the highest priority. The Valid output is 1 when any input is active.\n\n' +
      '- Y1 = I3 OR I2\n' +
      '- Y0 = I3 OR (I1 AND NOT I2)\n' +
      '- Valid = I3 OR I2 OR I1 OR I0',
    difficulty: 3,
    prerequisites: ['intro-and'],
    availableGates: ['AND', 'OR', 'NOT'],
    availableComponents: [],
    setupInputs: [
      { label: 'I0', position: { x: 80, y: 80 } },
      { label: 'I1', position: { x: 80, y: 180 } },
      { label: 'I2', position: { x: 80, y: 280 } },
      { label: 'I3', position: { x: 80, y: 380 } },
    ],
    setupOutputs: [
      { label: 'Y0', position: { x: 600, y: 120 } },
      { label: 'Y1', position: { x: 600, y: 250 } },
      { label: 'Valid', position: { x: 600, y: 380 } },
    ],
    truthTable: [
      { inputs: { I0: 0, I1: 0, I2: 0, I3: 0 }, outputs: { Y0: 0, Y1: 0, Valid: 0 } },
      { inputs: { I0: 1, I1: 0, I2: 0, I3: 0 }, outputs: { Y0: 0, Y1: 0, Valid: 1 } },
      { inputs: { I0: 0, I1: 1, I2: 0, I3: 0 }, outputs: { Y0: 1, Y1: 0, Valid: 1 } },
      { inputs: { I0: 0, I1: 0, I2: 1, I3: 0 }, outputs: { Y0: 0, Y1: 1, Valid: 1 } },
      { inputs: { I0: 0, I1: 0, I2: 0, I3: 1 }, outputs: { Y0: 1, Y1: 1, Valid: 1 } },
      { inputs: { I0: 1, I1: 1, I2: 0, I3: 0 }, outputs: { Y0: 1, Y1: 0, Valid: 1 } },
      { inputs: { I0: 1, I1: 0, I2: 1, I3: 0 }, outputs: { Y0: 0, Y1: 1, Valid: 1 } },
      { inputs: { I0: 1, I1: 1, I2: 1, I3: 1 }, outputs: { Y0: 1, Y1: 1, Valid: 1 } },
    ],
    hints: [
      'Y1 = I3 OR I2 (the output is in the upper half if I2 or I3 is active).',
      'Y0 = I3 OR (I1 AND NOT I2) — I3 always sets Y0; I1 sets Y0 only if I2 is not active.',
      'Valid is just the OR of all inputs.',
    ],
    unlocksComponent: {
      name: '4-to-2 Encoder',
      description: 'Priority encodes 4 inputs into 2-bit output with valid flag',
    },
  },
  {
    id: 'enc-encoder-8to3',
    trackId: 'encoding',
    order: 4,
    name: '8-to-3 Priority Encoder',
    description: 'Encode the highest of 8 inputs as a 3-bit number',
    briefing:
      'An 8-to-3 priority encoder outputs the 3-bit index of the highest-priority active input.\n\n' +
      'Build it from two 4-to-2 Encoders and additional OR logic. The upper encoder (I4-I7) takes priority.',
    difficulty: 4,
    prerequisites: ['enc-encoder-4to2'],
    availableGates: ['AND', 'OR', 'NOT'],
    availableComponents: ['enc-encoder-4to2'],
    setupInputs: [
      { label: 'I0', position: { x: 60, y: 40 } },
      { label: 'I1', position: { x: 60, y: 110 } },
      { label: 'I2', position: { x: 60, y: 180 } },
      { label: 'I3', position: { x: 60, y: 250 } },
      { label: 'I4', position: { x: 60, y: 340 } },
      { label: 'I5', position: { x: 60, y: 410 } },
      { label: 'I6', position: { x: 60, y: 480 } },
      { label: 'I7', position: { x: 60, y: 550 } },
    ],
    setupOutputs: [
      { label: 'Y0', position: { x: 700, y: 120 } },
      { label: 'Y1', position: { x: 700, y: 240 } },
      { label: 'Y2', position: { x: 700, y: 360 } },
      { label: 'Valid', position: { x: 700, y: 480 } },
    ],
    truthTable: [
      { inputs: { I0: 0, I1: 0, I2: 0, I3: 0, I4: 0, I5: 0, I6: 0, I7: 0 }, outputs: { Y0: 0, Y1: 0, Y2: 0, Valid: 0 } },
      { inputs: { I0: 1, I1: 0, I2: 0, I3: 0, I4: 0, I5: 0, I6: 0, I7: 0 }, outputs: { Y0: 0, Y1: 0, Y2: 0, Valid: 1 } },
      { inputs: { I0: 0, I1: 0, I2: 0, I3: 0, I4: 1, I5: 0, I6: 0, I7: 0 }, outputs: { Y0: 0, Y1: 0, Y2: 1, Valid: 1 } },
      { inputs: { I0: 0, I1: 0, I2: 0, I3: 0, I4: 0, I5: 0, I6: 0, I7: 1 }, outputs: { Y0: 1, Y1: 1, Y2: 1, Valid: 1 } },
      { inputs: { I0: 1, I1: 1, I2: 1, I3: 1, I4: 1, I5: 0, I6: 0, I7: 0 }, outputs: { Y0: 0, Y1: 0, Y2: 1, Valid: 1 } },
      { inputs: { I0: 0, I1: 0, I2: 1, I3: 0, I4: 0, I5: 0, I6: 0, I7: 0 }, outputs: { Y0: 0, Y1: 1, Y2: 0, Valid: 1 } },
    ],
    hints: [
      'Feed I0-I3 into one 4-to-2 Encoder and I4-I7 into another.',
      'Y2 = upper encoder Valid (any of I4-I7 is active).',
      'When Y2=1, use the upper encoder outputs for Y0,Y1; otherwise use the lower encoder outputs.',
      'Use AND/OR/NOT to select between the two encoder outputs based on Y2.',
    ],
    unlocksComponent: {
      name: '8-to-3 Encoder',
      description: 'Priority encodes 8 inputs into 3-bit output with valid flag',
    },
  },
]
