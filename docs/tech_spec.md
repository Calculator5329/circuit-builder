# Circuit Builder — Technical Specification

## Architecture

Three-layer separation with one-way dependencies:

**UI Layer** -> **Store Layer** -> **Service Layer**

| Layer | Purpose | Key Files |
|-------|---------|-----------|
| UI | Presentation, user interaction | `src/components/`, `src/App.tsx` |
| Store | State management + business logic | `src/store/circuitStore.ts`, `src/store/tutorialStore.ts` |
| Service | Simulation, persistence, tutorial data | `src/simulation/`, `src/persistence/`, `src/tutorials/` |

## Tech Stack

- **React 19** + TypeScript
- **Vite 7** (build/dev)
- **@xyflow/react 12** (React Flow) — node-based canvas
- **Zustand 5** — state management
- **Tailwind CSS 4** — utility styling

## Simulation Engine

Purely combinational. Located in `src/simulation/`.

1. `topology.ts`: builds edge maps, performs Kahn's topological sort
2. `gateEvaluators.ts`: evaluates each gate type given input signals
3. `engine.ts`: orchestrates simulation — resolves signals in topological order, handles CUSTOM nodes via recursive simulation

Cycles are detected and yield `null` signals. No clock/sequential support.

## Gate Types

| GateType | Inputs | Outputs | Evaluation |
|----------|--------|---------|------------|
| AND, OR, NAND, NOR, XOR, XNOR | in0, in1 | out0 | Two-input boolean op |
| NOT | in0 | out0 | Single-input inversion |
| INPUT | (none) | out0 | Reads from `inputState` |
| OUTPUT | in0 | (none) | Sink — displays input signal |
| DECIMAL_INPUT | (none) | bit0-bit7 | Reads from `decimalValue`, outputs 8 bits |
| DECIMAL_OUTPUT | bit0-bit7 | (none) | Sink — displays decimal value of 8 input bits |
| CONSTANT | (none) | out0 | Reads from `inputState`, always 0 or 1 |
| SEVEN_SEGMENT_DISPLAY | a-g | (none) | Sink — visual 7-segment display |
| CUSTOM | dynamic | dynamic | Recursive simulation on inner `SavedCircuit` |

## Tutorial System

### Data Model

- **TutorialTrack**: grouping of related tutorials (e.g., "Arithmetic")
- **TutorialDefinition**: single tutorial with truth table, prerequisites, available gates, setup nodes, hints
- **TutorialProgress**: tracks completed tutorials and unlocked component IDs

### Verification Flow

1. Tutorial pre-places INPUT/OUTPUT nodes with specific labels
2. User builds logic using restricted gate palette
3. On verify: for each truth table row, clone nodes, set INPUT states, run simulation, compare OUTPUT signals
4. All rows pass -> tutorial complete -> user's circuit saved as reusable component

### Unlock Mechanism

Reuses existing `SavedCircuit` + CUSTOM gate system:
- `saveCurrentAsComponent()` creates a `SavedCircuit` from the user's solution
- The `SavedCircuit` ID is stored in `TutorialProgress.unlockedComponents`
- Future tutorials reference prerequisite tutorial IDs; their unlocked components become available as CUSTOM gates

### Tutorial Tracks

| Track | Tutorials | Prerequisites |
|-------|-----------|---------------|
| Introduction | 3 | None |
| Arithmetic | 4 | Introduction |
| Multi-bit Arithmetic | 3 | Arithmetic |
| Multiplexing | 4 | Introduction |
| Encoding & Decoding | 4 | Introduction |
| Comparison | 2 | Introduction |
| ALU | 2 | Arithmetic + Multiplexing |
| Display | 1 | Introduction |

### Persistence

Tutorial progress stored separately in localStorage under key `lgcb:tutorial-progress`.

## State Management

Two Zustand stores:

1. **circuitStore** (`src/store/circuitStore.ts`): canvas nodes/edges, viewport, saved circuits, simulation, persistence
2. **tutorialStore** (`src/store/tutorialStore.ts`): active tutorial, progress, verification results, view routing

## File Structure

```
src/
├── components/
│   ├── canvas/          # CircuitCanvas (React Flow wrapper)
│   ├── edges/           # WireEdge
│   ├── nodes/           # Gate nodes, InputNode, OutputNode, ConstantNode, etc.
│   │   └── symbols/     # SVG gate symbols
│   ├── sidebar/         # Sidebar, GatePalette, CircuitLibrary
│   ├── toolbar/         # Toolbar
│   ├── tutorials/       # TutorialHub, TutorialPanel, TrackCard, TutorialCard, VerificationFeedback
│   └── ui/              # Button, Modal
├── hooks/               # useKeyboardShortcuts
├── persistence/         # localStorage, serialization
├── simulation/          # engine, topology, gateEvaluators
├── store/               # circuitStore, tutorialStore
├── tutorials/
│   ├── tracks/          # Track definition files (introduction, arithmetic, etc.)
│   └── verification.ts  # Truth-table verification service
├── types/               # circuit.ts, tutorial.ts
└── utils/               # nodeFactory, portUtils, signalUtils
```
