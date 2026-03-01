import { create } from 'zustand'
import type { TutorialDefinition, TutorialProgress, VerificationResult } from '../types/tutorial'
import { ALL_TUTORIALS, getTutorialById, getNextTutorial } from '../tutorials/tracks'
import { verifyCircuit } from '../tutorials/verification'
import { useCircuitStore } from './circuitStore'
import { createGateNode } from '../utils/nodeFactory'
import type { GateNode } from '../types/circuit'

const STORAGE_KEY = 'lgcb:tutorial-progress'

function loadProgress(): TutorialProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return { completedTutorials: [], unlockedComponents: {} }
}

function saveProgress(progress: TutorialProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch { /* ignore */ }
}

export type AppView = 'sandbox' | 'tutorial-hub' | 'tutorial-active'

interface TutorialStore {
  view: AppView
  activeTutorial: TutorialDefinition | null
  progress: TutorialProgress
  verificationResult: VerificationResult | null
  hintIndex: number

  setView: (view: AppView) => void
  startTutorial: (tutorialId: string) => void
  exitTutorial: () => void
  verify: () => void
  resetTutorial: () => void
  revealNextHint: () => void
  advanceToNext: () => void
  getNextUnlockedTutorial: () => TutorialDefinition | undefined
  isTutorialUnlocked: (tutorialId: string) => boolean
  isTrackAccessible: (trackId: string) => boolean

  _loadProgress: () => void
}

const initialProgress = loadProgress()

export const useTutorialStore = create<TutorialStore>((set, get) => ({
  view: initialProgress.completedTutorials.length === 0 ? 'tutorial-hub' : 'sandbox',
  activeTutorial: null,
  progress: initialProgress,
  verificationResult: null,
  hintIndex: -1,

  setView: (view) => set({ view }),

  _loadProgress: () => {
    set({ progress: loadProgress() })
  },

  startTutorial: (tutorialId) => {
    const tutorial = getTutorialById(tutorialId)
    if (!tutorial) return

    const circuitStore = useCircuitStore.getState()

    circuitStore.clearCanvas()

    const inputNodes: GateNode[] = tutorial.setupInputs.map(inp =>
      createGateNode('INPUT', inp.position, inp.label)
    )
    const outputNodes: GateNode[] = tutorial.setupOutputs.map(out =>
      createGateNode('OUTPUT', out.position, out.label)
    )

    const allSetupNodes = [...inputNodes, ...outputNodes]

    useCircuitStore.setState(state => ({
      nodes: [...state.nodes, ...allSetupNodes],
      isDirty: false,
    }))
    circuitStore.runSimulation()

    set({
      activeTutorial: tutorial,
      view: 'tutorial-active',
      verificationResult: null,
      hintIndex: -1,
    })
  },

  exitTutorial: () => {
    useCircuitStore.getState().clearCanvas()
    set({
      activeTutorial: null,
      view: 'tutorial-hub',
      verificationResult: null,
      hintIndex: -1,
    })
  },

  verify: () => {
    const { activeTutorial, progress } = get()
    if (!activeTutorial) return

    const { nodes, edges, savedCircuits } = useCircuitStore.getState()
    const result = verifyCircuit(activeTutorial, nodes, edges, savedCircuits)

    set({ verificationResult: result })

    if (result.passed && !progress.completedTutorials.includes(activeTutorial.id)) {
      if (activeTutorial.unlocksComponent) {
        const circuitStore = useCircuitStore.getState()
        circuitStore.saveCurrentAsComponent(
          activeTutorial.unlocksComponent.name,
          activeTutorial.unlocksComponent.description,
        )
        const updatedSaved = useCircuitStore.getState().savedCircuits
        const newComponent = updatedSaved[updatedSaved.length - 1]

        const newProgress: TutorialProgress = {
          completedTutorials: [...progress.completedTutorials, activeTutorial.id],
          unlockedComponents: {
            ...progress.unlockedComponents,
            [activeTutorial.id]: newComponent.id,
          },
        }
        set({ progress: newProgress })
        saveProgress(newProgress)
      } else {
        const newProgress: TutorialProgress = {
          ...progress,
          completedTutorials: [...progress.completedTutorials, activeTutorial.id],
        }
        set({ progress: newProgress })
        saveProgress(newProgress)
      }
    }
  },

  resetTutorial: () => {
    const { activeTutorial } = get()
    if (!activeTutorial) return
    get().startTutorial(activeTutorial.id)
  },

  revealNextHint: () => {
    const { activeTutorial, hintIndex } = get()
    if (!activeTutorial) return
    if (hintIndex < activeTutorial.hints.length - 1) {
      set({ hintIndex: hintIndex + 1 })
    }
  },

  advanceToNext: () => {
    const next = get().getNextUnlockedTutorial()
    if (next) {
      get().startTutorial(next.id)
    } else {
      get().exitTutorial()
    }
  },

  getNextUnlockedTutorial: () => {
    const { activeTutorial } = get()
    if (!activeTutorial) return undefined
    const next = getNextTutorial(activeTutorial.id)
    if (next && get().isTutorialUnlocked(next.id)) return next
    return undefined
  },

  isTutorialUnlocked: (tutorialId) => {
    const tutorial = getTutorialById(tutorialId)
    if (!tutorial) return false
    if (tutorial.prerequisites.length === 0) return true
    const { completedTutorials } = get().progress
    return tutorial.prerequisites.every(pre => completedTutorials.includes(pre))
  },

  isTrackAccessible: (trackId) => {
    const trackTutorials = ALL_TUTORIALS.filter(t => t.trackId === trackId)
    return trackTutorials.some(t => get().isTutorialUnlocked(t.id))
  },
}))
