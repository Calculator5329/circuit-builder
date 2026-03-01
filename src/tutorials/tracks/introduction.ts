import type { TutorialDefinition } from '../../types/tutorial'

export const introductionTutorials: TutorialDefinition[] = [
  {
    id: 'intro-wire',
    trackId: 'introduction',
    order: 1,
    name: 'Wire It Up',
    description: 'Connect an input to an output',
    briefing:
      'Welcome to Circuit Builder! Your first task is simple: connect the input on the left to the output on the right.\n\n' +
      'Drag from the green port on the Input to the port on the Output to create a wire. ' +
      'Then click the Input to toggle it and watch the signal flow through.',
    difficulty: 1,
    prerequisites: [],
    availableGates: [],
    availableComponents: [],
    setupInputs: [{ label: 'In', position: { x: 100, y: 200 } }],
    setupOutputs: [{ label: 'Out', position: { x: 500, y: 200 } }],
    truthTable: [
      { inputs: { In: 0 }, outputs: { Out: 0 } },
      { inputs: { In: 1 }, outputs: { Out: 1 } },
    ],
    hints: [
      'Drag from the small square on the right side of the Input node to the square on the left side of the Output node.',
      'The output should match the input exactly — no gates needed!',
    ],
  },
  {
    id: 'intro-not',
    trackId: 'introduction',
    order: 2,
    name: 'The Inverter',
    description: 'Use a NOT gate to flip a signal',
    briefing:
      'A NOT gate inverts its input: 0 becomes 1, and 1 becomes 0.\n\n' +
      'Drag a NOT gate from the palette and connect it between the Input and Output.',
    difficulty: 1,
    prerequisites: ['intro-wire'],
    availableGates: ['NOT'],
    availableComponents: [],
    setupInputs: [{ label: 'In', position: { x: 100, y: 200 } }],
    setupOutputs: [{ label: 'Out', position: { x: 500, y: 200 } }],
    truthTable: [
      { inputs: { In: 0 }, outputs: { Out: 1 } },
      { inputs: { In: 1 }, outputs: { Out: 0 } },
    ],
    hints: [
      'Drag a NOT gate from the Gates section in the palette onto the canvas.',
      'Wire: Input → NOT → Output',
    ],
  },
  {
    id: 'intro-and',
    trackId: 'introduction',
    order: 3,
    name: 'AND Logic',
    description: 'Output 1 only when both inputs are 1',
    briefing:
      'An AND gate outputs 1 only when **both** inputs are 1. Otherwise, it outputs 0.\n\n' +
      'Connect both inputs through an AND gate to the output.',
    difficulty: 1,
    prerequisites: ['intro-not'],
    availableGates: ['AND'],
    availableComponents: [],
    setupInputs: [
      { label: 'A', position: { x: 100, y: 150 } },
      { label: 'B', position: { x: 100, y: 280 } },
    ],
    setupOutputs: [{ label: 'Y', position: { x: 500, y: 200 } }],
    truthTable: [
      { inputs: { A: 0, B: 0 }, outputs: { Y: 0 } },
      { inputs: { A: 0, B: 1 }, outputs: { Y: 0 } },
      { inputs: { A: 1, B: 0 }, outputs: { Y: 0 } },
      { inputs: { A: 1, B: 1 }, outputs: { Y: 1 } },
    ],
    hints: [
      'Drag an AND gate onto the canvas between the inputs and output.',
      'Connect A to the top input of the AND gate, B to the bottom input, and the AND output to Y.',
    ],
  },
]
