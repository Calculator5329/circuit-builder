# Circuit Builder — Roadmap

## Completed

- [x] Core circuit canvas with React Flow
- [x] Basic logic gates: AND, OR, NOT, NAND, NOR, XOR, XNOR
- [x] I/O nodes: Input (toggle), Output (LED), Decimal Input, Decimal Output
- [x] Combinational simulation engine (topological sort)
- [x] Custom circuit components (save as component, CUSTOM gate type)
- [x] Constant node (always 0 or 1, toggleable)
- [x] 7-Segment Display node (visual output)
- [x] Local persistence (localStorage)
- [x] JSON export/import
- [x] Keyboard shortcuts
- [x] Dark theme UI
- [x] Tutorial progression system (23 tutorials, 8 tracks)
  - [x] Truth-table based verification
  - [x] Component unlock on tutorial completion
  - [x] Tutorial Hub UI with track/tutorial selection
  - [x] Tutorial Panel with briefing, hints, restricted palette, verification feedback
  - [x] Progress persistence to localStorage

## Planned

- [ ] Sequential circuit support (CLOCK, flip-flops, registers)
  - Requires simulation engine upgrade: clocked evaluation, state retention, cycle handling
- [ ] Additional tutorial tracks for sequential circuits
- [ ] Bus/wire grouping for multi-bit signals
- [ ] Undo/redo
- [ ] Circuit sharing (URL-based or cloud storage)
- [ ] Accessibility improvements
