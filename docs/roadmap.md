# Circuit Builder — Roadmap

## Phase 1: Core MVP ✅
- [x] React Flow canvas with drag-and-drop node placement
- [x] AND, OR, NOT, NAND, NOR, XOR, XNOR gates
- [x] INPUT / OUTPUT toggle nodes
- [x] DECIMAL_INPUT / DECIMAL_OUTPUT (8-bit) nodes
- [x] Wire edges with signal propagation
- [x] Live simulation engine (topological sort)
- [x] Custom component save/load/rename/delete (Circuit Library)
- [x] Keyboard shortcuts (Delete, Escape)
- [x] Import/Export JSON
- [x] LocalStorage persistence

## Phase 2: Retro PCB GUI Redesign ✅
- [x] Phosphor green / amber / PCB dark-green design language
- [x] CSS variable design token system
- [x] Share Tech Mono + IBM Plex Mono typography
- [x] IC chip silkscreen style for all gate nodes
- [x] Physical pushbutton INPUT, LED dome OUTPUT
- [x] Phosphor-glow HIGH wires, dim trace LOW wires, amber dashed FLOAT
- [x] PCB crosshatch canvas background
- [x] Retro instrument-panel toolbar
- [x] Monospace sidebar with silkscreen-label section headers
- [x] Retro panel Button + Modal components

## Phase 3: Planned
- [ ] Undo/redo (Ctrl+Z / Ctrl+Y)
- [ ] Multi-bit buses (n-bit wires)
- [ ] Clock node (oscillating signal with configurable frequency)
- [ ] Truth table panel (auto-generate from inputs/outputs)
- [ ] Export as PNG / SVG screenshot
- [ ] Dark/light theme toggle
