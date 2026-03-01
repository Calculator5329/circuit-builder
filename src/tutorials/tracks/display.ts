import type { TutorialDefinition } from '../../types/tutorial'

export const displayTutorials: TutorialDefinition[] = [
  {
    id: 'disp-7seg',
    trackId: 'display',
    order: 1,
    name: '7-Segment Decoder',
    description: 'Convert a 4-bit BCD input to 7-segment display signals',
    briefing:
      'A 7-segment decoder converts a 4-bit BCD (Binary Coded Decimal) input into the 7 segment ' +
      'signals (a-g) needed to display digits 0-9.\n\n' +
      'Segment layout:\n```\n aaa\nf   b\n ggg\ne   c\n ddd\n```\n\n' +
      'For example, digit "1" lights segments b and c. Digit "0" lights a, b, c, d, e, f.\n\n' +
      'Build the combinational logic for each segment output using AND, OR, and NOT gates.',
    difficulty: 4,
    prerequisites: ['intro-and'],
    availableGates: ['AND', 'OR', 'NOT'],
    availableComponents: [],
    setupInputs: [
      { label: 'BCD0', position: { x: 60, y: 100 } },
      { label: 'BCD1', position: { x: 60, y: 220 } },
      { label: 'BCD2', position: { x: 60, y: 340 } },
      { label: 'BCD3', position: { x: 60, y: 460 } },
    ],
    setupOutputs: [
      { label: 'a', position: { x: 700, y: 40 } },
      { label: 'b', position: { x: 700, y: 120 } },
      { label: 'c', position: { x: 700, y: 200 } },
      { label: 'd', position: { x: 700, y: 280 } },
      { label: 'e', position: { x: 700, y: 360 } },
      { label: 'f', position: { x: 700, y: 440 } },
      { label: 'g', position: { x: 700, y: 520 } },
    ],
    truthTable: [
      // 0: a,b,c,d,e,f on, g off
      { inputs: { BCD0: 0, BCD1: 0, BCD2: 0, BCD3: 0 }, outputs: { a: 1, b: 1, c: 1, d: 1, e: 1, f: 1, g: 0 } },
      // 1: b,c on
      { inputs: { BCD0: 1, BCD1: 0, BCD2: 0, BCD3: 0 }, outputs: { a: 0, b: 1, c: 1, d: 0, e: 0, f: 0, g: 0 } },
      // 2: a,b,d,e,g on
      { inputs: { BCD0: 0, BCD1: 1, BCD2: 0, BCD3: 0 }, outputs: { a: 1, b: 1, c: 0, d: 1, e: 1, f: 0, g: 1 } },
      // 3: a,b,c,d,g on
      { inputs: { BCD0: 1, BCD1: 1, BCD2: 0, BCD3: 0 }, outputs: { a: 1, b: 1, c: 1, d: 1, e: 0, f: 0, g: 1 } },
      // 4: b,c,f,g on
      { inputs: { BCD0: 0, BCD1: 0, BCD2: 1, BCD3: 0 }, outputs: { a: 0, b: 1, c: 1, d: 0, e: 0, f: 1, g: 1 } },
      // 5: a,c,d,f,g on
      { inputs: { BCD0: 1, BCD1: 0, BCD2: 1, BCD3: 0 }, outputs: { a: 1, b: 0, c: 1, d: 1, e: 0, f: 1, g: 1 } },
      // 6: a,c,d,e,f,g on
      { inputs: { BCD0: 0, BCD1: 1, BCD2: 1, BCD3: 0 }, outputs: { a: 1, b: 0, c: 1, d: 1, e: 1, f: 1, g: 1 } },
      // 7: a,b,c on
      { inputs: { BCD0: 1, BCD1: 1, BCD2: 1, BCD3: 0 }, outputs: { a: 1, b: 1, c: 1, d: 0, e: 0, f: 0, g: 0 } },
      // 8: all on
      { inputs: { BCD0: 0, BCD1: 0, BCD2: 0, BCD3: 1 }, outputs: { a: 1, b: 1, c: 1, d: 1, e: 1, f: 1, g: 1 } },
      // 9: a,b,c,d,f,g on
      { inputs: { BCD0: 1, BCD1: 0, BCD2: 0, BCD3: 1 }, outputs: { a: 1, b: 1, c: 1, d: 1, e: 0, f: 1, g: 1 } },
    ],
    hints: [
      'Work on one segment at a time. For each segment, determine which digit values light it up.',
      'Segment "a" is on for digits 0,2,3,5,6,7,8,9 — create a boolean expression for those cases.',
      'Use NOT gates to create inverted versions of BCD0-BCD3, then combine with AND/OR for each segment.',
      'This is a challenging tutorial with many gates. Start with the simpler segments like "b" (on for 0,1,2,3,4,7,8,9).',
    ],
    unlocksComponent: {
      name: '7-Seg Decoder',
      description: 'Converts BCD to 7-segment display signals',
    },
  },
]
