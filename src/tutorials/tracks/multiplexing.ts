import type { TutorialDefinition } from '../../types/tutorial'

export const multiplexingTutorials: TutorialDefinition[] = [
  {
    id: 'mux-2to1',
    trackId: 'multiplexing',
    order: 1,
    name: '2:1 Multiplexer',
    description: 'Select between two inputs using a control signal',
    briefing:
      'A 2:1 multiplexer selects one of two data inputs based on a selector signal.\n\n' +
      '- When Sel=0, output Y = D0\n' +
      '- When Sel=1, output Y = D1\n\n' +
      'Build it from AND, OR, and NOT gates:\n' +
      'Y = (D0 AND NOT Sel) OR (D1 AND Sel)',
    difficulty: 2,
    prerequisites: ['intro-and'],
    availableGates: ['AND', 'OR', 'NOT'],
    availableComponents: [],
    setupInputs: [
      { label: 'D0', position: { x: 100, y: 120 } },
      { label: 'D1', position: { x: 100, y: 250 } },
      { label: 'Sel', position: { x: 100, y: 380 } },
    ],
    setupOutputs: [{ label: 'Y', position: { x: 600, y: 200 } }],
    truthTable: [
      { inputs: { D0: 0, D1: 0, Sel: 0 }, outputs: { Y: 0 } },
      { inputs: { D0: 0, D1: 1, Sel: 0 }, outputs: { Y: 0 } },
      { inputs: { D0: 1, D1: 0, Sel: 0 }, outputs: { Y: 1 } },
      { inputs: { D0: 1, D1: 1, Sel: 0 }, outputs: { Y: 1 } },
      { inputs: { D0: 0, D1: 0, Sel: 1 }, outputs: { Y: 0 } },
      { inputs: { D0: 0, D1: 1, Sel: 1 }, outputs: { Y: 1 } },
      { inputs: { D0: 1, D1: 0, Sel: 1 }, outputs: { Y: 0 } },
      { inputs: { D0: 1, D1: 1, Sel: 1 }, outputs: { Y: 1 } },
    ],
    hints: [
      'NOT the Sel signal to get NOT_Sel.',
      'AND D0 with NOT_Sel, AND D1 with Sel.',
      'OR the two AND outputs together to get Y.',
    ],
    unlocksComponent: {
      name: '2:1 Mux',
      description: 'Selects one of two inputs based on selector',
    },
  },
  {
    id: 'mux-4to1',
    trackId: 'multiplexing',
    order: 2,
    name: '4:1 Multiplexer',
    description: 'Select one of four inputs with a 2-bit selector',
    briefing:
      'A 4:1 mux selects one of four data inputs using two selector bits (S0, S1).\n\n' +
      'Build it from three 2:1 Mux components:\n' +
      '- Mux1 selects between D0 and D1 using S0\n' +
      '- Mux2 selects between D2 and D3 using S0\n' +
      '- Mux3 selects between Mux1 output and Mux2 output using S1',
    difficulty: 3,
    prerequisites: ['mux-2to1'],
    availableGates: [],
    availableComponents: ['mux-2to1'],
    setupInputs: [
      { label: 'D0', position: { x: 80, y: 80 } },
      { label: 'D1', position: { x: 80, y: 170 } },
      { label: 'D2', position: { x: 80, y: 260 } },
      { label: 'D3', position: { x: 80, y: 350 } },
      { label: 'S0', position: { x: 80, y: 470 } },
      { label: 'S1', position: { x: 80, y: 560 } },
    ],
    setupOutputs: [{ label: 'Y', position: { x: 650, y: 230 } }],
    truthTable: [
      { inputs: { D0: 1, D1: 0, D2: 0, D3: 0, S0: 0, S1: 0 }, outputs: { Y: 1 } },
      { inputs: { D0: 0, D1: 1, D2: 0, D3: 0, S0: 1, S1: 0 }, outputs: { Y: 1 } },
      { inputs: { D0: 0, D1: 0, D2: 1, D3: 0, S0: 0, S1: 1 }, outputs: { Y: 1 } },
      { inputs: { D0: 0, D1: 0, D2: 0, D3: 1, S0: 1, S1: 1 }, outputs: { Y: 1 } },
      { inputs: { D0: 1, D1: 1, D2: 1, D3: 1, S0: 0, S1: 0 }, outputs: { Y: 1 } },
      { inputs: { D0: 0, D1: 0, D2: 0, D3: 0, S0: 0, S1: 0 }, outputs: { Y: 0 } },
    ],
    hints: [
      'Use three 2:1 Mux components arranged in a tree.',
      'The first level uses S0 to select within pairs (D0/D1 and D2/D3).',
      'The second level uses S1 to select between the two first-level outputs.',
    ],
    unlocksComponent: {
      name: '4:1 Mux',
      description: 'Selects one of four inputs using 2-bit selector',
    },
  },
  {
    id: 'demux-1to2',
    trackId: 'multiplexing',
    order: 3,
    name: '1:2 Demultiplexer',
    description: 'Route an input to one of two outputs',
    briefing:
      'A 1:2 demultiplexer routes one input signal to one of two outputs based on a selector.\n\n' +
      '- When Sel=0: Y0=In, Y1=0\n' +
      '- When Sel=1: Y0=0, Y1=In\n\n' +
      'Build it from AND and NOT gates.',
    difficulty: 2,
    prerequisites: ['intro-and'],
    availableGates: ['AND', 'NOT'],
    availableComponents: [],
    setupInputs: [
      { label: 'In', position: { x: 100, y: 150 } },
      { label: 'Sel', position: { x: 100, y: 300 } },
    ],
    setupOutputs: [
      { label: 'Y0', position: { x: 550, y: 120 } },
      { label: 'Y1', position: { x: 550, y: 280 } },
    ],
    truthTable: [
      { inputs: { In: 0, Sel: 0 }, outputs: { Y0: 0, Y1: 0 } },
      { inputs: { In: 1, Sel: 0 }, outputs: { Y0: 1, Y1: 0 } },
      { inputs: { In: 0, Sel: 1 }, outputs: { Y0: 0, Y1: 0 } },
      { inputs: { In: 1, Sel: 1 }, outputs: { Y0: 0, Y1: 1 } },
    ],
    hints: [
      'Y0 = In AND (NOT Sel)',
      'Y1 = In AND Sel',
    ],
    unlocksComponent: {
      name: '1:2 Demux',
      description: 'Routes input to one of two outputs based on selector',
    },
  },
  {
    id: 'demux-1to4',
    trackId: 'multiplexing',
    order: 4,
    name: '1:4 Demultiplexer',
    description: 'Route an input to one of four outputs',
    briefing:
      'A 1:4 demux routes one input to one of four outputs using two selector bits.\n\n' +
      'Build it from 1:2 Demux components: first split by S1, then split each result by S0.',
    difficulty: 3,
    prerequisites: ['demux-1to2'],
    availableGates: [],
    availableComponents: ['demux-1to2'],
    setupInputs: [
      { label: 'In', position: { x: 80, y: 200 } },
      { label: 'S0', position: { x: 80, y: 350 } },
      { label: 'S1', position: { x: 80, y: 450 } },
    ],
    setupOutputs: [
      { label: 'Y0', position: { x: 600, y: 80 } },
      { label: 'Y1', position: { x: 600, y: 190 } },
      { label: 'Y2', position: { x: 600, y: 300 } },
      { label: 'Y3', position: { x: 600, y: 410 } },
    ],
    truthTable: [
      { inputs: { In: 1, S0: 0, S1: 0 }, outputs: { Y0: 1, Y1: 0, Y2: 0, Y3: 0 } },
      { inputs: { In: 1, S0: 1, S1: 0 }, outputs: { Y0: 0, Y1: 1, Y2: 0, Y3: 0 } },
      { inputs: { In: 1, S0: 0, S1: 1 }, outputs: { Y0: 0, Y1: 0, Y2: 1, Y3: 0 } },
      { inputs: { In: 1, S0: 1, S1: 1 }, outputs: { Y0: 0, Y1: 0, Y2: 0, Y3: 1 } },
      { inputs: { In: 0, S0: 0, S1: 0 }, outputs: { Y0: 0, Y1: 0, Y2: 0, Y3: 0 } },
    ],
    hints: [
      'Use three 1:2 Demux components in a tree.',
      'First demux: split In by S1 into two paths.',
      'Second and third demuxes: split each path by S0.',
    ],
    unlocksComponent: {
      name: '1:4 Demux',
      description: 'Routes input to one of four outputs using 2-bit selector',
    },
  },
]
