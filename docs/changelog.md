# Changelog

## 2026-02-28 — Tutorial Progression System

### Added
- **Tutorial system** with 23 tutorials across 8 tracks:
  - Introduction (3 tutorials: Wire It Up, The Inverter, AND Logic)
  - Arithmetic (4: Half Adder, Full Adder, Half Subtractor, Full Subtractor)
  - Multi-bit Arithmetic (3: 4-bit Adder, 4-bit Subtractor, Adder-Subtractor)
  - Multiplexing (4: 2:1 Mux, 4:1 Mux, 1:2 Demux, 1:4 Demux)
  - Encoding & Decoding (4: 2-to-4 Decoder, 3-to-8 Decoder, 4-to-2 Encoder, 8-to-3 Encoder)
  - Comparison (2: 1-bit Comparator, 4-bit Comparator)
  - ALU (2: 1-bit ALU, 4-bit ALU)
  - Display (1: 7-Segment Decoder)
- **Truth-table verification** reusing the existing simulation engine
- **Component unlock system**: completing a tutorial saves the circuit as a reusable component
- **Tutorial Hub UI**: track grid with progress bars, tutorial cards with lock/unlock/complete states
- **Tutorial Panel**: replaces sidebar during active tutorial with briefing, restricted gate palette, progressive hints, and verification feedback
- **Verification Feedback**: truth table showing expected vs actual values per row
- **Canvas restrictions in tutorial mode**: pre-placed I/O nodes cannot be deleted, only allowed gates are available
- **Constant node** (`CONSTANT`): always outputs 0 or 1, click to toggle. Useful for tying off carry-in lines.
- **7-Segment Display node** (`SEVEN_SEGMENT_DISPLAY`): visual 7-segment display with 7 input ports (a-g)
- **Tutorial progress persistence** to localStorage
- **docs/ folder** with roadmap, changelog, and tech spec

### Modified
- `App.tsx`: three-view routing (sandbox / tutorial-hub / tutorial-active)
- `Toolbar.tsx`: tutorial mode indicator, Tutorials button, Exit Tutorial button
- `CircuitCanvas.tsx`: tutorial mode restrictions (prevent I/O deletion, block I/O drops)
- `GatePalette.tsx`: added Constant and 7-Seg Display to I/O section
- `circuit.ts`: added CONSTANT and SEVEN_SEGMENT_DISPLAY to GateType union
- `gateEvaluators.ts`: evaluators for new gate types
- `engine.ts`: CONSTANT node treated like INPUT (reads from inputState)
- `portUtils.ts`: port definitions for new types
- `nodeFactory.ts`: default labels and inputState for CONSTANT
- `circuitStore.ts`: toggleInput supports CONSTANT nodes
