# Circuit Builder — Technical Specification

## Stack
| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 7 |
| Styling | Tailwind CSS v4 + CSS variables |
| Canvas | @xyflow/react 12 (React Flow) |
| State | Zustand 5 |
| Fonts | Share Tech Mono (display), IBM Plex Mono (body) — Google Fonts |

## Architecture (Three-Layer)

```
UI Layer          → src/components/**
Store Layer       → src/store/circuitStore.ts
Service Layer     → src/simulation/, src/persistence/, src/utils/
```

## Design Token System

All design tokens live in `:root` inside `src/index.css`:

```
--bg-canvas       #060b06      Canvas background
--bg-panel        #0a0f0a      Toolbar / sidebar background
--bg-surface      #0f160f      Input fields, elevated surfaces
--border-dim      #172817      Faintest border
--border-mid      #254525      Default border
--border-hi       #3a7a3a      Highlighted / focused border
--phosphor-hi     #00ff41      HIGH signal (phosphor green)
--phosphor-lo     #0d2b0d      LOW signal fill (dim trace)
--amber           #ffb300      Selected elements, FLOAT signal
--danger          #ff3333      Error states, delete actions
--text-primary    #a8d4a8      Default body text
--text-dim        #3d5e3d      Subdued labels
--text-bright     #d0f0d0      Emphasized text
--font-mono       IBM Plex Mono
--font-display    Share Tech Mono
```

## Signal Colors

| Signal | Color | Usage |
|---|---|---|
| `1` (HIGH) | `#00ff41` phosphor green | Wire stroke, handle bg, button glow |
| `0` (LOW) | `#1a3a1a` dim trace | Wire stroke (0.55 opacity), handle bg |
| `null` (FLOAT) | `#ffb300` amber | Dashed wire, handle bg, "?" display |

Implemented in `src/utils/signalUtils.ts → signalToColor()`.

## Simulation Engine

Located in `src/simulation/`:
- `topology.ts` — topological sort of node graph
- `gateEvaluators.ts` — pure functions per gate type
- `engine.ts` — runs simulation pass, triggers on every state change

Custom gates recurse into inner circuit via `runSimulation`.

## Persistence

`src/persistence/localStorage.ts` — save/load circuit state.
`src/persistence/serialization.ts` — JSON import/export format.

## Key Type Definitions

`src/types/circuit.ts` — `Signal`, `GateType`, `GateNodeData`, `WireEdgeData`, `SavedCircuit`.
