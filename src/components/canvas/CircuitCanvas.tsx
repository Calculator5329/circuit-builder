import { useCallback, useRef } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  type EdgeTypes,
  type Viewport,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useCircuitStore } from '../../store/circuitStore'
import { nodeTypes } from '../nodes'
import { WireEdge } from '../edges/WireEdge'
import type { GateType } from '../../types/circuit'

const edgeTypes: EdgeTypes = {
  wire: WireEdge,
}

const defaultEdgeOptions = {
  type: 'wire',
  data: { signal: null },
}

export function CircuitCanvas() {
  const {
    nodes, edges,
    onNodesChange, onEdgesChange, onConnect,
    addGate, addCustomGate, setViewport,
    savedCircuits,
  } = useCircuitStore()

  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rfInstanceRef = useRef<any>(null)

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }, [])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    if (!rfInstanceRef.current || !reactFlowWrapper.current) return

    const raw = e.dataTransfer.getData('application/circuit-gate')
    if (!raw) return

    const { gateType, savedCircuitId } = JSON.parse(raw) as {
      gateType: string
      savedCircuitId?: string
    }

    const bounds = reactFlowWrapper.current.getBoundingClientRect()
    const position = rfInstanceRef.current.screenToFlowPosition({
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    })

    if (gateType === 'CUSTOM' && savedCircuitId) {
      const sc = savedCircuits.find(c => c.id === savedCircuitId)
      if (sc) addCustomGate(sc, position)
    } else {
      addGate(gateType as GateType, position)
    }
  }, [addGate, addCustomGate, savedCircuits])

  return (
    <div ref={reactFlowWrapper} className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={(instance) => { rfInstanceRef.current = instance }}
        onMoveEnd={(_event: unknown, viewport: Viewport) => setViewport(viewport)}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
        deleteKeyCode={null}
        multiSelectionKeyCode="Shift"
        colorMode="dark"
        style={{ background: 'var(--bg-canvas)' }}
      >
        {/* Crosshatch grid */}
        <Background
          variant={BackgroundVariant.Cross}
          gap={32}
          size={1}
          color="#1a2035"
        />

        {/* Fine dot layer at intersections */}
        <Background
          variant={BackgroundVariant.Dots}
          gap={32}
          size={1}
          color="#1f2a3e"
          offset={16}
        />

        <Controls showInteractive={false} />

        <MiniMap
          nodeColor={(node) => {
            const type = node.type ?? ''
            if (type === 'INPUT')  return '#166534'
            if (type === 'OUTPUT') return '#14532d'
            if (type === 'CUSTOM') return '#78350f'
            return '#2d3748'
          }}
          maskColor="rgba(6,11,6,0.82)"
          style={{
            background: 'var(--bg-panel)',
            border: '1px solid var(--border-mid)',
            borderRadius: 3,
          }}
        />
      </ReactFlow>
    </div>
  )
}
