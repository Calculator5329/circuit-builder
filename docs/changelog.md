# Changelog

## [Unreleased] — Retro PCB GUI Redesign

### Added
- CSS variable design token system in `src/index.css` (`:root` block)
- Google Fonts: Share Tech Mono (display), IBM Plex Mono (body)
- `@keyframes signal-pulse` animation for HIGH wires (phosphor glow throb)
- `.wire-high` CSS class applied to HIGH signal wire paths
- `docs/` folder with `roadmap.md`, `tech_spec.md`, `changelog.md`

### Changed

**Design tokens**
- All colors now use CSS variables — single source of truth for the whole palette

**Signal colors** (`src/utils/signalUtils.ts`)
- HIGH: `#22c55e` → `#00ff41` (phosphor green)
- LOW: `#334155` → `#1a3a1a` (dim PCB trace)
- FLOAT: `#475569` → `#ffb300` (amber)

**Gate symbols** (all 7 in `src/components/nodes/symbols/`)
- Fill: `#1e293b` → `#070d07` (dark green-black)
- Stroke width: `2` → `2.5`
- Added `strokeLinecap="round"` and `strokeLinejoin="round"`
- Default stroke prop: `#94a3b8` → `#3a7a3a`

**GateNode** (`src/components/nodes/GateNode.tsx`)
- Container now styled as IC chip silkscreen (dark bg, inset ring border)
- Selected: amber ring + amber glow shadow (was blue drop-shadow)
- Handle shape: round → square (`borderRadius: 2`)
- IC type label overflows below node in dim monospace

**InputNode** (`src/components/nodes/InputNode.tsx`)
- Redesigned as physical pushbutton with bezel ring + radial-gradient inner cap
- HIGH: phosphor green bloom glow; LOW: dark trace green
- Label uses `var(--font-display)` monospace

**OutputNode** (`src/components/nodes/OutputNode.tsx`)
- Redesigned as PCB LED dome with glass-dome radial gradient
- HIGH: `#00ff41` bloom; LOW: dark; FLOAT: amber tint
- Lens highlight pseudo-element for 3D glass illusion

**WireEdge** (`src/components/edges/WireEdge.tsx`)
- HIGH: `#00ff41`, 2.5px, `wire-high` glow animation
- LOW: `#1a3a1a`, 1.5px, 55% opacity
- FLOAT: `#ffb300`, 1.5px, dashed `5 4`
- Selected: `#ffb300` (was `#60a5fa`)

**Toolbar** (`src/components/toolbar/Toolbar.tsx`)
- Logo: `[CB]` in Share Tech Mono with amber brackets
- Circuit name: `▶ Project Name` breadcrumb style
- All text/buttons use monospace, all-caps letterpress
- Node count readout (hidden on small screens)

**Sidebar** (`src/components/sidebar/Sidebar.tsx`)
- Tab bar: amber underline on active (was violet)
- Font: Share Tech Mono, uppercase `GATES` / `LIBRARY`

**GatePalette** (`src/components/sidebar/GatePalette.tsx`)
- Section headers: `// LABEL ————` silkscreen style

**GatePaletteItem** (`src/components/sidebar/GatePaletteItem.tsx`)
- Hover: inset green ring instead of bg color change
- Labels all-caps display font
- I/O items show custom `SW` / `LED` / `DEC` / `BIN` previews

**CircuitLibrary + LibraryCard**
- All text monospace, consistent with PCB aesthetic
- Library card context menu uses display font all-caps

**CircuitCanvas** (`src/components/canvas/CircuitCanvas.tsx`)
- Background: `Dots` → `Cross` (PCB crosshatch grid) + secondary dots layer
- Grid color: `#0f1f0f` (very dark green)
- Minimap node colors differentiated by type (INPUT/OUTPUT/CUSTOM/gate)

**Button** (`src/components/ui/Button.tsx`)
- Flat instrument-panel style: inset ring border, no gradient
- All variants use `var(--font-display)` all-caps
- Hover state uses JS `onMouseEnter/Leave` for CSS variable compatibility

**Modal** (`src/components/ui/Modal.tsx`)
- Title bar: `▶_` prefix + Share Tech Mono title
- Close button shows `✕` red hover
- Panel uses `var(--bg-panel)` + `var(--border-mid)` border

**DecimalInputNode / DecimalOutputNode** (`src/components/nodes/`)
- IC chip header stripe with `DEC→BIN` / `BIN→DEC` silkscreen label
- Inputs/displays styled with design token colors
- Handle shape: square nubs

**CustomGateNode** (`src/components/nodes/CustomGateNode.tsx`)
- IC chip header with `IC` label + component name in amber
- Consistent border/glow treatment with other nodes
