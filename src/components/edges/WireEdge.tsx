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
  let strokeWidth: number
  let strokeDasharray: string | undefined

  if (selected) {
    stroke = '#f59e0b'
    strokeWidth = 2.5
  } else if (signal === 1) {
    stroke = '#22c55e'
    strokeWidth = 2.5
  } else if (signal === 0) {
    stroke = '#1e293b'
    strokeWidth = 1.5
  } else {
    stroke = '#f59e0b'
    strokeWidth = 1.5
    strokeDasharray = '5 4'
  }

  return (
    <>
      {/* Wide invisible hit area */}
      <path
        id={id}
        d={path}
        fill="none"
        strokeWidth={14}
        stroke="transparent"
        className="react-flow__edge-interaction"
      />
      {/* Visible wire */}
      <path
        d={path}
        fill="none"
        strokeWidth={strokeWidth}
        stroke={stroke}
        strokeDasharray={strokeDasharray}
        strokeLinecap="round"
        className="react-flow__edge-path"
        style={{ opacity: signal === 0 ? 0.45 : 1 }}
      />
    </>
  )
}
