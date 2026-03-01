import { getBezierPath, type EdgeProps } from '@xyflow/react'
import type { WireEdgeData } from '../../types/circuit'

export function WireEdge({
  id,
  sourceX, sourceY, sourcePosition,
  targetX, targetY, targetPosition,
  data,
  selected,
}: EdgeProps) {
  const wireData = data as WireEdgeData | undefined
  const [path] = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition })
  const signal = wireData?.signal ?? null

  let stroke: string
  let strokeDasharray: string | undefined

  if (signal === 1) {
    stroke = '#22c55e'       // green — high
  } else if (signal === 0) {
    stroke = '#475569'       // slate-600 — low
  } else {
    stroke = '#334155'       // slate-700 — floating
    strokeDasharray = '4 3'
  }

  if (selected) stroke = '#60a5fa' // blue when selected

  return (
    <>
      {/* Wider invisible hit area */}
      <path
        id={id}
        d={path}
        fill="none"
        strokeWidth={12}
        stroke="transparent"
        className="react-flow__edge-interaction"
      />
      <path
        d={path}
        fill="none"
        strokeWidth={selected ? 3 : 2}
        stroke={stroke}
        strokeDasharray={strokeDasharray}
        className="react-flow__edge-path"
      />
    </>
  )
}
