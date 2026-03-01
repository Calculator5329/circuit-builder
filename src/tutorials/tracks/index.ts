import type { TutorialTrack, TutorialDefinition } from '../../types/tutorial'
import { introductionTutorials } from './introduction'
import { arithmeticTutorials } from './arithmetic'
import { multibitArithmeticTutorials } from './multibitArithmetic'
import { multiplexingTutorials } from './multiplexing'
import { encodingTutorials } from './encoding'
import { comparisonTutorials } from './comparison'
import { aluTutorials } from './alu'
import { displayTutorials } from './display'

export const TRACKS: TutorialTrack[] = [
  { id: 'introduction',        name: 'Introduction',         description: 'Learn the basics of wiring and logic gates',              order: 1 },
  { id: 'arithmetic',          name: 'Arithmetic',           description: 'Build adders and subtractors from basic gates',           order: 2 },
  { id: 'multibit-arithmetic', name: 'Multi-bit Arithmetic', description: 'Chain components into multi-bit arithmetic circuits',     order: 3 },
  { id: 'multiplexing',        name: 'Multiplexing',         description: 'Route signals with multiplexers and demultiplexers',      order: 4 },
  { id: 'encoding',            name: 'Encoding & Decoding',  description: 'Convert between binary representations',                  order: 5 },
  { id: 'comparison',          name: 'Comparison',           description: 'Compare binary numbers bit by bit',                       order: 6 },
  { id: 'alu',                 name: 'ALU',                  description: 'Build the heart of a CPU — the Arithmetic Logic Unit',    order: 7 },
  { id: 'display',             name: 'Display',              description: 'Drive visual outputs like 7-segment displays',            order: 8 },
]

export const ALL_TUTORIALS: TutorialDefinition[] = [
  ...introductionTutorials,
  ...arithmeticTutorials,
  ...multibitArithmeticTutorials,
  ...multiplexingTutorials,
  ...encodingTutorials,
  ...comparisonTutorials,
  ...aluTutorials,
  ...displayTutorials,
]

export function getTutorialById(id: string): TutorialDefinition | undefined {
  return ALL_TUTORIALS.find(t => t.id === id)
}

export function getTutorialsForTrack(trackId: string): TutorialDefinition[] {
  return ALL_TUTORIALS
    .filter(t => t.trackId === trackId)
    .sort((a, b) => a.order - b.order)
}

export function getTrackById(trackId: string): TutorialTrack | undefined {
  return TRACKS.find(t => t.id === trackId)
}
